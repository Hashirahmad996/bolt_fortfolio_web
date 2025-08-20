import React, { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Download } from 'lucide-react';

interface LiveConsoleProps {
  logs: string[];
  isActive: boolean;
}

const LiveConsole = ({ logs, isActive }: LiveConsoleProps) => {
  const consoleRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight;
    }
  }, [logs]);

  const getLogStyle = (log: string) => {
    if (log.includes('[SUCCESS]')) {
      return { color: '#00FF88', prefix: '✓' };
    } else if (log.includes('[ERROR]')) {
      return { color: '#FF6B6B', prefix: '✗' };
    } else if (log.includes('[INFO]')) {
      return { color: '#00D4FF', prefix: 'ℹ' };
    }
    return { color: '#9CA3AF', prefix: '•' };
  };

  const downloadLogs = () => {
    const logContent = logs.join('\n');
    const blob = new Blob([logContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'deployment-logs.txt';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8 }}
      className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
    >
      <div className="bg-gray-700 p-4 border-b border-gray-600 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Terminal className="w-5 h-5 text-cyan-400" />
          <h3 className="text-lg font-semibold text-white">Live Console Output</h3>
          {isActive && (
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-400">Live</span>
            </div>
          )}
        </div>
        
        {logs.length > 0 && (
          <button
            onClick={downloadLogs}
            className="flex items-center space-x-2 px-3 py-1 bg-gray-600 hover:bg-gray-500 rounded text-sm text-gray-300 transition-colors"
          >
            <Download className="w-4 h-4" />
            <span>Export</span>
          </button>
        )}
      </div>

      <div
        ref={consoleRef}
        className="log-container h-96 p-4 overflow-y-auto text-sm"
      >
        {logs.length === 0 ? (
          <div className="flex items-center justify-center h-full text-gray-500">
            <div className="text-center">
              <Terminal className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Console output will appear here during deployment</p>
            </div>
          </div>
        ) : (
          <div className="space-y-1">
            {logs.map((log, index) => {
              const { color, prefix } = getLogStyle(log);
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-start space-x-3 py-1"
                >
                  <span className="text-xs opacity-60 w-16 flex-shrink-0">
                    {new Date().toLocaleTimeString()}
                  </span>
                  <span style={{ color }} className="flex-shrink-0 w-4">
                    {prefix}
                  </span>
                  <span style={{ color }} className="flex-1 break-words">
                    {log.replace(/\[(SUCCESS|ERROR|INFO)\]\s*/, '')}
                  </span>
                </motion.div>
              );
            })}
            
            {isActive && (
              <motion.div
                animate={{ opacity: [1, 0.3, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
                className="flex items-center space-x-2 py-2 text-cyan-400"
              >
                <div className="w-2 h-2 bg-cyan-400 rounded-full" />
                <span className="text-sm">Processing...</span>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default LiveConsole;