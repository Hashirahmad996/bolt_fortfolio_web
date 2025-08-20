import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Filter, Calendar, Users, ExternalLink } from 'lucide-react';
import { circInOut } from "framer-motion";

const ProjectsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const projects = [
    {
      id: 'kubernetes-cluster',
      title: 'Multi-Cloud Kubernetes Platform',
      description: 'Enterprise-grade Kubernetes platform with automated scaling, monitoring, and security across AWS, Azure, and GCP.',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Kubernetes', 'Terraform', 'Helm', 'Prometheus', 'Grafana', 'ArgoCD'],
      duration: '4 months',
      team: '5 engineers',
      status: 'completed',
      category: 'Infrastructure',
      year: '2024'
    },
    {
      id: 'cicd-pipeline',
      title: 'Advanced CI/CD Pipeline',
      description: 'Fully automated CI/CD pipeline with GitOps workflow, security scanning, and zero-downtime deployments.',
      image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Jenkins', 'ArgoCD', 'Docker', 'SonarQube', 'Nexus', 'Slack'],
      duration: '3 months',
      team: '3 engineers',
      status: 'completed',
      category: 'DevOps',
      year: '2024'
    },
    {
      id: 'monitoring-stack',
      title: 'Observability Platform',
      description: 'Comprehensive monitoring and logging solution with custom dashboards, alerting, and performance analytics.',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Grafana', 'Prometheus', 'ELK Stack', 'Jaeger', 'AlertManager'],
      duration: '2 months',
      team: '4 engineers',
      status: 'completed',
      category: 'Monitoring',
      year: '2023'
    },
    {
      id: 'microservices-migration',
      title: 'Microservices Migration',
      description: 'Large-scale migration from monolithic architecture to microservices with service mesh implementation.',
      image: 'https://images.pexels.com/photos/1181298/pexels-photo-1181298.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Istio', 'Kubernetes', 'gRPC', 'Redis', 'PostgreSQL'],
      duration: '6 months',
      team: '8 engineers',
      status: 'in-progress',
      category: 'Architecture',
      year: '2024'
    },
    {
      id: 'security-automation',
      title: 'DevSecOps Automation',
      description: 'Automated security scanning and compliance monitoring integrated into the development lifecycle.',
      image: 'https://images.pexels.com/photos/1181316/pexels-photo-1181316.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Vault', 'Falco', 'OPA', 'Twistlock', 'Aqua Security'],
      duration: '3 months',
      team: '3 engineers',
      status: 'planning',
      category: 'Security',
      year: '2024'
    },
    {
      id: 'cloud-migration',
      title: 'Multi-Cloud Migration',
      description: 'Strategic migration of legacy systems to cloud-native architecture with cost optimization.',
      image: 'https://images.pexels.com/photos/1181354/pexels-photo-1181354.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['AWS', 'Terraform', 'Lambda', 'RDS', 'CloudFormation'],
      duration: '5 months',
      team: '6 engineers',
      status: 'completed',
      category: 'Cloud',
      year: '2023'
    },
    {
      id: 'container-orchestration',
      title: 'Container Orchestration Platform',
      description: 'Custom container orchestration solution with auto-scaling, load balancing, and service discovery.',
      image: 'https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Docker', 'Kubernetes', 'Consul', 'Traefik', 'Vault'],
      duration: '4 months',
      team: '5 engineers',
      status: 'completed',
      category: 'Infrastructure',
      year: '2023'
    },
    {
      id: 'data-pipeline',
      title: 'Real-time Data Pipeline',
      description: 'High-throughput data processing pipeline with stream processing and real-time analytics.',
      image: 'https://images.pexels.com/photos/1181533/pexels-photo-1181533.jpeg?auto=compress&cs=tinysrgb&w=800',
      technologies: ['Kafka', 'Spark', 'Elasticsearch', 'Kibana', 'Redis'],
      duration: '3 months',
      team: '4 engineers',
      status: 'completed',
      category: 'Data',
      year: '2023'
    }
  ];

  const categories = ['all', 'Infrastructure', 'DevOps', 'Monitoring', 'Architecture', 'Security', 'Cloud', 'Data'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400 bg-green-400';
      case 'in-progress': return 'text-blue-400 bg-blue-400';
      case 'planning': return 'text-yellow-400 bg-yellow-400';
      default: return 'text-gray-400 bg-gray-400';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed': return 'Completed';
      case 'in-progress': return 'In Progress';
      case 'planning': return 'Planning';
      default: return 'Unknown';
    }
  };

  const filteredProjects = projects.filter(project => {
    const matchesCategory = selectedCategory === 'all' || project.category === selectedCategory;
    const matchesSearch = project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         project.technologies.some(tech => tech.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: circInOut,
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6 glow-text">
            Project Portfolio
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            A comprehensive showcase of DevOps and cloud infrastructure projects, demonstrating 
            expertise in modern deployment practices and scalable solutions.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <div className="flex flex-col lg:flex-row gap-6 items-center justify-between max-w-6xl mx-auto">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-gray-800 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-cyan-500 focus:outline-none"
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <Filter className="w-5 h-5 text-gray-400" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                      selectedCategory === category
                        ? 'bg-cyan-500 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {category === 'all' ? 'All Projects' : category}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-12"
        >
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              whileHover={{
                y: -10,
                transition: { duration: 0.3 }
              }}
              className="group"
            >
              <Link to={`/project/${project.id}`}>
                <div className="bg-gray-800 rounded-xl overflow-hidden border border-gray-700 hover:border-cyan-500 transition-all duration-300 h-full">
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-transparent to-transparent opacity-60" />
                    
                    <div className="absolute top-4 right-4">
                      <div className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)} bg-opacity-20 border`}>
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status).split(' ')[1]} bg-opacity-100`} />
                          <span className={getStatusColor(project.status).split(' ')[0]}>
                            {getStatusLabel(project.status)}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="absolute top-4 left-4 space-y-2">
                      <span className="block px-3 py-1 bg-gray-800 bg-opacity-80 text-cyan-400 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                      <span className="block px-3 py-1 bg-gray-800 bg-opacity-80 text-gray-300 text-xs font-medium rounded-full">
                        {project.year}
                      </span>
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-gray-300 text-sm mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-400 mb-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>{project.duration}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Users className="w-3 h-3" />
                        <span>{project.team}</span>
                      </div>
                    </div>
                    
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.technologies.slice(0, 3).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 3 && (
                        <span className="px-2 py-1 bg-gray-700 text-gray-300 text-xs rounded">
                          +{project.technologies.length - 3} more
                        </span>
                      )}
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <span className="text-cyan-400 text-sm font-medium group-hover:text-cyan-300 transition-colors">
                        View Details
                      </span>
                      <ExternalLink className="w-4 h-4 text-cyan-400 group-hover:text-cyan-300 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <div className="text-gray-400 mb-4">
              <Filter className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <h3 className="text-xl font-semibold mb-2">No projects found</h3>
              <p>Try adjusting your search terms or category filter.</p>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProjectsPage;