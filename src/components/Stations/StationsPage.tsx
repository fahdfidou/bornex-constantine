
import React, { useState } from 'react';
import { Power, Battery, Zap, Settings, Eye, RotateCcw, PlayCircle, StopCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../../contexts/LanguageContext';
import ChargingStationImage from '../UI/ChargingStationImage';

const StationsPage = () => {
  const { t } = useLanguage();
  
  const [stations, setStations] = useState([
    {
      id: 'ST001',
      name: t('stations.centreville'),
      capacity: '150 kW',
      batteryLevel: 85,
      powerOutput: '120 kW',
      connectorType: 'Type 2 CCS',
      status: 'operational',
      operationalTime: '2847h',
      lastMaintenance: '2024-01-15',
      currentLoad: 78,
      efficiency: 94
    },
    {
      id: 'ST002',
      name: t('stations.university'),
      capacity: '75 kW',
      batteryLevel: 92,
      powerOutput: '65 kW',
      connectorType: 'Type 2',
      status: 'charging',
      operationalTime: '1923h',
      lastMaintenance: '2024-01-10',
      currentLoad: 45,
      efficiency: 91
    },
    {
      id: 'ST003',
      name: t('stations.airport'),
      capacity: '350 kW',
      batteryLevel: 67,
      powerOutput: '280 kW',
      connectorType: 'CCS Combo',
      status: 'maintenance',
      operationalTime: '4156h',
      lastMaintenance: '2024-01-20',
      currentLoad: 0,
      efficiency: 89
    },
    {
      id: 'ST004',
      name: t('stations.industrial'),
      capacity: '200 kW',
      batteryLevel: 78,
      powerOutput: '180 kW',
      connectorType: 'CHAdeMO',
      status: 'operational',
      operationalTime: '3421h',
      lastMaintenance: '2024-01-12',
      currentLoad: 89,
      efficiency: 96
    }
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'operational': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'charging': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'maintenance': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-300';
      case 'offline': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'operational': return <Power className="h-4 w-4 text-green-500" />;
      case 'charging': return <Zap className="h-4 w-4 text-blue-500" />;
      case 'maintenance': return <Settings className="h-4 w-4 text-orange-500" />;
      case 'offline': return <StopCircle className="h-4 w-4 text-red-500" />;
      default: return <Power className="h-4 w-4 text-gray-500" />;
    }
  };

  const getBatteryColor = (level: number) => {
    if (level >= 80) return 'text-green-600 dark:text-green-400';
    if (level >= 50) return 'text-yellow-600 dark:text-yellow-400';
    return 'text-red-600 dark:text-red-400';
  };

  return (
    <div className="relative min-h-screen">
      {/* Background avec images de bornes */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-44 h-44 bg-gradient-to-br from-blue-400 to-green-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-36 h-36 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-2xl"></div>
        
        {/* Images de bornes en arrière-plan */}
        <div className="absolute top-1/4 left-1/6 opacity-8">
          <ChargingStationImage variant="modern" showBackground={false} className="w-32 h-32" />
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-8">
          <ChargingStationImage variant="tesla" showBackground={false} className="w-28 h-28" />
        </div>
        <div className="absolute top-1/2 right-1/6 opacity-8">
          <ChargingStationImage variant="fastcharge" showBackground={false} className="w-24 h-24" />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              {t('stations.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm transition-colors duration-200">
              {t('stations.subtitle')}
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
            <Power className="h-4 w-4 mr-2" />
            {t('stations.addStation')}
          </Button>
        </div>

        {/* Statistiques des bornes */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t('dashboard.totalStations')}
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {stations.length}
                  </p>
                </div>
                <Power className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    {t('dashboard.activeStations')}
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {stations.filter(s => s.status === 'operational' || s.status === 'charging').length}
                  </p>
                </div>
                <Zap className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Puissance totale
                  </p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">775 kW</p>
                </div>
                <Battery className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Efficacité moyenne
                  </p>
                  <p className="text-2xl font-bold text-orange-600 dark:text-orange-400">92.5%</p>
                </div>
                <Settings className="h-8 w-8 text-orange-600 dark:text-orange-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="stations" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800">
            <TabsTrigger value="stations" className="dark:data-[state=active]:bg-gray-700">
              Bornes actives
            </TabsTrigger>
            <TabsTrigger value="control" className="dark:data-[state=active]:bg-gray-700">
              {t('stations.remoteControl')}
            </TabsTrigger>
            <TabsTrigger value="monitoring" className="dark:data-[state=active]:bg-gray-700">
              Surveillance
            </TabsTrigger>
          </TabsList>

          <TabsContent value="stations" className="space-y-4">
            {stations.map((station) => (
              <Card key={station.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg dark:text-white">#{station.id} - {station.name}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">Capacité: {station.capacity}</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(station.status)}
                      <Badge className={getStatusColor(station.status)}>
                        {station.status === 'operational' ? t('status.operational') :
                         station.status === 'charging' ? t('status.charging') :
                         station.status === 'maintenance' ? t('status.maintenance') : 'Hors ligne'}
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('stations.batteryLevel')}</p>
                      <p className={`font-medium ${getBatteryColor(station.batteryLevel)}`}>
                        {station.batteryLevel}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('stations.powerOutput')}</p>
                      <p className="font-medium dark:text-white">{station.powerOutput}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('stations.connectorType')}</p>
                      <p className="font-medium dark:text-white">{station.connectorType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('stations.operationalTime')}</p>
                      <p className="font-medium dark:text-white">{station.operationalTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Efficacité</p>
                      <p className="font-medium text-green-600 dark:text-green-400">{station.efficiency}%</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <Eye className="h-4 w-4 mr-1" />
                      {t('stations.viewDetails')}
                    </Button>
                    <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <Settings className="h-4 w-4 mr-1" />
                      {t('stations.configure')}
                    </Button>
                    {station.status === 'operational' ? (
                      <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-900/20">
                        <StopCircle className="h-4 w-4 mr-1" />
                        Arrêter
                      </Button>
                    ) : (
                      <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-900/20">
                        <PlayCircle className="h-4 w-4 mr-1" />
                        Démarrer
                      </Button>
                    )}
                    <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <RotateCcw className="h-4 w-4 mr-1" />
                      Reset
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="control" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
              <CardHeader>
                <CardTitle className="dark:text-white">{t('stations.remoteControl')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <h3 className="font-semibold dark:text-white">Contrôles globaux</h3>
                    <div className="space-y-2">
                      <Button className="w-full bg-green-600 hover:bg-green-700">
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Activer toutes les bornes
                      </Button>
                      <Button className="w-full bg-red-600 hover:bg-red-700">
                        <StopCircle className="h-4 w-4 mr-2" />
                        Arrêter toutes les bornes
                      </Button>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700">
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Redémarrer le réseau
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="font-semibold dark:text-white">Paramètres d'urgence</h3>
                    <div className="space-y-2">
                      <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white">
                        Mode maintenance global
                      </Button>
                      <Button variant="outline" className="w-full dark:border-gray-600 dark:text-white">
                        Diagnostic complet
                      </Button>
                      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                        Arrêt d'urgence
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="monitoring" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="dark:text-white">Consommation en temps réel</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stations.map((station) => (
                      <div key={station.id} className="flex justify-between items-center">
                        <span className="text-sm dark:text-gray-300">{station.name}</span>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${station.currentLoad}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium dark:text-white">{station.currentLoad}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <CardTitle className="dark:text-white">Alertes système</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <p className="text-sm font-medium text-yellow-800 dark:text-yellow-300">
                        Borne ST003 en maintenance
                      </p>
                      <p className="text-xs text-yellow-600 dark:text-yellow-400">Il y a 2 heures</p>
                    </div>
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <p className="text-sm font-medium text-blue-800 dark:text-blue-300">
                        Pic de consommation détecté
                      </p>
                      <p className="text-xs text-blue-600 dark:text-blue-400">Il y a 45 minutes</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default StationsPage;
