# MicroSaaS Academy AI

> Learn, Build, Earn - Your AI-Powered Software Engineering Mentor

An advanced AI learning and development system that teaches software engineering while helping you build and launch profitable micro-SaaS products.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Next.js](https://img.shields.io/badge/Next.js-14-black)

## 🚀 Quick Start

**3 minutes to get started:**

```bash
cd microsaas-academy
bash INSTALL.sh
```

Add your OpenAI API key to `.env.local`, then:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and start building!

**For detailed instructions, see [START_HERE.md](START_HERE.md)**

## ✨ Features

### 🎓 Multiple Specialized AI Agents

- **TutorAgent** - Master-level software engineering instruction
- **CoderAgent** - Production-ready code generation
- **ArchitectAgent** - System design and architecture
- **ReviewerAgent** - Code review and optimization
- **MarketerAgent** - Go-to-market strategy and launch planning
- **CurriculumDirector** - Personalized learning paths

### 💡 Advanced Learning System

- **Adaptive Curriculum** - Learns your pace and adjusts difficulty
- **Hands-On Projects** - Build real, sellable products
- **Progressive Complexity** - From basics to advanced topics
- **Contextual Learning** - Explanations when you need them

### 🏗️ Production-Ready Development

- **Complete Code** - Not snippets, but full applications
- **Best Practices** - Industry-standard patterns and architecture
- **Testing Included** - Unit and integration tests
- **Deployment Ready** - Easy cloud deployment

### 🌍 Flexible Deployment

- **Online Mode** - Fast responses using OpenAI GPT-4
- **Offline Mode** - Complete privacy with local Ollama models
- **Hybrid Mode** - Best of both worlds
- **Cross-Platform** - Mac, iPad, Windows, Linux

## 📦 What's Included

```
microsaas-academy/
├── app/                    # Next.js application
│   ├── api/chat/          # Chat API endpoints
│   ├── page.tsx           # Main UI
│   └── layout.tsx         # App layout
├── scripts/               # Utility scripts
│   ├── setup.js          # Setup automation
│   ├── offline-mode.js   # Offline configuration
│   └── hybrid-mode.js    # Hybrid mode setup
├── INSTALL.sh            # Installation script
├── START_HERE.md         # Getting started guide
├── QUICKSTART.md         # Quick reference
├── COMPARISON.md         # vs other solutions
└── config.yaml           # Configuration
```

## 🎯 Use Cases

### For Beginners
- Learn software engineering from scratch
- Understand concepts deeply with master-level instruction
- Build confidence with guided projects

### For Career Changers
- Structured 30-day curriculum
- Portfolio-ready projects
- Interview preparation

### For Entrepreneurs
- Rapid micro-SaaS development
- Launch strategy included
- Monetization guidance

### For Experienced Developers
- Explore new technologies quickly
- Architecture review and optimization
- Code quality improvement

## 🔧 System Requirements

- **Node.js** 18+ 
- **npm** or **yarn**
- **OpenAI API key** (for online mode)
- **Ollama** (optional, for offline mode)

## 📱 iPad/Mobile Access

### Same Network
```bash
# Your Mac IP will be shown during installation
# On iPad: http://YOUR_MAC_IP:3000
```

### Deploy to Cloud
```bash
vercel deploy
# Access from anywhere: https://your-app.vercel.app
```

## 🎓 Learning Paths

### Path 1: Fast Track (1-2 weeks)
Build 3 micro-SaaS products while learning on the go

### Path 2: Structured (4 weeks)
Complete curriculum with progressive complexity

### Path 3: Hybrid (2-3 weeks)
Mix of structured learning and hands-on building

## 🛠️ Configuration

### Environment Variables

Create `.env.local` from `.env.local.example`:

```bash
OPENAI_API_KEY=sk-your-key-here
OLLAMA_URL=http://localhost:11434
DEFAULT_MODE=online
DEFAULT_AGENT=tutor
```

### Modes

**Online Mode** (Default)
- Uses OpenAI GPT-4
- Fast responses
- Internet required

**Offline Mode**
- Uses local Ollama models
- Complete privacy
- No internet required
- Setup: `npm run offline`

**Hybrid Mode**
- Combines both
- Smart fallback
- Setup: `npm run hybrid`

## 📚 Documentation

- **[START_HERE.md](START_HERE.md)** - First-time setup and usage
- **[QUICKSTART.md](QUICKSTART.md)** - Quick reference guide
- **[COMPARISON.md](COMPARISON.md)** - vs ChatGPT and other solutions

## 🤝 Contributing

Contributions welcome! This is a growing project with room for:

- New AI agents
- Additional learning modules
- UI improvements
- Documentation enhancements

## 📄 License

MIT License - feel free to use for personal or commercial projects

## 🙏 Acknowledgments

Built with:
- Next.js 14
- OpenAI GPT-4
- Ollama
- React
- Tailwind CSS

## 📞 Support

- **Issues**: Open an issue on GitHub
- **Discussions**: Use GitHub Discussions
- **Documentation**: Check START_HERE.md and QUICKSTART.md

## 🗺️ Roadmap

- [ ] Additional AI agents (DebugAgent, TestAgent)
- [ ] Progress tracking and analytics
- [ ] Collaborative features
- [ ] More learning modules
- [ ] Video tutorials
- [ ] Mobile app

---

**Ready to start?** Check out [START_HERE.md](START_HERE.md) for your first 5 minutes! 🚀
