import React from 'react';
import { motion } from 'framer-motion';
import { Award, Users, Clock, Globe } from 'lucide-react';

const AboutSection = () => {
  const stats = [
    { icon: Award, label: 'Years Experience', value: '8+' },
    { icon: Users, label: 'Projects Delivered', value: '150+' },
    { icon: Clock, label: 'Uptime Achieved', value: '99.9%' },
    { icon: Globe, label: 'Global Deployments', value: '25' }
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6 glow-text">
                About Me
              </h2>
              <div className="space-y-6 text-lg text-gray-300">
                <p>
                  Senior DevOps Engineer with 2+ years of experience in designing, implementing, 
                  and maintaining scalable cloud infrastructure and CI/CD pipelines for enterprise applications.
                </p>
                <p>
                  Specialized in cloud-native technologies, Kubernetes orchestration, and Infrastructure as Code. 
                  Passionate about automation, security, and creating efficient deployment workflows that enable 
                  development teams to deliver faster and more reliably.
                </p>
                <p>
                  Currently focused on multi-cloud strategies, GitOps workflows, and implementing observability 
                  practices that provide deep insights into application performance and system health.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="grid grid-cols-2 gap-6"
            >
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="bg-gray-800 p-6 rounded-xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 text-center glow-border"
                  >
                    <Icon className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                    <div className="text-3xl font-bold text-white mb-2 glow-text">
                      {stat.value}
                    </div>
                    <div className="text-gray-400 text-sm">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
