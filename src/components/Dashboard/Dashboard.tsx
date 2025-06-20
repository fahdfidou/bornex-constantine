
import React from 'react';
import { 
  Zap, 
  Battery, 
  Wrench, 
  DollarSign, 
  Users, 
  Activity,
  TrendingUp,
  MapPin
} from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import StatsCard from './StatsCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const Dashboard = () => {
  const { t } = useLanguage();

  const stats = [
    {
      title: t('dashboard.totalStations'),
      value: 248,
      icon: Zap,
      change: '+12% ce mois',
      changeType: 'positive' as const,
      color: 'orange'
    },
    {
      title: t('dashboard.activeStations'),
      value: 186,
      icon: Battery,
      change: '75% du réseau',
      changeType: 'positive' as const,
      color: 'green'
    },
    {
      title: t('dashboard.maintenance'),
      value: 12,
      icon: Wrench,
      change: '-8% vs semaine dernière',
      changeType: 'positive' as const,
      color: 'blue'
    },
    {
      title: t('dashboard.revenue'),
      value: '12,450 DA',
      icon: DollarSign,
      change: '+18% vs hier',
      changeType: 'positive' as const,
      color: 'green'
    },
    {
      title: t('dashboard.sessions'),
      value: 89,
      icon: Activity,
      change: 'En cours',
      changeType: 'neutral' as const,
      color: 'blue'
    },
    {
      title: t('dashboard.users'),
      value: 1432,
      icon: Users,
      change: '+156 nouveaux',
      changeType: 'positive' as const,
      color: 'orange'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">{t('dashboard.title')}</h1>
          <p className="text-gray-600 mt-2">
            Vue d'ensemble de votre réseau de bornes de recharge
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat, index) => (
          <StatsCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            change={stat.change}
            changeType={stat.changeType}
            color={stat.color}
          />
        ))}
      </div>

      {/* Recent Activity & Quick Actions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-orange-600" />
              <span>Activité Récente</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { time: '14:32', event: 'Session terminée - Borne #247', status: 'success' },
              { time: '14:18', event: 'Nouvelle session - Borne #156', status: 'info' },
              { time: '13:45', event: 'Alerte maintenance - Borne #089', status: 'warning' },
              { time: '13:22', event: 'Paiement traité - 850 DA', status: 'success' },
            ].map((activity, index) => (
              <div key={index} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === 'success' ? 'bg-green-500' :
                    activity.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                  }`} />
                  <span className="text-sm text-gray-900">{activity.event}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Performance Overview */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5 text-green-600" />
              <span>Performance du Réseau</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Taux d'utilisation</span>
                <span className="text-sm font-bold text-green-600">74%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '74%' }}></div>
              </div>
            </div>
            
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Disponibilité réseau</span>
                <span className="text-sm font-bold text-orange-600">92%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-orange-500 h-2 rounded-full" style={{ width: '92%' }}></div>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Satisfaction client</span>
                <span className="text-sm font-bold text-blue-600">4.8/5</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '96%' }}></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
