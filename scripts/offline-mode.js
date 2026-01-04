#!/usr/bin/env node

/**
 * Offline Mode Script
 * Configures the application to run in offline mode using Ollama
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('💾 MicroSaaS Academy - Offline Mode');
console.log('====================================\n');

// Check if Ollama is installed
try {
  execSync('ollama --version', { stdio: 'pipe' });
  console.log('✅ Ollama is installed\n');
} catch (error) {
  console.log('❌ Ollama is not installed');
  console.log('   Install from: https://ollama.com\n');
  process.exit(1);
}

// Check if required models are available
console.log('Checking for required models...');
try {
  const models = execSync('ollama list', { encoding: 'utf-8' });
  
  const hasCodeLlama = models.includes('codellama');
  const hasMistral = models.includes('mistral');
  
  if (hasCodeLlama) {
    console.log('✅ codellama found');
  } else {
    console.log('⚠️  codellama not found');
    console.log('   Run: ollama pull codellama:34b');
  }
  
  if (hasMistral) {
    console.log('✅ mistral found');
  } else {
    console.log('⚠️  mistral not found');
    console.log('   Run: ollama pull mistral:latest');
  }
  
  if (!hasCodeLlama && !hasMistral) {
    console.log('\n❌ No models found. Please pull at least one model.\n');
    process.exit(1);
  }
} catch (error) {
  console.error('❌ Failed to check Ollama models\n');
  process.exit(1);
}

// Update .env.local to use offline mode
const envPath = path.join(__dirname, '..', '.env.local');
let envContent = '';

if (fs.existsSync(envPath)) {
  envContent = fs.readFileSync(envPath, 'utf-8');
  
  // Update or add DEFAULT_MODE
  if (envContent.includes('DEFAULT_MODE=')) {
    envContent = envContent.replace(/DEFAULT_MODE=.*/, 'DEFAULT_MODE=offline');
  } else {
    envContent += '\nDEFAULT_MODE=offline';
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('\n✅ Updated .env.local to use offline mode');
} else {
  console.log('\n⚠️  .env.local not found');
  console.log('   Run: npm run setup\n');
}

console.log('\n====================================');
console.log('✅ Offline mode configured!\n');
console.log('Run: npm run dev');
console.log('The app will use local Ollama models\n');
