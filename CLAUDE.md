# FlowRich / NexaFlow AI - Project Guide

## Project Overview
FlowRich (NexaFlow AI) is a business automation agency website built with Next.js + Tailwind CSS.
Offers: AI Chatbots, Workflow Automation, Email Automation, CRM Integration, Document Processing, Analytics.

## Tech Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Automation**: n8n, Replicate API
- **Video Generation**: Python + Replicate (AnimateDiff / Stable Video Diffusion)

## Project Structure
- `/src` — Next.js website source
- `/nexaflow-ai/video-automation/` — AI video generation pipeline
- `/FlowRich-VideoAutomation/` (standalone copy at `~/FlowRich-VideoAutomation/`)

## Video Automation Pipeline
- **Python script**: `nexaflow-ai/video-automation/generate_video.py` — generates AI videos via Replicate API
- **n8n workflow**: `nexaflow-ai/video-automation/n8n_workflow.json` — importable workflow for automated video generation + posting
- **Platforms**: TikTok, Instagram Reels, YouTube Shorts
- **Models**: AnimateDiff, Stable Video Diffusion
- **Setup**: Requires `REPLICATE_API_TOKEN` env variable

## Social Media
- CTA keyword: "automate" (lowercase)
- Content style: dark tech aesthetic, indigo/cyan/purple color palette
- Posting schedule: managed via n8n workflow
