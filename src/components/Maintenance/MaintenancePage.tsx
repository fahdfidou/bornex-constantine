
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Wrench, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../../contexts/LanguageContext';

const MaintenancePage = () => {
  const { t } = useLanguage();
  
  const [activeTickets, setActiveTickets] = useState([
    {
      id: 'T001',
      station: 'Station Centre-ville',
      issue: 'Câble de charge défectueux',
      priority: 'high',
      status: 'pending',
      technician: 'Ahmed Benali',
      created: '2024-01-20',
      estimated: '2h'
    },
    {
      id: 'T002',
      station: 'Station Université',
      issue: 'Écran tactile ne répond pas',
      priority: 'medium',
      status: 'in-progress',
      technician: 'Fatima Zahra',
      created: '2024-01-19',
      estimated: '1h'
    },
    {
      id: 'T003',
      station: 'Station Aéroport',
      issue: 'Problème de connexion réseau',
      priority: 'low',
      status: 'completed',
      technician: 'Mohamed Khelif',
      created: '2024-01-18',
      estimated: '30min'
    }
  ]);

  const maintenanceHistory = [
    {
      date: '2024-01-15',
      station: 'Station Port',
      action: 'Maintenance préventive',
      technician: 'Ahmed Benali',
      duration: '2h',
      status: 'completed'
    },
    {
      date: '2024-01-10',
      station: 'Station Centre-ville',
      action: 'Remplacement connecteur',
      technician: 'Fatima Zahra',
      duration: '1h30',
      status: 'completed'
    }
  ];

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      case 'medium': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'low': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <Clock className="h-4 w-4 text-yellow-500" />;
      case 'in-progress': return <Wrench className="h-4 w-4 text-blue-500" />;
      case 'completed': return <CheckCircle className="h-4 w-4 text-green-500" />;
      default: return <AlertTriangle className="h-4 w-4 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          {t('maintenance.title')}
        </h1>
        <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-600">
          <Wrench className="h-4 w-4 mr-2" />
          {t('maintenance.newTicket')}
        </Button>
      </div>

      {/* Statistiques de maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {t('maintenance.activeTickets')}
                </p>
                <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                  {activeTickets.filter(t => t.status !== 'completed').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {t('maintenance.inProgress')}
                </p>
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                  {activeTickets.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <Wrench className="h-8 w-8 text-blue-600 dark:text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {t('maintenance.completed')}
                </p>
                <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                  {activeTickets.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600 dark:text-green-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                  {t('maintenance.technicians')}
                </p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">3</p>
              </div>
              <User className="h-8 w-8 text-gray-600 dark:text-gray-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList className="dark:bg-gray-800">
          <TabsTrigger value="tickets" className="dark:data-[state=active]:bg-gray-700">
            {t('maintenance.tickets')}
          </TabsTrigger>
          <TabsTrigger value="history" className="dark:data-[state=active]:bg-gray-700">
            {t('maintenance.history')}
          </TabsTrigger>
          <TabsTrigger value="schedule" className="dark:data-[state=active]:bg-gray-700">
            {t('maintenance.preventive')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {activeTickets.map((ticket) => (
            <Card key={ticket.id} className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg dark:text-white">#{ticket.id} - {ticket.station}</CardTitle>
                    <p className="text-gray-600 dark:text-gray-300 mt-1">{ticket.issue}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(ticket.status)}
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority === 'high' ? t('maintenance.urgent') : 
                       ticket.priority === 'medium' ? t('maintenance.medium') : t('maintenance.low')}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('maintenance.technician')}</p>
                    <p className="font-medium dark:text-white">{ticket.technician}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('maintenance.createdOn')}</p>
                    <p className="font-medium dark:text-white">{ticket.created}</p>
                  </div>
                  <div>
                    <p className="text-gray-500 dark:text-gray-400">{t('maintenance.estimatedTime')}</p>
                    <p className="font-medium dark:text-white">{ticket.estimated}</p>
                  </div>
                  <div>
                    <Button size="sm" variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      {t('maintenance.viewDetails')}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {maintenanceHistory.map((item, index) => (
            <Card key={index} className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold dark:text-white">{item.station}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{item.action}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {item.date} • {item.technician} • {item.duration}
                    </p>
                  </div>
                  <CheckCircle className="h-6 w-6 text-green-500" />
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="schedule" className="space-y-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700 transition-colors duration-200">
            <CardHeader>
              <CardTitle className="dark:text-white">{t('maintenance.scheduled')}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium dark:text-white">Station Centre-ville</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('maintenance.quarterlyMaintenance')} - 25 Jan 2024
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {t('maintenance.scheduledLabel')}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border dark:border-gray-600 rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600 dark:text-green-400" />
                    <div>
                      <p className="font-medium dark:text-white">Station Université</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {t('maintenance.monthlyInspection')} - 30 Jan 2024
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className="dark:border-gray-600 dark:text-gray-300">
                    {t('maintenance.scheduledLabel')}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default MaintenancePage;
