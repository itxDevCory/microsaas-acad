'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.8, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.8]);

  return (
    <div ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-white">
      {/* Animated grid pattern with parallax */}
      <motion.div 
        className="absolute inset-0"
        style={{ y: useTransform(scrollYProgress, [0, 1], ["0%", "30%"]) }}
      >
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 0, 0, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px'
        }}></div>
      </motion.div>

      {/* Floating 3D accent elements with parallax */}
      <motion.div
        className="absolute top-20 left-10 w-4 h-4 bg-black"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 100]),
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, 180]),
        }}
        animate={{
          y: [0, 20, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{ duration: 4, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-40 right-20 w-6 h-6 border-2 border-black"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -80]),
          rotateZ: useTransform(scrollYProgress, [0, 1], [0, -180]),
        }}
        animate={{
          y: [0, -15, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 5, repeat: Infinity }}
      />
      <motion.div
        className="absolute bottom-40 left-1/4 w-3 h-3 bg-black rounded-full"
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, 60]),
        }}
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Content with parallax */}
      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        style={{ y, opacity, scale }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Badge with 3D effect */}
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-1 border-2 border-black mb-12 relative"
            style={{
              boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
            }}
            whileHover={{ 
              scale: 1.05,
              boxShadow: '6px 6px 0px 0px rgba(0,0,0,1)',
              x: -2,
              y: -2,
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <span className="text-xs font-mono uppercase tracking-wider text-black font-bold">AI-Powered Development</span>
          </motion.div>

          {/* Main heading - Eye chart style with 3D depth */}
          <h1 className="mb-12">
            <motion.div 
              className="text-8xl sm:text-9xl lg:text-[12rem] font-bold leading-none tracking-tighter text-black mb-4 relative"
              style={{
                textShadow: '8px 8px 0px rgba(0,0,0,0.1), 12px 12px 0px rgba(0,0,0,0.05)',
              }}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.02,
                textShadow: '12px 12px 0px rgba(0,0,0,0.15), 16px 16px 0px rgba(0,0,0,0.08)',
              }}
            >
              ITX
            </motion.div>
            <motion.div 
              className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-none tracking-tight text-black mb-4 relative"
              style={{
                textShadow: '6px 6px 0px rgba(0,0,0,0.1), 10px 10px 0px rgba(0,0,0,0.05)',
              }}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.8, type: "spring" }}
              whileHover={{
                scale: 1.02,
                x: -5,
                textShadow: '10px 10px 0px rgba(0,0,0,0.15), 14px 14px 0px rgba(0,0,0,0.08)',
              }}
            >
              DEVELOPERS
            </motion.div>
            <motion.div 
              className="text-2xl sm:text-3xl lg:text-4xl font-medium leading-none tracking-wide text-gray-600 relative"
              style={{
                textShadow: '4px 4px 0px rgba(0,0,0,0.05)',
              }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8, type: "spring" }}
              whileHover={{
                scale: 1.02,
                x: 5,
              }}
            >
              AI-Powered Development
            </motion.div>
          </h1>

          {/* Subheading */}
          <motion.p 
            className="text-base sm:text-lg text-gray-700 mb-12 max-w-2xl mx-auto font-light leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Learn, build, and launch micro-SaaS products with intelligent AI agents
          </motion.p>

          {/* Stats - Minimalist */}
          <div className="flex flex-wrap justify-center gap-12 mb-16">
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
            >
              <div className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-1">Automation</div>
              <div className="text-lg font-medium text-black">Fully Automated</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <div className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-1">Agents</div>
              <div className="text-lg font-medium text-black">6 AI Specialists</div>
            </motion.div>
            <motion.div
              className="text-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <div className="text-sm font-mono uppercase tracking-wider text-gray-500 mb-1">Setup</div>
              <div className="text-lg font-medium text-black">Zero Config</div>
            </motion.div>
          </div>

          {/* CTA Button - 3D effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <motion.a
              href="#smart-input"
              className="inline-block px-12 py-4 bg-black text-white font-bold text-sm uppercase tracking-wider border-2 border-black relative"
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
              transition={{ type: "spring", stiffness: 400 }}
            >
              Start Building
            </motion.a>
          </motion.div>

          {/* Scroll indicator with animation */}
          <motion.div
            className="mt-24"
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <motion.div 
              className="text-xs font-mono uppercase tracking-wider text-gray-400"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              Scroll
            </motion.div>
            <motion.div 
              className="w-px h-16 bg-gradient-to-b from-black to-transparent mx-auto mt-2"
              animate={{ scaleY: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}
