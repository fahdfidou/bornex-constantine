
import React, { useState } from 'react';
import { CreditCard, Wallet, QrCode, Users, TrendingUp, DollarSign } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../../contexts/LanguageContext';

const PaymentsPage = () => {
  const { t } = useLanguage();
  const [searchTerm, setSearchTerm] = useState('');

  const recentTransactions = [
    {
      id: 'TXN001',
      user: 'Ahmed Mansouri',
      station: t('stations.centreville'),
      amount: '450 DA',
      method: t('payments.bankCard'),
      status: 'completed',
      date: '2024-01-20 14:30',
      energy: '18 kWh'
    },
    {
      id: 'TXN002',
      user: 'Fatima Belhadj',
      station: t('stations.university'),
      amount: '320 DA',
      method: t('payments.digitalWallet'),
      status: 'completed',
      date: '2024-01-20 13:15',
      energy: '12.8 kWh'
    },
    {
      id: 'TXN003',
      user: 'Karim Boudiaf',
      station: t('stations.airport'),
      amount: '680 DA',
      method: t('payments.qrCode'),
      status: 'pending',
      date: '2024-01-20 12:45',
      energy: '27.2 kWh'
    }
  ];

  const paymentMethods = [
    {
      name: t('payments.bankCardCib'),
      icon: <CreditCard className="h-8 w-8 text-blue-600" />,
      transactions: 156,
      revenue: '45,600 DA',
      percentage: 45
    },
    {
      name: t('payments.edahabia'),
      icon: <Wallet className="h-8 w-8 text-green-600" />,
      transactions: 89,
      revenue: '28,900 DA',
      percentage: 28
    },
    {
      name: t('payments.qrCodeMobile'),
      icon: <QrCode className="h-8 w-8 text-purple-600" />,
      transactions: 67,
      revenue: '22,100 DA',
      percentage: 22
    },
    {
      name: t('payments.subscription'),
      icon: <Users className="h-8 w-8 text-green-600" />,
      transactions: 23,
      revenue: '5,400 DA',
      percentage: 5
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      case 'failed': return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  };

  return (
    <div className="relative min-h-screen">
      {/* Background avec motifs de paiement */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-40 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-40 left-40 w-36 h-36 bg-gradient-to-br from-blue-400 to-green-500 rounded-full blur-2xl"></div>
        
        {/* Icônes de paiement en arrière-plan */}
        <div className="absolute top-1/3 left-1/4 opacity-10">
          <CreditCard className="w-24 h-24 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 right-1/3 opacity-10">
          <Wallet className="w-20 h-20 text-green-500" />
        </div>
        <div className="absolute top-1/2 right-1/4 opacity-10">
          <QrCode className="w-22 h-22 text-purple-500" />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('payments.title')}</h1>
          <Button className="bg-green-600 hover:bg-green-700 dark:bg-green-700 dark:hover:bg-green-800">
            <DollarSign className="h-4 w-4 mr-2" />
            {t('payments.configurePricing')}
          </Button>
        </div>

        {/* Statistiques financières */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('payments.todayRevenue')}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">12,450 DA</p>
                  <p className="text-xs text-green-500 dark:text-green-400">+8.2% {t('payments.vsYesterday')}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('payments.monthRevenue')}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">342,800 DA</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">+15.3% {t('payments.vsLastMonth')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('payments.transactions')}</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">335</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400">+12.1% {t('payments.vsLastMonth')}</p>
                </div>
                <CreditCard className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('payments.averageRate')}</p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">28.5 DA/kWh</p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">{t('payments.allTypes')}</p>
                </div>
                <Wallet className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="transactions" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800">
            <TabsTrigger value="transactions">{t('payments.transactions')}</TabsTrigger>
            <TabsTrigger value="methods">{t('payments.paymentMethods')}</TabsTrigger>
            <TabsTrigger value="pricing">{t('payments.pricingConfig')}</TabsTrigger>
          </TabsList>

          <TabsContent value="transactions" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('payments.recentTransactions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentTransactions.map((transaction) => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-gray-900 dark:text-white">{transaction.user}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.station}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.date}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-lg text-gray-900 dark:text-white">{transaction.amount}</p>
                            <p className="text-sm text-gray-600 dark:text-gray-300">{transaction.energy}</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">{transaction.method}</p>
                          </div>
                        </div>
                      </div>
                      <div className="ml-4">
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status === 'completed' ? t('payments.completed') : 
                           transaction.status === 'pending' ? t('payments.pending') : t('payments.failed')}
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
                <Card key={index} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        {method.icon}
                        <h3 className="font-semibold text-gray-900 dark:text-white">{method.name}</h3>
                      </div>
                      <Badge variant="outline" className="dark:border-gray-600">{method.percentage}%</Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{t('payments.transactions')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{method.transactions}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600 dark:text-gray-300">{t('payments.revenue')}</span>
                        <span className="font-medium text-gray-900 dark:text-white">{method.revenue}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3">
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div 
                          className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-300"
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
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('payments.acPricing')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.baseRate')}</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">25.00</span>
                      <Button size="sm" variant="outline" className="dark:border-gray-600">{t('payments.modify')}</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.nightRate')}</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">18.00</span>
                      <Button size="sm" variant="outline" className="dark:border-gray-600">{t('payments.modify')}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('payments.dcPricing')}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.baseRate')}</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-green-600 dark:text-green-400">35.00</span>
                      <Button size="sm" variant="outline" className="dark:border-gray-600">{t('payments.modify')}</Button>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700 dark:text-gray-300">{t('payments.peakRate')}</label>
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl font-bold text-red-600 dark:text-red-400">42.00</span>
                      <Button size="sm" variant="outline" className="dark:border-gray-600">{t('payments.modify')}</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('payments.subscriptions')}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('payments.basic')}</h3>
                    <p className="text-2xl font-bold text-green-600 dark:text-green-400">2,500 DA/{t('payments.month')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">50 kWh {t('payments.included')}</p>
                    <Button size="sm" className="w-full mt-3" variant="outline">{t('payments.configure')}</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('payments.premium')}</h3>
                    <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">4,500 DA/{t('payments.month')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">100 kWh {t('payments.included')}</p>
                    <Button size="sm" className="w-full mt-3" variant="outline">{t('payments.configure')}</Button>
                  </div>
                  
                  <div className="p-4 border rounded-lg dark:border-gray-700 bg-gray-50 dark:bg-gray-700/50">
                    <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t('payments.enterprise')}</h3>
                    <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">8,500 DA/{t('payments.month')}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">200 kWh {t('payments.included')}</p>
                    <Button size="sm" className="w-full mt-3" variant="outline">{t('payments.configure')}</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PaymentsPage;
