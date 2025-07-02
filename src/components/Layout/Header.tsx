
import React from 'react';
import { Globe, Bell, User, Moon, Sun, Languages } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { language, setLanguage, t, darkMode, toggleDarkMode } = useLanguage();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷', nativeName: 'Français' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿', nativeName: 'العربية' },
    { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  return (
    <header className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50 transition-colors duration-200">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900 dark:text-white transition-colors duration-200">
              {language === 'ar' ? 'لوحة التحكم' : language === 'fr' ? 'Tableau de bord' : 'Dashboard'}
            </h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Dark Mode Toggle */}
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={toggleDarkMode}
              className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
              title={darkMode ? 
                (language === 'ar' ? 'الوضع الفاتح' : language === 'fr' ? 'Mode clair' : 'Light mode') :
                (language === 'ar' ? 'الوضع المظلم' : language === 'fr' ? 'Mode sombre' : 'Dark mode')
              }
            >
              {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 px-3 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 gap-2"
                  title={language === 'ar' ? 'تغيير اللغة' : language === 'fr' ? 'Changer la langue' : 'Change language'}
                >
                  <Languages className="h-4 w-4" />
                  <span className="text-lg">{currentLanguage?.flag}</span>
                  <span className="text-sm font-medium hidden sm:inline">
                    {currentLanguage?.nativeName}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent 
                align="end" 
                className="w-48 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 shadow-lg"
              >
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`flex items-center space-x-3 px-4 py-3 dark:text-white dark:hover:bg-gray-700 transition-colors duration-200 cursor-pointer ${
                      language === lang.code 
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-300 font-medium' 
                        : 'hover:bg-gray-50'
                    }`}
                  >
                    <span className="text-xl">{lang.flag}</span>
                    <div className="flex flex-col">
                      <span className="text-sm font-medium">{lang.nativeName}</span>
                      <span className="text-xs text-gray-500 dark:text-gray-400">{lang.name}</span>
                    </div>
                    {language === lang.code && (
                      <div className="ml-auto w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button 
              variant="ghost" 
              size="sm" 
              className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 relative transition-colors duration-200"
              title={language === 'ar' ? 'الإشعارات' : language === 'fr' ? 'Notifications' : 'Notifications'}
            >
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200"
                  title={language === 'ar' ? 'حساب المستخدم' : language === 'fr' ? 'Compte utilisateur' : 'User account'}
                >
                  <div className="h-7 w-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40 bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                <DropdownMenuItem className="text-sm dark:text-white dark:hover:bg-gray-700 transition-colors duration-200">
                  {language === 'ar' ? 'الملف الشخصي' : language === 'fr' ? 'Profil' : 'Profile'}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm dark:text-white dark:hover:bg-gray-700 transition-colors duration-200">
                  {language === 'ar' ? 'الإعدادات' : language === 'fr' ? 'Paramètres' : 'Settings'}
                </DropdownMenuItem>
                <DropdownMenuItem className="text-sm dark:text-white dark:hover:bg-gray-700 transition-colors duration-200">
                  {language === 'ar' ? 'تسجيل الخروج' : language === 'fr' ? 'Déconnexion' : 'Logout'}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
