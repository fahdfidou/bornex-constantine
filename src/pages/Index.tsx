
import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';
import InteractiveMap from '../components/Map/InteractiveMap';
import MaintenancePage from '../components/Maintenance/MaintenancePage';
import PaymentsPage from '../components/Payments/PaymentsPage';
import UsersPage from '../components/Users/UsersPage';
import AnalyticsPage from '../components/Analytics/AnalyticsPage';
import SettingsPage from '../components/Settings/SettingsPage';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleTabChange = (newTab: string) => {
    if (newTab === activeTab) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveTab(newTab);
      setTimeout(() => setIsTransitioning(false), 50);
    }, 200);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return <InteractiveMap />;
      case 'maintenance':
        return <MaintenancePage />;
      case 'payments':
        return <PaymentsPage />;
      case 'users':
        return <UsersPage />;
      case 'analytics':
        return <AnalyticsPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex w-full transition-colors duration-300">
        <Sidebar activeTab={activeTab} setActiveTab={handleTabChange} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6 relative overflow-hidden">
            <div 
              className={`transition-all duration-300 ease-in-out transform ${
                isTransitioning 
                  ? 'opacity-0 translate-y-8 scale-95' 
                  : 'opacity-100 translate-y-0 scale-100'
              }`}
            >
              {renderContent()}
            </div>
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
