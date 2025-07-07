
import React, { useState } from 'react';
import { LanguageProvider } from '../../contexts/LanguageContext';
import IntroScreen from './IntroScreen';
import MobileNavigation from './MobileNavigation';
import HomeScreen from './HomeScreen';
import StationsScreen from './StationsScreen';
import ChargingScreen from './ChargingScreen';
import SubscriptionScreen from './SubscriptionScreen';
import MyStationScreen from './MyStationScreen';
import AIOptimizationScreen from './AIOptimizationScreen';
import ProfileScreen from './ProfileScreen';
import SettingsScreen from './SettingsScreen';
import HelpScreen from './HelpScreen';

const MobileApp = () => {
  const [showIntro, setShowIntro] = useState(true);
  const [activeTab, setActiveTab] = useState('home');

  const handleIntroComplete = () => {
    setShowIntro(false);
  };

  const renderScreen = () => {
    switch (activeTab) {
      case 'home':
        return <HomeScreen setActiveTab={setActiveTab} />;
      case 'stations':
        return <StationsScreen setActiveTab={setActiveTab} />;
      case 'charging':
        return <ChargingScreen setActiveTab={setActiveTab} />;
      case 'subscription':
        return <SubscriptionScreen setActiveTab={setActiveTab} />;
      case 'mystation':
        return <MyStationScreen setActiveTab={setActiveTab} />;
      case 'aioptimization':
        return <AIOptimizationScreen setActiveTab={setActiveTab} />;
      case 'profile':
        return <ProfileScreen setActiveTab={setActiveTab} />;
      case 'settings':
        return <SettingsScreen setActiveTab={setActiveTab} />;
      case 'help':
        return <HelpScreen setActiveTab={setActiveTab} />;
      default:
        return <HomeScreen setActiveTab={setActiveTab} />;
    }
  };

  if (showIntro) {
    return (
      <LanguageProvider>
        <IntroScreen onComplete={handleIntroComplete} />
      </LanguageProvider>
    );
  }

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        {/* Mobile Container - Full width on mobile, constrained on larger screens */}
        <div className="w-full sm:max-w-md sm:mx-auto bg-white dark:bg-gray-800 min-h-screen relative sm:shadow-2xl overflow-hidden">
          {/* Screen Content */}
          <div className="h-screen flex flex-col pb-16">
            {renderScreen()}
          </div>
          
          {/* Bottom Navigation */}
          <MobileNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        </div>
      </div>
    </LanguageProvider>
  );
};

export default MobileApp;
