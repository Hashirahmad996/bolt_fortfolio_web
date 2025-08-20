import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Terminal, Home, Play, FolderOpen } from 'lucide-react';

const Navbar = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/demo', label: 'Live Demo', icon: Play },
    { path: '/projects', label: 'Projects', icon: FolderOpen }
  ];

  return (
    <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-50 backdrop-blur-md bg-opacity-95">
      <div className="container mx-auto px-6 py-4">
        <nav className="flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center space-x-2 text-cyan-400 hover:text-cyan-300 transition-colors"
          >
            <Terminal className="w-8 h-8" />
            <span className="text-xl font-bold">DevOps.Pro</span>
          </Link>
          
          <ul className="flex space-x-8">
            {navItems.map(({ path, label, icon: Icon }) => (
              <li key={path}>
                <Link
                  to={path}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                    location.pathname === path
                      ? 'bg-cyan-500 bg-opacity-20 text-cyan-400 glow-border'
                      : 'text-gray-300 hover:text-white hover:bg-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;