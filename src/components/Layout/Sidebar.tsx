
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
  const { t } = useLanguage();
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
    <div className={`bg-gray-900 text-white transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    } min-h-screen flex flex-col`}>
      {/* Toggle Button */}
      <div className="p-4 border-b border-gray-700">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="text-white hover:bg-gray-700 w-full justify-start"
        >
          {isCollapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
          {!isCollapsed && <span className="ml-2">Menu</span>}
        </Button>
      </div>

      {/* Menu Items */}
      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          return (
            <Button
              key={item.id}
              variant="ghost"
              onClick={() => setActiveTab(item.id)}
              className={`w-full justify-start text-left ${
                activeTab === item.id 
                  ? 'bg-orange-600 text-white hover:bg-orange-700' 
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              }`}
            >
              <Icon className="h-5 w-5" />
              {!isCollapsed && <span className="ml-3">{item.label}</span>}
            </Button>
          );
        })}
      </nav>

      {/* Settings */}
      <div className="p-4 border-t border-gray-700">
        <Button
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:bg-gray-800 hover:text-white"
        >
          <Settings className="h-5 w-5" />
          {!isCollapsed && <span className="ml-3">Paramètres</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
