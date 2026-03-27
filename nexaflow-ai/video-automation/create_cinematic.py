"""
FlowRich Cinematic AI Video Creator
Generates multiple AI scenes, stitches them together with
text overlays, transitions, and music — viral short format.
"""

import requests
import os
import sys
import time
import subprocess
import json
from datetime import datetime


# ── Configuration ─────────────────────────────────────────
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
BASE_DIR = os.path.dirname(__file__)
OUTPUT_DIR = os.path.join(BASE_DIR, "output")
TEMP_DIR = os.path.join(BASE_DIR, "temp_clips")
MUSIC_DIR = os.path.join(BASE_DIR, "music")
API_BASE = "https://api.replicate.com/v1"

# Use ffmpeg-full for drawtext support
FFMPEG = "/usr/local/opt/ffmpeg-full/bin/ffmpeg"
FFPROBE = "/usr/local/opt/ffmpeg-full/bin/ffprobe"

# Wan 2.5 text-to-video
MODEL_VERSION = "4e22e64c604706aa4ac1929a7ae146ea033f39bb228e896da79d91b7a39e8d32"


def headers():
    return {
        "Authorization": f"Bearer {REPLICATE_API_TOKEN}",
        "Content-Type": "application/json",
    }


def ensure_dirs():
    os.makedirs(OUTPUT_DIR, exist_ok=True)
    os.makedirs(TEMP_DIR, exist_ok=True)
    os.makedirs(MUSIC_DIR, exist_ok=True)


def wait_for_prediction(prediction_id: str, max_wait: int = 600) -> dict:
    """Poll Replicate API until prediction is complete."""
    url = f"{API_BASE}/predictions/{prediction_id}"
    start = time.time()

    while time.time() - start < max_wait:
        resp = requests.get(url, headers=headers())
        resp.raise_for_status()
        data = resp.json()
        status = data.get("status")

        if status == "succeeded":
            return data
        elif status in ("failed", "canceled"):
            print(f"  ERROR: {status} — {data.get('error', '')}")
            return None

        elapsed = int(time.time() - start)
        print(f"  [{elapsed}s] {status}...")
        time.sleep(10)

    print("  ERROR: Timed out")
    return None


def generate_clip(prompt: str, clip_name: str, duration: int = 5) -> str:
    """Generate a single video clip."""
    print(f"\n  Generating clip: {clip_name}")
    print(f"  Prompt: {prompt[:80]}...")

    payload = {
        "version": MODEL_VERSION,
        "input": {
            "prompt": prompt,
            "negative_prompt": "bad quality, worst quality, blurry, low resolution, watermark, text, logo, static, frozen, no motion, ugly",
            "size": "720*1280",
            "duration": duration,
            "enable_prompt_expansion": True,
        },
    }

    resp = requests.post(f"{API_BASE}/predictions", headers=headers(), json=payload)
    if resp.status_code not in (200, 201):
        print(f"  ERROR: API returned {resp.status_code}: {resp.text}")
        return None

    prediction = resp.json()
    result = wait_for_prediction(prediction["id"])

    if not result:
        return None

    output = result.get("output")
    video_url = output[0] if isinstance(output, list) else str(output)

    filepath = os.path.join(TEMP_DIR, f"{clip_name}.mp4")
    dl = requests.get(video_url, stream=True)
    dl.raise_for_status()
    with open(filepath, "wb") as f:
        for chunk in dl.iter_content(chunk_size=8192):
            f.write(chunk)

    print(f"  Clip saved: {filepath}")
    return filepath


def add_text_overlay(input_path: str, output_path: str, text: str, position: str = "bottom", font_size: int = 56):
    """Add bold text overlay to a video clip using drawtext."""
    if position == "top":
        y_expr = "h*0.08"
    elif position == "center":
        y_expr = "(h-text_h)/2"
    else:
        y_expr = "h*0.82"

    # Escape special chars for drawtext
    safe_text = text.replace("'", "'\\''").replace(":", "\\:")

    drawtext = (
        f"drawtext=text='{safe_text}'"
        f":fontsize={font_size}"
        f":fontcolor=white"
        f":x=(w-text_w)/2:y={y_expr}"
        f":borderw=4:bordercolor=black"
        f":shadowcolor=black@0.7:shadowx=3:shadowy=3"
    )

    cmd = [
        FFMPEG, "-y", "-i", input_path,
        "-vf", drawtext,
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        "-an",
        output_path
    ]

    result = subprocess.run(cmd, capture_output=True)
    if result.returncode != 0:
        print(f"  Text overlay warning: {result.stderr.decode()[-200:]}")
        import shutil
        shutil.copy2(input_path, output_path)

    return output_path


def stitch_clips(clip_paths: list, output_path: str, music_path: str = None):
    """Stitch multiple clips together with crossfade transitions and optional music."""
    if not clip_paths:
        print("ERROR: No clips to stitch")
        return None

    # Normalize all clips to same format
    normalized = []
    for i, clip in enumerate(clip_paths):
        norm_path = os.path.join(TEMP_DIR, f"norm_{i}.mp4")
        cmd = [
            FFMPEG, "-y", "-i", clip,
            "-vf", "scale=720:1280:force_original_aspect_ratio=decrease,pad=720:1280:(ow-iw)/2:(oh-ih)/2,fps=24",
            "-an", "-c:v", "libx264", "-preset", "fast", "-crf", "23",
            norm_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)
        normalized.append(norm_path)

    n = len(normalized)

    if n == 1:
        import shutil
        shutil.copy2(normalized[0], output_path)
    else:
        # Build xfade chain
        fade_duration = 0.3
        clip_duration = 3
        filters = []
        prev = "0:v"

        for i in range(1, n):
            out_label = f"v{i}" if i < n - 1 else "v"
            offset = (clip_duration * i) - (fade_duration * i)
            filters.append(f"[{prev}][{i}:v]xfade=transition=fadeblack:duration={fade_duration}:offset={offset:.1f}[{out_label}]")
            prev = out_label

        filter_complex = ";".join(filters)
        cmd = [FFMPEG, "-y"]
        for clip in normalized:
            cmd += ["-i", clip]

        if music_path and os.path.exists(music_path):
            cmd += ["-i", music_path]
            cmd += ["-filter_complex", filter_complex, "-map", "[v]", "-map", f"{n}:a", "-shortest"]
        else:
            cmd += ["-filter_complex", filter_complex, "-map", "[v]"]

        cmd += ["-c:v", "libx264", "-preset", "fast", "-crf", "23", output_path]

        result = subprocess.run(cmd, capture_output=True)
        if result.returncode != 0:
            print(f"  Xfade error, falling back to concat...")
            concat_file = os.path.join(TEMP_DIR, "concat.txt")
            with open(concat_file, "w") as f:
                for clip in normalized:
                    f.write(f"file '{clip}'\n")
            cmd = [
                FFMPEG, "-y", "-f", "concat", "-safe", "0",
                "-i", concat_file, "-c:v", "libx264", "-preset", "fast",
                output_path
            ]
            subprocess.run(cmd, capture_output=True, check=True)

    print(f"  Stitched video: {output_path}")
    return output_path


def add_intro_outro(video_path: str, output_path: str, intro_text: str, outro_text: str):
    """Add fade-in intro text and fade-out outro CTA."""
    probe = subprocess.run(
        [FFPROBE, "-v", "quiet", "-show_entries", "format=duration", "-of", "json", video_path],
        capture_output=True, text=True
    )
    duration = float(json.loads(probe.stdout)["format"]["duration"])

    intro_safe = intro_text.replace("'", "'\\''").replace(":", "\\:")
    outro_safe = outro_text.replace("'", "'\\''").replace(":", "\\:")

    vf = (
        f"fade=t=in:st=0:d=1,fade=t=out:st={duration-1}:d=1,"
        f"drawtext=text='{intro_safe}'"
        f":fontsize=72:fontcolor=white"
        f":x=(w-text_w)/2:y=(h-text_h)/2"
        f":borderw=5:bordercolor=black"
        f":shadowcolor=black@0.8:shadowx=3:shadowy=3"
        f":enable='between(t,0.3,2.5)'"
        f","
        f"drawtext=text='{outro_safe}'"
        f":fontsize=52:fontcolor=white"
        f":x=(w-text_w)/2:y=(h-text_h)/2"
        f":borderw=4:bordercolor=black"
        f":shadowcolor=black@0.8:shadowx=3:shadowy=3"
        f":enable='between(t,{duration-3},{duration-0.3})'"
    )

    cmd = [
        FFMPEG, "-y", "-i", video_path,
        "-vf", vf,
        "-c:v", "libx264", "-preset", "fast", "-crf", "23",
        output_path
    ]

    result = subprocess.run(cmd, capture_output=True)
    if result.returncode != 0:
        print(f"  Intro/outro warning, using fade only...")
        cmd = [
            FFMPEG, "-y", "-i", video_path,
            "-vf", f"fade=t=in:st=0:d=1,fade=t=out:st={duration-1}:d=1",
            "-c:v", "libx264", "-preset", "fast", "-crf", "23",
            output_path
        ]
        subprocess.run(cmd, capture_output=True, check=True)

    return output_path


def create_cinematic_video(config: dict) -> str:
    """
    Create a full cinematic short video.

    config = {
        "title": "Video title",
        "scenes": [{"prompt": "...", "text": "overlay text"}, ...],
        "outro_text": "Comment 'automate'",
        "music": "path/to/music.mp3" (optional),
        "platform": "tiktok" | "instagram" | "youtube_shorts"
    }
    """
    ensure_dirs()
    title = config.get("title", "FlowRich")
    scenes = config["scenes"]
    platform = config.get("platform", "tiktok")
    music = config.get("music")
    outro = config.get("outro_text", "Comment 'automate'")

    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    final_name = f"{platform}_{title.replace(' ', '_')[:30]}_{timestamp}.mp4"
    final_path = os.path.join(OUTPUT_DIR, final_name)

    print(f"{'='*60}")
    print(f"  CREATING CINEMATIC VIDEO: {title}")
    print(f"  Platform: {platform} | Scenes: {len(scenes)}")
    print(f"{'='*60}")

    # Step 1: Generate all scene clips (5s each, trimmed to 3s later)
    clip_paths = []
    for i, scene in enumerate(scenes):
        clip = generate_clip(scene["prompt"], f"scene_{i}", duration=5)
        if clip:
            # Trim to 3s for faster pacing
            trimmed = os.path.join(TEMP_DIR, f"scene_{i}_trimmed.mp4")
            trim_cmd = [
                FFMPEG, "-y", "-i", clip,
                "-t", "3", "-c:v", "libx264", "-preset", "fast", "-crf", "23", "-an",
                trimmed
            ]
            subprocess.run(trim_cmd, capture_output=True, check=True)
            clip = trimmed
            if scene.get("text"):
                text_path = os.path.join(TEMP_DIR, f"scene_{i}_text.mp4")
                add_text_overlay(clip, text_path, scene["text"],
                                 position=scene.get("text_position", "bottom"),
                                 font_size=scene.get("font_size", 56))
                clip_paths.append(text_path)
            else:
                clip_paths.append(clip)
        else:
            print(f"  WARNING: Scene {i} failed, skipping")

    if not clip_paths:
        print("ERROR: No clips generated")
        sys.exit(1)

    # Step 2: Stitch clips with crossfade transitions
    stitched_path = os.path.join(TEMP_DIR, "stitched.mp4")
    stitch_clips(clip_paths, stitched_path, music)

    # Step 3: Add fade in/out + re-encode for QuickTime compatibility
    probe = subprocess.run(
        [FFPROBE, "-v", "quiet", "-show_entries", "format=duration", "-of", "json", stitched_path],
        capture_output=True, text=True
    )
    duration = float(json.loads(probe.stdout)["format"]["duration"])

    cmd = [
        FFMPEG, "-y", "-i", stitched_path,
        "-vf", f"fade=t=in:st=0:d=0.5,fade=t=out:st={duration-0.5}:d=0.5",
        "-c:v", "libx264", "-profile:v", "high", "-level", "4.0",
        "-pix_fmt", "yuv420p", "-movflags", "+faststart",
        "-preset", "fast", "-crf", "23", "-an",
        final_path
    ]
    subprocess.run(cmd, capture_output=True, check=True)

    # Get final video info
    probe = subprocess.run(
        [FFPROBE, "-v", "quiet", "-show_entries", "format=duration,size", "-of", "json", final_path],
        capture_output=True, text=True
    )
    info = json.loads(probe.stdout)["format"]

    print(f"\n{'='*60}")
    print(f"  DONE!")
    print(f"  File: {final_path}")
    print(f"  Duration: {float(info['duration']):.1f}s")
    print(f"  Size: {int(info['size'])/1024/1024:.1f}MB")
    print(f"{'='*60}")

    return final_path


# ── Preset: FlowRich Viral Short ──────────────────────────
# Storytelling arc: HOOK → PROBLEM → SOLUTION → PROOF → SCALE → CTA
FLOWRICH_CINEMATIC = {
    "title": "What If AI Ran Your Business",
    "platform": "tiktok",
    "outro_text": "Comment 'automate'",
    "scenes": [
        {
            # HOOK — grab attention immediately
            "prompt": "Extreme close-up cinematic shot of a glowing AI eye opening in the dark, iris made of swirling data and code, electric blue and purple sparks flying outward, dramatic camera zoom in, lens flare, ultra detailed, dark background, 4K cinematic, intense and mysterious",
            "text": "What if AI ran your business?",
            "text_position": "center",
            "font_size": 62,
        },
        {
            # PROBLEM — show the pain
            "prompt": "Cinematic overhead shot of an exhausted office worker drowning in papers and screens, desk covered with messy documents and notifications, red warning lights flashing on monitors, stressed atmosphere, dim warm lighting contrasting with harsh screen glow, slow motion papers falling, 4K cinematic",
            "text": "You waste 20+ hours on tasks",
            "text_position": "bottom",
        },
        {
            # SOLUTION — AI takes over
            "prompt": "Dramatic cinematic transformation scene, dark chaotic office suddenly illuminated by a wave of blue holographic light sweeping through the room, papers dissolving into digital particles, screens transforming into clean AI dashboards, magical transformation moment, volumetric blue and purple light rays, epic atmosphere, 4K",
            "text": "AI handles it all",
            "text_position": "bottom",
        },
        {
            # PROOF — show it working
            "prompt": "Cinematic shot of multiple holographic screens floating in a dark futuristic room showing automated workflows running perfectly, green checkmarks appearing one by one, chatbot conversations auto-responding, emails sending automatically, CRM updating in real-time, smooth camera pan across all screens, blue and cyan glow, satisfying and clean, 4K",
            "text": "Chatbots. Emails. CRM. Workflows.",
            "text_position": "bottom",
        },
        {
            # SCALE — show the impact
            "prompt": "Epic cinematic aerial shot of a futuristic glowing city at night, massive holographic growth charts and upward arrows projected into the sky above glass skyscrapers, golden and blue light, sense of massive scale and success, cinematic drone shot pulling back to reveal the full cityscape, breathtaking, 4K",
            "text": "150+ automations. 10x ROI.",
            "text_position": "bottom",
            "font_size": 62,
        },
        {
            # CTA — call to action
            "prompt": "Cinematic close-up of a glowing neon sign flickering on in a dark room reading the word AUTOMATE, electric blue and purple neon tubes, dramatic light spill, camera slowly pushing in, moody atmosphere, shallow depth of field, 4K cinematic",
            "text": "Comment 'automate'",
            "text_position": "center",
            "font_size": 68,
        },
    ],
}


if __name__ == "__main__":
    if not REPLICATE_API_TOKEN:
        print("ERROR: Set REPLICATE_API_TOKEN environment variable")
        print("  export REPLICATE_API_TOKEN='your-token-here'")
        sys.exit(1)

    if not os.path.exists(FFMPEG):
        print(f"ERROR: ffmpeg-full not found at {FFMPEG}")
        print("Install with: brew install ffmpeg-full")
        sys.exit(1)

    print("Creating FlowRich cinematic video...\n")
    result = create_cinematic_video(FLOWRICH_CINEMATIC)
    print(f"\nOpen with: open '{result}'")
