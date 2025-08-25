import React from 'react';
import { motion } from 'framer-motion';
import { Clock, CheckCircle, XCircle, ExternalLink } from 'lucide-react';

interface DeploymentResult {
  appUrl: string;
  monitorUrl: string;
  status?: string;
}

interface DeploymentStatusProps {
  status: 'idle' | 'deploying' | 'success' | 'error';
  progress: number;
  result: DeploymentResult | null;
}

const DeploymentStatus = ({ status, progress, result }: DeploymentStatusProps) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'deploying':
        return <Clock className="w-6 h-6 text-blue-400 animate-spin" />;
      case 'success':
        return <CheckCircle className="w-6 h-6 text-green-400" />;
      case 'error':
        return <XCircle className="w-6 h-6 text-red-400" />;
      default:
        return <Clock className="w-6 h-6 text-gray-500" />;
    }
  };

  const getStatusText = () => {
    switch (status) {
      case 'deploying': return 'Deployment in Progress';
      case 'success': return 'Deployment Successful';
      case 'error': return 'Deployment Failed';
      default: return 'Ready to Deploy';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'deploying': return 'text-blue-400';
      case 'success': return 'text-green-400';
      case 'error': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gray-800 rounded-xl p-6 border border-gray-700"
    >
      <div className="flex items-center space-x-3 mb-6">
        {getStatusIcon()}
        <h3 className={`text-xl font-semibold ${getStatusColor()}`}>
          {getStatusText()}
        </h3>
      </div>

      {status === 'deploying' && (
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <motion.div
              className="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
        </div>
      )}

      {status === 'success' && result && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="space-y-4"
        >
          <h4 className="text-lg font-semibold text-white mb-4">
            Deployment Resources
          </h4>
          
          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <ExternalLink className="w-5 h-5 text-green-400" />
                <div>
                  <div className="font-medium text-white">Application</div>
                  <div className="text-sm text-gray-400">Live application endpoint</div>
                </div>
              </div>
              <a
                href={result.appUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                View App
              </a>
            </div>
          </div>

          <div className="bg-gray-700 rounded-lg p-4 border border-gray-600">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <motion.div className="w-5 h-5 text-orange-400">📊</motion.div>
                <div>
                  <div className="font-medium text-white">Monitoring Dashboard</div>
                  <div className="text-sm text-gray-400">Real-time application metrics</div>
                </div>
              </div>
              <a
                href={result.monitorUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white rounded-lg text-sm font-medium transition-colors"
              >
                View Metrics
              </a>
            </div>
          </div>
        </motion.div>
      )}

      {status === 'error' && (
        <div className="bg-red-900 bg-opacity-20 border border-red-700 rounded-lg p-4">
          <p className="text-red-400">
            Deployment failed. Check the console logs for details and try again.
          </p>
        </div>
      )}
    </motion.div>
  );
};

export default DeploymentStatus;