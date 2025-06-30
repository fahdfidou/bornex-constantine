
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import StatsCard from './StatsCard';
import { Battery, Zap, Users, TrendingUp, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ElectricStationBackground from '../UI/ElectricStationBackground';

const Dashboard = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.totalStations'),
      value: '156',
      icon: MapPin,
      trend: '+12%',
      color: 'blue'
    },
    {
      title: t('dashboard.activeCharging'),
      value: '89',
      icon: Zap,
      trend: '+8%',
      color: 'green'
    },
    {
      title: t('dashboard.totalUsers'),
      value: '2,847',
      icon: Users,
      trend: '+23%',
      color: 'purple'
    },
    {
      title: t('dashboard.revenue'),
      value: '124,560 DA',
      icon: TrendingUp,
      trend: '+15%',
      color: 'orange'
    }
  ];

  const recentActivity = [
    { id: 1, station: 'Station Alger Centre', user: 'Ahmed B.', status: 'completed', time: '5 min' },
    { id: 2, station: 'Station Hydra', user: 'Fatima K.', status: 'charging', time: '12 min' },
    { id: 3, station: 'Station Bab Ezzouar', user: 'Mohamed A.', status: 'completed', time: '18 min' },
    { id: 4, station: 'Station Kolea', user: 'Amina D.', status: 'charging', time: '25 min' }
  ];

  return (
    <div className="relative min-h-screen">
      <ElectricStationBackground />
      
      <div className="relative z-10 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              {t('dashboard.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm transition-colors duration-200">
              {t('dashboard.subtitle')}
            </p>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
              <span className="transition-colors duration-200">Système opérationnel</span>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div 
              key={stat.title}
              className="transform transition-all duration-300 hover:scale-105"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <StatsCard {...stat} />
            </div>
          ))}
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activity */}
          <Card className="shadow-sm border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-900 dark:text-white transition-colors duration-200">
                <Battery className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <span>{t('dashboard.recentActivity')}</span>
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                Dernières sessions de charge
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700/50 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
                  <div className="flex items-center space-x-3">
                    <div className={`w-2 h-2 rounded-full ${
                      activity.status === 'charging' ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">{activity.station}</p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 transition-colors duration-200">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-medium text-gray-900 dark:text-white transition-colors duration-200">{activity.time}</p>
                    <p className={`text-xs ${
                      activity.status === 'charging' ? 'text-blue-600 dark:text-blue-400' : 'text-green-600 dark:text-green-400'
                    } transition-colors duration-200`}>
                      {activity.status === 'charging' ? 'En cours' : 'Terminé'}
                    </p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className="shadow-sm border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm transition-colors duration-200">
            <CardHeader className="pb-4">
              <CardTitle className="flex items-center space-x-2 text-lg text-gray-900 dark:text-white transition-colors duration-200">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>{t('dashboard.systemStatus')}</span>
              </CardTitle>
              <CardDescription className="text-sm text-gray-500 dark:text-gray-400 transition-colors duration-200">
                Statut des bornes et maintenance
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">Station Hydra</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">Maintenance programmée</p>
                  </div>
                </div>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full font-medium transition-colors duration-200">
                  Demain 9h
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">Réseau global</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">Fonctionnement optimal</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 px-2 py-1 rounded-full font-medium transition-colors duration-200">
                  96.8%
                </span>
              </div>

              <div className="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <Zap className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">Sessions actives</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">Utilisateurs connectés</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium transition-colors duration-200">
                  89 actives
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
