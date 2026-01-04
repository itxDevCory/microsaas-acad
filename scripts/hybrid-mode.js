#!/usr/bin/env node

/**
 * Hybrid Mode Script
 * Configures the application to run in hybrid mode (online + offline)
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

console.log('⚡ MicroSaaS Academy - Hybrid Mode');
console.log('===================================\n');

// Check for OpenAI API key
const envPath = path.join(__dirname, '..', '.env.local');
let hasOpenAI = false;
let hasOllama = false;

if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf-8');
  // Check if API key is set and not the placeholder
  const apiKeyMatch = envContent.match(/OPENAI_API_KEY=(.+)/);
  hasOpenAI = apiKeyMatch && 
              apiKeyMatch[1].trim() !== '' && 
              apiKeyMatch[1].trim() !== 'sk-your-key-here' &&
              !apiKeyMatch[1].includes('your-key-here');
} else {
  console.log('⚠️  .env.local not found');
  console.log('   Run: npm run setup\n');
}

// Check if Ollama is installed
try {
  execSync('ollama --version', { stdio: 'pipe' });
  hasOllama = true;
} catch (error) {
  hasOllama = false;
}

console.log('Configuration check:');
console.log(hasOpenAI ? '✅ OpenAI API key configured' : '⚠️  OpenAI API key not configured');
console.log(hasOllama ? '✅ Ollama available' : '⚠️  Ollama not available');
console.log('');

if (!hasOpenAI && !hasOllama) {
  console.log('❌ Hybrid mode requires at least one:');
  console.log('   1. OpenAI API key in .env.local');
  console.log('   2. Ollama installed locally\n');
  process.exit(1);
}

// Update .env.local to use hybrid mode
if (fs.existsSync(envPath)) {
  let envContent = fs.readFileSync(envPath, 'utf-8');
  
  // Update or add DEFAULT_MODE
  if (envContent.includes('DEFAULT_MODE=')) {
    envContent = envContent.replace(/DEFAULT_MODE=.*/, 'DEFAULT_MODE=hybrid');
  } else {
    envContent += '\nDEFAULT_MODE=hybrid';
  }
  
  fs.writeFileSync(envPath, envContent);
  console.log('✅ Updated .env.local to use hybrid mode\n');
}

console.log('===================================');
console.log('✅ Hybrid mode configured!\n');
console.log('Run: npm run dev');
console.log('The app will use both online and offline models\n');

if (hasOpenAI && hasOllama) {
  console.log('Benefits:');
  console.log('• Fast responses using OpenAI');
  console.log('• Privacy with local Ollama');
  console.log('• Fallback if one fails\n');
}
