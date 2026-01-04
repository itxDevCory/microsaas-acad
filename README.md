# MicroSaaS Academy AI

**Your Personal AI Mentor for Building & Selling Profitable Micro-SaaS Products**

## What This Is

A complete AI-powered system that:
- 🎓 **Teaches you** software engineering, AI, and business skills
- 🚀 **Builds with you** - generates production-ready micro-SaaS projects
- 💰 **Helps you earn** - includes monetization, marketing, and launch tools
- 📱 **Works everywhere** - Mac, iPad, offline on SSD
- 🔄 **Self-improves** - learns from your progress and market feedback

## Superior to ChatGPT's Version

| Feature | ChatGPT Version | MicroSaaS Academy AI |
|---------|----------------|---------------------|
| Curriculum Engine | ❌ Basic prompts | ✅ Adaptive learning paths |
| Progress Tracking | ❌ None | ✅ Skill tree + milestones |
| Market Validation | ❌ None | ✅ Built-in research tools |
| Monetization | ❌ Manual | ✅ Automated pricing + landing pages |
| Offline Mode | ⚠️ Limited | ✅ Full-featured with sync |
| Multi-Agent | ❌ Single AI | ✅ Specialized agents (tutor, coder, marketer) |
| Self-Updating | ❌ Manual | ✅ Automatic model + curriculum updates |

## Quick Start

### Option 1: Online (iPad + Mac)
```bash
cd microsaas-academy
npm install
npm run dev
```
Open on iPad: `http://YOUR_MAC_IP:3000`

### Option 2: Offline (SSD + Local AI)
```bash
# Install Ollama
curl -fsSL https://ollama.com/install.sh | sh

# Pull models
ollama pull codellama:34b
ollama pull mistral:latest

# Run offline mode
npm run offline
```

### Option 3: Hybrid (Best of Both)
Uses local AI for privacy, cloud for advanced features
```bash
npm run hybrid
```

## Architecture

```
microsaas-academy/
├── core/                    # Core AI engine
│   ├── agents/             # Specialized AI agents
│   ├── curriculum/         # Learning paths
│   └── generators/         # Project generators
├── web/                    # Next.js web interface
├── offline/                # Offline-first PWA
├── models/                 # Local AI models
├── projects/               # Generated micro-SaaS projects
└── data/                   # Your progress & analytics
```

## Usage

### 1. Start Learning
```
"Teach me to build a profitable SaaS in 30 days"
```

### 2. Build a Project
```
"Build a receipt scanner app that I can sell for $9/month"
```

### 3. Get Market Insights
```
"What micro-SaaS ideas are trending and underserved?"
```

### 4. Launch & Monetize
```
"Create a landing page and pricing strategy for my app"
```

## Features

### 🎓 Adaptive Learning
- Personalized curriculum based on your skill level
- Project-based learning (learn by building)
- Spaced repetition for retention
- Master's degree equivalent depth

### 🤖 Multi-Agent System
- **TutorAgent**: Teaches concepts and best practices
- **CoderAgent**: Generates production code
- **ArchitectAgent**: Designs system architecture
- **MarketerAgent**: Creates go-to-market strategy
- **ReviewerAgent**: Code review and optimization

### 💰 Monetization Tools
- Automated pricing research
- Landing page generator
- Payment integration (Stripe/Paddle)
- Launch checklist
- Marketing copy generator

### 📊 Progress Tracking
- Skill tree visualization
- Project portfolio
- Earnings dashboard
- Learning analytics

## Deployment

### Deploy to Vercel (Recommended)
```bash
vercel deploy
```

### Self-Host
```bash
docker-compose up -d
```

## Configuration

Edit `config.yaml`:
```yaml
mode: hybrid  # online | offline | hybrid
models:
  online: gpt-4-turbo
  offline: codellama:34b
  reasoning: o1-preview
curriculum:
  pace: accelerated  # normal | accelerated | custom
  focus: [fullstack, ai, business]
monetization:
  auto_pricing: true
  market_research: true
```

## License

MIT - Build and sell whatever you create!
