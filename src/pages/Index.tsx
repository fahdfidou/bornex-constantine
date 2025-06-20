
import React, { useState } from 'react';
import { LanguageProvider } from '../contexts/LanguageContext';
import Header from '../components/Layout/Header';
import Sidebar from '../components/Layout/Sidebar';
import Dashboard from '../components/Dashboard/Dashboard';

const Index = () => {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'map':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Carte interactive - À venir</p>
          </div>
        );
      case 'maintenance':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Module de maintenance - À venir</p>
          </div>
        );
      case 'payments':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Gestion des paiements - À venir</p>
          </div>
        );
      case 'users':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Gestion des utilisateurs - À venir</p>
          </div>
        );
      case 'analytics':
        return (
          <div className="flex items-center justify-center h-96">
            <p className="text-gray-500">Analytiques avancées - À venir</p>
          </div>
        );
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
