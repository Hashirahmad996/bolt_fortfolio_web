import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GitCommitHorizontal, Settings, Rocket, Activity, ChevronRight } from 'lucide-react';

const WorkflowVisualization = () => {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const steps = [
    {
      id: 'commit',
      title: 'Code Commit',
      description: 'Developers push code changes to version control, triggering automated workflows.',
      icon: GitCommitHorizontal,
      color: '#00FF88'
    },
    {
      id: 'provision',
      title: 'Infrastructure Provisioning',
      description: 'Terraform and cloud-native tools automatically provision and configure infrastructure.',
      icon: Settings,
      color: '#00D4FF'
    },
    {
      id: 'deploy',
      title: 'Deployment',
      description: 'Applications are deployed to Kubernetes clusters with zero-downtime strategies.',
      icon: Rocket,
      color: '#8B5CF6'
    },
    {
      id: 'monitor',
      title: 'Monitoring',
      description: 'Real-time monitoring and alerting ensure optimal performance and reliability.',
      icon: Activity,
      color: '#FF6B6B'
    }
  ];

  return (
    <section className="py-20 bg-gray-800 relative">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            CI/CD Pipeline Workflow
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Interactive visualization of a modern DevOps pipeline, from code commit to production monitoring.
          </p>
        </motion.div>

        <div className="relative max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-8 md:space-y-0 md:space-x-4">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = activeStep === step.id;
              
              return (
                <React.Fragment key={step.id}>
                  <motion.div
                    className={`relative cursor-pointer group ${
                      isActive ? 'scale-110' : 'hover:scale-105'
                    }`}
                    onClick={() => setActiveStep(isActive ? null : step.id)}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isActive
                          ? `border-[${step.color}] bg-opacity-20`
                          : 'border-gray-600 hover:border-gray-400'
                      }`}
                      style={{
                        backgroundColor: isActive ? `${step.color}20` : 'transparent',
                        borderColor: isActive ? step.color : undefined
                      }}
                    >
                      <Icon
                        className="w-10 h-10 transition-colors duration-300"
                        style={{ color: isActive ? step.color : '#9CA3AF' }}
                      />
                    </div>
                    
                    <div className="text-center mt-4">
                      <h3 className="text-lg font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                    </div>

                    {isActive && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 w-80 p-4 bg-gray-700 rounded-lg border border-gray-600 z-10"
                      >
                        <p className="text-gray-300 text-sm">
                          {step.description}
                        </p>
                      </motion.div>
                    )}
                  </motion.div>

                  {index < steps.length - 1 && (
                    <motion.div
                      className="hidden md:flex items-center"
                      animate={{ opacity: [0.3, 1, 0.3] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <ChevronRight className="w-6 h-6 text-cyan-400" />
                    </motion.div>
                  )}
                </React.Fragment>
              );
            })}
          </div>

          <div className="absolute inset-0 -z-10">
            <svg className="w-full h-full">
              <motion.path
                d="M 50 100 Q 200 50 350 100 Q 500 150 650 100"
                stroke="url(#gradient)"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 3, repeat: Infinity }}
              />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#00FF88" />
                  <stop offset="33%" stopColor="#00D4FF" />
                  <stop offset="66%" stopColor="#8B5CF6" />
                  <stop offset="100%" stopColor="#FF6B6B" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WorkflowVisualization;