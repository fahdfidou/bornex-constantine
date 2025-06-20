
import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Wrench, User, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const MaintenancePage = () => {
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
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
        <h1 className="text-3xl font-bold text-gray-900">Module de Maintenance</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Wrench className="h-4 w-4 mr-2" />
          Nouveau Ticket
        </Button>
      </div>

      {/* Statistiques de maintenance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tickets Actifs</p>
                <p className="text-2xl font-bold text-red-600">
                  {activeTickets.filter(t => t.status !== 'completed').length}
                </p>
              </div>
              <AlertTriangle className="h-8 w-8 text-red-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En Cours</p>
                <p className="text-2xl font-bold text-blue-600">
                  {activeTickets.filter(t => t.status === 'in-progress').length}
                </p>
              </div>
              <Wrench className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Complétés</p>
                <p className="text-2xl font-bold text-green-600">
                  {activeTickets.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Techniciens</p>
                <p className="text-2xl font-bold text-gray-900">3</p>
              </div>
              <User className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="tickets" className="space-y-4">
        <TabsList>
          <TabsTrigger value="tickets">Tickets Actifs</TabsTrigger>
          <TabsTrigger value="history">Historique</TabsTrigger>
          <TabsTrigger value="schedule">Maintenance Préventive</TabsTrigger>
        </TabsList>

        <TabsContent value="tickets" className="space-y-4">
          {activeTickets.map((ticket) => (
            <Card key={ticket.id}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">#{ticket.id} - {ticket.station}</CardTitle>
                    <p className="text-gray-600 mt-1">{ticket.issue}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(ticket.status)}
                    <Badge className={getPriorityColor(ticket.priority)}>
                      {ticket.priority === 'high' ? 'Urgent' : 
                       ticket.priority === 'medium' ? 'Moyen' : 'Faible'}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Technicien</p>
                    <p className="font-medium">{ticket.technician}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Créé le</p>
                    <p className="font-medium">{ticket.created}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Temps estimé</p>
                    <p className="font-medium">{ticket.estimated}</p>
                  </div>
                  <div>
                    <Button size="sm" variant="outline" className="w-full">
                      Voir Détails
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="history" className="space-y-4">
          {maintenanceHistory.map((item, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-semibold">{item.station}</h3>
                    <p className="text-gray-600">{item.action}</p>
                    <p className="text-sm text-gray-500">
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
          <Card>
            <CardHeader>
              <CardTitle>Maintenance Programmée</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Station Centre-ville</p>
                      <p className="text-sm text-gray-500">Maintenance trimestrielle - 25 Jan 2024</p>
                    </div>
                  </div>
                  <Badge variant="outline">Programmée</Badge>
                </div>
                
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <Calendar className="h-5 w-5 text-green-600" />
                    <div>
                      <p className="font-medium">Station Université</p>
                      <p className="text-sm text-gray-500">Inspection mensuelle - 30 Jan 2024</p>
                    </div>
                  </div>
                  <Badge variant="outline">Programmée</Badge>
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
