# FlowRich AI Video Automation

## Setup

### 1. Install dependencies
```bash
cd nexaflow-ai/video-automation
pip install -r requirements.txt
```

### 2. Set your Replicate API token
```bash
export REPLICATE_API_TOKEN="your-token-here"
```

### 3. Run the video generator

**Use preset FlowRich prompts:**
```bash
python generate_video.py
```

**Custom prompt:**
```bash
python generate_video.py "futuristic AI dashboard with glowing data streams"
```

Videos are saved to the `output/` folder.

### 4. Import n8n workflow
1. Open n8n
2. Go to Workflows → Import from File
3. Select `n8n_workflow.json`
4. Add your Replicate API credential (HTTP Header Auth):
   - Header Name: `Authorization`
   - Header Value: `Bearer your-replicate-token`
5. Activate the workflow

## Workflow Flow
```
Schedule/Manual Trigger
  → Select prompt + caption
  → Call Replicate API (AnimateDiff)
  → Wait for render
  → Check status (retry if not ready)
  → Download video
  → Prepare post data with caption
```

## Add Social Media Posting
After "Prepare Post Data", connect platform nodes:
- **TikTok**: Use HTTP Request node with TikTok API
- **Instagram**: Use HTTP Request node with Instagram Graph API
- **YouTube**: Use Google YouTube node (built into n8n)
