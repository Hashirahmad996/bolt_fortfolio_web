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
  monitorUrl: string;
  status?: string;
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

  const appKey = "dbadd46115526a98ea56";
  const cluster = "ap2"

  if (!appKey || !cluster) {
    console.error('Pusher environment variables not set.');
    setLogs(prev => [...prev, '[ERROR] Pusher configuration is missing.']);
    return;
  }

  const pusher = new Pusher(appKey, {
    cluster: cluster,
  });
  const channel = pusher.subscribe('my-channel');

  setLogs(prev => [...prev, '[INFO] Subscribed to channel: my-channel']);
  
  channel.bind('log-update', (data: any) => {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      if (parsedData.message) {
        setLogs(prev => [...prev, `[INFO] ${parsedData.message}`]);
      }
    } catch (error) {
      console.error('Failed to process log-update event:', error);
    }
  });

  channel.bind('deployment-error', (data: any) => {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      const errorMessage = parsedData.error || 'An unknown error occurred.';
      setLogs(prev => [...prev, `[ERROR] ${errorMessage}`]);
      setDeploymentStatus('error');
      setIsDeploying(false);
      setProgress(100); // Set progress to 100 to show completion, even on error
    } catch (error) {
      console.error('Failed to process deployment-error event:', error);
      setLogs(prev => [...prev, '[ERROR] Failed to process the error event.']);
    }
  });

  channel.bind('deployment-success', (data: any) => {
    try {
      const parsedData = typeof data === 'string' ? JSON.parse(data) : data;
      setDeploymentResult({
        appUrl: parsedData.app_url || '',
        monitorUrl: parsedData.monitor_url || '',
        status: 'success',
      });
      setLogs(prev => [...prev, '[SUCCESS] Deployment completed successfully!']);
      setDeploymentStatus('success');
      setIsDeploying(false);
      setProgress(100);
    } catch (error) {
      console.error('Failed to process deployment-success event:', error);
      setLogs(prev => [...prev, '[ERROR] Failed to process the success event.']);
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

    listenForDeploymentStatus();

    try {
      await fetch('https://n8n-service-myxr.onrender.com/webhook/initiate-deployment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username: config.username }),
      });
      setLogs(prev => [...prev, `[INFO] Deployment initiated for user: ${config.username}. Waiting for trigger...`]);
    } catch (err) {
      console.error('Failed to send user information:', err);
      setLogs(prev => [...prev, '[ERROR] Failed to initiate deployment.']);
      setDeploymentStatus('error');
      setIsDeploying(false);
    }
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
