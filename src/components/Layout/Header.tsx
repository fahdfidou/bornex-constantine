
import React from 'react';
import { Globe, Bell, User } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Header = () => {
  const { language, setLanguage, t } = useLanguage();

  const languages = [
    { code: 'fr', name: 'Français', flag: '🇫🇷' },
    { code: 'ar', name: 'العربية', flag: '🇩🇿' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Search or Title */}
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">Tableau de bord</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center space-x-3">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 px-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                  <Globe className="h-4 w-4 mr-2" />
                  <span className="text-sm">
                    {languages.find(lang => lang.code === language)?.flag}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                {languages.map((lang) => (
                  <DropdownMenuItem
                    key={lang.code}
                    onClick={() => setLanguage(lang.code as any)}
                    className={`flex items-center space-x-2 ${
                      language === lang.code ? 'bg-blue-50 text-blue-600' : ''
                    }`}
                  >
                    <span>{lang.flag}</span>
                    <span className="text-sm">{lang.name}</span>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Notifications */}
            <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-50 relative">
              <Bell className="h-4 w-4" />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-red-500 rounded-full"></span>
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-9 w-9 p-0 text-gray-600 hover:text-gray-900 hover:bg-gray-50">
                  <div className="h-7 w-7 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-white" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem className="text-sm">Profile</DropdownMenuItem>
                <DropdownMenuItem className="text-sm">Settings</DropdownMenuItem>
                <DropdownMenuItem className="text-sm">Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
