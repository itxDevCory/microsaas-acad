#!/bin/bash

# MicroSaaS Academy AI - One-Command Installation Script
# Run: bash INSTALL.sh

set -e

echo "🚀 MicroSaaS Academy AI - Installation"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js 18+ from: https://nodejs.org"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo -e "${RED}❌ Node.js 18 or higher is required${NC}"
    echo "Current version: $(node -v)"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node -v) detected${NC}"

# Install dependencies
echo ""
echo "📦 Installing dependencies..."
npm install

# Run setup script
echo ""
echo "⚙️  Running setup..."
npm run setup

# Check for OpenAI API key
if [ ! -f .env.local ]; then
    echo ""
    echo -e "${YELLOW}⚠️  .env.local not found${NC}"
    cp .env.example .env.local
    echo "Created .env.local from template"
fi

if ! grep -q "sk-" .env.local 2>/dev/null; then
    echo ""
    echo -e "${YELLOW}⚠️  OpenAI API key not configured${NC}"
    echo ""
    echo "Please add your OpenAI API key to .env.local:"
    echo "1. Get your API key from: https://platform.openai.com/api-keys"
    echo "2. Open .env.local in a text editor"
    echo "3. Replace 'sk-your-key-here' with your actual key"
    echo ""
    read -p "Press Enter after adding your API key..."
fi

# Get Mac IP for iPad access
echo ""
echo "📱 iPad Access Information:"
echo "======================================"
MAC_IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
if [ ! -z "$MAC_IP" ]; then
    echo -e "${GREEN}Your Mac IP: $MAC_IP${NC}"
    echo "On your iPad, open: http://$MAC_IP:3000"
else
    echo "Could not detect IP address"
    echo "Run: ifconfig | grep 'inet ' to find your IP"
fi

# Check for Ollama (optional)
echo ""
echo "🤖 Checking for Ollama (offline mode)..."
if command -v ollama &> /dev/null; then
    echo -e "${GREEN}✅ Ollama is installed${NC}"
    
    # Check for models
    if ollama list | grep -q "codellama"; then
        echo -e "${GREEN}✅ CodeLlama model available${NC}"
    else
        echo -e "${YELLOW}⚠️  CodeLlama model not found${NC}"
        echo "To enable offline mode, run:"
        echo "  ollama pull codellama:34b"
    fi
else
    echo -e "${YELLOW}⚠️  Ollama not installed (offline mode unavailable)${NC}"
    echo "Install from: https://ollama.com"
fi

# Final instructions
echo ""
echo "======================================"
echo -e "${GREEN}✨ Installation Complete!${NC}"
echo "======================================"
echo ""
echo "🎯 Next Steps:"
echo ""
echo "1. Start the development server:"
echo "   ${GREEN}npm run dev${NC}"
echo ""
echo "2. Open in your browser:"
echo "   ${GREEN}http://localhost:3000${NC}"
echo ""
echo "3. Access from iPad (same Wi-Fi):"
if [ ! -z "$MAC_IP" ]; then
    echo "   ${GREEN}http://$MAC_IP:3000${NC}"
else
    echo "   ${GREEN}http://YOUR_MAC_IP:3000${NC}"
fi
echo ""
echo "📚 Documentation:"
echo "   - Quick Start: QUICKSTART.md"
echo "   - Full Guide: README.md"
echo "   - Configuration: config.yaml"
echo ""
echo "🚀 Ready to build your first micro-SaaS!"
echo ""
