
import React, { useState } from 'react';
import { CreditCard, Wallet, QrCode, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const PaymentsPage = () => {
  const recentTransactions = [
    {
      id: 'TXN001',
      user: 'Ahmed Mansouri',
      station: 'Station Centre-ville',
      amount: '450 DA',
      method: 'Carte bancaire',
      status: 'completed',
      date: '2024-01-20 14:30',
      energy: '18 kWh'
    },
    {
      id: 'TXN002',
      user: 'Fatima Belhadj',
      station: 'Station Université',
      amount: '320 DA',
      method: 'Portefeuille digital',
      status: 'completed',
      date: '2024-01-20 13:15',
      energy: '12.8 kWh'
    },
    {
      id: 'TXN003',
      user: 'Karim Boudiaf',
      station: 'Station Aéroport',
      amount: '680 DA',
      method: 'QR Code',
      status: 'pending',
      date: '2024-01-20 12:45',
      energy: '27.2 kWh'
    }
  ];

  const paymentMethods = [
    {
      name: 'Carte Bancaire (CIB)',
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      transactions: 156,
      revenue: '45,600 DA',
      percentage: 45
    },
    {
      name: 'EDAHABIA',
      icon: <Wallet className="h-8 w-8 text-green-600" />,
      transactions: 89,
      revenue: '28,900 DA',
      percentage: 28
    },
    {
      name: 'QR Code / Mobile Pay',
      icon: <QrCode className="h-8 w-8 text-purple-600" />,
      transactions: 67,
      revenue: '22,100 DA',
      percentage: 22
    },
    {
      name: 'Abonnement',
      icon: <Users className="h-8 w-8 text-green-600" />,
      transactions: 23,
      revenue: '5,400 DA',
      percentage: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'failed': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <DollarSign className="h-4 w-4 mr-2" />
          Configurer Tarifs
        </Button>
      </div>

      {/* Statistiques financières */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Aujourd'hui</p>
                <p className="text-2xl font-bold text-green-600">12,450 DA</p>
                <p className="text-xs text-green-500">+8.2% vs hier</p>
              </div>
              <TrendingUp className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus du Mois</p>
                <p className="text-2xl font-bold text-blue-600">342,800 DA</p>
                <p className="text-xs text-blue-500">+15.3% vs mois dernier</p>
              </div>
              <DollarSign className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Transactions</p>
                <p className="text-2xl font-bold text-purple-600">335</p>
                <p className="text-xs text-purple-500">+12.1% vs mois dernier</p>
              </div>
              <CreditCard className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tarif Moyen</p>
                <p className="text-2xl font-bold text-gray-900">28.5 DA/kWh</p>
                <p className="text-xs text-gray-500">Tous types confondus</p>
              </div>
              <Wallet className="h-8 w-8 text-gray-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="transactions" className="space-y-4">
        <TabsList>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="methods">Méthodes de Paiement</TabsTrigger>
          <TabsTrigger value="pricing">Configuration Tarifs</TabsTrigger>
        </TabsList>

        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Transactions Récentes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{transaction.user}</p>
                          <p className="text-sm text-gray-600">{transaction.station}</p>
                          <p className="text-xs text-gray-500">{transaction.date}</p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-lg">{transaction.amount}</p>
                          <p className="text-sm text-gray-600">{transaction.energy}</p>
                          <p className="text-xs text-gray-500">{transaction.method}</p>
                        </div>
                      </div>
                    </div>
                    <div className="ml-4">
                      <Badge className={getStatusColor(transaction.status)}>
                        {transaction.status === 'completed' ? 'Complété' : 
                         transaction.status === 'pending' ? 'En cours' : 'Échoué'}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="methods" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {paymentMethods.map((method, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      {method.icon}
                      <h3 className="font-semibold">{method.name}</h3>
                    </div>
                    <Badge variant="outline">{method.percentage}%</Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Transactions</span>
                      <span className="font-medium">{method.transactions}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Revenus</span>
                      <span className="font-medium">{method.revenue}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full"
                        style={{ width: `${method.percentage}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="pricing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Tarification AC (Charge Normale)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarif de base (DA/kWh)</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">25.00</span>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarif nocturne (22h-6h)</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-blue-600">18.00</span>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Tarification DC (Charge Rapide)</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarif de base (DA/kWh)</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bol text-green-600">35.00</span>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Tarif heures de pointe</label>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-red-600">42.00</span>
                    <Button size="sm" variant="outline">Modifier</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Abonnements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Basique</h3>
                  <p className="text-2xl font-bold text-green-600">2,500 DA/mois</p>
                  <p className="text-sm text-gray-600">50 kWh inclus</p>
                  <Button size="sm" className="w-full mt-3" variant="outline">Configurer</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Premium</h3>
                  <p className="text-2xl font-bold text-blue-600">4,500 DA/mois</p>
                  <p className="text-sm text-gray-600">100 kWh inclus</p>
                  <Button size="sm" className="w-full mt-3" variant="outline">Configurer</Button>
                </div>
                
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold mb-2">Entreprise</h3>
                  <p className="text-2xl font-bold text-purple-600">8,500 DA/mois</p>
                  <p className="text-sm text-gray-600">200 kWh inclus</p>
                  <Button size="sm" className="w-full mt-3" variant="outline">Configurer</Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PaymentsPage;
