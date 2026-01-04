# MicroSaaS Academy AI 
Designed by Cory Suida

Get up and running in 5 minutes!

## Prerequisites

- Node.js 18+ installed
- OpenAI API key (get one at https://platform.openai.com)
- Mac, iPad, or both

## Installation

### 1. Install Dependencies

```bash
cd microsaas-academy
npm install
```

### 2. Configure Environment

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and add your OpenAI API key
# OPENAI_API_KEY=sk-your-key-here
```

### 3. Run Setup Script

```bash
npm run setup
```

### 4. Start the Application

```bash
npm run dev
```

The app will be available at: **http://localhost:3000**

## iPad Access

### Option 1: Local Network (Same Wi-Fi)

1. Find your Mac's IP address:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

2. On your iPad, open Safari and go to:
   ```
   http://YOUR_MAC_IP:3000
   ```
   Example: `http://192.168.1.20:3000`

### Option 2: Deploy Online (Access Anywhere)

Deploy to Vercel for free:

```bash
# Install Vercel CLI


# Deploy
vercel deploy

# Add your OpenAI API key in Vercel dashboard:
# Settings → Environment Variables → Add OPENAI_API_KEY
```

Your app will be live at: `https://your-app.vercel.app`

## First Steps

### 1. Choose Your Learning Path

When you first open the app, you'll see quick start options:

- **"Build a receipt scanner micro-SaaS"** - Learn by building a sellable product
- **"Teach me Next.js fundamentals"** - Start with core concepts
- **"Create a 30-day learning plan"** - Get a personalized curriculum

### 2. Select an Agent

Different agents for different tasks:

- 👨‍🏫 **TutorAgent** - Learn concepts and best practices
- 💻 **CoderAgent** - Generate production-ready code
- 🏗️ **ArchitectAgent** - Design system architecture
- 📈 **MarketerAgent** - Create launch strategies
- 🔍 **ReviewerAgent** - Review and improve code
- 🎓 **CurriculumDirector** - Design learning paths

### 3. Start Building

Try these prompts:

```
"Build a URL shortener that I can sell for $5/month"

"Teach me how to add authentication to a Next.js app"

"Design the architecture for a SaaS that handles 10k users"

"Create a landing page and pricing strategy for my app"

"Review this code and suggest improvements: [paste code]"

"Create a 30-day plan to learn full-stack development"
```

## Offline Mode (Optional)

For complete privacy and offline usage:

### 1. Install Ollama

```bash
# macOS
curl -fsSL https://ollama.com/install.sh | sh

# Or download from: https://ollama.com
```

### 2. Pull Models

```bash
# Coding model (large, ~20GB)
ollama pull codellama:34b

# General model (smaller, ~4GB)
ollama pull mistral:latest
```

### 3. Switch to Offline Mode

In the app, select **"💾 Offline"** mode from the dropdown.

## Portable Setup (SSD)

To run from an external SSD:

### 1. Copy Project to SSD

```bash
# Copy entire project
cp -r microsaas-academy /Volumes/YOUR_SSD/

# Navigate to SSD
cd /Volumes/YOUR_SSD/microsaas-academy
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run from SSD

```bash
npm run dev
```

Your data and projects will be saved on the SSD, making it fully portable!

## Troubleshooting

### "Cannot find module" errors

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port 3000 already in use

```bash
# Use a different port
PORT=3001 npm run dev
```

### iPad can't connect

1. Ensure Mac and iPad are on the same Wi-Fi
2. Check Mac's firewall settings (System Settings → Network → Firewall)
3. Try disabling firewall temporarily to test

### Offline mode not working

1. Ensure Ollama is running:
   ```bash
   ollama serve
   ```

2. Check if models are installed:
   ```bash
   ollama list
   ```

3. Pull required models:
   ```bash
   ollama pull codellama:34b
   ```

## What Makes This Superior?

Compared to the ChatGPT version you shared:

### ✅ Multi-Agent Architecture
- Specialized agents for different tasks
- Better quality outputs
- More comprehensive solutions

### ✅ Adaptive Learning
- Tracks your progress
- Adjusts difficulty automatically
- Spaced repetition for retention

### ✅ Production-Ready Code
- Complete files, never snippets
- Security built-in
- Tests included
- Deployment ready

### ✅ Monetization Tools
- Automated pricing research
- Landing page generation
- Launch checklists
- Marketing copy

### ✅ True Offline Support
- Full-featured offline mode
- Privacy-first design
- No data leaves your device

### ✅ Cross-Platform
- Works on Mac, iPad, iPhone
- Portable on SSD
- Deploy to cloud

## Next Steps

1. **Complete your first project** - Build something sellable
2. **Get your first customer** - Launch and validate
3. **Scale up** - Build more complex products
4. **Teach others** - Share what you've learned

## Support

- Documentation: See README.md
- Configuration: See config.yaml
- Issues: Check the troubleshooting section above

## Tips for Success

1. **Start small** - Build simple projects first
2. **Ship fast** - Don't aim for perfection
3. **Get feedback** - Launch early, iterate
4. **Learn by doing** - Build real products, not tutorials
5. **Track progress** - Celebrate small wins

Ready to build your first micro-SaaS? Let's go! 🚀
