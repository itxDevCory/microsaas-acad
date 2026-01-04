#!/usr/bin/env node

/**
 * Setup Script
 * Initializes the MicroSaaS Academy environment
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('🚀 MicroSaaS Academy Setup');
console.log('===========================\n');

// Check for .env.local
const envPath = path.join(__dirname, '..', '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('⚠️  No .env.local found, creating from template...');
  const templatePath = path.join(__dirname, '..', '.env.local.example');
  if (fs.existsSync(templatePath)) {
    fs.copyFileSync(templatePath, envPath);
    console.log('✅ Created .env.local');
    console.log('   Please add your OpenAI API key to .env.local\n');
  } else {
    console.log('❌ Template .env.local.example not found\n');
  }
} else {
  console.log('✅ .env.local exists\n');
}

// Check Node version
const nodeVersion = process.version;
console.log(`✅ Node.js version: ${nodeVersion}`);

// Check if dependencies are installed
const nodeModulesPath = path.join(__dirname, '..', 'node_modules');
if (!fs.existsSync(nodeModulesPath)) {
  console.log('📦 Installing dependencies...');
  try {
    execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, '..') });
    console.log('✅ Dependencies installed\n');
  } catch (error) {
    console.error('❌ Failed to install dependencies\n');
    process.exit(1);
  }
} else {
  console.log('✅ Dependencies already installed\n');
}

console.log('===========================');
console.log('✅ Setup complete!\n');
console.log('Next steps:');
console.log('1. Add your OpenAI API key to .env.local');
console.log('2. Run: npm run dev');
console.log('3. Open: http://localhost:3000\n');
