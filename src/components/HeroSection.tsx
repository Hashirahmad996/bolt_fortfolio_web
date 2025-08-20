import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Cloud, Zap, ArrowRight, Play } from 'lucide-react';

const HeroSection = () => {
  const cloudProviders = [
    { name: 'AWS', color: '#FF9900', position: { x: 20, y: 30 } },
    { name: 'Azure', color: '#0078D4', position: { x: 80, y: 20 } },
    { name: 'GCP', color: '#4285F4', position: { x: 50, y: 70 } }
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <div className="absolute inset-0">
        {cloudProviders.map((provider, index) => (
          <motion.div
            key={provider.name}
            className="absolute"
            style={{
              left: `${provider.position.x}%`,
              top: `${provider.position.y}%`
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: index * 1.3
            }}
          >
            <Cloud 
              className="w-16 h-16" 
              style={{ color: provider.color }} 
            />
          </motion.div>
        ))}
        
        <svg className="absolute inset-0 w-full h-full">
          {cloudProviders.map((provider, index) => (
            <motion.line
              key={`line-${index}`}
              x1={`${provider.position.x}%`}
              y1={`${provider.position.y}%`}
              x2="50%"
              y2="50%"
              stroke="#00D4FF"
              strokeWidth="2"
              strokeOpacity="0.4"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: 2,
                delay: index * 0.5,
                repeat: Infinity,
                repeatType: "reverse",
                repeatDelay: 1
              }}
            />
          ))}
        </svg>
      </div>

      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6 glow-text">
            Bringing Code to Cloud,{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
              Seamlessly
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-12 max-w-2xl mx-auto">
            Expert DevOps Engineer specializing in cloud infrastructure, CI/CD pipelines, 
            and scalable deployment solutions.
          </p>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Link
              to="/demo"
              className="inline-flex items-center space-x-3 px-8 py-4 text-lg font-semibold text-white btn-primary rounded-full hover:scale-105 transition-all duration-300"
            >
              <Zap className="w-6 h-6" />
              <span>Start Live Demo</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </motion.div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-900 to-transparent" />
    </section>
  );
};

export default HeroSection;