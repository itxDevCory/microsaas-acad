# 🚀 Quick Start Guide

Get up and running in 3 minutes.

## Prerequisites

- Node.js 18 or later
- npm or yarn
- OpenAI API key (get one at https://platform.openai.com/api-keys)

## Installation

### Step 1: Clone or Download

```bash
git clone https://github.com/itxDevCory/microsaas-acad.git
cd microsaas-acad
```

### Step 2: Install Dependencies

```bash
bash INSTALL.sh
```

Or manually:

```bash
npm install
cp .env.local.example .env.local
```

### Step 3: Configure API Key

Edit `.env.local` and add your OpenAI API key:

```bash
OPENAI_API_KEY=sk-your-actual-key-here
```

### Step 4: Launch

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## First Steps

### Choose an Agent

Click the agent selector and pick one:

- **👨‍🏫 TutorAgent** - Best for learning concepts
- **💻 CoderAgent** - Best for building projects
- **🎓 CurriculumDirector** - Best for planning your path

### Try a Quick Prompt

Click one of the quick start options:

1. **"Build a receipt scanner micro-SaaS"** - Build something sellable
2. **"Teach me Next.js fundamentals"** - Learn concepts
3. **"Create a 30-day learning plan"** - Structured approach

### Add Context (Optional)

Click "Add Context" to provide:
- Your skill level
- Project requirements
- Time constraints
- Learning goals

## Common Commands

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Setup offline mode
npm run offline

# Setup hybrid mode
npm run hybrid

# Run setup script
npm run setup
```

## Keyboard Shortcuts

- **Enter** - Send message
- **Shift + Enter** - New line in message
- **Esc** - Clear input

## Quick Tips

### 1. Switch Agents Strategically
- Planning → CurriculumDirector
- Design → ArchitectAgent
- Coding → CoderAgent
- Review → ReviewerAgent
- Launch → MarketerAgent
- Learning → TutorAgent

### 2. Use Context
Add context for better responses:
- "I'm a beginner with JavaScript"
- "I have 2 hours to build this"
- "Target audience is small businesses"

### 3. Ask Follow-ups
Build on previous responses:
- "Explain that in more detail"
- "Show me the code for that"
- "What are the trade-offs?"

### 4. Request Specific Formats
- "Give me a step-by-step plan"
- "Show me code with comments"
- "Create a checklist"

## Example Workflows

### Build a Micro-SaaS

1. **Plan** (CurriculumDirector)
   ```
   "Create a 3-day plan to build and launch a URL shortener"
   ```

2. **Design** (ArchitectAgent)
   ```
   "Design architecture for URL shortener with 10k users"
   ```

3. **Code** (CoderAgent)
   ```
   "Build the URL shortener MVP with Next.js"
   ```

4. **Review** (ReviewerAgent)
   ```
   "Review the URL shortener code for security"
   ```

5. **Launch** (MarketerAgent)
   ```
   "Create launch strategy for URL shortener"
   ```

### Learn a Concept

1. **Get Overview** (TutorAgent)
   ```
   "Teach me React hooks basics"
   ```

2. **Practice** (CoderAgent)
   ```
   "Show me 3 examples of useState"
   ```

3. **Build** (CoderAgent)
   ```
   "Build a todo app using React hooks"
   ```

4. **Review** (TutorAgent)
   ```
   "Explain why this code uses useEffect"
   ```

## Troubleshooting

### Port Already in Use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill
# Or use different port
PORT=3001 npm run dev
```

### API Key Not Working
- Check for extra spaces
- Ensure it starts with `sk-`
- Verify it's in `.env.local`, not `.env.local.example`
- Restart the dev server

### Cannot Connect from iPad
- Ensure same Wi-Fi network
- Check firewall settings
- Get your Mac IP: `ifconfig | grep "inet "`
- Try: `http://YOUR_MAC_IP:3000`

### Slow Responses
- Check internet connection
- Try a different agent
- Use shorter messages
- Consider offline mode

## Advanced Setup

### Offline Mode

1. Install Ollama:
   ```bash
   curl -fsSL https://ollama.com/install.sh | sh
   ```

2. Pull models:
   ```bash
   ollama pull codellama:34b
   ollama pull mistral:latest
   ```

3. Configure:
   ```bash
   npm run offline
   ```

### Hybrid Mode

Best of both worlds - online speed + offline privacy:

```bash
npm run hybrid
```

### Deploy to Vercel

```bash
npm install -g vercel
vercel login
vercel
```

Follow prompts, then access at: `https://your-app.vercel.app`

## Next Steps

✅ **Completed setup?** See [START_HERE.md](START_HERE.md) for your first project

✅ **Want to understand more?** Check [README.md](README.md) for full documentation

✅ **Ready to compare?** See [COMPARISON.md](COMPARISON.md) vs other solutions

## Resources

- **OpenAI API Keys**: https://platform.openai.com/api-keys
- **Ollama**: https://ollama.com
- **Next.js Docs**: https://nextjs.org/docs
- **Vercel Deploy**: https://vercel.com

---

Need help? Open an issue or check the documentation!
