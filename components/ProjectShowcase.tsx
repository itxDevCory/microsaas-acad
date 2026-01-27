'use client';

import { motion } from 'framer-motion';
import { ExternalLink, Github, DollarSign, Users, TrendingUp } from 'lucide-react';

const projects = [
  {
    title: 'Receipt Scanner SaaS',
    description: 'AI-powered receipt scanning and expense tracking. Built in 3 days, earning $2.4k/month.',
    image: '📸',
    tech: ['Next.js', 'OpenAI', 'Stripe'],
    metrics: {
      revenue: '$2.4k/mo',
      users: '340',
      growth: '+45%',
    },
    color: 'from-blue-500 to-cyan-500',
  },
  {
    title: 'PDF to Audiobook',
    description: 'Convert any PDF to natural-sounding audiobook. Launched in 2 days, $1.8k/month.',
    image: '🎧',
    tech: ['React', 'ElevenLabs', 'Paddle'],
    metrics: {
      revenue: '$1.8k/mo',
      users: '280',
      growth: '+38%',
    },
    color: 'from-purple-500 to-pink-500',
  },
  {
    title: 'Email Signature Generator',
    description: 'Professional email signatures in seconds. Simple idea, $1.2k/month passive income.',
    image: '✉️',
    tech: ['Vue.js', 'Tailwind', 'Gumroad'],
    metrics: {
      revenue: '$1.2k/mo',
      users: '520',
      growth: '+28%',
    },
    color: 'from-orange-500 to-red-500',
  },
  {
    title: 'API Documentation Tool',
    description: 'Auto-generate beautiful API docs. Developer tool earning $3.2k/month.',
    image: '📚',
    tech: ['TypeScript', 'MDX', 'Vercel'],
    metrics: {
      revenue: '$3.2k/mo',
      users: '180',
      growth: '+52%',
    },
    color: 'from-green-500 to-emerald-500',
  },
];

export function ProjectShowcase() {
  return (
    <div className="relative py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              Real Projects, Real Revenue
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Built by developers like you using MicroSaaS Academy AI
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative h-full p-6 rounded-2xl bg-gradient-to-br from-gray-800/50 to-gray-900/50 border border-gray-700/50 backdrop-blur-sm hover:border-gray-600/50 transition-all duration-300">
                {/* Gradient overlay */}
                <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${project.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />

                {/* Project icon */}
                <div className="relative mb-4">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${project.color} text-3xl`}>
                    {project.image}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2">
                  {project.title}
                </h3>
                <p className="text-gray-400 mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span
                      key={tech}
                      className="px-2 py-1 bg-gray-700/50 rounded text-xs text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-700/50">
                  <div>
                    <div className="flex items-center gap-1 text-green-400 mb-1">
                      <DollarSign className="w-4 h-4" />
                      <span className="text-xs font-medium">Revenue</span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {project.metrics.revenue}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-blue-400 mb-1">
                      <Users className="w-4 h-4" />
                      <span className="text-xs font-medium">Users</span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {project.metrics.users}
                    </p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1 text-purple-400 mb-1">
                      <TrendingUp className="w-4 h-4" />
                      <span className="text-xs font-medium">Growth</span>
                    </div>
                    <p className="text-sm font-semibold text-white">
                      {project.metrics.growth}
                    </p>
                  </div>
                </div>

                {/* Hover effect line */}
                <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${project.color} transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-b-2xl`} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6"
        >
          <div className="p-6 rounded-xl bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30">
            <div className="text-3xl font-bold text-blue-400 mb-2">$8.6k</div>
            <div className="text-sm text-gray-400">Combined MRR</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-500/30">
            <div className="text-3xl font-bold text-purple-400 mb-2">1,320</div>
            <div className="text-sm text-gray-400">Total Users</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30">
            <div className="text-3xl font-bold text-green-400 mb-2">2.5 days</div>
            <div className="text-sm text-gray-400">Avg Build Time</div>
          </div>
          <div className="p-6 rounded-xl bg-gradient-to-br from-orange-900/20 to-orange-800/20 border border-orange-500/30">
            <div className="text-3xl font-bold text-orange-400 mb-2">+41%</div>
            <div className="text-sm text-gray-400">Avg Growth Rate</div>
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-gray-400 mb-4">
            Ready to build your own profitable micro-SaaS?
          </p>
          <a
            href="#smart-input"
            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105"
          >
            Start Building Now
          </a>
        </motion.div>
      </div>
    </div>
  );
}
