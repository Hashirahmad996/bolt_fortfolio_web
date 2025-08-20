import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft, Github, ExternalLink, Clock, Users, Award } from 'lucide-react';

const ProjectDetailPage = () => {
  const { id } = useParams();

  const projectData = {
    'kubernetes-cluster': {
      title: 'Multi-Cloud Kubernetes Platform',
      description: 'Enterprise-grade Kubernetes platform with automated scaling, monitoring, and security',
      technologies: ['Kubernetes', 'Terraform', 'Helm', 'Prometheus', 'Grafana', 'ArgoCD'],
      duration: '4 months',
      team: '5 engineers',
      status: 'Production',
      problem: 'The organization needed a scalable, multi-cloud Kubernetes platform that could handle their growing microservices architecture while maintaining high availability and security standards.',
      solution: 'Designed and implemented a comprehensive Kubernetes platform using Infrastructure as Code principles, with automated CI/CD pipelines, comprehensive monitoring, and security hardening.',
      challenges: [
        'Multi-cloud networking complexities',
        'Service mesh integration',
        'Zero-downtime deployments',
        'Compliance and security requirements'
      ],
      results: [
        '99.9% uptime achievement',
        '50% reduction in deployment time',
        '30% cost optimization',
        'Zero security incidents'
      ],
      architecture: {
        components: [
          'Load Balancers',
          'Kubernetes Clusters',
          'Service Mesh (Istio)',
          'Monitoring Stack',
          'CI/CD Pipeline',
          'Security Scanning'
        ]
      }
    }
  };

  const project = projectData[id as keyof typeof projectData] || projectData['kubernetes-cluster'];

  return (
    <div className="min-h-screen bg-gray-900 pt-8">
      <div className="container mx-auto px-6 max-w-4xl">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="mb-8"
        >
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-4 glow-text">
            {project.title}
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-6 mb-8">
            <div className="flex items-center space-x-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>{project.duration}</span>
            </div>
            <div className="flex items-center space-x-2 text-gray-400">
              <Users className="w-4 h-4" />
              <span>{project.team}</span>
            </div>
            <div className="flex items-center space-x-2 text-green-400">
              <Award className="w-4 h-4" />
              <span>{project.status}</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 bg-gray-800 border border-gray-700 rounded-full text-sm text-cyan-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        <div className="space-y-12">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Problem Statement</h2>
            <p className="text-gray-300 leading-relaxed">
              {project.problem}
            </p>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Solution</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              {project.solution}
            </p>
            
            <div className="bg-gray-700 rounded-lg p-6 border border-gray-600">
              <h3 className="text-lg font-semibold text-white mb-4">System Architecture</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {project.architecture.components.map((component, index) => (
                  <div key={component} className="bg-gray-600 p-4 rounded-lg text-center border border-gray-500">
                    <div className="text-sm text-gray-300">{component}</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.section>

          <div className="grid md:grid-cols-2 gap-8">
            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Challenges Faced</h2>
              <ul className="space-y-3">
                {project.challenges.map((challenge, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-red-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{challenge}</span>
                  </li>
                ))}
              </ul>
            </motion.section>

            <motion.section
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-gray-800 rounded-xl p-8 border border-gray-700"
            >
              <h2 className="text-2xl font-bold text-white mb-4">Results</h2>
              <ul className="space-y-3">
                {project.results.map((result, index) => (
                  <li key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-gray-300">{result}</span>
                  </li>
                ))}
              </ul>
            </motion.section>
          </div>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-gray-800 rounded-xl p-8 border border-gray-700"
          >
            <h2 className="text-2xl font-bold text-white mb-4">Implementation Example</h2>
            <div className="bg-gray-900 rounded-lg border border-gray-600 overflow-hidden">
              <div className="bg-gray-700 px-4 py-2 border-b border-gray-600">
                <span className="text-sm text-gray-300">terraform/main.tf</span>
              </div>
              <pre className="p-4 text-sm text-gray-300 overflow-x-auto">
{`resource "kubernetes_deployment" "app" {
  metadata {
    name = "microservice-app"
    labels = {
      app = "microservice"
    }
  }

  spec {
    replicas = 3
    selector {
      match_labels = {
        app = "microservice"
      }
    }

    template {
      metadata {
        labels = {
          app = "microservice"
        }
      }

      spec {
        container {
          image = "app:latest"
          name  = "microservice"
          
          resources {
            limits = {
              cpu    = "500m"
              memory = "512Mi"
            }
            requests = {
              cpu    = "250m"
              memory = "256Mi"
            }
          }

          liveness_probe {
            http_get {
              path = "/health"
              port = 8080
            }
            initial_delay_seconds = 30
            period_seconds        = 10
          }
        }
      }
    }
  }
}`}
              </pre>
            </div>
          </motion.section>

          <motion.section
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="flex flex-wrap gap-4 justify-center pb-12"
          >
            <a
              href="#"
              className="inline-flex items-center space-x-2 px-6 py-3 bg-gray-800 hover:bg-gray-700 border border-gray-600 rounded-lg text-white transition-colors"
            >
              <Github className="w-5 h-5" />
              <span>View Source</span>
            </a>
            <a
              href="#"
              className="inline-flex items-center space-x-2 px-6 py-3 btn-primary text-white rounded-lg transition-all"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Live Demo</span>
            </a>
          </motion.section>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;