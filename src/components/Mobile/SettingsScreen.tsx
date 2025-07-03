
import React, { useState } from 'react';
import { Globe, Moon, Sun, Bell, Shield, HelpCircle, Info, ChevronRight, Check } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

interface SettingsScreenProps {
  setActiveTab: (tab: string) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ setActiveTab }) => {
  const { t, language, setLanguage, darkMode, toggleDarkMode } = useLanguage();
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const settingsGroups = [
    {
      title: t('settings.preferences'),
      items: [
        {
          icon: Globe,
          label: t('settings.language'),
          value: languages.find(lang => lang.code === language)?.name,
          action: () => setShowLanguageDropdown(!showLanguageDropdown),
          type: 'select'
        },
        {
          icon: darkMode ? Moon : Sun,
          label: t('settings.theme'),
          value: darkMode ? t('settings.darkMode') : t('settings.lightMode'),
          action: toggleDarkMode,
          type: 'toggle'
        }
      ]
    },
    {
      title: t('settings.notifications'),
      items: [
        {
          icon: Bell,
          label: t('settings.chargingComplete'),
          value: true,
          action: () => {},
          type: 'toggle'
        },
        {
          icon: Bell,
          label: t('settings.stationUpdates'),
          value: true,
          action: () => {},
          type: 'toggle'
        },
        {
          icon: Bell,
          label: t('settings.promotions'),
          value: false,
          action: () => {},
          type: 'toggle'
        }
      ]
    },
    {
      title: t('settings.support'),
      items: [
        {
          icon: HelpCircle,
          label: t('help.title'),
          action: () => setActiveTab('help'),
          type: 'link'
        },
        {
          icon: Shield,
          label: t('settings.privacy'),
          action: () => {},
          type: 'link'
        },
        {
          icon: Info,
          label: t('settings.about'),
          action: () => {},
          type: 'link'
        }
      ]
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {t('settings.title')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {settingsGroups.map((group, groupIndex) => (
            <div key={groupIndex} className="space-y-3">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-2">
                {group.title}
              </h2>
              
              <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
                <CardContent className="p-0">
                  {group.items.map((item, itemIndex) => {
                    const Icon = item.icon;
                    const isLast = itemIndex === group.items.length - 1;
                    
                     return (
                       <React.Fragment key={itemIndex}>
                         <div 
                           className={`flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50/50 dark:hover:bg-gray-700/50 transition-colors duration-200 animate-fade-in-up ${
                             !isLast ? 'border-b border-gray-100/50 dark:border-gray-700/50' : ''
                           }`}
                           style={{ animationDelay: `${(groupIndex * 3 + itemIndex) * 0.1}s` }}
                           onClick={item.action}
                         >
                           <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                             <Icon className="h-5 w-5 text-white" />
                           </div>
                           
                           <div className="flex-1">
                             <h3 className="font-medium text-gray-900 dark:text-white">
                               {item.label}
                             </h3>
                             {item.value && typeof item.value === 'string' && (
                               <p className="text-sm text-gray-600 dark:text-gray-300">
                                 {item.value}
                               </p>
                             )}
                           </div>
                           
                           {item.type === 'toggle' && typeof item.value === 'boolean' && (
                             <Switch 
                               checked={item.value} 
                               onCheckedChange={item.action}
                             />
                           )}
                           
                           {item.type === 'link' && (
                             <ChevronRight className="h-5 w-5 text-gray-400" />
                           )}
                           
                           {item.type === 'select' && (
                             <ChevronRight className="h-5 w-5 text-gray-400" />
                           )}
                         </div>
                         
                         {/* Language Dropdown */}
                         {item.type === 'select' && item.label === t('settings.language') && showLanguageDropdown && (
                           <div className="bg-white/90 dark:bg-gray-800/90 backdrop-blur-xl border-t border-gray-100/50 dark:border-gray-700/50 p-2">
                             {languages.map((lang) => (
                               <div
                                 key={lang.code}
                                 className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors duration-200 ${
                                   language === lang.code 
                                     ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300' 
                                     : 'hover:bg-gray-50 dark:hover:bg-gray-700/50'
                                 }`}
                                 onClick={() => {
                                   setLanguage(lang.code as 'fr' | 'ar' | 'en');
                                   setShowLanguageDropdown(false);
                                 }}
                               >
                                 <span className="text-xl">{lang.flag}</span>
                                 <span className="flex-1 font-medium">{lang.name}</span>
                                 {language === lang.code && (
                                   <Check className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                 )}
                               </div>
                             ))}
                           </div>
                         )}
                       </React.Fragment>
                     );
                  })}
                </CardContent>
              </Card>
            </div>
          ))}

          {/* Language Selection */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardContent className="p-4">
              <h3 className="font-medium text-gray-900 dark:text-white mb-3">
                {t('settings.changeLanguage')}
              </h3>
              <div className="grid grid-cols-3 gap-2">
                {languages.map((lang) => (
                  <Button
                    key={lang.code}
                    variant={language === lang.code ? "default" : "outline"}
                    size="sm"
                    onClick={() => setLanguage(lang.code as 'fr' | 'ar' | 'en')}
                    className={`h-12 flex flex-col items-center justify-center gap-1 ${
                      language === lang.code
                        ? 'bg-gradient-to-br from-blue-500 to-purple-600 text-white'
                        : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="text-xs">{lang.name}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* App Version */}
          <div className="text-center text-sm text-gray-500 dark:text-gray-400">
            Version 2.1.0
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsScreen;
