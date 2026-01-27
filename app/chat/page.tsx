'use client';

import { useState, useRef, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import { WorkflowVisualizer } from '@/components/WorkflowVisualizer';
import { WorkflowProgress } from '@/lib/orchestrator';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

type Agent = 'tutor' | 'coder' | 'architect' | 'marketer' | 'reviewer' | 'curriculum';
type Mode = 'online' | 'offline' | 'hybrid';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  agent?: Agent;
  timestamp: Date;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [context, setContext] = useState('');
  const [agent, setAgent] = useState<Agent>('tutor');
  const [mode, setMode] = useState<Mode>('online');
  const [isLoading, setIsLoading] = useState(false);
  const [showContext, setShowContext] = useState(false);
  const [workflow, setWorkflow] = useState<WorkflowProgress | undefined>();
  const [useOrchestrator, setUseOrchestrator] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const agentInfo: Record<Agent, { name: string; emoji: string; description: string }> = {
    tutor: {
      name: 'TutorAgent',
      emoji: '👨‍🏫',
      description: 'Teaches concepts and best practices',
    },
    coder: {
      name: 'CoderAgent',
      emoji: '💻',
      description: 'Generates production-ready code',
    },
    architect: {
      name: 'ArchitectAgent',
      emoji: '🏗️',
      description: 'Designs system architecture',
    },
    marketer: {
      name: 'MarketerAgent',
      emoji: '📈',
      description: 'Creates go-to-market strategy',
    },
    reviewer: {
      name: 'ReviewerAgent',
      emoji: '🔍',
      description: 'Reviews code and architecture',
    },
    curriculum: {
      name: 'CurriculumDirector',
      emoji: '🎓',
      description: 'Designs learning paths',
    },
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setWorkflow(undefined);

    try {
      if (useOrchestrator) {
        // Use orchestrator for automatic agent selection
        const response = await fetch('/api/orchestrate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: input,
            context: context || undefined,
            mode,
          }),
        });

        const data = await response.json();

        if (data.success) {
          setWorkflow(data.workflow);
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.finalResponse,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          throw new Error(data.error || 'Failed to get response');
        }
      } else {
        // Use single agent (legacy mode)
        const response = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            message: input,
            agent,
            context: context || undefined,
            conversationHistory: messages.slice(-10),
            mode,
          }),
        });

        const data = await response.json();

        if (data.success) {
          const assistantMessage: Message = {
            role: 'assistant',
            content: data.response,
            agent,
            timestamp: new Date(),
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } else {
          throw new Error(data.error || 'Failed to get response');
        }
      }
    } catch (error) {
      const errorMessage: Message = {
        role: 'assistant',
        content: `Error: ${error instanceof Error ? error.message : 'Unknown error occurred'}`,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setInput('');
    setWorkflow(undefined);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Header */}
      <header className="border-b border-gray-700 bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link
                href="/"
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="w-5 h-5" />
                <span>Back to Home</span>
              </Link>
              <div className="h-6 w-px bg-gray-700" />
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
                  MicroSaaS Academy AI
                </h1>
                <p className="text-sm text-gray-400 mt-1">Advanced Chat Interface</p>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              {/* Orchestrator toggle */}
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={useOrchestrator}
                  onChange={(e) => setUseOrchestrator(e.target.checked)}
                  className="w-4 h-4"
                />
                <span className="text-sm text-gray-400">Auto Mode</span>
              </label>

              {/* Mode Selector */}
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as Mode)}
                className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="online">🌐 Online</option>
                <option value="offline">💾 Offline</option>
                <option value="hybrid">⚡ Hybrid</option>
              </select>

              {/* Agent Selector (only in manual mode) */}
              {!useOrchestrator && (
                <select
                  value={agent}
                  onChange={(e) => setAgent(e.target.value as Agent)}
                  className="px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {Object.entries(agentInfo).map(([key, info]) => (
                    <option key={key} value={key}>
                      {info.emoji} {info.name}
                    </option>
                  ))}
                </select>
              )}
            </div>
          </div>

          {/* Agent Description */}
          {!useOrchestrator && (
            <div className="mt-3 text-sm text-gray-400">
              <span className="font-medium text-gray-300">Current Agent:</span>{' '}
              {agentInfo[agent].description}
            </div>
          )}
          {useOrchestrator && (
            <div className="mt-3 text-sm text-gray-400">
              <span className="font-medium text-gray-300">Auto Mode:</span>{' '}
              AI automatically selects the best agents for your task
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Workflow Visualizer */}
        {workflow && (
          <div className="mb-6">
            <WorkflowVisualizer workflow={workflow} />
          </div>
        )}

        {/* Messages */}
        <div className="bg-gray-800/50 rounded-lg border border-gray-700 min-h-[500px] max-h-[600px] overflow-y-auto mb-4 p-4">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <div className="text-6xl mb-4">🚀</div>
                <p className="text-lg">Ready to learn and build?</p>
                <p className="text-sm mt-2">
                  {useOrchestrator
                    ? 'Just describe what you want - AI will handle the rest'
                    : 'Type your message below'}
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {messages.map((message, idx) => (
                <div
                  key={idx}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-4 ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-700 text-gray-100'
                    }`}
                  >
                    {message.role === 'assistant' && message.agent && (
                      <div className="text-xs text-gray-400 mb-2">
                        {agentInfo[message.agent].emoji} {agentInfo[message.agent].name}
                      </div>
                    )}
                    <div className="prose prose-invert prose-sm max-w-none">
                      <ReactMarkdown>{message.content}</ReactMarkdown>
                    </div>
                    <div className="text-xs text-gray-400 mt-2">
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-700 rounded-lg p-4">
                    <div className="flex items-center gap-2">
                      <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <span className="text-sm text-gray-400">
                        {useOrchestrator ? 'AI agents working...' : `${agentInfo[agent].name} is thinking...`}
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </div>

        {/* Context Panel (collapsible) */}
        <div className="mb-4">
          <button
            onClick={() => setShowContext(!showContext)}
            className="text-sm text-gray-400 hover:text-gray-300 mb-2"
          >
            {showContext ? '▼' : '▶'} Add Context (optional)
          </button>
          {showContext && (
            <textarea
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Add context: your skill level, project details, constraints, etc."
              className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              rows={3}
            />
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={
              useOrchestrator
                ? 'Describe what you want to learn or build...'
                : 'What would you like to learn or build today?'
            }
            className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 disabled:cursor-not-allowed rounded-lg font-medium transition-colors"
          >
            {isLoading ? 'Sending...' : 'Send'}
          </button>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={clearChat}
              className="px-4 py-3 bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors"
            >
              Clear
            </button>
          )}
        </form>
      </main>
    </div>
  );
}
