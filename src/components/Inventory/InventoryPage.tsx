
import React, { useState } from 'react';
import { Package, Plus, AlertTriangle, TrendingDown, TrendingUp, ShoppingCart } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useLanguage } from '../../contexts/LanguageContext';

const InventoryPage = () => {
  const { t } = useLanguage();
  
  const [inventory, setInventory] = useState([
    {
      id: 'INV001',
      name: 'Câble de charge Type 2',
      category: 'Câbles',
      stock: 12,
      reorderPoint: 5,
      supplier: 'TechnoCharge SA',
      lastOrdered: '2024-01-10',
      unitPrice: '2,500 DA',
      status: 'inStock'
    },
    {
      id: 'INV002',
      name: 'Connecteur CCS Combo',
      category: 'Connecteurs',
      stock: 3,
      reorderPoint: 8,
      supplier: 'ElectroTech DZ',
      lastOrdered: '2024-01-05',
      unitPrice: '15,000 DA',
      status: 'lowStock'
    },
    {
      id: 'INV003',
      name: 'Écran tactile 10 pouces',
      category: 'Composants électroniques',
      stock: 6,
      reorderPoint: 4,
      supplier: 'DisplayMax',
      lastOrdered: '2024-01-15',
      unitPrice: '25,000 DA',
      status: 'inStock'
    },
    {
      id: 'INV004',
      name: 'Transformateur 350kW',
      category: 'Équipements',
      stock: 0,
      reorderPoint: 2,
      supplier: 'PowerTech Algeria',
      lastOrdered: '2023-12-20',
      unitPrice: '450,000 DA',
      status: 'outOfStock'
    },
    {
      id: 'INV005',
      name: 'Module de communication 4G',
      category: 'Télécommunications',
      stock: 15,
      reorderPoint: 6,
      supplier: 'ConnectDZ',
      lastOrdered: '2024-01-18',
      unitPrice: '8,500 DA',
      status: 'inStock'
    }
  ]);

  const orders = [
    {
      id: 'ORD001',
      supplier: 'TechnoCharge SA',
      items: 'Câbles Type 2 x20, Connecteurs x10',
      total: '200,000 DA',
      status: 'pending',
      orderDate: '2024-01-20',
      expectedDelivery: '2024-01-25'
    },
    {
      id: 'ORD002',
      supplier: 'PowerTech Algeria',
      items: 'Transformateur 350kW x2',
      total: '900,000 DA',
      status: 'shipped',
      orderDate: '2024-01-18',
      expectedDelivery: '2024-01-22'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'inStock': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      case 'lowStock': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'outOfStock': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300';
      case 'shipped': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'delivered': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  const lowStockItems = inventory.filter(item => item.stock <= item.reorderPoint);
  const outOfStockItems = inventory.filter(item => item.stock === 0);
  const totalValue = inventory.reduce((sum, item) => sum + (item.stock * parseInt(item.unitPrice.replace(/[^\d]/g, ''))), 0);

  return (
    <div className="relative min-h-screen">
      {/* Background avec éléments d'inventaire */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-44 h-44 bg-gradient-to-br from-purple-400 to-blue-500 rounded-full blur-2xl"></div>
        <div className="absolute top-40 right-10 w-40 h-40 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full blur-xl"></div>
        <div className="absolute bottom-20 left-40 w-36 h-36 bg-gradient-to-br from-green-400 to-blue-500 rounded-full blur-2xl"></div>
        
        {/* Icônes d'inventaire en arrière-plan */}
        <div className="absolute top-1/4 left-1/6 opacity-8">
          <Package className="w-32 h-32 text-purple-500" />
        </div>
        <div className="absolute bottom-1/3 right-1/5 opacity-8">
          <ShoppingCart className="w-28 h-28 text-blue-500" />
        </div>
        <div className="absolute top-1/2 right-1/6 opacity-8">
          <AlertTriangle className="w-24 h-24 text-yellow-500" />
        </div>
      </div>

      <div className="relative z-10 space-y-6">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
              {t('inventory.title')}
            </h1>
            <p className="text-gray-500 dark:text-gray-400 mt-1 text-sm transition-colors duration-200">
              {t('inventory.subtitle')}
            </p>
          </div>
          <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-600">
            <Plus className="h-4 w-4 mr-2" />
            {t('inventory.addItem')}
          </Button>
        </div>

        {/* Statistiques d'inventaire */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Articles total
                  </p>
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                    {inventory.length}
                  </p>
                </div>
                <Package className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Stock faible
                  </p>
                  <p className="text-2xl font-bold text-yellow-600 dark:text-yellow-400">
                    {lowStockItems.length}
                  </p>
                </div>
                <TrendingDown className="h-8 w-8 text-yellow-600 dark:text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Rupture de stock
                  </p>
                  <p className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {outOfStockItems.length}
                  </p>
                </div>
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
                    Valeur totale
                  </p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {(totalValue / 1000000).toFixed(1)}M DA
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600 dark:text-green-400" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="inventory" className="space-y-4">
          <TabsList className="bg-white dark:bg-gray-800">
            <TabsTrigger value="inventory" className="dark:data-[state=active]:bg-gray-700">
              {t('inventory.spareParts')}
            </TabsTrigger>
            <TabsTrigger value="orders" className="dark:data-[state=active]:bg-gray-700">
              {t('inventory.orders')}
            </TabsTrigger>
            <TabsTrigger value="suppliers" className="dark:data-[state=active]:bg-gray-700">
              {t('inventory.suppliers')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="inventory" className="space-y-4">
            {inventory.map((item) => (
              <Card key={item.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg dark:text-white">#{item.id} - {item.name}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{item.category}</p>
                    </div>
                    <Badge className={getStatusColor(item.status)}>
                      {item.status === 'inStock' ? 'En stock' :
                       item.status === 'lowStock' ? 'Stock faible' : 'Rupture de stock'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('inventory.stockLevel')}</p>
                      <p className={`font-medium ${item.stock <= item.reorderPoint ? 'text-red-600 dark:text-red-400' : 'text-green-600 dark:text-green-400'}`}>
                        {item.stock} unités
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('inventory.reorderPoint')}</p>
                      <p className="font-medium dark:text-white">{item.reorderPoint} unités</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Prix unitaire</p>
                      <p className="font-medium dark:text-white">{item.unitPrice}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Fournisseur</p>
                      <p className="font-medium dark:text-white">{item.supplier}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">{t('inventory.lastOrdered')}</p>
                      <p className="font-medium dark:text-white">{item.lastOrdered}</p>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2">
                    <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      Modifier
                    </Button>
                    <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                      <ShoppingCart className="h-4 w-4 mr-1" />
                      Commander
                    </Button>
                    {item.stock <= item.reorderPoint && (
                      <Button size="sm" className="bg-orange-600 hover:bg-orange-700">
                        <AlertTriangle className="h-4 w-4 mr-1" />
                        Réapprovisionner
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="orders" className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-lg dark:text-white">#{order.id} - {order.supplier}</CardTitle>
                      <p className="text-gray-600 dark:text-gray-300 mt-1">{order.items}</p>
                    </div>
                    <Badge className={getOrderStatusColor(order.status)}>
                      {order.status === 'pending' ? 'En attente' :
                       order.status === 'shipped' ? 'Expédié' : 'Livré'}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Total</p>
                      <p className="font-medium text-green-600 dark:text-green-400">{order.total}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Date commande</p>
                      <p className="font-medium dark:text-white">{order.orderDate}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 dark:text-gray-400">Livraison prévue</p>
                      <p className="font-medium dark:text-white">{order.expectedDelivery}</p>
                    </div>
                    <div>
                      <Button size="sm" variant="outline" className="w-full dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                        Suivre commande
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          <TabsContent value="suppliers" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {['TechnoCharge SA', 'ElectroTech DZ', 'PowerTech Algeria', 'DisplayMax'].map((supplier) => (
                <Card key={supplier} className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700 transition-colors duration-200">
                  <CardHeader>
                    <CardTitle className="dark:text-white">{supplier}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <p className="text-gray-600 dark:text-gray-300">Spécialité: Équipements de charge</p>
                      <p className="text-gray-600 dark:text-gray-300">Délai moyen: 5-7 jours</p>
                      <p className="text-gray-600 dark:text-gray-300">Fiabilité: 98%</p>
                      <div className="pt-2">
                        <Button size="sm" variant="outline" className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
                          Contacter
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default InventoryPage;
