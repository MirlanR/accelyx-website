"""
FlowRich AI Video Generator
Generates high-quality short-form videos using Wan 2.5 via Replicate API
for TikTok, Instagram Reels, and YouTube Shorts.
"""

import requests
import os
import sys
import time
from datetime import datetime


# ── Configuration ─────────────────────────────────────────
REPLICATE_API_TOKEN = os.environ.get("REPLICATE_API_TOKEN", "")
OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "output")
API_BASE = "https://api.replicate.com/v1"

# Wan 2.5 text-to-video model
MODEL_VERSION = "4e22e64c604706aa4ac1929a7ae146ea033f39bb228e896da79d91b7a39e8d32"

# Platform specs (Wan 2.5 supports these sizes)
PLATFORMS = {
    "tiktok":         {"size": "720*1280", "duration": 5},
    "instagram":      {"size": "720*1280", "duration": 5},
    "youtube_shorts": {"size": "720*1280", "duration": 5},
}


def headers():
    return {
        "Authorization": f"Bearer {REPLICATE_API_TOKEN}",
        "Content-Type": "application/json",
    }


def ensure_output_dir():
    os.makedirs(OUTPUT_DIR, exist_ok=True)


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
            print("Video generation complete!")
            return data
        elif status == "failed":
            print(f"ERROR: Generation failed — {data.get('error', 'unknown error')}")
            sys.exit(1)
        elif status == "canceled":
            print("ERROR: Generation was canceled")
            sys.exit(1)

        elapsed = int(time.time() - start)
        print(f"  Status: {status}... ({elapsed}s elapsed)")
        time.sleep(10)

    print("ERROR: Timed out waiting for video generation")
    sys.exit(1)


def generate_video(prompt: str, platform: str = "tiktok") -> str:
    """Generate a video using Wan 2.5 model."""
    specs = PLATFORMS.get(platform, PLATFORMS["tiktok"])

    print(f"\nGenerating video for {platform}...")
    print(f"Prompt: {prompt}")
    print(f"Size: {specs['size']} | Duration: {specs['duration']}s")

    payload = {
        "version": MODEL_VERSION,
        "input": {
            "prompt": prompt,
            "negative_prompt": "bad quality, worst quality, blurry, low resolution, watermark, text, logo, static, frozen, no motion",
            "size": specs["size"],
            "duration": specs["duration"],
            "enable_prompt_expansion": True,
        },
    }

    resp = requests.post(f"{API_BASE}/predictions", headers=headers(), json=payload)
    if resp.status_code not in (200, 201):
        print(f"ERROR: API returned {resp.status_code}")
        print(resp.text)
        sys.exit(1)

    prediction = resp.json()
    prediction_id = prediction["id"]
    print(f"Prediction started: {prediction_id}")

    result = wait_for_prediction(prediction_id)
    output = result.get("output")

    if isinstance(output, list):
        video_url = output[0]
    else:
        video_url = str(output)

    return download_video(video_url, platform, prompt)


def download_video(url: str, platform: str, prompt: str) -> str:
    """Download generated video to output directory."""
    ensure_output_dir()
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    safe_prompt = prompt[:30].replace(" ", "_").replace("/", "_")
    filename = f"{platform}_{safe_prompt}_{timestamp}.mp4"
    filepath = os.path.join(OUTPUT_DIR, filename)

    print(f"Downloading video to {filepath}...")
    response = requests.get(url, stream=True)
    response.raise_for_status()

    with open(filepath, "wb") as f:
        for chunk in response.iter_content(chunk_size=8192):
            f.write(chunk)

    print(f"Video saved: {filepath}")
    return filepath


def batch_generate(prompts: list[dict]) -> list[str]:
    """Generate videos in batch."""
    results = []
    for i, item in enumerate(prompts):
        print(f"\n{'='*50}")
        print(f"Generating video {i+1}/{len(prompts)}")
        print(f"{'='*50}")

        path = generate_video(item["prompt"], item.get("platform", "tiktok"))
        results.append(path)

    return results


# ── Preset prompts for FlowRich content ───────────────────
FLOWRICH_PROMPTS = [
    {
        "prompt": "Cinematic shot of a futuristic holographic dashboard floating in a dark room, glowing blue and purple data streams flowing through the air, AI neural network nodes pulsing with light, smooth camera movement pushing forward through the data, volumetric lighting, high detail, 4K quality",
        "platform": "tiktok",
    },
    {
        "prompt": "Close-up cinematic shot of robotic hands elegantly typing on a transparent holographic keyboard, digital automation workflow diagrams flowing across a curved glass screen, neon indigo and cyan particle effects, dark moody tech environment, smooth slow motion, film grain",
        "platform": "instagram",
    },
    {
        "prompt": "Cinematic aerial view of a glowing AI brain made of electric circuits and neural pathways, data pulses traveling through interconnected nodes, camera slowly orbiting around, deep purple and cyan gradient lighting, dark space background, volumetric fog, ultra detailed",
        "platform": "youtube_shorts",
    },
]


if __name__ == "__main__":
    if not REPLICATE_API_TOKEN:
        print("ERROR: Set REPLICATE_API_TOKEN environment variable")
        print("  export REPLICATE_API_TOKEN='your-token-here'")
        sys.exit(1)

    if len(sys.argv) > 1:
        custom_prompt = " ".join(sys.argv[1:])
        platforms = ["tiktok", "instagram", "youtube_shorts"]
        for platform in platforms:
            generate_video(custom_prompt, platform)
    else:
        print("Using preset FlowRich prompts (Wan 2.5)...")
        print(f"Generating {len(FLOWRICH_PROMPTS)} videos...\n")
        results = batch_generate(FLOWRICH_PROMPTS)
        print(f"\nDone! Generated {len(results)} videos:")
        for r in results:
            print(f"  {r}")
