import { NextRequest, NextResponse } from 'next/server';
import { createOrchestrator } from '@/lib/orchestrator';
import { z } from 'zod';

// Request validation schema
const OrchestrateRequestSchema = z.object({
  message: z.string().min(1, 'Message is required'),
  context: z.string().optional(),
  mode: z.enum(['online', 'offline', 'hybrid']).default('online'),
});

export async function POST(req: NextRequest) {
  try {
    // Parse and validate request
    const body = await req.json();
    const validatedData = OrchestrateRequestSchema.parse(body);
    
    const { message, context, mode } = validatedData;

    // Create orchestrator
    const orchestrator = createOrchestrator({
      mode,
      maxAgents: 5,
      parallelExecution: false,
      streamUpdates: false,
    });

    // Execute workflow
    const result = await orchestrator.execute(message, context);

    // Return response
    return NextResponse.json(result);

  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Validation Error:', JSON.stringify(error.errors));
      return NextResponse.json(
        { success: false, error: 'Invalid request', details: error.errors },
        { status: 400 }
      );
    }

    console.error('Orchestrate API Error:', error instanceof Error ? error.message : String(error));

    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

// Health check endpoint
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'orchestrator',
    features: ['intent-detection', 'multi-agent-workflow', 'smart-routing'],
  });
}
