import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { getSystemPrompt } from '@/lib/prompts';
import { z } from 'zod';

// Initialize OpenAI client lazily to avoid build-time errors
let openai: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openai) {
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    openai = new OpenAI({ apiKey });
  }
  return openai;
}

// Request validation schema
const ChatRequestSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  agent: z.enum(['tutor', 'coder', 'architect', 'marketer', 'reviewer', 'curriculum']).default('tutor'),
  context: z.string().optional(),
  conversationHistory: z.array(z.object({
    role: z.enum(['user', 'assistant']),
    content: z.string(),
  })).optional(),
  mode: z.enum(['online', 'offline', 'hybrid']).default('online'),
  model: z.string().optional(),
});

type ChatRequest = z.infer<typeof ChatRequestSchema>;

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request
    const body = await req.json();
    const validatedData = ChatRequestSchema.parse(body);
    
    const { message, agent, context, conversationHistory = [], mode, model } = validatedData;

    // Check if we should use offline mode
    if (mode === 'offline') {
      return handleOfflineMode(validatedData);
    }

    // Get the appropriate system prompt for the selected agent
    const systemPrompt = getSystemPrompt(agent);

    // Build conversation messages
    const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [
      {
        role: 'system',
        content: systemPrompt,
      },
    ];

    // Add context if provided
    if (context) {
      messages.push({
        role: 'system',
        content: `Additional Context:\n${context}`,
      });
    }

    // Add conversation history
    conversationHistory.forEach((msg) => {
      messages.push({
        role: msg.role,
        content: msg.content,
      });
    });

    // Add current message
    messages.push({
      role: 'user',
      content: message,
    });

    // Select model based on agent and configuration
    const selectedModel = model || getModelForAgent(agent);

    // Call OpenAI API
    const client = getOpenAIClient();
    const completion = await client.chat.completions.create({
      model: selectedModel,
      messages,
      temperature: getTemperatureForAgent(agent),
      max_tokens: 4000,
      stream: false,
    });

    const responseContent = completion.choices[0]?.message?.content || 'No response generated';

    // Return response
    return NextResponse.json({
      success: true,
      response: responseContent,
      agent,
      model: selectedModel,
      usage: completion.usage,
    });

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', JSON.stringify(error.errors));
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Chat API Error:', error instanceof Error ? error.message : String(error));

    if (error instanceof OpenAI.APIError) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: error.status || 500 }
      );
    }

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Handle offline mode using Ollama
async function handleOfflineMode(data: ChatRequest) {
  try {
    // Import Ollama dynamically
    const { Ollama } = await import('ollama');
    const ollama = new Ollama({ host: 'http://localhost:11434' });

    const systemPrompt = getSystemPrompt(data.agent);
    
    // Build prompt for Ollama
    let prompt = `${systemPrompt}\n\n`;
    
    if (data.context) {
      prompt += `Context: ${data.context}\n\n`;
    }
    
    // Add conversation history
    data.conversationHistory?.forEach((msg) => {
      prompt += `${msg.role === 'user' ? 'User' : 'Assistant'}: ${msg.content}\n\n`;
    });
    
    prompt += `User: ${data.message}\n\nAssistant:`;

    // Call Ollama
    const response = await ollama.generate({
      model: 'codellama:34b',
      prompt,
      stream: false,
    });

    return NextResponse.json({
      success: true,
      response: response.response,
      agent: data.agent,
      model: 'codellama:34b',
      mode: 'offline',
    });

  } catch (error) {
    console.error('Offline mode error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: 'Offline mode unavailable. Please ensure Ollama is running.',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 503 }
    );
  }
}

// Get optimal model for each agent
function getModelForAgent(agent: string): string {
  const modelMap: Record<string, string> = {
    tutor: 'gpt-4-turbo-preview',
    coder: 'gpt-4-turbo-preview',
    architect: 'gpt-4-turbo-preview',
    marketer: 'gpt-4-turbo-preview',
    reviewer: 'gpt-4-turbo-preview',
    curriculum: 'gpt-4-turbo-preview',
  };

  return modelMap[agent] || 'gpt-4-turbo-preview';
}

// Get optimal temperature for each agent
function getTemperatureForAgent(agent: string): number {
  const temperatureMap: Record<string, number> = {
    tutor: 0.7,      // Balanced - educational but creative
    coder: 0.3,      // Low - precise and consistent code
    architect: 0.5,  // Medium-low - structured but flexible
    marketer: 0.8,   // Higher - creative copy
    reviewer: 0.3,   // Low - objective and consistent
    curriculum: 0.6, // Medium - structured but adaptive
  };

  return temperatureMap[agent] || 0.7;
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    agents: ['tutor', 'coder', 'architect', 'marketer', 'reviewer', 'curriculum'],
    modes: ['online', 'offline', 'hybrid'],
  });
}
