
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import StatsCard from './StatsCard';
import { Battery, Zap, Users, TrendingUp, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-500 mt-1 text-sm">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Système opérationnel</span>
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
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Battery className="h-5 w-5 text-blue-600" />
              <span>{t('dashboard.recentActivity')}</span>
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Dernières sessions de charge
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'charging' ? 'bg-blue-500 animate-pulse' : 'bg-green-500'
                  }`}></div>
                  <div>
                    <p className="font-medium text-gray-900 text-sm">{activity.station}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs font-medium text-gray-900">{activity.time}</p>
                  <p className={`text-xs ${
                    activity.status === 'charging' ? 'text-blue-600' : 'text-green-600'
                  }`}>
                    {activity.status === 'charging' ? 'En cours' : 'Terminé'}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* System Status */}
        <Card className="shadow-sm border-gray-200">
          <CardHeader className="pb-4">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <AlertTriangle className="h-5 w-5 text-orange-500" />
              <span>État du système</span>
            </CardTitle>
            <CardDescription className="text-sm text-gray-500">
              Statut des bornes et maintenance
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-orange-50 rounded-xl border border-orange-100">
              <div className="flex items-center space-x-3">
                <AlertTriangle className="h-4 w-4 text-orange-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Station Hydra</p>
                  <p className="text-xs text-gray-600">Maintenance programmée</p>
                </div>
              </div>
              <span className="text-xs bg-orange-100 text-orange-700 px-2 py-1 rounded-full font-medium">
                Demain 9h
              </span>
            </div>
            
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-xl border border-green-100">
              <div className="flex items-center space-x-3">
                <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                <div>
                  <p className="font-medium text-gray-900 text-sm">Réseau global</p>
                  <p className="text-xs text-gray-600">Fonctionnement optimal</p>
                </div>
              </div>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                96.8%
              </span>
            </div>

            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center space-x-3">
                <Zap className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Sessions actives</p>
                  <p className="text-xs text-gray-600">Utilisateurs connectés</p>
                </div>
              </div>
              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">
                89 actives
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
