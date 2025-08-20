import React from 'react';
import { motion } from 'framer-motion';
import { circInOut } from "framer-motion";

import { 
  Container, Settings, Zap, BarChart3, Code, Cloud, 
  Server, Database, Shield, GitBranch, Monitor, Cpu 
} from 'lucide-react';

const SkillsGrid = () => {
  const skills = [
    { name: 'Kubernetes', icon: Container, category: 'Orchestration', color: '#326CE5' },
    { name: 'Terraform', icon: Settings, category: 'IaC', color: '#623CE4' },
    { name: 'Jenkins', icon: Zap, category: 'CI/CD', color: '#D33833' },
    { name: 'Grafana', icon: BarChart3, category: 'Monitoring', color: '#F46800' },
    { name: 'Python', icon: Code, category: 'Development', color: '#3776AB' },
    { name: 'AWS', icon: Cloud, category: 'Cloud', color: '#FF9900' },
    { name: 'Docker', icon: Server, category: 'Containers', color: '#2496ED' },
    { name: 'PostgreSQL', icon: Database, category: 'Database', color: '#336791' },
    { name: 'Security', icon: Shield, category: 'DevSecOps', color: '#00D4FF' },
    { name: 'Git', icon: GitBranch, category: 'Version Control', color: '#F05032' },
    { name: 'Prometheus', icon: Monitor, category: 'Monitoring', color: '#E6522C' },
    { name: 'Linux', icon: Cpu, category: 'OS', color: '#FCC624' }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.8 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: circInOut
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
            Technology Stack
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Cutting-edge tools and technologies for modern DevOps practices
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 max-w-6xl mx-auto"
        >
          {skills.map((skill, index) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                variants={itemVariants}
                whileHover={{
                  scale: 1.1,
                  y: -10,
                  transition: { duration: 0.3 }
                }}
                className="tech-logo group cursor-pointer"
              >
                <div className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-gray-500 transition-all duration-300 text-center h-full flex flex-col items-center justify-center space-y-3 tech-grid">
                  <div
                    className="p-3 rounded-lg transition-all duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${skill.color}20` }}
                  >
                    <Icon
                      className="w-8 h-8 transition-colors duration-300"
                      style={{ color: skill.color }}
                    />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-sm mb-1">
                      {skill.name}
                    </h3>
                    <p className="text-gray-400 text-xs">
                      {skill.category}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsGrid;