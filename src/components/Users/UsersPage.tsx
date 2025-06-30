
import React, { useState } from 'react';
import { Users, UserPlus, Car, Battery, Calendar, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../../contexts/LanguageContext';

const UsersPage = () => {
  const { t } = useLanguage();
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
      subscriptionType: 'Basic',
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
      subscriptionType: 'Enterprise',
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
      station: t('stations.centreville'),
      date: '2024-01-20 14:30',
      duration: '45 min',
      energy: '18 kWh',
      cost: '450 DA'
    },
    {
      user: 'Fatima Belhadj', 
      station: t('stations.university'),
      date: '2024-01-19 16:15',
      duration: '32 min',
      energy: '12.8 kWh',
      cost: '320 DA'
    },
    {
      user: 'Karim Boudiaf',
      station: t('stations.airport'),
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
      case 'Premium': return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'Enterprise': return 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200';
      case 'Basic': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  const getStatusColor = (status) => {
    return status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
  };

  return (
    <div className="relative min-h-screen">
      {/* Background avec motifs d'utilisateurs */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute top-60 right-20 w-36 h-36 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-60 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl"></div>
        
        {/* Icônes d'utilisateurs en arrière-plan */}
        <div className="absolute top-1/4 left-1/5 opacity-10">
          <Users className="w-28 h-28 text-blue-500" />
        </div>
        <div className="absolute bottom-1/4 right-1/4 opacity-10">
          <Car className="w-24 h-24 text-green-500" />
        </div>
        <div className="absolute top-1/2 right-1/5 opacity-10">
          <Battery className="w-20 h-20 text-purple-500" />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('users.title')}</h1>
          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
            <UserPlus className="h-4 w-4 mr-2" />
            {t('users.addUser')}
          </Button>
        </div>

        {/* Statistiques utilisateurs */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('users.totalUsers')}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">{users.length}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">
                    {users.filter(u => u.status === 'active').length} {t('users.active')}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('users.totalSessions')}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {users.reduce((sum, user) => sum + user.totalSessions, 0)}
                  </p>
                  <p className="text-xs text-green-500 dark:text-green-400">{t('users.thisMonth')}</p>
                </div>
                <Battery className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('users.energyConsumed')}</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">
                    {users.reduce((sum, user) => sum + parseInt(user.totalEnergy.replace(/[^\d]/g, '')), 0).toLocaleString()} kWh
                  </p>
                  <p className="text-xs text-purple-500 dark:text-purple-400">{t('users.total')}</p>
                </div>
                <Car className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('users.userRevenue')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {users.reduce((sum, user) => sum + parseInt(user.totalSpent.replace(/[^\d]/g, '')), 0).toLocaleString()} DA
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('users.total')}</p>
                </div>
                <Calendar className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800">
            <TabsTrigger value="users">{t('users.usersList')}</TabsTrigger>
            <TabsTrigger value="sessions">{t('users.recentSessions')}</TabsTrigger>
            <TabsTrigger value="analytics">{t('users.analytics')}</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-gray-900 dark:text-white">{t('users.registeredUsers')}</CardTitle>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-gray-400" />
                    <Input
                      placeholder={t('users.searchUser')}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-64 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredUsers.map((user) => (
                    <div key={user.id} className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{user.name}</h3>
                            <Badge className={getStatusColor(user.status)}>
                              {user.status === 'active' ? t('users.active') : t('users.inactive')}
                            </Badge>
                            <Badge className={getSubscriptionColor(user.subscriptionType)}>
                              {user.subscriptionType}
                            </Badge>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">{t('users.contact')}</p>
                              <p className="font-medium text-gray-900 dark:text-white">{user.email}</p>
                              <p className="text-gray-600 dark:text-gray-300">{user.phone}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">{t('users.vehicle')}</p>
                              <p className="font-medium text-gray-900 dark:text-white">{user.vehicleModel}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">{t('users.statistics')}</p>
                              <p className="font-medium text-gray-900 dark:text-white">{user.totalSessions} {t('users.sessions')}</p>
                              <p className="text-gray-600 dark:text-gray-300">{user.totalEnergy}</p>
                            </div>
                            <div>
                              <p className="text-gray-500 dark:text-gray-400">{t('users.lastSession')}</p>
                              <p className="font-medium text-gray-900 dark:text-white">{user.lastSession}</p>
                              <p className="text-gray-600 dark:text-gray-300">{user.totalSpent}</p>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          <Button size="sm" variant="outline" className="dark:border-gray-600">{t('users.viewProfile')}</Button>
                          <Button size="sm" variant="outline" className="dark:border-gray-600">{t('users.history')}</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="sessions" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('users.recentChargingSessions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentSessions.map((session, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{session.user}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{session.station}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{session.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-gray-900 dark:text-white">{session.cost}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{session.energy}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{session.duration}</p>
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
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('users.subscriptionDistribution')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {['Basic', 'Premium', 'Enterprise'].map((type) => {
                      const count = users.filter(u => u.subscriptionType === type).length;
                      const percentage = Math.round((count / users.length) * 100);
                      
                      return (
                        <div key={type} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <Badge className={getSubscriptionColor(type)}>{type}</Badge>
                            <span className="text-sm text-gray-900 dark:text-white">{count} {t('users.users')}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                              <div 
                                className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-300"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                            <span className="text-sm font-medium text-gray-900 dark:text-white">{percentage}%</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('users.topUsers')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {users
                      .sort((a, b) => b.totalSessions - a.totalSessions)
                      .slice(0, 5)
                      .map((user, index) => (
                        <div key={user.id} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                              <span className="text-sm font-bold text-green-600 dark:text-green-400">#{index + 1}</span>
                            </div>
                            <div>
                              <p className="font-medium text-gray-900 dark:text-white">{user.name}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{user.totalSessions} {t('users.sessions')}</p>
                            </div>
                          </div>
                          <Badge variant="outline" className="dark:border-gray-600">{user.totalSpent}</Badge>
                        </div>
                      ))}
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

export default UsersPage;
