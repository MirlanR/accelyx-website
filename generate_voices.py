"""
Generate natural AI voice audio files for the Voice AI Demo.
Run: pip install edge-tts && python generate_voices.py
"""
import asyncio
import edge_tts
import os

OUTPUT_DIR = os.path.join(os.path.dirname(__file__), "public", "audio", "voice-demo")
os.makedirs(OUTPUT_DIR, exist_ok=True)

# Female AI voice — warm, professional receptionist
AI_VOICE = "en-US-JennyNeural"
# Male caller voice
CALLER_VOICE = "en-US-ChristopherNeural"

# All conversation lines in order
LINES = [
    ("ai", "greeting_01", "Good afternoon! Thank you for calling Accelyx AI. I'm Ava, your AI receptionist. How can I help you today?"),
    ("caller", "greeting_02", "Hi, I'd like to book a consultation for our business automation needs."),
    ("ai", "collecting_01", "I'd love to help you with that! Could I get your name please?"),
    ("caller", "collecting_02", "It's James Mitchell."),
    ("ai", "collecting_03", "Great, James! And what's the best email to send the confirmation to?"),
    ("caller", "collecting_04", "james at brightpath dot io"),
    ("ai", "collecting_05", "Perfect. And your company name?"),
    ("caller", "collecting_06", "BrightPath Solutions."),
    ("ai", "collecting_07", "Got it! What time works best for you? We have openings tomorrow at 10 AM or 2 PM."),
    ("caller", "collecting_08", "2 PM tomorrow would be perfect."),
    ("ai", "confirming_01", "Wonderful! Let me book that for you right now. One moment please."),
    ("ai", "confirming_02", "All set, James! Your consultation is confirmed for tomorrow at 2 PM. You'll receive a confirmation email and SMS shortly. Is there anything else I can help with?"),
    ("caller", "confirming_03", "No, that's everything. Thank you so much!"),
    ("ai", "confirming_04", "You're welcome, James! We look forward to speaking with you tomorrow. Have a wonderful day!"),
]

async def generate():
    for speaker, filename, text in LINES:
        voice = AI_VOICE if speaker == "ai" else CALLER_VOICE
        output = os.path.join(OUTPUT_DIR, f"{filename}.mp3")
        rate = "+0%" if speaker == "ai" else "-5%"
        communicate = edge_tts.Communicate(text, voice, rate=rate)
        await communicate.save(output)
        print(f"  ✓ {filename}.mp3")

    print(f"\nDone! {len(LINES)} audio files saved to public/audio/voice-demo/")

if __name__ == "__main__":
    print("Generating voice audio files...\n")
    asyncio.run(generate())
