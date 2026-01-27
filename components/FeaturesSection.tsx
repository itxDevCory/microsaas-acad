'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { Brain, Code, Rocket, DollarSign, Shield, Zap } from 'lucide-react';
import { useRef } from 'react';

const features = [
  {
    icon: Brain,
    title: 'Smart Orchestration',
    description: 'AI automatically selects and coordinates the right agents for your task. No manual configuration needed.',
  },
  {
    icon: Code,
    title: 'Production-Ready Code',
    description: 'Generate complete, tested, and deployable applications with best practices built in.',
  },
  {
    icon: Rocket,
    title: 'Launch in Days',
    description: 'From idea to deployed product in days, not months. Complete with documentation.',
  },
  {
    icon: DollarSign,
    title: 'Monetization Built-In',
    description: 'Automatic pricing research, payment integration, and go-to-market strategy included.',
  },
  {
    icon: Shield,
    title: 'Works Offline',
    description: 'Full functionality with local AI models. Your code and ideas stay private.',
  },
  {
    icon: Zap,
    title: 'Multi-Agent Power',
    description: '6 specialized AI agents work together: Tutor, Coder, Architect, Marketer, Reviewer, Curriculum.',
  },
];

export function FeaturesSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["100px", "-100px"]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.div 
      ref={ref}
      className="relative py-24 bg-white overflow-hidden"
      style={{ opacity }}
    >
      {/* Animated background elements with parallax */}
      <motion.div
        className="absolute top-20 right-10 w-32 h-32 border-2 border-black opacity-10"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -150]),
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, 90]),
        }}
      />
      <motion.div
        className="absolute bottom-20 left-10 w-24 h-24 bg-black opacity-5"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, -90]),
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section header with parallax */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-4xl sm:text-5xl font-bold mb-4 text-black"
            style={{
              textShadow: '4px 4px 0px rgba(0,0,0,0.1)',
              y: useTransform(scrollYProgress, [0, 0.5, 1], [50, 0, -50]),
            }}
          >
            Why Choose ITX Developers?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-600 max-w-2xl mx-auto"
            style={{
              y: useTransform(scrollYProgress, [0, 0.5, 1], [30, 0, -30]),
            }}
          >
            The only AI system that teaches, builds, and launches your micro-SaaS products automatically
          </motion.p>
        </motion.div>

        {/* Features grid with 3D cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30, rotateX: -15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 100,
              }}
              className="group"
            >
              <motion.div 
                className="relative h-full p-8 bg-white border-2 border-black"
                style={{
                  boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
                  transformStyle: 'preserve-3d',
                }}
                whileHover={{
                  scale: 1.02,
                  boxShadow: '10px 10px 0px 0px rgba(0,0,0,1)',
                  x: -4,
                  y: -4,
                  rotateY: 5,
                }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {/* Icon with 3D effect */}
                <motion.div 
                  className="w-12 h-12 bg-black flex items-center justify-center mb-4 relative"
                  style={{
                    boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)',
                  }}
                  whileHover={{
                    scale: 1.1,
                    rotate: 5,
                    boxShadow: '5px 5px 0px 0px rgba(0,0,0,0.4)',
                  }}
                >
                  <feature.icon className="w-6 h-6 text-white" />
                </motion.div>

                {/* Content */}
                <h3 className="text-xl font-bold text-black mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-700 leading-relaxed">
                  {feature.description}
                </p>

                {/* Animated corner accent */}
                <motion.div
                  className="absolute top-0 right-0 w-4 h-4 bg-black"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.3 }}
                />
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA with 3D button */}
        <motion.div
          className="mt-16 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          <p className="text-gray-600 mb-4 font-mono text-sm uppercase tracking-wider">
            Ready to see it in action?
          </p>
          <motion.a
            href="#smart-input"
            className="inline-flex items-center gap-2 px-8 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider border-2 border-black"
            style={{
              boxShadow: '6px 6px 0px 0px rgba(0,0,0,0.3)',
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '8px 8px 0px 0px rgba(0,0,0,0.4)',
              x: -2,
              y: -2,
            }}
            whileTap={{
              scale: 0.95,
              boxShadow: '3px 3px 0px 0px rgba(0,0,0,0.3)',
              x: 3,
              y: 3,
            }}
          >
            <Zap className="w-5 h-5" />
            Try It Now
          </motion.a>
        </motion.div>
      </div>
    </motion.div>
  );
}
