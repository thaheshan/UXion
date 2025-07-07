import React, { useState } from 'react';
import Header from './components/Layout/Header';
import Hero from './components/Home/Hero';
import ChatInterface from './components/Generate/ChatInterface';
import Dashboard from './components/Workspace/Dashboard';
import ShowcaseGallery from './components/Gallery/ShowcaseGallery';
import PricingPlans from './components/Pricing/PricingPlans';

function App() {
  const [currentSection, setCurrentSection] = useState('home');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderCurrentSection = () => {
    switch (currentSection) {
      case 'home':
        return <Hero setCurrentSection={setCurrentSection} />;
      case 'generate':
        return (
          <div className="min-h-screen pt-16">
            <div className="h-[calc(100vh-4rem)]">
              <ChatInterface />
            </div>
          </div>
        );
      case 'workspace':
        return <Dashboard />;
      case 'gallery':
        return <ShowcaseGallery />;
      case 'pricing':
        return <PricingPlans />;
      default:
        return <Hero setCurrentSection={setCurrentSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-primary-light dark:text-text-primary-dark">
      <Header
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />
      {renderCurrentSection()}
    </div>
  );
}

export default App;