
import React, { useState } from 'react';
import { User, History, Heart, CreditCard, Bell, Leaf, Zap, Calendar, Edit3, LogIn } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import LoginScreen from './LoginScreen';

interface ProfileScreenProps {
  setActiveTab: (tab: string) => void;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLoginScreen, setShowLoginScreen] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'Jean',
    lastName: 'Dupont',
    email: 'jean.dupont@email.com',
    phone: '+213 555 123 456',
    avatar: null
  });

  const stats = [
    {
      icon: Zap,
      value: '127',
      label: t('profile.totalSessions'),
      color: 'text-blue-600 dark:text-blue-400'
    },
    {
      icon: Calendar,
      value: '2,486 kWh',
      label: t('profile.totalEnergy'),
      color: 'text-green-600 dark:text-green-400'
    },
    {
      icon: Leaf,
      value: '1.2 T',
      label: t('profile.carbonSaved'),
      color: 'text-emerald-600 dark:text-emerald-400'
    }
  ];

  const recentSessions = [
    {
      id: 1,
      station: 'Station Centre-ville',
      date: '2024-01-15',
      duration: '45 min',
      energy: '18.5 kWh',
      cost: '924 DZA'
    },
    {
      id: 2,
      station: 'SuperCharge Express',
      date: '2024-01-12',
      duration: '32 min',
      energy: '28.3 kWh',
      cost: '1,982 DZA'
    },
    {
      id: 3,
      station: 'EcoCharge Mall',
      date: '2024-01-10',
      duration: '1h 15min',
      energy: '24.7 kWh',
      cost: '1,384 DZA'
    }
  ];

  const menuItems = [
    {
      icon: Heart,
      label: t('profile.favorites'),
      subtitle: '5 stations favorites',
      action: () => {}
    },
    {
      icon: CreditCard,
      label: t('profile.paymentMethods'),
      subtitle: 'CCP • Baridi Mob • Banque',
      action: () => {}
    },
    {
      icon: Bell,
      label: t('profile.notifications'),
      subtitle: 'Paramètres des notifications',
      action: () => {}
    }
  ];

  const handleLogin = (userData: any) => {
    setUserData(userData);
    setIsLoggedIn(true);
    setShowLoginScreen(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserData({
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      avatar: null
    });
  };

  if (showLoginScreen) {
    return <LoginScreen onBack={() => setShowLoginScreen(false)} onLogin={handleLogin} />;
  }

  if (!isLoggedIn) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 w-full max-w-md">
            <CardContent className="p-8 text-center">
              <User className="h-16 w-16 mx-auto mb-4 text-gray-400" />
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {t('auth.welcome')}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                Connectez-vous pour accéder à votre profil
              </p>
              <Button 
                onClick={() => setShowLoginScreen(true)}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              >
                <LogIn className="h-4 w-4 mr-2" />
                {t('auth.login')}
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 text-center">
            {t('profile.title')}
          </h1>
          
          {/* Profile Info */}
          <div className="flex items-center gap-4 mb-6">
            <Avatar className="w-16 h-16 ring-4 ring-blue-500/20">
              <AvatarImage src="/placeholder-avatar.jpg" alt="Profile" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xl font-bold">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {userData.firstName} {userData.lastName}
              </h2>
              <p className="text-gray-600 dark:text-gray-300">
                {userData.email}
              </p>
              <Badge className="mt-1 bg-gradient-to-r from-purple-500 to-blue-500 text-white">
                Premium Member
              </Badge>
            </div>
          </div>

          <div className="flex gap-2">
            <Button 
              variant="outline"
              className="flex-1 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70"
            >
              <Edit3 className="h-4 w-4 mr-2" />
              {t('profile.editProfile')}
            </Button>
            <Button 
              variant="outline"
              onClick={handleLogout}
              className="bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70"
            >
              <LogIn className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <Card 
                  key={index}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 text-center animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <Icon className={`h-6 w-6 mx-auto mb-2 ${stat.color}`} />
                    <div className="text-lg font-bold text-gray-900 dark:text-white mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {stat.label}
                    </p>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Menu Items */}
          <div className="space-y-3">
            {menuItems.map((item, index) => {
              const Icon = item.icon;
              return (
                <Card 
                  key={index}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                  onClick={item.action}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {item.label}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {item.subtitle}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Recent Sessions */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <History className="h-5 w-5" />
                {t('profile.chargingHistory')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentSessions.map((session, index) => (
                <div 
                  key={session.id} 
                  className="flex items-center justify-between p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${(index + 6) * 0.1}s` }}
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                      {session.station}
                    </h4>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {session.date} • {session.duration}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {session.energy}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-300">
                      {session.cost}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProfileScreen;
