
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
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ease-in-out ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col shadow-sm`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-100">
        <div className="flex items-center justify-between">
          {!isCollapsed && (
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">B</span>
              </div>
              <span className="font-semibold text-gray-900">BorneX</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="text-gray-500 hover:text-gray-700 hover:bg-gray-50 p-1.5 h-auto"
          >
            {isCollapsed ? <Menu className="h-4 w-4" /> : <X className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-1">
        {menuItems.map((item, index) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={`w-full justify-start text-left h-11 px-3 transition-all duration-200 hover:bg-blue-50 ${
                activeTab === item.id 
                  ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 font-medium' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              style={{ 
                animationDelay: `${index * 50}ms`
              }}
            >
              <Icon className={`h-5 w-5 transition-colors duration-200 ${
                activeTab === item.id ? 'text-blue-600' : 'text-gray-400'
              }`} />
              {!isCollapsed && (
                <span className="ml-3 text-sm">
                  {item.label}
                </span>
              )}
            </Button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-3 border-t border-gray-100">
        <Button
          variant="ghost"
          onClick={() => setActiveTab('settings')}
          className={`w-full justify-start h-11 px-3 transition-all duration-200 hover:bg-blue-50 ${
            activeTab === 'settings'
              ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600 font-medium'
              : 'text-gray-600 hover:text-gray-900'
          }`}
        >
          <Settings className={`h-5 w-5 transition-colors duration-200 ${
            activeTab === 'settings' ? 'text-blue-600' : 'text-gray-400'
          }`} />
          {!isCollapsed && (
            <span className="ml-3 text-sm">
              {t('common.settings')}
            </span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
