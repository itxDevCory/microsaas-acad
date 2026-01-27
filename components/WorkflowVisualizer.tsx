'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Circle, Loader2 } from 'lucide-react';
import { WorkflowProgress } from '@/lib/orchestrator';

interface WorkflowVisualizerProps {
  workflow?: WorkflowProgress;
  className?: string;
}

const agentInfo = {
  tutor: { name: 'Tutor', emoji: '👨‍🏫', color: 'from-blue-500 to-cyan-500' },
  coder: { name: 'Coder', emoji: '💻', color: 'from-purple-500 to-pink-500' },
  architect: { name: 'Architect', emoji: '🏗️', color: 'from-orange-500 to-red-500' },
  marketer: { name: 'Marketer', emoji: '📈', color: 'from-green-500 to-emerald-500' },
  reviewer: { name: 'Reviewer', emoji: '🔍', color: 'from-indigo-500 to-blue-500' },
  curriculum: { name: 'Curriculum', emoji: '🎓', color: 'from-yellow-500 to-orange-500' },
};

export function WorkflowVisualizer({ workflow, className = '' }: WorkflowVisualizerProps) {
  if (!workflow) return null;

  const getStepStatus = (stepIndex: number) => {
    if (stepIndex < workflow.currentStep) return 'completed';
    if (stepIndex === workflow.currentStep) return workflow.status;
    return 'pending';
  };

  return (
    <div className={`${className}`}>
      <AnimatePresence mode="wait">
        {workflow && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl p-6 backdrop-blur-sm"
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-white mb-1">
                  AI Workflow in Progress
                </h3>
                <p className="text-sm text-gray-400">
                  Step {workflow.currentStep + 1} of {workflow.totalSteps}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {workflow.status === 'running' && (
                  <Loader2 className="w-5 h-5 text-blue-400 animate-spin" />
                )}
                {workflow.status === 'completed' && (
                  <CheckCircle2 className="w-5 h-5 text-green-400" />
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mb-6">
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${((workflow.currentStep + (workflow.status === 'completed' ? 1 : 0.5)) / workflow.totalSteps) * 100}%` 
                  }}
                  transition={{ duration: 0.5 }}
                />
              </div>
            </div>

            {/* Current status message */}
            <motion.div
              key={workflow.message}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-6 p-4 bg-gray-800/50 rounded-lg border border-gray-700/50"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">
                  {agentInfo[workflow.currentAgent]?.emoji || '🤖'}
                </span>
                <div>
                  <p className="text-sm font-medium text-white">
                    {agentInfo[workflow.currentAgent]?.name || 'Agent'}
                  </p>
                  <p className="text-sm text-gray-400">{workflow.message}</p>
                </div>
              </div>
            </motion.div>

            {/* Results timeline */}
            {workflow.results.length > 0 && (
              <div className="space-y-3">
                <h4 className="text-sm font-medium text-gray-400 mb-3">Completed Steps:</h4>
                {workflow.results.map((result, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/30"
                  >
                    <CheckCircle2 className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg">
                          {agentInfo[result.agent]?.emoji || '🤖'}
                        </span>
                        <span className="text-sm font-medium text-white">
                          {agentInfo[result.agent]?.name || result.agent}
                        </span>
                        <span className="text-xs text-gray-500">
                          {Math.round(result.duration / 1000)}s
                        </span>
                      </div>
                      <p className="text-xs text-gray-400 truncate">
                        {result.action}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// Simplified workflow demo component for the landing page
export function WorkflowDemo() {
  const demoSteps = [
    { agent: 'architect', action: 'Design system architecture', time: '2-3 min' },
    { agent: 'coder', action: 'Generate production code', time: '3-5 min' },
    { agent: 'reviewer', action: 'Review and optimize', time: '1-2 min' },
    { agent: 'marketer', action: 'Create launch strategy', time: '2-3 min' },
  ];

  return (
    <div className="relative py-24 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Just describe what you want. Our AI agents handle the rest automatically.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {/* Example input */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-12 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center flex-shrink-0">
                <span className="text-white font-semibold">You</span>
              </div>
              <div className="flex-1">
                <p className="text-white text-lg">
                  "Build a receipt scanner app that I can sell for $9/month"
                </p>
              </div>
            </div>
          </motion.div>

          {/* Workflow steps */}
          <div className="space-y-4">
            {demoSteps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                className="relative"
              >
                {/* Connector line */}
                {index < demoSteps.length - 1 && (
                  <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-gray-600 to-transparent" />
                )}

                <div className="flex items-start gap-4 p-6 bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 rounded-2xl backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
                  <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${agentInfo[step.agent as keyof typeof agentInfo].color} flex items-center justify-center text-2xl flex-shrink-0`}>
                    {agentInfo[step.agent as keyof typeof agentInfo].emoji}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-white">
                        {agentInfo[step.agent as keyof typeof agentInfo].name}
                      </h3>
                      <span className="text-sm text-gray-400">{step.time}</span>
                    </div>
                    <p className="text-gray-400">{step.action}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Result */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 p-6 bg-gradient-to-br from-green-900/20 to-emerald-900/20 border border-green-500/30 rounded-2xl backdrop-blur-sm"
          >
            <div className="flex items-start gap-4">
              <CheckCircle2 className="w-10 h-10 text-green-400 flex-shrink-0" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-white mb-2">
                  Complete Project Delivered
                </h3>
                <ul className="space-y-2 text-gray-300">
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Production-ready code with tests
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    System architecture documentation
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Landing page and marketing materials
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-green-400">✓</span>
                    Deployment configuration
                  </li>
                </ul>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
