# 🎣 Riley - The Virtual Angler

AI-powered content engine for generating authentic fly-fishing videos and photos featuring Riley, The Hatch's virtual angler.

## Overview

Riley is a 25-year-old Pacific Northwest fly angler who creates engaging fishing content to promote The Hatch app. This system generates:

- **High-quality photos** (outdoor photography style, not obvious AI)
- **Authentic captions** (with Riley's personality)
- **Short-form videos** (for TikTok, Instagram Reels, YouTube Shorts)
- **Educational content** (fly selection, fishing techniques)

## Features

- ✅ AI caption generation (Claude/Ollama)
- ✅ Image generation (Flux/Stable Diffusion)
- ✅ Video generation (Runway ML, D-ID, Pika)
- ✅ Instagram API integration
- ✅ TikTok API integration
- ✅ Content scheduling
- ✅ Post tracking & analytics

## Tech Stack

- **Backend**: Node.js + TypeScript + Express
- **Database**: PostgreSQL (Supabase/Railway)
- **Text Generation**: Claude API or Ollama (open-source)
- **Image Generation**: Flux or Stable Diffusion XL
- **Video Generation**: Runway ML, D-ID, or Pika Labs
- **Job Queue**: Bull/BullMQ
- **Social APIs**: Instagram Graph API, TikTok API

## Quick Start

### Prerequisites

```bash
node --version  # v18+
npm --version   # v9+
```

### Installation

```bash
git clone https://github.com/mcsteezzy/riley-the-virtual-angler.git
cd riley-the-virtual-angler
npm install
```

### Environment Setup

Create a `.env.local` file:

```env
# LLM (choose one)
CLAUDE_API_KEY=your_claude_api_key
# OR use Ollama locally (no key needed)
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=mistral

# Image Generation
HUGGINGFACE_API_KEY=your_hf_token  # for Flux
STABLE_DIFFUSION_API_KEY=optional

# Video Generation
RUNWAY_API_KEY=your_runway_key
DID_API_KEY=your_did_key

# Social Media
INSTAGRAM_ACCESS_TOKEN=your_ig_token
INSTAGRAM_BUSINESS_ACCOUNT_ID=your_account_id
TIKTOK_CLIENT_ID=your_tiktok_id
TIKTOK_CLIENT_SECRET=your_tiktok_secret
TIKTOK_ACCESS_TOKEN=your_tiktok_token

# Database
DATABASE_URL=postgresql://user:password@localhost/riley

# Redis (for job queue)
REDIS_URL=redis://localhost:6379
```

### Running the Server

```bash
npm run dev
```

Server runs at `http://localhost:3000`

## API Endpoints

### Generate Content

```bash
POST /api/generate
Body: {
  "prompt": "Riley fishing morning, golden hour, small stream, dry fly fishing",
  "type": "image" | "video" | "caption"
}
```

### Publish to Social

```bash
POST /api/publish
Body: {
  "contentId": "uuid",
  "platforms": ["instagram", "tiktok"]
}
```

### Schedule Post

```bash
POST /api/schedule
Body: {
  "contentId": "uuid",
  "scheduledFor": "2026-08-25T10:00:00Z",
  "platforms": ["instagram", "tiktok"]
}
```

## Folder Structure

```
.
├── src/
│   ├── api/              # Express routes
│   ├── services/         # Business logic
│   │   ├── llm.ts        # Text generation (Claude/Ollama)
│   │   ├── image.ts      # Image generation (Flux/SD)
│   │   ├── video.ts      # Video generation
│   │   ├── instagram.ts  # Instagram publishing
│   │   └── tiktok.ts     # TikTok publishing
│   ├── queue/            # Job scheduling
│   ├── db/               # Database & migrations
│   └── index.ts          # App entry point
├── prompts/              # Riley persona & system prompts
├── .env.local            # Environment variables (gitignored)
├── package.json
├── tsconfig.json
└── README.md
```

## Riley's Persona

**Name**: Riley  
**Age**: 25  
**Location**: Pacific Northwest  
**Specialty**: Dry fly trout fishing, small technical streams  
**Personality**: Adventurous, confident, curious, slightly sarcastic  
**Brand**: Uses The Hatch as her fishing intelligence tool

### Example Captions

- "Got to the river at 6:15. Nothing moving yet. The Hatch says give it another hour before switching to dries. Guess we're waiting."
- "The fish apparently didn't get the memo that I had somewhere to be."
- "Everyone wants to know what fly I'm using. The river decides. I just listen."

## Content Pillars

1. **Fishing Adventures** - Riley travels to different rivers
2. **Fly Knowledge** - Educational content about fly types
3. **The Hatch Integration** - Showing the app in action
4. **Lifestyle** - Coffee, gear, fly-tying, camping
5. **Humor** - Relatable fishing moments

## Getting Started: First 10 Posts

See `docs/first-10-posts.md` for the launch strategy.

## Development

### Install Dependencies

```bash
npm install
```

### Run Tests

```bash
npm run test
```

### Build for Production

```bash
npm run build
```

### Database Migrations

```bash
npm run migrate
```

## API Keys & Free Tier Setup

### Claude API
- Sign up: https://console.anthropic.com
- Free tier: $5 credit/month

### Flux (Image Generation)
- Free tier: https://huggingface.co/spaces/black-forest-labs/FLUX.1-dev
- API key: https://huggingface.co/settings/tokens

### Ollama (Free LLM)
- Download: https://ollama.ai
- Models: Mistral, LLaMA, Phi (all free, run locally)

### Runway ML (Video)
- Free tier: 5 generations/month + $1.50 per extra
- Sign up: https://runway.ml

### Instagram & TikTok APIs
- Instagram: Apply for Meta Graph API
- TikTok: Apply for TikTok API access

## Deployment

Ready to deploy? See `docs/deployment.md`

## Contributing

We welcome contributions! Please:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

MIT License - see LICENSE for details

## Support

Have questions? Open an issue or reach out to the team.

---

**Built with ��� for fly fishers everywhere** 🎣
