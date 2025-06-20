
import React, { useState } from 'react';
import { Users, UserPlus, Car, Battery, Calendar, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const UsersPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const users = [
    {
      id: 'U001',
      name: 'Ahmed Mansouri',
      email: 'ahmed.mansouri@email.com',
      phone: '+213 555 123 456',
      vehicleModel: 'Tesla Model 3',
      subscriptionType: 'Premium',
      totalSessions: 45,
      totalEnergy: '1,250 kWh',
      totalSpent: '35,600 DA',
      lastSession: '2024-01-20',
      status: 'active'
    },
    {
      id: 'U002',
      name: 'Fatima Belhadj',
      email: 'fatima.belhadj@email.com',
      phone: '+213 555 234 567',
      vehicleModel: 'Nissan Leaf',
      subscriptionType: 'Basique',
      totalSessions: 28,
      totalEnergy: '680 kWh',
      totalSpent: '18,400 DA',
      lastSession: '2024-01-19',
      status: 'active'
    },
    {
      id: 'U003',
      name: 'Karim Boudiaf',
      email: 'karim.boudiaf@email.com',
      phone: '+213 555 345 678',
      vehicleModel: 'BMW i3',
      subscriptionType: 'Entreprise',
      totalSessions: 72,
      totalEnergy: '2,180 kWh',
      totalSpent: '67,500 DA',
      lastSession: '2024-01-20',
      status: 'active'
    },
    {
      id: 'U004',
      name: 'Amina Cherif',
      email: 'amina.cherif@email.com',
      phone: '+213 555 456 789',
      vehicleModel: 'Renault ZOE',
      subscriptionType: 'Premium',
      totalSessions: 16,
      totalEnergy: '420 kWh',
      totalSpent: '12,800 DA',
      lastSession: '2024-01-15',
      status: 'inactive'
    }
  ];

  const recentSessions = [
    {
      user: 'Ahmed Mansouri',
      station: 'Station Centre-ville',
      date: '2024-01-20 14:30',
      duration: '45 min',
      energy: '18 kWh',
      cost: '450 DA'
    },
    {
      user: 'Fatima Belhadj', 
      station: 'Station Université',
      date: '2024-01-19 16:15',
      duration: '32 min',
      energy: '12.8 kWh',
      cost: '320 DA'
    },
    {
      user: 'Karim Boudiaf',
      station: 'Station Aéroport',
      date: '2024-01-19 10:20',
      duration: '55 min',
      energy: '27.2 kWh',
      cost: '680 DA'
    }
  ];

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getSubscriptionColor = (type) => {
    switch (type) {
      case 'Premium': return 'bg-blue-100 text-blue-800';
      case 'Entreprise': return 'bg-purple-100 text-purple-800';
      case 'Basique': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Utilisateurs</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <UserPlus className="h-4 w-4 mr-2" />
          Ajouter Utilisateur
        </Button>
      </div>

      {/* Statistiques utilisateurs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Utilisateurs</p>
                <p className="text-2xl font-bold text-blue-600">{users.length}</p>
                <p className="text-xs text-blue-500">
                  {users.filter(u => u.status === 'active').length} actifs
                </p>
              </div>
              <Users className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions Totales</p>
                <p className="text-2xl font-bold text-green-600">
                  {users.reduce((sum, user) => sum + user.totalSessions, 0)}
                </p>
                <p className="text-xs text-green-500">Ce mois</p>
              </div>
              <Battery className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Énergie Consommée</p>
                <p className="text-2xl font-bold text-purple-600">
                  {users.reduce((sum, user) => sum + parseInt(user.totalEnergy.replace(/[^\d]/g, '')), 0).toLocaleString()} kWh
                </p>
                <p className="text-xs text-purple-500">Total</p>
              </div>
              <Car className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Utilisateurs</p>
                <p className="text-2xl font-bold text-gray-900">
                  {users.reduce((sum, user) => sum + parseInt(user.totalSpent.replace(/[^\d]/g, '')), 0).toLocaleString()} DA
                </p>
                <p className="text-xs text-gray-500">Total</p>
              </div>
              <Calendar className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Liste des Utilisateurs</TabsTrigger>
          <TabsTrigger value="sessions">Sessions Récentes</TabsTrigger>
          <TabsTrigger value="analytics">Analytiques</TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Utilisateurs Enregistrés</CardTitle>
                <div className="flex items-center space-x-2">
                  <Search className="h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Rechercher un utilisateur..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-64"
                  />
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filteredUsers.map((user) => (
                  <div key={user.id} className="p-4 border rounded-lg">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="font-semibold text-lg">{user.name}</h3>
                          <Badge className={getStatusColor(user.status)}>
                            {user.status === 'active' ? 'Actif' : 'Inactif'}
                          </Badge>
                          <Badge className={getSubscriptionColor(user.subscriptionType)}>
                            {user.subscriptionType}
                          </Badge>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <p className="text-gray-500">Contact</p>
                            <p className="font-medium">{user.email}</p>
                            <p className="text-gray-600">{user.phone}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Véhicule</p>
                            <p className="font-medium">{user.vehicleModel}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Statistiques</p>
                            <p className="font-medium">{user.totalSessions} sessions</p>
                            <p className="text-gray-600">{user.totalEnergy}</p>
                          </div>
                          <div>
                            <p className="text-gray-500">Dernière session</p>
                            <p className="font-medium">{user.lastSession}</p>
                            <p className="text-gray-600">{user.totalSpent}</p>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline">Voir Profil</Button>
                        <Button size="sm" variant="outline">Historique</Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="sessions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sessions de Recharge Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentSessions.map((session, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{session.user}</p>
                          <p className="text-sm text-gray-600">{session.station}</p>
                          <p className="text-xs text-gray-500">{session.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold">{session.cost}</p>
                          <p className="text-sm text-gray-600">{session.energy}</p>
                          <p className="text-xs text-gray-500">{session.duration}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Répartition par Abonnement</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {['Basique', 'Premium', 'Entreprise'].map((type) => {
                    const count = users.filter(u => u.subscriptionType === type).length;
                    const percentage = Math.round((count / users.length) * 100);
                    
                    return (
                      <div key={type} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Badge className={getSubscriptionColor(type)}>{type}</Badge>
                          <span className="text-sm">{count} utilisateurs</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <div className="w-20 bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-green-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{percentage}%</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Top Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {users
                    .sort((a, b) => b.totalSessions - a.totalSessions)
                    .slice(0, 5)
                    .map((user, index) => (
                      <div key={user.id} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-bold text-green-600">#{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{user.name}</p>
                            <p className="text-xs text-gray-500">{user.totalSessions} sessions</p>
                          </div>
                        </div>
                        <Badge variant="outline">{user.totalSpent}</Badge>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UsersPage;
