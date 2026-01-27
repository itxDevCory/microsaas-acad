'use client';

import { HeroSection } from '@/components/HeroSection';
import { FeaturesSection } from '@/components/FeaturesSection';
import { WorkflowDemo } from '@/components/WorkflowVisualizer';
import { ProjectShowcase } from '@/components/ProjectShowcase';
import { SmartInput } from '@/components/SmartInput';
import { ParallaxSection } from '@/components/ParallaxSection';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MessageSquare, Github, Twitter } from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black">
      {/* Navigation */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚀</span>
              <span className="text-xl font-bold text-black">
                ITX DEVELOPERS
              </span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                href="/chat"
                className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-black transition-colors"
              >
                <MessageSquare className="w-4 h-4" />
                <span className="hidden sm:inline">Advanced Chat</span>
              </Link>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-black transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Hero Section */}
      <ParallaxSection speed={0.3}>
        <HeroSection />
      </ParallaxSection>

      {/* Features Section */}
      <ParallaxSection speed={0.2}>
        <FeaturesSection />
      </ParallaxSection>

      {/* How It Works Section */}
      <ParallaxSection speed={0.25}>
        <WorkflowDemo />
      </ParallaxSection>

      {/* Project Showcase Section */}
      <ParallaxSection speed={0.2}>
        <ProjectShowcase />
      </ParallaxSection>

      {/* Smart Input Section */}
      <ParallaxSection speed={0.15} className="py-24 bg-white">
        <SmartInput />
      </ParallaxSection>

      {/* Testimonials Section */}
      <ParallaxSection speed={0.2} className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
              What Developers Say
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'Sarah Chen',
                role: 'Full-Stack Developer',
                content: 'The AI agents handle everything - I just had to describe what I wanted. Built my first project in 3 days.',
                avatar: '👩‍💻',
              },
              {
                name: 'Marcus Rodriguez',
                role: 'Solo Founder',
                content: 'No more guessing which tools to use or how to structure my code. The orchestrator automatically picks the right agents and delivers production-ready code.',
                avatar: '👨‍💼',
              },
              {
                name: 'Emily Watson',
                role: 'Designer turned Developer',
                content: 'As a designer learning to code, this is a game-changer. The AI teaches me while building my projects.',
                avatar: '👩‍🎨',
              },
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-white border border-gray-200"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-black flex items-center justify-center text-2xl">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-black">{testimonial.name}</div>
                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                  </div>
                </div>
                <p className="text-gray-700 leading-relaxed">"{testimonial.content}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* FAQ Section */}
      <ParallaxSection speed={0.15} className="py-24 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-black">
              Frequently Asked Questions
            </h2>
          </motion.div>

          <div className="space-y-6">
            {[
              {
                q: 'Do I need to know which AI agent to use?',
                a: 'No! That\'s the magic of our smart orchestrator. Just describe what you want in plain English, and the AI automatically selects and coordinates the right agents for your task.',
              },
              {
                q: 'How is this different from ChatGPT?',
                a: 'We have 6 specialized AI agents that work together automatically. ChatGPT is a single general-purpose AI. Our system also includes progress tracking, project generation, and works offline.',
              },
              {
                q: 'Can I use this offline?',
                a: 'Yes! We support offline mode with local AI models (Ollama). Your code and ideas stay completely private on your machine.',
              },
              {
                q: 'How long does it take to build a project?',
                a: 'Most micro-SaaS projects are completed in 2-5 days, including code, architecture, tests, and documentation. Simple tools can be done in hours.',
              },
              {
                q: 'Do I need to be an expert developer?',
                a: 'Not at all! The AI teaches you while building. Whether you\'re a beginner or expert, the system adapts to your level and helps you learn.',
              },
            ].map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 bg-gray-50 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-black mb-3">{faq.q}</h3>
                <p className="text-gray-700 leading-relaxed">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </ParallaxSection>

      {/* Final CTA Section */}
      <ParallaxSection speed={0.1} className="py-24 bg-black text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-6">
              Ready to Build with ITX Developers?
            </h2>
            <p className="text-xl text-gray-400 mb-8">
              Join developers who are learning and building with intelligent AI agents
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#smart-input"
                className="px-8 py-4 bg-white text-black font-medium hover:bg-gray-100 transition-all duration-300"
              >
                Start Building Now
              </a>
              <Link
                href="/chat"
                className="px-8 py-4 bg-transparent text-white font-medium border border-white hover:bg-white hover:text-black transition-all duration-300"
              >
                Try Advanced Chat
              </Link>
            </div>
          </motion.div>
        </div>
      </ParallaxSection>

      {/* Footer */}
      <footer className="border-t border-gray-200 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🚀</span>
                <span className="text-lg font-bold text-black">ITX DEVELOPERS</span>
              </div>
              <p className="text-gray-600 text-sm">
                Learn, build, and launch micro-SaaS products with intelligent AI agents
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black">Product</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#smart-input" className="hover:text-black transition-colors">Features</a></li>
                <li><Link href="/chat" className="hover:text-black transition-colors">Advanced Chat</Link></li>
                <li><a href="#" className="hover:text-black transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Documentation</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black">Resources</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li><a href="#" className="hover:text-black transition-colors">Blog</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Tutorials</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Examples</a></li>
                <li><a href="#" className="hover:text-black transition-colors">Community</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-black">Connect</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <Github className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-600 hover:text-black transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 pt-8 text-center text-sm text-gray-600">
            <p>© 2024 ITX Developers. All rights reserved.</p>
            <p className="mt-2">Built with ❤️ using Next.js, TypeScript, and AI</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
