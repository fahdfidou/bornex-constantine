
import React from 'react';
import { useLanguage } from '../../contexts/LanguageContext';
import StatsCard from './StatsCard';
import { Battery, Zap, Users, TrendingUp, MapPin, AlertTriangle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import ChargingStationImage from '../UI/ChargingStationImage';

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
    { id: 1, station: t('stations.centreville'), user: 'Ahmed B.', status: 'completed', time: '5 min' },
    { id: 2, station: t('stations.university'), user: 'Fatima K.', status: 'charging', time: '12 min' },
    { id: 3, station: t('stations.airport'), user: 'Mohamed A.', status: 'completed', time: '18 min' },
    { id: 4, station: t('stations.port'), user: 'Amina D.', status: 'charging', time: '25 min' }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background avec images de bornes de recharge */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute top-20 right-20 w-32 h-32 bg-gradient-to-br from-blue-400 to-green-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-20 w-36 h-36 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl"></div>
        
        {/* Images de bornes de recharge en arrière-plan */}
        <div className="absolute top-1/4 left-1/3 opacity-8 w-24 h-32">
          <ChargingStationImage variant="modern" showBackground={false} />
        </div>
        
        <div className="absolute bottom-1/3 right-1/4 opacity-6 w-20 h-28">
          <ChargingStationImage variant="tesla" showBackground={false} />
        </div>
        
        <div className="absolute top-1/2 left-1/5 opacity-7 w-22 h-30">
          <ChargingStationImage variant="fastcharge" showBackground={false} />
        </div>
        
        <div className="absolute bottom-1/4 left-1/2 opacity-5 w-18 h-26">
          <ChargingStationImage variant="urban" showBackground={false} />
        </div>
      </div>
      
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
              <span className="transition-colors duration-200">{t('dashboard.systemOperational')}</span>
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
                {t('dashboard.lastSessions')}
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
                      {activity.status === 'charging' ? t('dashboard.inProgress') : t('dashboard.completed')}
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
                {t('dashboard.stationsMaintenanceStatus')}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between p-4 bg-orange-50 dark:bg-orange-900/20 rounded-xl border border-orange-100 dark:border-orange-800 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <AlertTriangle className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">{t('stations.university')}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">{t('dashboard.scheduledMaintenance')}</p>
                  </div>
                </div>
                <span className="text-xs bg-orange-100 dark:bg-orange-900/50 text-orange-700 dark:text-orange-300 px-2 py-1 rounded-full font-medium transition-colors duration-200">
                  {t('dashboard.tomorrow9am')}
                </span>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 rounded-xl border border-green-100 dark:border-green-800 transition-colors duration-200">
                <div className="flex items-center space-x-3">
                  <div className="w-4 h-4 bg-green-500 rounded-full"></div>
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">{t('dashboard.globalNetwork')}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">{t('dashboard.optimalOperation')}</p>
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
                    <p className="font-medium text-gray-900 dark:text-white text-sm transition-colors duration-200">{t('dashboard.activeSessions')}</p>
                    <p className="text-xs text-gray-600 dark:text-gray-400 transition-colors duration-200">{t('dashboard.connectedUsers')}</p>
                  </div>
                </div>
                <span className="text-xs bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 px-2 py-1 rounded-full font-medium transition-colors duration-200">
                  89 {t('dashboard.active')}
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
