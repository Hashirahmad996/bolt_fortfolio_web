import React from 'react';
import { motion } from 'framer-motion';
import { Settings, Play, Trash2 } from 'lucide-react';

interface DeploymentConfig {
  cloudProvider: string;
  appType: string;
  region: string;
}

interface DeploymentConfigProps {
  onDeploy: (config: DeploymentConfig) => void;
  isDeploying: boolean;
  onDestroy: () => void;
  hasDeployment: boolean;
}

const DeploymentConfigPanel = ({ onDeploy, isDeploying, onDestroy, hasDeployment }: DeploymentConfigProps) => {
  const [config, setConfig] = React.useState<DeploymentConfig>({
    cloudProvider: 'AWS',
    appType: 'Web Application',
    region: 'us-east-1'
  });

  const cloudProviders = [
    { value: 'AWS', label: 'Amazon Web Services', regions: ['us-east-1', 'us-west-2', 'eu-west-1'] },
    { value: 'Azure', label: 'Microsoft Azure', regions: ['eastus', 'westus2', 'westeurope'] },
    { value: 'GCP', label: 'Google Cloud Platform', regions: ['us-central1', 'us-west1', 'europe-west1'] }
  ];

  const appTypes = ['Web Application', 'API Service', 'Microservice', 'Static Website'];

  const handleDeploy = () => {
    if (!isDeploying) {
      onDeploy(config);
    }
  };

  const selectedProvider = cloudProviders.find(p => p.value === config.cloudProvider);

  return (
    <motion.div
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 rounded-xl p-8 border border-gray-700"
    >
      <div className="flex items-center space-x-3 mb-8">
        <Settings className="w-6 h-6 text-cyan-400" />
        <h2 className="text-2xl font-bold text-white">Deployment Configuration</h2>
      </div>

      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Cloud Provider
          </label>
          <div className="grid grid-cols-1 gap-3">
            {cloudProviders.map((provider) => (
              <button
                key={provider.value}
                onClick={() => setConfig(prev => ({ 
                  ...prev, 
                  cloudProvider: provider.value,
                  region: provider.regions[0]
                }))}
                className={`p-4 rounded-lg border text-left transition-all duration-300 ${
                  config.cloudProvider === provider.value
                    ? 'border-cyan-500 bg-cyan-500 bg-opacity-10 text-cyan-400'
                    : 'border-gray-600 hover:border-gray-500 text-gray-300'
                }`}
                disabled={isDeploying}
              >
                <div className="font-semibold">{provider.label}</div>
                <div className="text-sm opacity-75">{provider.value}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Application Type
          </label>
          <select
            value={config.appType}
            onChange={(e) => setConfig(prev => ({ ...prev, appType: e.target.value }))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            disabled={isDeploying}
          >
            {appTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-3">
            Region
          </label>
          <select
            value={config.region}
            onChange={(e) => setConfig(prev => ({ ...prev, region: e.target.value }))}
            className="w-full p-3 bg-gray-700 border border-gray-600 rounded-lg text-white focus:border-cyan-500 focus:outline-none"
            disabled={isDeploying}
          >
            {selectedProvider?.regions.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        <div className="flex space-x-4 pt-4">
          <button
            onClick={handleDeploy}
            disabled={isDeploying}
            className={`flex-1 flex items-center justify-center space-x-3 py-4 px-6 rounded-lg font-semibold transition-all duration-300 ${
              isDeploying
                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                : 'btn-primary text-white hover:scale-105'
            }`}
          >
            <Play className="w-5 h-5" />
            <span>{isDeploying ? 'Deploying...' : 'Initiate Deployment'}</span>
          </button>

          {hasDeployment && (
            <button
              onClick={onDestroy}
              disabled={isDeploying}
              className="px-6 py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all duration-300 flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Trash2 className="w-4 h-4" />
              <span>Destroy</span>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default DeploymentConfigPanel;