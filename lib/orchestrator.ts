/**
 * Smart Orchestrator - Manages multi-agent workflows and collaboration
 */

import { analyzeIntent, IntentAnalysis, Agent, WorkflowStep } from './intent-detector';
import { getSystemPrompt } from './prompts';

export interface OrchestratorConfig {
  mode: 'online' | 'offline' | 'hybrid';
  maxAgents?: number;
  parallelExecution?: boolean;
  streamUpdates?: boolean;
}

export interface WorkflowProgress {
  currentStep: number;
  totalSteps: number;
  currentAgent: Agent;
  status: 'pending' | 'running' | 'completed' | 'error';
  message: string;
  results: AgentResult[];
}

export interface AgentResult {
  agent: Agent;
  action: string;
  response: string;
  duration: number;
  timestamp: Date;
}

export interface OrchestratorResponse {
  success: boolean;
  analysis: IntentAnalysis;
  workflow: WorkflowProgress;
  finalResponse: string;
  metadata: {
    totalDuration: number;
    agentsUsed: Agent[];
    tokensUsed?: number;
  };
}

/**
 * Main orchestrator class
 */
export class Orchestrator {
  private config: OrchestratorConfig;
  private onProgress?: (progress: WorkflowProgress) => void;

  constructor(config: OrchestratorConfig, onProgress?: (progress: WorkflowProgress) => void) {
    this.config = config;
    this.onProgress = onProgress;
  }

  /**
   * Execute a user request with automatic agent orchestration
   */
  async execute(
    message: string,
    context?: string,
    conversationHistory?: Array<{ role: string; content: string }>
  ): Promise<OrchestratorResponse> {
    const startTime = Date.now();

    try {
      // Step 1: Analyze intent
      const analysis = analyzeIntent(message, context);

      // Step 2: Initialize workflow
      const workflow: WorkflowProgress = {
        currentStep: 0,
        totalSteps: analysis.workflow.length,
        currentAgent: analysis.workflow[0].agent,
        status: 'pending',
        message: 'Analyzing your request...',
        results: [],
      };

      this.updateProgress(workflow);

      // Step 3: Execute workflow
      const results = await this.executeWorkflow(
        analysis.workflow,
        message,
        context,
        conversationHistory,
        workflow
      );

      // Step 4: Synthesize final response
      const finalResponse = this.synthesizeResponse(results, analysis);

      // Step 5: Mark as completed
      workflow.status = 'completed';
      workflow.message = 'All agents completed successfully!';
      this.updateProgress(workflow);

      const totalDuration = Date.now() - startTime;

      return {
        success: true,
        analysis,
        workflow,
        finalResponse,
        metadata: {
          totalDuration,
          agentsUsed: analysis.agents,
          tokensUsed: results.reduce((sum, r) => sum + (r.response.length / 4), 0), // Rough estimate
        },
      };
    } catch (error) {
      console.error('Orchestrator error:', error);
      throw error;
    }
  }

  /**
   * Execute the workflow steps
   */
  private async executeWorkflow(
    steps: WorkflowStep[],
    message: string,
    context?: string,
    conversationHistory?: Array<{ role: string; content: string }>,
    workflow?: WorkflowProgress
  ): Promise<AgentResult[]> {
    const results: AgentResult[] = [];

    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const stepStartTime = Date.now();

      // Update progress
      if (workflow) {
        workflow.currentStep = i;
        workflow.currentAgent = step.agent;
        workflow.status = 'running';
        workflow.message = `${this.getAgentEmoji(step.agent)} ${step.action}...`;
        this.updateProgress(workflow);
      }

      // Build context from previous results
      const enrichedContext = this.buildEnrichedContext(
        context,
        results,
        step.dependencies
      );

      // Execute agent
      const response = await this.executeAgent(
        step.agent,
        message,
        enrichedContext,
        conversationHistory
      );

      // Store result
      const result: AgentResult = {
        agent: step.agent,
        action: step.action,
        response,
        duration: Date.now() - stepStartTime,
        timestamp: new Date(),
      };

      results.push(result);

      // Update workflow with result
      if (workflow) {
        workflow.results = results;
      }
    }

    return results;
  }

  /**
   * Execute a single agent
   */
  private async executeAgent(
    agent: Agent,
    message: string,
    context?: string,
    conversationHistory?: Array<{ role: string; content: string }>
  ): Promise<string> {
    try {
      // Call the chat API with the specific agent
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message,
          agent,
          context,
          conversationHistory,
          mode: this.config.mode,
        }),
      });

      const data = await response.json();

      if (!data.success) {
        throw new Error(data.error || 'Agent execution failed');
      }

      return data.response;
    } catch (error) {
      console.error(`Error executing ${agent}:`, error);
      throw new Error(`Failed to execute ${agent}: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Build enriched context from previous agent results
   */
  private buildEnrichedContext(
    baseContext: string | undefined,
    results: AgentResult[],
    dependencies?: number[]
  ): string {
    let enrichedContext = baseContext || '';

    if (dependencies && dependencies.length > 0) {
      enrichedContext += '\n\n--- Previous Agent Results ---\n';

      dependencies.forEach((depIndex) => {
        const result = results[depIndex];
        if (result) {
          enrichedContext += `\n${this.getAgentEmoji(result.agent)} ${result.agent.toUpperCase()} (${result.action}):\n`;
          enrichedContext += `${result.response}\n`;
        }
      });

      enrichedContext += '\n--- End of Previous Results ---\n';
    }

    return enrichedContext;
  }

  /**
   * Synthesize final response from all agent results
   */
  private synthesizeResponse(results: AgentResult[], analysis: IntentAnalysis): string {
    if (results.length === 0) {
      return 'No results generated.';
    }

    // For single agent, return direct response
    if (results.length === 1) {
      return results[0].response;
    }

    // For multiple agents, create a comprehensive response
    let finalResponse = `# ${this.getIntentTitle(analysis.intent)}\n\n`;
    finalResponse += `I've completed your request using ${results.length} specialized agents. Here's what we accomplished:\n\n`;

    results.forEach((result, index) => {
      finalResponse += `## ${index + 1}. ${this.getAgentEmoji(result.agent)} ${result.agent.charAt(0).toUpperCase() + result.agent.slice(1)} - ${result.action}\n\n`;
      finalResponse += `${result.response}\n\n`;
      finalResponse += `---\n\n`;
    });

    // Add summary
    finalResponse += `## Summary\n\n`;
    finalResponse += `✅ All ${results.length} agents completed successfully in ${this.formatDuration(results.reduce((sum, r) => sum + r.duration, 0))}\n\n`;

    // Add next steps based on intent
    const nextSteps = this.getNextSteps(analysis.intent);
    if (nextSteps) {
      finalResponse += `## Next Steps\n\n${nextSteps}\n`;
    }

    return finalResponse;
  }

  /**
   * Get intent title
   */
  private getIntentTitle(intent: string): string {
    const titles: Record<string, string> = {
      learn: '🎓 Learning Path',
      build: '🚀 Project Build',
      market: '📈 Marketing Strategy',
      review: '🔍 Code Review',
      plan: '🏗️ Architecture Plan',
      general: '💬 General Assistance',
    };
    return titles[intent] || 'Response';
  }

  /**
   * Get agent emoji
   */
  private getAgentEmoji(agent: Agent): string {
    const emojis: Record<Agent, string> = {
      tutor: '👨‍🏫',
      coder: '💻',
      architect: '🏗️',
      marketer: '📈',
      reviewer: '🔍',
      curriculum: '🎓',
    };
    return emojis[agent];
  }

  /**
   * Get next steps based on intent
   */
  private getNextSteps(intent: string): string | null {
    const nextSteps: Record<string, string> = {
      learn: '1. Practice the concepts with hands-on exercises\n2. Build a small project to apply what you learned\n3. Ask questions if anything is unclear',
      build: '1. Review the generated code and architecture\n2. Test the implementation locally\n3. Deploy to production\n4. Consider adding marketing materials',
      market: '1. Implement the marketing strategy\n2. Create the landing page\n3. Set up analytics tracking\n4. Launch and iterate based on feedback',
      review: '1. Implement the suggested improvements\n2. Run tests to verify changes\n3. Deploy the optimized version',
      plan: '1. Review the architecture design\n2. Break down into implementation tasks\n3. Start building incrementally',
    };
    return nextSteps[intent] || null;
  }

  /**
   * Format duration in human-readable format
   */
  private formatDuration(ms: number): string {
    const seconds = Math.floor(ms / 1000);
    if (seconds < 60) return `${seconds}s`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}m ${remainingSeconds}s`;
  }

  /**
   * Update progress callback
   */
  private updateProgress(progress: WorkflowProgress): void {
    if (this.onProgress) {
      this.onProgress({ ...progress });
    }
  }
}

/**
 * Helper function to create an orchestrator instance
 */
export function createOrchestrator(
  config: OrchestratorConfig,
  onProgress?: (progress: WorkflowProgress) => void
): Orchestrator {
  return new Orchestrator(config, onProgress);
}

/**
 * Quick execute function for simple use cases
 */
export async function orchestrate(
  message: string,
  options?: {
    context?: string;
    mode?: 'online' | 'offline' | 'hybrid';
    onProgress?: (progress: WorkflowProgress) => void;
  }
): Promise<OrchestratorResponse> {
  const orchestrator = createOrchestrator(
    {
      mode: options?.mode || 'online',
      maxAgents: 5,
      parallelExecution: false,
      streamUpdates: true,
    },
    options?.onProgress
  );

  return orchestrator.execute(message, options?.context);
}
