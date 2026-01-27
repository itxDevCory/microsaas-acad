/**
 * Intent Detector - Analyzes user input to determine intent and recommend agent workflow
 */

export type Intent = 'learn' | 'build' | 'market' | 'review' | 'plan' | 'general';
export type Agent = 'tutor' | 'coder' | 'architect' | 'marketer' | 'reviewer' | 'curriculum';
export type ComplexityLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface IntentAnalysis {
  intent: Intent;
  confidence: number;
  agents: Agent[];
  workflow: WorkflowStep[];
  complexity: ComplexityLevel;
  entities: {
    technologies: string[];
    projectType?: string;
    goals: string[];
    timeframe?: string;
  };
  suggestedPrompt?: string;
}

export interface WorkflowStep {
  agent: Agent;
  action: string;
  estimatedTime: string;
  dependencies?: number[]; // indices of previous steps
}

/**
 * Analyze user input and determine intent
 */
export function analyzeIntent(input: string, context?: string): IntentAnalysis {
  const lowerInput = input.toLowerCase();
  const fullText = context ? `${context} ${input}`.toLowerCase() : lowerInput;

  // Detect primary intent
  const intent = detectPrimaryIntent(lowerInput);
  
  // Extract entities
  const entities = extractEntities(fullText);
  
  // Determine complexity
  const complexity = determineComplexity(fullText, entities);
  
  // Build agent workflow
  const { agents, workflow } = buildWorkflow(intent, entities, complexity);
  
  // Calculate confidence
  const confidence = calculateConfidence(intent, entities, lowerInput);

  return {
    intent,
    confidence,
    agents,
    workflow,
    complexity,
    entities,
    suggestedPrompt: generateSuggestedPrompt(intent, entities),
  };
}

/**
 * Detect the primary intent from user input
 */
function detectPrimaryIntent(input: string): Intent {
  // Learning intent patterns
  const learnPatterns = [
    /\b(teach|learn|explain|understand|how (does|do|to)|what is|tutorial|guide|course)\b/i,
    /\b(beginner|new to|getting started|fundamentals|basics)\b/i,
  ];

  // Building intent patterns
  const buildPatterns = [
    /\b(build|create|make|develop|generate|code|implement|app|website|project)\b/i,
    /\b(want to build|need to create|help me make)\b/i,
  ];

  // Marketing intent patterns
  const marketPatterns = [
    /\b(market|sell|launch|monetize|pricing|customers|revenue|landing page|go-to-market)\b/i,
    /\b(make money|earn|profit|business model)\b/i,
  ];

  // Review intent patterns
  const reviewPatterns = [
    /\b(review|check|analyze|audit|improve|optimize|refactor|fix|debug)\b/i,
    /\b(what's wrong|issues|problems|better way)\b/i,
  ];

  // Planning intent patterns
  const planPatterns = [
    /\b(plan|roadmap|strategy|architecture|design|structure|organize)\b/i,
    /\b(how should i|best approach|recommend)\b/i,
  ];

  // Check patterns in order of specificity
  if (buildPatterns.some(pattern => pattern.test(input))) return 'build';
  if (marketPatterns.some(pattern => pattern.test(input))) return 'market';
  if (reviewPatterns.some(pattern => pattern.test(input))) return 'review';
  if (planPatterns.some(pattern => pattern.test(input))) return 'plan';
  if (learnPatterns.some(pattern => pattern.test(input))) return 'learn';

  return 'general';
}

/**
 * Extract entities from text
 */
function extractEntities(text: string): IntentAnalysis['entities'] {
  const technologies: string[] = [];
  const goals: string[] = [];
  let projectType: string | undefined;
  let timeframe: string | undefined;

  // Technology patterns
  const techPatterns = {
    'Next.js': /\b(next\.?js|nextjs)\b/i,
    'React': /\breact\b/i,
    'TypeScript': /\b(typescript|ts)\b/i,
    'Python': /\bpython\b/i,
    'Node.js': /\b(node\.?js|nodejs)\b/i,
    'AI/ML': /\b(ai|ml|machine learning|artificial intelligence|gpt|llm)\b/i,
    'Database': /\b(database|sql|postgres|mongodb|sqlite)\b/i,
    'API': /\bapi\b/i,
    'Mobile': /\b(mobile|ios|android|react native)\b/i,
    'Web': /\b(web|website|webapp)\b/i,
  };

  for (const [tech, pattern] of Object.entries(techPatterns)) {
    if (pattern.test(text)) {
      technologies.push(tech);
    }
  }

  // Project type patterns
  const projectPatterns = {
    'SaaS': /\b(saas|software as a service|subscription)\b/i,
    'E-commerce': /\b(e-commerce|ecommerce|shop|store|marketplace)\b/i,
    'Dashboard': /\b(dashboard|analytics|admin panel)\b/i,
    'Mobile App': /\b(mobile app|ios app|android app)\b/i,
    'Web App': /\b(web app|webapp|web application)\b/i,
    'API Service': /\b(api|service|backend|microservice)\b/i,
    'Landing Page': /\b(landing page|website|portfolio)\b/i,
    'Tool': /\b(tool|utility|helper|automation)\b/i,
  };

  for (const [type, pattern] of Object.entries(projectPatterns)) {
    if (pattern.test(text)) {
      projectType = type;
      break;
    }
  }

  // Goal patterns
  const goalPatterns = {
    'Make Money': /\b(make money|earn|revenue|profit|monetize)\b/i,
    'Learn': /\b(learn|understand|master|improve skills)\b/i,
    'Build Portfolio': /\b(portfolio|showcase|demonstrate)\b/i,
    'Solve Problem': /\b(solve|fix|address|handle)\b/i,
    'Scale': /\b(scale|grow|expand)\b/i,
  };

  for (const [goal, pattern] of Object.entries(goalPatterns)) {
    if (pattern.test(text)) {
      goals.push(goal);
    }
  }

  // Timeframe patterns
  const timeframePatterns = {
    'days': /\b(\d+)\s*(day|days)\b/i,
    'weeks': /\b(\d+)\s*(week|weeks)\b/i,
    'months': /\b(\d+)\s*(month|months)\b/i,
    'quick': /\b(quick|fast|asap|urgent|immediately)\b/i,
  };

  for (const [frame, pattern] of Object.entries(timeframePatterns)) {
    const match = text.match(pattern);
    if (match) {
      timeframe = match[0];
      break;
    }
  }

  return {
    technologies,
    projectType,
    goals,
    timeframe,
  };
}

/**
 * Determine complexity level
 */
function determineComplexity(
  text: string,
  entities: IntentAnalysis['entities']
): ComplexityLevel {
  let score = 0;

  // Check for beginner indicators
  if (/\b(beginner|new|first time|getting started|basics|simple)\b/i.test(text)) {
    score -= 2;
  }

  // Check for advanced indicators
  if (/\b(advanced|complex|enterprise|scalable|production|optimize)\b/i.test(text)) {
    score += 2;
  }

  // Technology count affects complexity
  score += entities.technologies.length * 0.5;

  // Multiple goals increase complexity
  score += entities.goals.length * 0.3;

  // Determine level
  if (score < 0) return 'beginner';
  if (score < 1.5) return 'intermediate';
  if (score < 3) return 'advanced';
  return 'expert';
}

/**
 * Build agent workflow based on intent and entities
 */
function buildWorkflow(
  intent: Intent,
  entities: IntentAnalysis['entities'],
  complexity: ComplexityLevel
): { agents: Agent[]; workflow: WorkflowStep[] } {
  const workflows: Record<Intent, { agents: Agent[]; workflow: WorkflowStep[] }> = {
    learn: {
      agents: ['tutor', 'curriculum'],
      workflow: [
        {
          agent: 'curriculum',
          action: 'Design personalized learning path',
          estimatedTime: '1-2 min',
        },
        {
          agent: 'tutor',
          action: 'Teach concepts with examples',
          estimatedTime: '2-3 min',
          dependencies: [0],
        },
      ],
    },
    build: {
      agents: ['architect', 'coder', 'reviewer'],
      workflow: [
        {
          agent: 'architect',
          action: 'Design system architecture',
          estimatedTime: '2-3 min',
        },
        {
          agent: 'coder',
          action: 'Generate production-ready code',
          estimatedTime: '3-5 min',
          dependencies: [0],
        },
        {
          agent: 'reviewer',
          action: 'Review and optimize code',
          estimatedTime: '1-2 min',
          dependencies: [1],
        },
      ],
    },
    market: {
      agents: ['marketer', 'coder'],
      workflow: [
        {
          agent: 'marketer',
          action: 'Create go-to-market strategy',
          estimatedTime: '2-3 min',
        },
        {
          agent: 'coder',
          action: 'Generate landing page and marketing materials',
          estimatedTime: '2-3 min',
          dependencies: [0],
        },
      ],
    },
    review: {
      agents: ['reviewer', 'architect'],
      workflow: [
        {
          agent: 'reviewer',
          action: 'Analyze and identify issues',
          estimatedTime: '2-3 min',
        },
        {
          agent: 'architect',
          action: 'Recommend improvements',
          estimatedTime: '1-2 min',
          dependencies: [0],
        },
      ],
    },
    plan: {
      agents: ['architect', 'curriculum'],
      workflow: [
        {
          agent: 'architect',
          action: 'Design system architecture',
          estimatedTime: '2-3 min',
        },
        {
          agent: 'curriculum',
          action: 'Create implementation roadmap',
          estimatedTime: '1-2 min',
          dependencies: [0],
        },
      ],
    },
    general: {
      agents: ['tutor'],
      workflow: [
        {
          agent: 'tutor',
          action: 'Provide guidance and answer questions',
          estimatedTime: '1-2 min',
        },
      ],
    },
  };

  // Get base workflow
  const baseWorkflow = workflows[intent];

  // Adjust for complexity
  if (complexity === 'expert' && intent === 'build') {
    // Add marketer for complete solution
    return {
      agents: [...baseWorkflow.agents, 'marketer'],
      workflow: [
        ...baseWorkflow.workflow,
        {
          agent: 'marketer',
          action: 'Create monetization strategy',
          estimatedTime: '2-3 min',
          dependencies: [2],
        },
      ],
    };
  }

  return baseWorkflow;
}

/**
 * Calculate confidence score
 */
function calculateConfidence(
  intent: Intent,
  entities: IntentAnalysis['entities'],
  input: string
): number {
  let confidence = 0.5; // Base confidence

  // Strong keywords increase confidence
  const strongKeywords = {
    learn: ['teach', 'learn', 'explain', 'tutorial'],
    build: ['build', 'create', 'develop', 'generate'],
    market: ['sell', 'launch', 'monetize', 'market'],
    review: ['review', 'check', 'analyze', 'improve'],
    plan: ['plan', 'design', 'architecture', 'strategy'],
  };

  const keywords = strongKeywords[intent as keyof typeof strongKeywords] || [];
  const matchCount = keywords.filter(kw => input.includes(kw)).length;
  confidence += matchCount * 0.15;

  // Entities increase confidence
  confidence += entities.technologies.length * 0.05;
  if (entities.projectType) confidence += 0.1;
  confidence += entities.goals.length * 0.05;

  // Cap at 0.95
  return Math.min(confidence, 0.95);
}

/**
 * Generate suggested prompt for better results
 */
function generateSuggestedPrompt(
  intent: Intent,
  entities: IntentAnalysis['entities']
): string | undefined {
  const { technologies, projectType, goals } = entities;

  if (intent === 'build' && projectType) {
    const tech = technologies.length > 0 ? ` using ${technologies.join(', ')}` : '';
    return `Build a ${projectType}${tech} that helps users [specific problem]`;
  }

  if (intent === 'learn' && technologies.length > 0) {
    return `Teach me ${technologies[0]} from basics to building a real project`;
  }

  if (intent === 'market' && projectType) {
    return `Create a complete go-to-market strategy for my ${projectType}`;
  }

  return undefined;
}

/**
 * Get quick start suggestions based on user profile
 */
export function getQuickStartSuggestions(userLevel: ComplexityLevel = 'beginner') {
  const suggestions = {
    beginner: [
      {
        text: 'Teach me to build my first web app',
        intent: 'learn' as Intent,
        agents: ['curriculum', 'tutor'] as Agent[],
      },
      {
        text: 'Build a simple todo app with Next.js',
        intent: 'build' as Intent,
        agents: ['architect', 'coder'] as Agent[],
      },
      {
        text: 'Explain how to make money with micro-SaaS',
        intent: 'learn' as Intent,
        agents: ['tutor', 'marketer'] as Agent[],
      },
    ],
    intermediate: [
      {
        text: 'Build a receipt scanner SaaS app',
        intent: 'build' as Intent,
        agents: ['architect', 'coder', 'reviewer'] as Agent[],
      },
      {
        text: 'Create a landing page for my app',
        intent: 'market' as Intent,
        agents: ['marketer', 'coder'] as Agent[],
      },
      {
        text: 'Design a scalable API architecture',
        intent: 'plan' as Intent,
        agents: ['architect'] as Agent[],
      },
    ],
    advanced: [
      {
        text: 'Build an AI-powered analytics dashboard',
        intent: 'build' as Intent,
        agents: ['architect', 'coder', 'reviewer', 'marketer'] as Agent[],
      },
      {
        text: 'Review and optimize my production code',
        intent: 'review' as Intent,
        agents: ['reviewer', 'architect'] as Agent[],
      },
      {
        text: 'Create a complete launch strategy',
        intent: 'market' as Intent,
        agents: ['marketer', 'curriculum'] as Agent[],
      },
    ],
    expert: [
      {
        text: 'Build an enterprise-grade multi-tenant SaaS',
        intent: 'build' as Intent,
        agents: ['architect', 'coder', 'reviewer', 'marketer'] as Agent[],
      },
      {
        text: 'Design a microservices architecture',
        intent: 'plan' as Intent,
        agents: ['architect', 'reviewer'] as Agent[],
      },
      {
        text: 'Scale my SaaS to 10k users',
        intent: 'plan' as Intent,
        agents: ['architect', 'marketer'] as Agent[],
      },
    ],
  };

  return suggestions[userLevel];
}
