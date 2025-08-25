import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import DeploymentConfigPanel from '../components/DeploymentConfig';
import LiveConsole from '../components/LiveConsole';
import DeploymentStatus from '../components/DeploymentStatus';
import Pusher from 'pusher-js';

interface DeploymentConfig {
  cloudProvider: string;
  appType: string;
  region: string;
  username: string;
}

interface DeploymentResult {
  appUrl: string;
  grafanaUrl: string;
  kibanaUrl: string;
  n8nStatus?: string;
  n8nAppUrl?: string;
  n8nMonitorUrl?: string;
}

const LiveDemoPage = () => {
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<'idle' | 'deploying' | 'success' | 'error'>('idle');
  const [logs, setLogs] = useState<string[]>([]);
  const [deploymentResult, setDeploymentResult] = useState<DeploymentResult | null>(null);
  const [progress, setProgress] = useState(0);
  const eventSourceRef = useRef<EventSource | null>(null);

  const closeSseConnection = () => {
    if (eventSourceRef.current) {
      eventSourceRef.current.close();
      eventSourceRef.current = null;
      setLogs(prev => [...prev, '[INFO] SSE connection closed.']);
    }
  };

  
const listenForDeploymentStatus = () => {
  setLogs(prev => [...prev, '[INFO] Connecting to Pusher...']);

  const pusher = new Pusher('dbadd46115526a98ea56', {
    cluster: 'ap2',
  });
  const channel = pusher.subscribe('my‑channel');

  setLogs(prev => [...prev, '[INFO] Subscribed to channel: my‑channel']);
  
  channel.bind('my-event', (data: any) => {
    console.log('Pusher event received:', data);
    try {
      const parsedData = JSON.parse(data);
      setLogs(prev => [...prev, `[SUCCESS] Received status: ${parsedData.status}`]);

      setDeploymentResult(prevResult => ({
        ...prevResult!,
        n8nStatus: parsedData.status,
        n8nAppUrl: parsedData.app_url,
        n8nMonitorUrl: parsedData.monitor_url,
      }));

      if (parsedData.status === 'completed' || parsedData.status === 'failed') {
        setLogs(prev => [...prev, '[INFO] Deployment process ended.']);
        // No explicit connection closing needed for Pusher
      }
    } catch (error) {
      console.error('Failed to parse Pusher event data:', error);
      setLogs(prev => [...prev, '[ERROR] Failed to process incoming event.']);
    }
  });

  pusher.connection.bind('error', (err: any) => {
    console.error('Pusher connection error:', err);
    setLogs(prev => [...prev, '[ERROR] Pusher connection error.']);
  });
};


  useEffect(() => {
    return () => {
      closeSseConnection();
    };
  }, []);

  const handleDeploy = async (config: DeploymentConfig) => {
    setIsDeploying(true);
    setDeploymentStatus('deploying');
    setLogs([]);
    setProgress(0);
    setDeploymentResult(null);
    closeSseConnection(); // Close any existing connection

    try {
      await fetch('https://n8n-service-myxr.onrender.com/webhook/initiate-deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: config.username }),
      });
      setLogs(prev => [...prev, '[INFO] User information sent successfully.']);
    } catch (err) {
      console.error('Failed to send user information:', err);
      setLogs(prev => [...prev, '[ERROR] Failed to send user information.']);
    }

    const deploymentSteps = [
      `[INFO] Starting deployment for user: ${config.username}`,
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

    const initialResult = {
      appUrl: `https://myapp-${config.region}.${config.cloudProvider.toLowerCase()}.example.com`,
      grafanaUrl: `https://grafana-${config.region}.${config.cloudProvider.toLowerCase()}.example.com`,
      kibanaUrl: `https://kibana-${config.region}.${config.cloudProvider.toLowerCase()}.example.com`
    };
    setDeploymentResult(initialResult);

    setDeploymentStatus('success');
    setIsDeploying(false);

    listenForDeploymentStatus();
  };

  const handleDestroy = () => {
    setDeploymentStatus('idle');
    setLogs([]);
    setProgress(0);
    setDeploymentResult(null);
    closeSseConnection();
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
