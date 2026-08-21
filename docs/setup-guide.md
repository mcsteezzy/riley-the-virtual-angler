# Riley Setup Guide

Get Riley's content engine running in 15 minutes.

## Step 1: Clone & Install

```bash
git clone https://github.com/mcsteezzy/riley-the-virtual-angler.git
cd riley-the-virtual-angler
npm install
```

## Step 2: Choose Your LLM (Text Generation)

### Option A: Claude (Recommended for Quality)

1. Sign up: https://console.anthropic.com
2. Get API key from dashboard
3. Add to `.env.local`:
   ```
   CLAUDE_API_KEY=sk-ant-...
   ```

Cost: ~$3-5/month for casual use (free $5 credit included)

### Option B: Ollama (Free, Runs Locally)

1. Download: https://ollama.ai
2. Install and run:
   ```bash
   ollama run mistral  # or llama2, neural-chat
   ```
3. Add to `.env.local`:
   ```
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=mistral
   ```

Cost: FREE (runs on your computer)

## Step 3: Image Generation

### Option A: Flux Free Tier (Recommended for Quality)

1. Get Hugging Face token: https://huggingface.co/settings/tokens
2. Add to `.env.local`:
   ```
   HUGGINGFACE_API_KEY=hf_...
   ```

Cost: FREE tier available at https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev

### Option B: Stable Diffusion (Local Setup)

1. Install AUTOMATIC1111 WebUI: https://github.com/AUTOMATIC1111/stable-diffusion-webui
2. Run: `./webui.sh`
3. Add to `.env.local`:
   ```
   STABLE_DIFFUSION_ENDPOINT=http://localhost:7860
   ```

Cost: FREE (but requires GPU, ~8GB VRAM)

## Step 4: Video Generation (Optional for MVP)

### Option A: Runway ML (Free tier 5 gens/month)

1. Sign up: https://runway.ml
2. Get API key
3. Add to `.env.local`:
   ```
   RUNWAY_API_KEY=...
   ```

### Option B: D-ID (Free tier for talking head videos)

1. Sign up: https://www.d-id.com
2. Get API key
3. Add to `.env.local`:
   ```
   DID_API_KEY=...
   ```

## Step 5: Database (PostgreSQL)

### Option A: Free Cloud Database (Recommended)

1. Sign up to **Railway** (https://railway.app) or **Supabase** (https://supabase.com)
2. Create a new PostgreSQL database
3. Copy connection string to `.env.local`:
   ```
   DATABASE_URL=postgresql://user:password@host:5432/riley
   ```

### Option B: Local PostgreSQL

```bash
# macOS
brew install postgresql
brew services start postgresql

# Linux (Ubuntu/Debian)
sudo apt install postgresql
sudo systemctl start postgresql

# Create database
createdb riley
```

Then add to `.env.local`:
```
DATABASE_URL=postgresql://localhost:5432/riley
```

## Step 6: Redis (for Job Queue)

### Option A: Free Cloud Redis

1. Sign up to **Upstash** (https://upstash.com) - free tier
2. Copy connection string to `.env.local`:
   ```
   REDIS_URL=redis://...
   ```

### Option B: Local Redis

```bash
# macOS
brew install redis
brew services start redis

# Linux
sudo apt install redis-server
sudo systemctl start redis-server
```

Then add to `.env.local`:
```
REDIS_URL=redis://localhost:6379
```

## Step 7: Social Media APIs (Optional for MVP)

### Instagram

1. Create Meta Business Account: https://business.facebook.com
2. Apply for Instagram Graph API access
3. Get your access token and business account ID
4. Add to `.env.local`:
   ```
   INSTAGRAM_ACCESS_TOKEN=...
   INSTAGRAM_BUSINESS_ACCOUNT_ID=...
   ```

### TikTok

1. Apply for TikTok API: https://developer.tiktok.com
2. Get credentials
3. Add to `.env.local`:
   ```
   TIKTOK_CLIENT_ID=...
   TIKTOK_CLIENT_SECRET=...
   TIKTOK_ACCESS_TOKEN=...
   ```

## Step 8: Run It!

```bash
npm run dev
```

You should see:
```
✨ Riley content engine running on http://localhost:3000
```

Test it:
```bash
curl http://localhost:3000/health
```

Response:
```json
{"status":"ok","message":"Riley content engine is running 🎣"}
```

## Quick Start Recap

**Minimal Setup (Text + Images only)**:
- Claude API (free tier) or Ollama (free)
- Flux free tier (via Hugging Face)
- Local SQLite (no DB needed for testing)

**Full Setup**:
- Claude or Ollama for text
- Flux or local Stable Diffusion for images
- PostgreSQL (local or cloud)
- Redis (local or cloud)
- Instagram + TikTok API tokens

## Environment File Template

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Then fill in your actual keys.

## Troubleshooting

### "CLAUDE_API_KEY not set"
- Make sure `.env.local` exists and has `CLAUDE_API_KEY=...`
- If using Ollama, make sure it's running (`ollama serve`)

### "Ollama connection refused"
- Run: `ollama serve` in another terminal
- Check it's running: `curl http://localhost:11434/api/tags`

### "Database connection failed"
- Check DATABASE_URL format
- Make sure PostgreSQL is running
- Verify user/password/host

### "No image provider available"
- Set either `HUGGINGFACE_API_KEY` or `STABLE_DIFFUSION_ENDPOINT`
- If using Stable Diffusion, make sure it's running on port 7860

## Next Steps

1. Test caption generation: `POST /api/generate` with `type: "caption"`
2. Test image generation: `POST /api/generate` with `type: "image"`
3. Set up database migrations: `npm run migrate`
4. Create first content post

Happy fishing! 🎣
