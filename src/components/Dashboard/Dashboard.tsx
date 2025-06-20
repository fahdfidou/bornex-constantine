
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
      color: 'text-green-600'
    },
    {
      title: t('dashboard.activeCharging'),
      value: '89',
      icon: Zap,
      trend: '+8%',
      color: 'text-blue-600'
    },
    {
      title: t('dashboard.totalUsers'),
      value: '2,847',
      icon: Users,
      trend: '+23%',
      color: 'text-purple-600'
    },
    {
      title: t('dashboard.revenue'),
      value: '124,560 DA',
      icon: TrendingUp,
      trend: '+15%',
      color: 'text-green-600'
    }
  ];

  const recentActivity = [
    { id: 1, station: 'Station Alger Centre', user: 'Ahmed B.', status: 'completed', time: '5 min' },
    { id: 2, station: 'Station Hydra', user: 'Fatima K.', status: 'charging', time: '12 min' },
    { id: 3, station: 'Station Bab Ezzouar', user: 'Mohamed A.', status: 'completed', time: '18 min' },
    { id: 4, station: 'Station Kolea', user: 'Amina D.', status: 'charging', time: '25 min' }
  ];

  return (
    <div className="space-y-6 relative">
      <ElectricStationBackground variant="green" className="opacity-5" />
      
      <div className="flex items-center justify-between relative z-10">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600 mt-1">{t('dashboard.subtitle')}</p>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span>Système opérationnel</span>
          </div>
        </div>
      </div>

      {/* Stats Cards avec animation */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {stats.map((stat, index) => (
          <div 
            key={stat.title}
            className="transform transition-all duration-300 hover:scale-105 hover:shadow-lg"
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <StatsCard {...stat} />
          </div>
        ))}
      </div>

      {/* Activité récente avec fond */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
        <Card className="relative overflow-hidden">
          <ElectricStationBackground variant="charging" className="opacity-5" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center space-x-2">
              <Battery className="h-5 w-5 text-green-600" />
              <span>{t('dashboard.recentActivity')}</span>
            </CardTitle>
            <CardDescription>Dernières sessions de charge</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg transition-colors hover:bg-gray-100">
                  <div className="flex items-center space-x-3">
                    <div className={`w-3 h-3 rounded-full ${
                      activity.status === 'charging' ? 'bg-yellow-500 animate-pulse' : 'bg-green-500'
                    }`}></div>
                    <div>
                      <p className="font-medium text-gray-900">{activity.station}</p>
                      <p className="text-sm text-gray-600">{activity.user}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-gray-900">{activity.time}</p>
                    <p className={`text-xs ${
                      activity.status === 'charging' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {activity.status === 'charging' ? 'En cours' : 'Terminé'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden">
          <ElectricStationBackground variant="modern" className="opacity-5" />
          <CardHeader className="relative z-10">
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="h-5 w-5 text-orange-600" />
              <span>Alertes & Maintenance</span>
            </CardTitle>
            <CardDescription>État du réseau de bornes</CardDescription>
          </CardHeader>
          <CardContent className="relative z-10">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900">Station Hydra</p>
                    <p className="text-sm text-gray-600">Maintenance programmée</p>
                  </div>
                </div>
                <span className="text-xs bg-orange-100 text-orange-800 px-2 py-1 rounded-full">
                  Demain 9h
                </span>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900">Réseau global</p>
                    <p className="text-sm text-gray-600">Fonctionnement optimal</p>
                  </div>
                </div>
                <span className="text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                  96.8%
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
