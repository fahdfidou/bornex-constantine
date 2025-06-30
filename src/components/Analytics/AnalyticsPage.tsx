
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Zap, DollarSign, Users, Leaf, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../../contexts/LanguageContext';

const AnalyticsPage = () => {
  const { t } = useLanguage();

  const monthlyData = [
    { month: t('months.jan'), revenue: 85000, sessions: 245, energy: 3200 },
    { month: t('months.feb'), revenue: 92000, sessions: 267, energy: 3480 },
    { month: t('months.mar'), revenue: 78000, sessions: 198, energy: 2890 },
    { month: t('months.apr'), revenue: 105000, sessions: 312, energy: 4100 },
    { month: t('months.may'), revenue: 118000, sessions: 356, energy: 4650 },
    { month: t('months.jun'), revenue: 132000, sessions: 398, energy: 5200 }
  ];

  const dailyUsage = [
    { hour: '06:00', usage: 12 },
    { hour: '08:00', usage: 45 },
    { hour: '10:00', usage: 32 },
    { hour: '12:00', usage: 67 },
    { hour: '14:00', usage: 89 },
    { hour: '16:00', usage: 76 },
    { hour: '18:00', usage: 94 },
    { hour: '20:00', usage: 58 },
    { hour: '22:00', usage: 23 }
  ];

  const stationData = [
    { name: t('stations.centreville'), value: 35, color: '#10B981' },
    { name: t('stations.university'), value: 28, color: '#3B82F6' },
    { name: t('stations.airport'), value: 22, color: '#8B5CF6' },
    { name: t('stations.port'), value: 15, color: '#F59E0B' }
  ];

  const co2Data = [
    { month: t('months.jan'), saved: 1250 },
    { month: t('months.feb'), saved: 1380 },
    { month: t('months.mar'), saved: 1156 },
    { month: t('months.apr'), saved: 1634 },
    { month: t('months.may'), saved: 1850 },
    { month: t('months.jun'), saved: 2080 }
  ];

  const paymentMethods = [
    { name: t('payments.bankCard'), value: 45 },
    { name: t('payments.edahabia'), value: 28 },
    { name: t('payments.qrCode'), value: 22 },
    { name: t('payments.subscription'), value: 5 }
  ];

  return (
    <div className="relative min-h-screen">
      {/* Background avec motifs d'analytiques */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-44 h-44 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-36 h-36 bg-gradient-to-br from-purple-400 to-pink-500 rounded-full blur-2xl"></div>
        
        {/* Icônes d'analytiques en arrière-plan */}
        <div className="absolute top-1/4 left-1/6 opacity-8">
          <TrendingUp className="w-32 h-32 text-blue-500" />
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-8">
          <BarChart className="w-28 h-28 text-green-500" />
        </div>
        <div className="absolute top-1/2 right-1/6 opacity-8">
          <Leaf className="w-24 h-24 text-purple-500" />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{t('analytics.title')}</h1>
          <div className="flex items-center space-x-2">
            <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400" />
            <select className="border rounded-lg px-3 py-2 text-sm dark:bg-gray-800 dark:border-gray-600 dark:text-white">
              <option>{t('analytics.last6Months')}</option>
              <option>{t('analytics.lastYear')}</option>
              <option>{t('analytics.all')}</option>
            </select>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('analytics.totalRevenue')}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">610,000 DA</p>
                  <p className="text-xs text-green-500 dark:text-green-400">+18.2% {t('analytics.vsPrevious')}</p>
                </div>
                <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('analytics.totalSessions')}</p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">1,776</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400">+12.5% {t('analytics.vsPrevious')}</p>
                </div>
                <Zap className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('analytics.energyDistributed')}</p>
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">23,520 kWh</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400">+15.8% {t('analytics.vsPrevious')}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">{t('analytics.co2Saved')}</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">9,348 kg</p>
                  <p className="text-xs text-green-500 dark:text-green-400">{t('analytics.environmentalImpact')}</p>
                </div>
                <Leaf className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="revenue" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800">
            <TabsTrigger value="revenue">{t('analytics.revenue')}</TabsTrigger>
            <TabsTrigger value="usage">{t('analytics.usage')}</TabsTrigger>
            <TabsTrigger value="stations">{t('analytics.stations')}</TabsTrigger>
            <TabsTrigger value="environmental">{t('analytics.environmental')}</TabsTrigger>
          </TabsList>

          <TabsContent value="revenue" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('analytics.revenueEvolution')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value.toLocaleString()} DA`, t('analytics.revenue')]} />
                    <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('analytics.revenueByStation')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 dark:text-white">{t('stations.centreville')}</span>
                      <span className="font-bold text-gray-900 dark:text-white">215,400 DA</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-green-600 dark:bg-green-500 h-2 rounded-full" style={{ width: '35%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 dark:text-white">{t('stations.university')}</span>
                      <span className="font-bold text-gray-900 dark:text-white">170,800 DA</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-blue-600 dark:bg-blue-500 h-2 rounded-full" style={{ width: '28%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 dark:text-white">{t('stations.airport')}</span>
                      <span className="font-bold text-gray-900 dark:text-white">134,200 DA</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-purple-600 dark:bg-purple-500 h-2 rounded-full" style={{ width: '22%' }}></div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-900 dark:text-white">{t('stations.port')}</span>
                      <span className="font-bold text-gray-900 dark:text-white">89,600 DA</span>
                      <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <div className="bg-yellow-600 dark:bg-yellow-500 h-2 rounded-full" style={{ width: '15%' }}></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('analytics.paymentMethods')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={paymentMethods}
                        cx="50%"
                        cy="50%"
                        innerRadius={40}
                        outerRadius={80}
                        dataKey="value"
                      >
                        <Cell fill="#10B981" />
                        <Cell fill="#3B82F6" />
                        <Cell fill="#8B5CF6" />
                        <Cell fill="#F59E0B" />
                      </Pie>
                      <Tooltip formatter={(value) => `${value}%`} />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="usage" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('analytics.usageByHour')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={dailyUsage}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} ${t('analytics.sessions')}`, t('analytics.usage')]} />
                    <Line type="monotone" dataKey="usage" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('analytics.sessionsPerMonth')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={250}>
                    <BarChart data={monthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip formatter={(value) => [`${value} ${t('analytics.sessions')}`, t('analytics.sessions')]} />
                      <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('analytics.averageSessionDuration')}</CardTitle>
                </CardHeader>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-green-600 dark:text-green-400">42</div>
                    <div className="text-lg text-gray-600 dark:text-gray-300">{t('analytics.minutes')}</div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">{t('analytics.averagePerSession')}</p>
                    <p className="text-xs text-green-500 dark:text-green-400">-8% {t('analytics.vsLastMonth')}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="stations" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('analytics.stationPerformance')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={stationData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                    >
                      {stationData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `${value}%`} />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('analytics.utilizationRate')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {stationData.map((station, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <span className="flex items-center text-gray-900 dark:text-white">
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: station.color }}
                          />
                          {station.name}
                        </span>
                        <div className="flex items-center space-x-2">
                          <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                            <div 
                              className="h-2 rounded-full transition-all duration-300"
                              style={{ 
                                width: `${station.value}%`,
                                backgroundColor: station.color
                              }}
                            />
                          </div>
                          <span className="text-sm font-medium text-gray-900 dark:text-white">{station.value}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-gray-900 dark:text-white">{t('analytics.stationAvailability')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{t('stations.centreville')}</span>
                      <span className="text-green-600 dark:text-green-400 font-bold">98.5%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{t('stations.university')}</span>
                      <span className="text-blue-600 dark:text-blue-400 font-bold">96.2%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{t('stations.airport')}</span>
                      <span className="text-purple-600 dark:text-purple-400 font-bold">94.8%</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
                      <span className="font-medium text-gray-900 dark:text-white">{t('stations.port')}</span>
                      <span className="text-yellow-600 dark:text-yellow-400 font-bold">91.3%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="environmental" className="space-y-4">
            <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-gray-900 dark:text-white">{t('analytics.co2SavedPerMonth')}</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={co2Data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} kg`, t('analytics.co2Saved')]} />
                    <Line type="monotone" dataKey="saved" stroke="#10B981" strokeWidth={3} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 text-green-600 dark:text-green-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">9,348 kg</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('analytics.totalCo2Saved')}</p>
                  <p className="text-xs text-green-500 dark:text-green-400 mt-1">{t('analytics.equivalentTrees')}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-blue-600 dark:text-blue-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">23,520 kWh</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('analytics.cleanEnergyDistributed')}</p>
                  <p className="text-xs text-blue-500 dark:text-blue-400 mt-1">{t('analytics.renewableEnergy')}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                <CardContent className="p-6 text-center">
                  <Users className="h-12 w-12 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
                  <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">1,776</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{t('analytics.chargingSessions')}</p>
                  <p className="text-xs text-purple-500 dark:text-purple-400 mt-1">{t('analytics.sustainableMobility')}</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AnalyticsPage;
