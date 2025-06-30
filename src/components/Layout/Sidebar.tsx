
import React from 'react';
import { 
  LayoutDashboard, 
  Map, 
  Wrench, 
  CreditCard, 
  Users, 
  BarChart3,
  Settings,
  Menu,
  X
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { useState } from 'react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeTab, setActiveTab }) => {
  const { t, language } = useLanguage();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: t('nav.dashboard') },
    { id: 'map', icon: Map, label: t('nav.map') },
    { id: 'maintenance', icon: Wrench, label: t('nav.maintenance') },
    { id: 'payments', icon: CreditCard, label: t('nav.payments') },
    { id: 'users', icon: Users, label: t('nav.users') },
    { id: 'analytics', icon: BarChart3, label: t('nav.analytics') },
  ];

  return (
    <div className={`bg-gradient-to-b from-gray-900 to-gray-800 text-white transition-all duration-500 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col shadow-xl`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-gray-700 w-full justify-start transition-all duration-300 hover:scale-105"
        >
          <div className="transition-transform duration-300">
            {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </div>
          {!isCollapsed && (
            <span className="ml-2 transition-opacity duration-300">
              {language === 'ar' ? 'القائمة' : language === 'fr' ? 'Menu' : 'Menu'}
            </span>
          )}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={`w-full justify-start text-left transition-all duration-300 transform hover:translate-x-1 animate-[slideIn_0.5s_ease-out_forwards] ${
                activeTab === item.id 
                  ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-lg scale-105' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md'
              }`}
              style={{ 
                animationDelay: `${index * 50}ms`
              }}
            >
              <Icon className={`h-5 w-5 transition-transform duration-300 ${
                activeTab === item.id ? 'scale-110' : ''
              }`} />
              {!isCollapsed && (
                <span className={`ml-3 transition-all duration-300 ${
                  activeTab === item.id ? 'font-semibold' : ''
                }`}>
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          onClick={() => setActiveTab('settings')}
          className={`w-full justify-start transition-all duration-300 transform hover:translate-x-1 ${
            activeTab === 'settings'
              ? 'bg-gradient-to-r from-green-600 to-green-500 text-white hover:from-green-700 hover:to-green-600 shadow-lg scale-105'
              : 'text-gray-300 hover:bg-gray-800 hover:text-white hover:shadow-md'
          }`}
        >
          <Settings className={`h-5 w-5 transition-transform duration-300 ${
            activeTab === 'settings' ? 'scale-110 rotate-90' : ''
          }`} />
          {!isCollapsed && (
            <span className={`ml-3 transition-all duration-300 ${
              activeTab === 'settings' ? 'font-semibold' : ''
            }`}>
              {t('common.settings')}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
