'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Send, Sparkles, Loader2 } from 'lucide-react';
import { analyzeIntent, getQuickStartSuggestions, ComplexityLevel } from '@/lib/intent-detector';
import { WorkflowVisualizer } from './WorkflowVisualizer';
import { WorkflowProgress } from '@/lib/orchestrator';
import ReactMarkdown from 'react-markdown';

interface SmartInputProps {
  onSubmit?: (message: string) => void;
  className?: string;
}

export function SmartInput({ onSubmit, className = '' }: SmartInputProps) {
  const [input, setInput] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [intentPreview, setIntentPreview] = useState<any>(null);
  const [workflow, setWorkflow] = useState<WorkflowProgress | undefined>();
  const [response, setResponse] = useState<string>('');
  const [userLevel] = useState<ComplexityLevel>('intermediate');

  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["50px", "-50px"]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  const suggestions = getQuickStartSuggestions(userLevel);

  // Analyze intent as user types (debounced)
  useEffect(() => {
    if (input.length < 10) {
      setIntentPreview(null);
      return;
    }

    const timer = setTimeout(() => {
      setIsAnalyzing(true);
      const analysis = analyzeIntent(input);
      setIntentPreview(analysis);
      setIsAnalyzing(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [input]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    setIsLoading(true);
    setResponse('');
    setWorkflow(undefined);

    try {
      // Call orchestrator API
      const res = await fetch('/api/orchestrate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      if (data.success) {
        setResponse(data.finalResponse);
        setWorkflow(data.workflow);
      } else {
        setResponse(`Error: ${data.error}`);
      }
    } catch (error) {
      setResponse(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsLoading(false);
    }

    if (onSubmit) {
      onSubmit(input);
    }
  };

  const handleSuggestionClick = (text: string) => {
    setInput(text);
  };

  return (
    <motion.div 
      ref={ref}
      className={`${className}`} 
      id="smart-input"
      style={{ y, scale }}
    >
      <div className="max-w-4xl mx-auto">
        {/* Header with 3D text */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4 text-black"
            style={{
              textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
            }}
            whileHover={{
              textShadow: '6px 6px 0px rgba(0,0,0,0.15)',
            }}
          >
            Just Tell Us What You Want
          </motion.h2>
          <p className="text-xl text-gray-600 font-mono text-sm uppercase tracking-wider">
            Our AI agents will automatically handle the rest
          </p>
        </motion.div>

        {/* Quick suggestions with 3D effect */}
        {!response && (
          <motion.div
            className="mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <p className="text-sm text-gray-600 mb-4 font-mono uppercase tracking-wider">Quick start ideas:</p>
            <div className="flex flex-wrap gap-3">
              {suggestions.map((suggestion, index) => (
                <motion.button
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion.text)}
                  className="px-4 py-2 bg-white border-2 border-black text-black text-sm font-medium"
                  style={{
                    boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)',
                    x: -2,
                    y: -2,
                  }}
                  whileTap={{ 
                    scale: 0.95,
                    boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
                    x: 1,
                    y: 1,
                  }}
                >
                  {suggestion.text}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        {/* Input form with 3D effect */}
        <motion.form
          onSubmit={handleSubmit}
          className="relative mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div 
            className="relative"
            style={{
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
            }}
            whileFocus={{
              boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)',
              x: -2,
              y: -2,
            }}
          >
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: Build a receipt scanner app with Next.js and AI"
              className="w-full px-6 py-4 pr-24 bg-white border-2 border-black text-black placeholder-gray-400 focus:outline-none resize-none font-mono text-sm"
              rows={3}
              disabled={isLoading}
            />
            <motion.button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="absolute right-4 bottom-4 p-3 bg-black text-white border-2 border-black disabled:bg-gray-400 disabled:cursor-not-allowed"
              style={{
                boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)',
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: '4px 4px 0px 0px rgba(0,0,0,0.4)',
              }}
              whileTap={{
                scale: 0.9,
                boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.3)',
              }}
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <Send className="w-5 h-5" />
              )}
            </motion.button>
          </motion.div>

          {/* Intent preview with 3D card */}
          <AnimatePresence>
            {intentPreview && !isLoading && !response && (
              <motion.div
                initial={{ opacity: 0, height: 0, y: -20 }}
                animate={{ opacity: 1, height: 'auto', y: 0 }}
                exit={{ opacity: 0, height: 0, y: -20 }}
                className="mt-4 p-4 bg-white border-2 border-black"
                style={{
                  boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
                }}
              >
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-black flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-bold text-black mb-2 uppercase tracking-wider">
                      AI Analysis Preview
                    </p>
                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-mono">Intent:</span>
                        <span className="px-2 py-0.5 bg-black text-white text-xs uppercase font-bold">
                          {intentPreview.intent}
                        </span>
                        <span className="text-gray-500 font-mono text-xs">
                          ({Math.round(intentPreview.confidence * 100)}%)
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-mono">Agents:</span>
                        <div className="flex gap-1">
                          {intentPreview.agents.map((agent: string, i: number) => (
                            <span
                              key={i}
                              className="px-2 py-0.5 border border-black text-black text-xs font-mono"
                            >
                              {agent}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-gray-600 font-mono">Steps:</span>
                        <span className="text-black font-mono">
                          {intentPreview.workflow.length} automated steps
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.form>

        {/* Workflow visualizer */}
        {workflow && (
          <WorkflowVisualizer workflow={workflow} className="mb-8" />
        )}

        {/* Response with 3D card */}
        <AnimatePresence>
          {response && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="p-6 bg-white border-2 border-black"
              style={{
                boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
              }}
            >
              <div className="prose prose-sm max-w-none text-black">
                <ReactMarkdown>{response}</ReactMarkdown>
              </div>
              
              {/* Action buttons with 3D effect */}
              <div className="mt-6 flex gap-3">
                <motion.button
                  onClick={() => {
                    setInput('');
                    setResponse('');
                    setWorkflow(undefined);
                    setIntentPreview(null);
                  }}
                  className="px-4 py-2 bg-white border-2 border-black text-black text-sm font-bold uppercase tracking-wider"
                  style={{
                    boxShadow: '3px 3px 0px 0px rgba(0,0,0,1)',
                  }}
                  whileHover={{
                    boxShadow: '5px 5px 0px 0px rgba(0,0,0,1)',
                    x: -2,
                    y: -2,
                  }}
                  whileTap={{
                    boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
                    x: 1,
                    y: 1,
                  }}
                >
                  New Request
                </motion.button>
                <motion.button
                  onClick={() => {
                    navigator.clipboard.writeText(response);
                  }}
                  className="px-4 py-2 bg-black text-white border-2 border-black text-sm font-bold uppercase tracking-wider"
                  style={{
                    boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{
                    boxShadow: '5px 5px 0px 0px rgba(0,0,0,0.4)',
                    x: -2,
                    y: -2,
                  }}
                  whileTap={{
                    boxShadow: '2px 2px 0px 0px rgba(0,0,0,0.3)',
                    x: 1,
                    y: 1,
                  }}
                >
                  Copy Response
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
