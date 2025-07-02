
import React from 'react';
import { Home, MapPin, Zap, User, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';

interface MobileNavigationProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const MobileNavigation: React.FC<MobileNavigationProps> = ({ activeTab, setActiveTab }) => {
  const { t } = useLanguage();

  const navigationItems = [
    { id: 'home', icon: Home, label: t('nav.home') },
    { id: 'stations', icon: MapPin, label: t('nav.stations') },
    { id: 'charging', icon: Zap, label: t('nav.charging') },
    { id: 'profile', icon: User, label: t('nav.profile') },
    { id: 'settings', icon: Settings, label: t('nav.settings') },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/80 dark:bg-gray-900/80 backdrop-blur-xl border-t border-gray-200/50 dark:border-gray-700/50 z-50">
      <div className="flex justify-around items-center py-2 px-4 max-w-md mx-auto">
        {navigationItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center justify-center py-2 px-3 h-auto min-h-[60px] transition-all duration-300 ${
                isActive 
                  ? 'text-blue-600 dark:text-blue-400' 
                  : 'text-gray-600 dark:text-gray-400'
              }`}
            >
              <div className={`relative transition-all duration-300 ${
                isActive ? 'scale-110' : 'scale-100'
              }`}>
                <Icon className={`h-6 w-6 mb-1 transition-all duration-300 ${
                  isActive ? 'text-blue-600 dark:text-blue-400' : ''
                }`} />
                {isActive && (
                  <div className="absolute -top-1 -inset-1 bg-blue-100 dark:bg-blue-900/30 rounded-full -z-10 animate-pulse" />
                )}
              </div>
              <span className={`text-xs font-medium transition-all duration-300 ${
                isActive ? 'text-blue-600 dark:text-blue-400' : ''
              }`}>
                {item.label}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default MobileNavigation;
