import React, { useState } from 'react';
import { motion } from 'framer-motion';
import DeploymentConfigPanel from '../components/DeploymentConfig';
import LiveConsole from '../components/LiveConsole';
import DeploymentStatus from '../components/DeploymentStatus';

interface DeploymentConfig {
  cloudProvider: string;
  appType: string;
  region: string;
}

interface DeploymentResult {
  appUrl: string;
  grafanaUrl: string;
  kibanaUrl: string;
}

const LiveDemoPage = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [deploymentResult, setDeploymentResult] = useState<DeploymentResult | null>(null);
  const [progress, setProgress] = useState(0);

  const handleDeploy = async (config: DeploymentConfig) => {
    setIsDeploying(true);
    setDeploymentStatus('deploying');
    setLogs([]);
    setProgress(0);
    setDeploymentResult(null);

    const deploymentSteps = [
      `[INFO] Starting deployment to ${config.cloudProvider}`,
      `[INFO] Application type: ${config.appType}`,
      `[INFO] Target region: ${config.region}`,
      '[INFO] Initializing Terraform...',
      '[SUCCESS] Terraform initialized successfully',
      '[INFO] Planning infrastructure changes...',
      '[SUCCESS] Plan: 12 to add, 0 to change, 0 to destroy',
      '[INFO] Applying infrastructure changes...',
      '[INFO] Creating VPC and networking components...',
      '[SUCCESS] VPC created: vpc-abc123def456',
      '[INFO] Provisioning Kubernetes cluster...',
      '[INFO] Installing cluster autoscaler...',
      '[SUCCESS] Kubernetes cluster ready',
      '[INFO] Building container image...',
      '[SUCCESS] Image built: myapp:v1.2.3',
      '[INFO] Pushing to container registry...',
      '[SUCCESS] Image pushed successfully',
      '[INFO] Deploying application to Kubernetes...',
      '[INFO] Creating deployment, service, and ingress...',
      '[SUCCESS] Application deployed successfully',
      '[INFO] Setting up monitoring and logging...',
      '[SUCCESS] Grafana dashboard configured',
      '[SUCCESS] Kibana logging setup complete',
      '[SUCCESS] Deployment completed successfully!'
    ];

    for (let i = 0; i < deploymentSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, Math.random() * 1000 + 500));
      setLogs(prev => [...prev, deploymentSteps[i]]);
      setProgress(((i + 1) / deploymentSteps.length) * 100);
    }

    setDeploymentResult({
      appUrl: `https://myapp-${config.region}.${config.cloudProvider.toLowerCase()}.example.com`,
      grafanaUrl: `https://grafana-${config.region}.${config.cloudProvider.toLowerCase()}.example.com`,
      kibanaUrl: `https://kibana-${config.region}.${config.cloudProvider.toLowerCase()}.example.com`
    });

    setDeploymentStatus('success');
    setIsDeploying(false);
  };

  const handleDestroy = () => {
    setDeploymentStatus('idle');
    setLogs([]);
    setProgress(0);
    setDeploymentResult(null);
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
            Live Deployment Demo
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Experience real-time CI/CD pipeline execution. Select your deployment configuration 
            and watch as infrastructure is provisioned and applications are deployed with full observability.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          <div className="space-y-8">
            <DeploymentConfigPanel
              onDeploy={handleDeploy}
              isDeploying={isDeploying}
              onDestroy={handleDestroy}
              hasDeployment={deploymentResult !== null}
            />
            <DeploymentStatus
              status={deploymentStatus}
              progress={progress}
              result={deploymentResult}
            />
          </div>
          
          <LiveConsole logs={logs} isActive={isDeploying} />
        </div>
      </div>
    </div>
  );
};

export default LiveDemoPage;