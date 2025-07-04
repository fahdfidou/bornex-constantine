import React, { useState } from 'react';
import { Plus, Settings, Zap, Thermometer, Clock, Battery, AlertTriangle, Bell, Power, Gauge } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

interface MyStationScreenProps {
  setActiveTab: (tab: string) => void;
}

const MyStationScreen: React.FC<MyStationScreenProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [stations, setStations] = useState([
    {
      id: 1,
      name: 'Ma Borne Principale',
      power: '22 kW',
      capacity: '50 kWh',
      temperature: '25°C',
      status: 'available',
      chargeTime: '2h 30min',
      notifications: true,
      location: 'Garage Principal'
    }
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [newStation, setNewStation] = useState({
    name: '',
    power: '',
    capacity: '',
    location: '',
    chargeTime: '',
    notifications: true,
    maxTemp: '45',
    description: ''
  });

  const handleAddStation = () => {
    if (newStation.name && newStation.power) {
      setStations([...stations, {
        id: stations.length + 1,
        name: newStation.name,
        power: newStation.power + ' kW',
        capacity: newStation.capacity + ' kWh',
        temperature: '25°C',
        status: 'available',
        chargeTime: newStation.chargeTime,
        notifications: newStation.notifications,
        location: newStation.location
      }]);
      setNewStation({
        name: '',
        power: '',
        capacity: '',
        location: '',
        chargeTime: '',
        notifications: true,
        maxTemp: '45',
        description: ''
      });
      setShowAddForm(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'charging': return 'bg-blue-500';
      case 'error': return 'bg-red-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return t('station.available');
      case 'charging': return t('station.charging');
      case 'error': return t('station.error');
      default: return t('station.offline');
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 text-center">
            {t('myStation.title')}
          </h1>
          
          <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
            <DialogTrigger asChild>
              <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="h-4 w-4 mr-2" />
                {t('myStation.addStation')}
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-md mx-auto">
              <DialogHeader>
                <DialogTitle>{t('myStation.addNewStation')}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">{t('myStation.stationName')}</Label>
                  <Input
                    id="name"
                    value={newStation.name}
                    onChange={(e) => setNewStation({ ...newStation, name: e.target.value })}
                    placeholder="Ex: Ma Borne Garage"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="power">{t('myStation.power')} (kW)</Label>
                    <Input
                      id="power"
                      value={newStation.power}
                      onChange={(e) => setNewStation({ ...newStation, power: e.target.value })}
                      placeholder="22"
                      type="number"
                    />
                  </div>
                  <div>
                    <Label htmlFor="capacity">{t('myStation.capacity')} (kWh)</Label>
                    <Input
                      id="capacity"
                      value={newStation.capacity}
                      onChange={(e) => setNewStation({ ...newStation, capacity: e.target.value })}
                      placeholder="50"
                      type="number"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="location">{t('myStation.location')}</Label>
                  <Input
                    id="location"
                    value={newStation.location}
                    onChange={(e) => setNewStation({ ...newStation, location: e.target.value })}
                    placeholder="Ex: Garage, Jardin"
                  />
                </div>

                <div>
                  <Label htmlFor="chargeTime">{t('myStation.estimatedChargeTime')}</Label>
                  <Input
                    id="chargeTime"
                    value={newStation.chargeTime}
                    onChange={(e) => setNewStation({ ...newStation, chargeTime: e.target.value })}
                    placeholder="Ex: 2h 30min"
                  />
                </div>

                <div>
                  <Label htmlFor="maxTemp">{t('myStation.maxTemperature')} (°C)</Label>
                  <Input
                    id="maxTemp"
                    value={newStation.maxTemp}
                    onChange={(e) => setNewStation({ ...newStation, maxTemp: e.target.value })}
                    placeholder="45"
                    type="number"
                  />
                </div>

                <div>
                  <Label htmlFor="description">{t('myStation.description')}</Label>
                  <Textarea
                    id="description"
                    value={newStation.description}
                    onChange={(e) => setNewStation({ ...newStation, description: e.target.value })}
                    placeholder={t('myStation.descriptionPlaceholder')}
                    rows={3}
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <Switch
                    id="notifications"
                    checked={newStation.notifications}
                    onCheckedChange={(checked) => setNewStation({ ...newStation, notifications: checked })}
                  />
                  <Label htmlFor="notifications">{t('myStation.enableNotifications')}</Label>
                </div>

                <div className="flex gap-2">
                  <Button 
                    onClick={handleAddStation}
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  >
                    {t('myStation.addStation')}
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => setShowAddForm(false)}
                    className="flex-1"
                  >
                    {t('common.cancel')}
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* My Stations */}
          {stations.map((station, index) => (
            <Card 
              key={station.id}
              className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg text-gray-900 dark:text-white">
                    {station.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(station.status)}`} />
                    <Badge variant="secondary" className="text-xs">
                      {getStatusText(station.status)}
                    </Badge>
                  </div>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {station.location}
                </p>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Stats Grid */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Power className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{t('myStation.power')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{station.power}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                    <Battery className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{t('myStation.capacity')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{station.capacity}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <Thermometer className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{t('myStation.temperature')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{station.temperature}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-2 p-2 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <div>
                      <p className="text-xs text-gray-600 dark:text-gray-300">{t('myStation.chargeTime')}</p>
                      <p className="font-semibold text-gray-900 dark:text-white">{station.chargeTime}</p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    <Settings className="h-4 w-4 mr-2" />
                    {t('myStation.configure')}
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    <AlertTriangle className="h-4 w-4 mr-2" />
                    {t('myStation.reportIssue')}
                  </Button>
                </div>

                {/* Notifications Status */}
                {station.notifications && (
                  <div className="flex items-center gap-2 p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                    <Bell className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {t('myStation.notificationsEnabled')}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}

          {stations.length === 0 && (
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 text-center py-12">
              <CardContent>
                <Zap className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                  {t('myStation.noStations')}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-4">
                  {t('myStation.noStationsDescription')}
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  {t('myStation.addFirstStation')}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyStationScreen;