#!/bin/bash

# Vercel Environment Variables Setup Script
# This script helps you add required environment variables to Vercel

echo "🚀 Vercel Environment Variables Setup"
echo "======================================"
echo ""

# Check if vercel CLI is installed
if ! command -v vercel &> /dev/null; then
    echo "❌ Vercel CLI is not installed."
    echo "Install it with: npm i -g vercel"
    exit 1
fi

echo "✅ Vercel CLI is installed"
echo ""

# Check if user is logged in
if ! vercel whoami &> /dev/null; then
    echo "❌ You are not logged in to Vercel."
    echo "Run: vercel login"
    exit 1
fi

echo "✅ You are logged in to Vercel"
echo ""

# Check if project is linked
if [ ! -d ".vercel" ]; then
    echo "❌ Project is not linked to Vercel."
    echo "Run: vercel link"
    exit 1
fi

echo "✅ Project is linked to Vercel"
echo ""

# Function to add environment variable
add_env_var() {
    local var_name=$1
    local var_description=$2
    local is_required=$3
    
    echo "📝 Adding $var_name"
    echo "   Description: $var_description"
    
    if [ "$is_required" = "true" ]; then
        echo "   Status: REQUIRED ⚠️"
    else
        echo "   Status: Optional"
    fi
    
    read -p "   Do you want to add this variable? (y/n): " -n 1 -r
    echo ""
    
    if [[ $REPLY =~ ^[Yy]$ ]]; then
        vercel env add "$var_name"
        echo "   ✅ $var_name added successfully"
    else
        echo "   ⏭️  Skipped $var_name"
    fi
    echo ""
}

echo "Let's add your environment variables!"
echo ""
echo "Note: For each variable, you'll be prompted to:"
echo "  1. Enter the value"
echo "  2. Select environments (use spacebar to select, enter to confirm)"
echo "     Recommended: Select Production, Preview, and Development"
echo ""
read -p "Press Enter to continue..."
echo ""

# Required variables
echo "=== REQUIRED VARIABLES ==="
echo ""

add_env_var "OPENAI_API_KEY" "Your OpenAI API key for AI features" "true"

# Optional variables
echo "=== OPTIONAL VARIABLES ==="
echo ""
echo "The following variables are optional and depend on your app's features:"
echo ""

add_env_var "NEXTAUTH_SECRET" "Secret for NextAuth.js authentication (generate with: openssl rand -base64 32)" "false"
add_env_var "NEXTAUTH_URL" "Your app's URL (e.g., https://your-app.vercel.app)" "false"
add_env_var "DATABASE_URL" "Database connection string (if using a database)" "false"
add_env_var "STRIPE_SECRET_KEY" "Stripe secret key (if using payments)" "false"
add_env_var "STRIPE_PUBLISHABLE_KEY" "Stripe publishable key (if using payments)" "false"
add_env_var "STRIPE_WEBHOOK_SECRET" "Stripe webhook secret (if using payments)" "false"
add_env_var "RESEND_API_KEY" "Resend API key (if using email)" "false"
add_env_var "ANTHROPIC_API_KEY" "Anthropic API key (if using Claude)" "false"

echo ""
echo "=== SUMMARY ==="
echo ""
echo "Environment variables setup complete!"
echo ""
echo "To view all your environment variables:"
echo "  vercel env ls"
echo ""
echo "To pull them to your local .env.local file:"
echo "  vercel env pull .env.local"
echo ""
echo "To deploy to production:"
echo "  vercel --prod"
echo ""
echo "✅ You're ready to deploy!"
