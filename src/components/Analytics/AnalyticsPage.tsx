
import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Zap, DollarSign, Users, Leaf, Calendar } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const AnalyticsPage = () => {
  const monthlyData = [
    { month: 'Jan', revenue: 85000, sessions: 245, energy: 3200 },
    { month: 'Fév', revenue: 92000, sessions: 267, energy: 3480 },
    { month: 'Mar', revenue: 78000, sessions: 198, energy: 2890 },
    { month: 'Avr', revenue: 105000, sessions: 312, energy: 4100 },
    { month: 'Mai', revenue: 118000, sessions: 356, energy: 4650 },
    { month: 'Jun', revenue: 132000, sessions: 398, energy: 5200 }
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
    { name: 'Centre-ville', value: 35, color: '#10B981' },
    { name: 'Université', value: 28, color: '#3B82F6' },
    { name: 'Aéroport', value: 22, color: '#8B5CF6' },
    { name: 'Port', value: 15, color: '#F59E0B' }
  ];

  const co2Data = [
    { month: 'Jan', saved: 1250 },
    { month: 'Fév', saved: 1380 },
    { month: 'Mar', saved: 1156 },
    { month: 'Avr', saved: 1634 },
    { month: 'Mai', saved: 1850 },
    { month: 'Jun', saved: 2080 }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Analytiques Avancées</h1>
        <div className="flex items-center space-x-2">
          <Calendar className="h-4 w-4 text-gray-500" />
          <select className="border rounded-lg px-3 py-2 text-sm">
            <option>Derniers 6 mois</option>
            <option>Dernière année</option>
            <option>Tout</option>
          </select>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Revenus Totaux</p>
                <p className="text-2xl font-bold text-green-600">610,000 DA</p>
                <p className="text-xs text-green-500">+18.2% vs période précédente</p>
              </div>
              <DollarSign className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sessions Totales</p>
                <p className="text-2xl font-bold text-blue-600">1,776</p>
                <p className="text-xs text-blue-500">+12.5% vs période précédente</p>
              </div>
              <Zap className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Énergie Distribuée</p>
                <p className="text-2xl font-bold text-purple-600">23,520 kWh</p>
                <p className="text-xs text-purple-500">+15.8% vs période précédente</p>
              </div>
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">CO₂ Économisé</p>
                <p className="text-2xl font-bold text-green-600">9,348 kg</p>
                <p className="text-xs text-green-500">Impact environnemental</p>
              </div>
              <Leaf className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="revenue" className="space-y-4">
        <TabsList>
          <TabsTrigger value="revenue">Revenus</TabsTrigger>
          <TabsTrigger value="usage">Utilisation</TabsTrigger>
          <TabsTrigger value="stations">Stations</TabsTrigger>
          <TabsTrigger value="environmental">Impact Environnemental</TabsTrigger>
        </TabsList>

        <TabsContent value="revenue" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Évolution des Revenus</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value.toLocaleString()} DA`, 'Revenus']} />
                  <Bar dataKey="revenue" fill="#10B981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Revenus par Station</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span>Station Centre-ville</span>
                    <span className="font-bold">215,400 DA</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '35%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Station Université</span>
                    <span className="font-bold">170,800 DA</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '28%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Station Aéroport</span>
                    <span className="font-bold">134,200 DA</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '22%' }}></div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Station Port</span>
                    <span className="font-bold">89,600 DA</span>
                    <div className="w-20 bg-gray-200 rounded-full h-2">
                      <div className="bg-yellow-600 h-2 rounded-full" style={{ width: '15%' }}></div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Méthodes de Paiement</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'Carte Bancaire', value: 45 },
                        { name: 'EDAHABIA', value: 28 },
                        { name: 'QR Code', value: 22 },
                        { name: 'Abonnement', value: 5 }
                      ]}
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
          <Card>
            <CardHeader>
              <CardTitle>Utilisation par Heure</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={dailyUsage}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="hour" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} sessions`, 'Utilisation']} />
                  <Line type="monotone" dataKey="usage" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Sessions par Mois</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`${value} sessions`, 'Sessions']} />
                    <Bar dataKey="sessions" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Durée Moyenne des Sessions</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600">42</div>
                  <div className="text-lg text-gray-600">minutes</div>
                  <p className="text-sm text-gray-500 mt-2">Durée moyenne par session</p>
                  <p className="text-xs text-green-500">-8% vs mois dernier</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="stations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Performance des Stations</CardTitle>
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
            <Card>
              <CardHeader>
                <CardTitle>Taux d'Utilisation</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {stationData.map((station, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: station.color }}
                        />
                        {station.name}
                      </span>
                      <div className="flex items-center space-x-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className="h-2 rounded-full"
                            style={{ 
                              width: `${station.value}%`,
                              backgroundColor: station.color
                            }}
                          />
                        </div>
                        <span className="text-sm font-medium">{station.value}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Disponibilité des Stations</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                    <span className="font-medium">Station Centre-ville</span>
                    <span className="text-green-600 font-bold">98.5%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                    <span className="font-medium">Station Université</span>
                    <span className="text-blue-600 font-bold">96.2%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                    <span className="font-medium">Station Aéroport</span>
                    <span className="text-purple-600 font-bold">94.8%</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                    <span className="font-medium">Station Port</span>
                    <span className="text-yellow-600 font-bold">91.3%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="environmental" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>CO₂ Économisé par Mois</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={co2Data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip formatter={(value) => [`${value} kg`, 'CO₂ économisé']} />
                  <Line type="monotone" dataKey="saved" stroke="#10B981" strokeWidth={3} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardContent className="p-6 text-center">
                <Leaf className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <p className="text-2xl font-bold text-green-600">9,348 kg</p>
                <p className="text-sm text-gray-600">CO₂ total économisé</p>
                <p className="text-xs text-green-500 mt-1">Équivalent à 42 arbres plantés</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <p className="text-2xl font-bold text-blue-600">23,520 kWh</p>
                <p className="text-sm text-gray-600">Énergie propre distribuée</p>
                <p className="text-xs text-blue-500 mt-1">100% énergie renouvelable</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <p className="text-2xl font-bold text-purple-600">1,776</p>
                <p className="text-sm text-gray-600">Sessions de recharge</p>
                <p className="text-xs text-purple-500 mt-1">Mobilité durable</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
