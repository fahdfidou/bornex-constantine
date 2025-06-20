
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
      <div className="min-h-screen bg-gray-50 flex w-full">
        <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 p-6">
            {renderContent()}
          </main>
        </div>
      </div>
    </LanguageProvider>
  );
};

export default Index;
