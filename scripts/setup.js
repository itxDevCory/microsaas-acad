#!/usr/bin/env node

/**
 * MicroSaaS Academy AI - Setup Script
 * Automated setup for first-time installation
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 MicroSaaS Academy AI - Setup\n');

// Check Node.js version
const nodeVersion = process.versions.node;
const majorVersion = parseInt(nodeVersion.split('.')[0]);

if (majorVersion < 18) {
  console.error('❌ Error: Node.js 18 or higher is required');
  console.error(`   Current version: ${nodeVersion}`);
  process.exit(1);
}

console.log('✅ Node.js version check passed');

// Create .env.local if it doesn't exist
const envPath = path.join(__dirname, '..', '.env.local');
const envExamplePath = path.join(__dirname, '..', '.env.example');

if (!fs.existsSync(envPath)) {
  console.log('\n📝 Creating .env.local file...');
  fs.copyFileSync(envExamplePath, envPath);
  console.log('✅ .env.local created');
  console.log('⚠️  Please add your API keys to .env.local before running the app');
} else {
  console.log('✅ .env.local already exists');
}

// Create data directory
const dataDir = path.join(__dirname, '..', 'data');
if (!fs.existsSync(dataDir)) {
  console.log('\n📁 Creating data directory...');
  fs.mkdirSync(dataDir, { recursive: true });
  console.log('✅ Data directory created');
}

// Create projects directory
const projectsDir = path.join(__dirname, '..', 'projects');
if (!fs.existsSync(projectsDir)) {
  console.log('\n📁 Creating projects directory...');
  fs.mkdirSync(projectsDir, { recursive: true });
  console.log('✅ Projects directory created');
}

// Check for Ollama (optional, for offline mode)
console.log('\n🔍 Checking for Ollama (offline mode)...');
try {
  execSync('ollama --version', { stdio: 'ignore' });
  console.log('✅ Ollama is installed');
  
  // Check if models are pulled
  try {
    const models = execSync('ollama list', { encoding: 'utf-8' });
    if (models.includes('codellama')) {
      console.log('✅ CodeLlama model is available');
    } else {
      console.log('⚠️  CodeLlama model not found');
      console.log('   Run: ollama pull codellama:34b');
    }
  } catch (e) {
    console.log('⚠️  Could not check Ollama models');
  }
} catch (e) {
  console.log('⚠️  Ollama not installed (offline mode will not work)');
  console.log('   Install from: https://ollama.com');
}

// Summary
console.log('\n' + '='.repeat(50));
console.log('✨ Setup Complete!\n');
console.log('Next steps:');
console.log('1. Add your OpenAI API key to .env.local');
console.log('2. Run: npm install');
console.log('3. Run: npm run dev');
console.log('4. Open: http://localhost:3000\n');
console.log('For iPad access:');
console.log('- Find your Mac IP: ifconfig | grep "inet "');
console.log('- Open on iPad: http://YOUR_MAC_IP:3000');
console.log('='.repeat(50) + '\n');
