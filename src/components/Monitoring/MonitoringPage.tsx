
import React, { useState, useEffect } from 'react';
import { Activity, Zap, AlertTriangle, CheckCircle, TrendingUp, Wifi } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '../../contexts/LanguageContext';

const MonitoringPage = () => {
  const { t } = useLanguage();
  
  const [realTimeData, setRealTimeData] = useState({
    totalPower: 645,
    efficiency: 92.5,
    networkStatus: 'operational',
    activeSessions: 12,
    totalEnergy: 2847
  });

  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'warning',
      station: t('stations.centreville'),
      message: 'Température élevée détectée',
      time: '14:32',
      severity: 'medium'
    },
    {
      id: 2,
      type: 'info',
      station: t('stations.university'),
      message: 'Mise à jour firmware terminée',
      time: '13:45',
      severity: 'low'
    },
    {
      id: 3,
      type: 'critical',
      station: t('stations.airport'),
      message: 'Perte de connexion réseau',
      time: '12:15',
      severity: 'high'
    }
  ]);

  const [stationMetrics, setStationMetrics] = useState([
    {
      name: t('stations.centreville'),
      power: 120,
      efficiency: 94,
      temperature: 45,
      status: 'operational',
      sessions: 3
    },
    {
      name: t('stations.university'),
      power: 85,
      efficiency: 91,
      temperature: 42,
      status: 'charging',
      sessions: 2
    },
    {
      name: t('stations.airport'),
      power: 0,
      efficiency: 0,
      temperature: 35,
      status: 'offline',
      sessions: 0
    },
    {
      name: t('stations.industrial'),
      power: 180,
      efficiency: 96,
      temperature: 48,
      status: 'operational',
      sessions: 4
    }
  ]);

  // Simulation des données en temps réel
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTimeData(prev => ({
        ...prev,
        totalPower: prev.totalPower + (Math.random() - 0.5) * 10,
        efficiency: Math.max(85, Math.min(98, prev.efficiency + (Math.random() - 0.5) * 2)),
        activeSessions: Math.max(0, Math.min(20, prev.activeSessions + Math.floor((Math.random() - 0.5) * 3)))
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getAlertColor = (type: string, severity: string) => {
    if (type === 'critical' || severity === 'high') {
      return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300 border-red-200 dark:border-red-800';
    }
    if (type === 'warning' || severity === 'medium') {
      return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
    }
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300 border-blue-200 dark:border-blue-800';
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return <AlertTriangle className="h-4 w-4 text-red-500" />;
      case 'warning': return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default: return <CheckCircle className="h-4 w-4 text-blue-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'text-green-600 dark:text-green-400';
      case 'charging': return 'text-blue-600 dark:text-blue-400';
      case 'offline': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background avec éléments de surveillance */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-44 h-44 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-green-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-36 h-36 bg-gradient-to-br from-purple-400 to-green-500 rounded-full blur-2xl"></div>
        
        {/* Icônes de surveillance en arrière-plan */}
        <div className="absolute top-1/4 left-1/6 opacity-8">
          <Activity className="w-32 h-32 text-green-500" />
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-8">
          <TrendingUp className="w-28 h-28 text-blue-500" />
        </div>
        <div className="absolute top-1/2 right-1/6 opacity-8">
          <Wifi className="w-24 h-24 text-purple-500" />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              {t('monitoring.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm transition-colors duration-200">
              {t('monitoring.subtitle')}
            </p>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Données en temps réel</span>
          </div>
        </div>

        {/* Métriques en temps réel */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Puissance totale
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {Math.round(realTimeData.totalPower)} kW
                  </p>
                </div>
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Efficacité globale
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {realTimeData.efficiency.toFixed(1)}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Sessions actives
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {realTimeData.activeSessions}
                  </p>
                </div>
                <Activity className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    État réseau
                  </p>
                  <p className="text-lg font-bold text-green-600 dark:text-green-400">
                    Optimal
                  </p>
                </div>
                <Wifi className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Énergie totale
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">
                    {realTimeData.totalEnergy} kWh
                  </p>
                </div>
                <Zap className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Alertes système */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <AlertTriangle className="h-5 w-5 text-orange-500" />
                <span>{t('monitoring.alerts')}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {alerts.map((alert) => (
                <div key={alert.id} className={`p-4 rounded-lg border ${getAlertColor(alert.type, alert.severity)}`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-2">
                      {getAlertIcon(alert.type)}
                      <div>
                        <p className="font-medium text-sm">{alert.station}</p>
                        <p className="text-sm opacity-90">{alert.message}</p>
                      </div>
                    </div>
                    <span className="text-xs opacity-75">{alert.time}</span>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Métriques des stations */}
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 dark:text-white">
                <Activity className="h-5 w-5 text-blue-500" />
                <span>Performance des stations</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {stationMetrics.map((station, index) => (
                <div key={index} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="font-medium dark:text-white">{station.name}</h3>
                    <Badge className={`${getStatusColor(station.status)} bg-transparent border-current`}>
                      {station.status === 'operational' ? 'Opérationnel' :
                       station.status === 'charging' ? 'En charge' : 'Hors ligne'}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Puissance</p>
                      <p className="font-medium dark:text-white">{station.power} kW</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Efficacité</p>
                      <p className="font-medium dark:text-white">{station.efficiency}%</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Sessions</p>
                      <p className="font-medium dark:text-white">{station.sessions}</p>
                    </div>
                  </div>
                  <div className="mt-2">
                    <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-1">
                      <span>Température</span>
                      <span>{station.temperature}°C</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          station.temperature > 50 ? 'bg-red-500' :
                          station.temperature > 40 ? 'bg-yellow-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(100, (station.temperature / 60) * 100)}%` }}
                      ></div>
                    </div>
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

export default MonitoringPage;
