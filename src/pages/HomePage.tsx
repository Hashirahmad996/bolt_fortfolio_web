import React from 'react';
import HeroSection from '../components/HeroSection';
import WorkflowVisualization from '../components/WorkflowVisualization';
import SkillsGrid from '../components/SkillsGrid';
import FeaturedProjects from '../components/FeaturedProjects';
import AboutSection from '../components/AboutSection';

const HomePage = () => {
  return (
    <div className="space-y-0">
      <HeroSection />
      <WorkflowVisualization />
      <SkillsGrid />
      <FeaturedProjects />
      <AboutSection />
    </div>
  );
};

export default HomePage;