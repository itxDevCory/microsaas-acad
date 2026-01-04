#!/bin/bash

echo "🚀 MicroSaaS Academy - Installation Script"
echo "=========================================="
echo ""

# Check for Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js found: $(node --version)"
echo "✅ npm found: $(npm --version)"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
npm install

if [ $? -ne 0 ]; then
    echo "❌ Failed to install dependencies"
    exit 1
fi

echo ""
echo "✅ Dependencies installed successfully"
echo ""

# Create .env.local if it doesn't exist
if [ ! -f .env.local ]; then
    echo "📝 Creating .env.local from template..."
    cp .env.local.example .env.local
    echo "✅ Created .env.local"
    echo ""
    echo "⚠️  IMPORTANT: Add your OpenAI API key to .env.local"
    echo "   Get your key from: https://platform.openai.com/api-keys"
else
    echo "✅ .env.local already exists"
fi

echo ""

# Get Mac IP address for iPad access
if [[ "$OSTYPE" == "darwin"* ]]; then
    echo "📱 iPad Access Information"
    echo "-------------------------"
    IP=$(ifconfig | grep "inet " | grep -v 127.0.0.1 | awk '{print $2}' | head -n 1)
    if [ ! -z "$IP" ]; then
        echo "Your Mac IP address: $IP"
        echo "On your iPad, open Safari and go to: http://$IP:3000"
    fi
    echo ""
fi

# Check for Ollama (optional)
if command -v ollama &> /dev/null; then
    echo "✅ Ollama found - offline mode available"
    echo "   Run: ollama pull codellama:34b"
    echo "   Run: ollama pull mistral:latest"
else
    echo "ℹ️  Ollama not found - offline mode unavailable"
    echo "   Install from: https://ollama.com"
fi

echo ""
echo "=========================================="
echo "✅ Installation Complete!"
echo "=========================================="
echo ""
echo "Next steps:"
echo "1. Add your OpenAI API key to .env.local"
echo "2. Run: npm run dev"
echo "3. Open: http://localhost:3000"
echo ""
echo "For more information, see START_HERE.md"
echo ""
