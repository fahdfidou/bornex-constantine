
import React, { useState } from 'react';
import { MapPin, Zap, AlertCircle, CheckCircle, Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const InteractiveMap = () => {
  const [selectedStation, setSelectedStation] = useState(null);

  const stations = [
    {
      id: 1,
      name: "Station Centre-ville",
      address: "Rue Didouche Mourad, Alger",
      status: "available",
      power: "22 kW",
      type: "AC",
      coordinates: { x: 30, y: 40 },
      price: "25 DA/kWh"
    },
    {
      id: 2,
      name: "Station Université",
      address: "Campus USTHB, Bab Ezzouar",
      status: "occupied",
      power: "50 kW",
      type: "DC",
      coordinates: { x: 60, y: 30 },
      price: "35 DA/kWh"
    },
    {
      id: 3,
      name: "Station Aéroport",
      address: "Aéroport Houari Boumediene",
      status: "maintenance",
      power: "75 kW",
      type: "DC",
      coordinates: { x: 80, y: 70 },
      price: "40 DA/kWh"
    },
    {
      id: 4,
      name: "Station Port",
      address: "Port d'Alger",
      status: "available",
      power: "11 kW",
      type: "AC",
      coordinates: { x: 20, y: 80 },
      price: "20 DA/kWh"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'occupied': return <Zap className="h-4 w-4" />;
      case 'maintenance': return <AlertCircle className="h-4 w-4" />;
      default: return <Clock className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Carte Interactive</h1>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm">
            <MapPin className="h-4 w-4 mr-2" />
            Localiser
          </Button>
          <Button variant="outline" size="sm">Filtres</Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte */}
        <div className="lg:col-span-2">
          <Card className="h-96">
            <CardHeader>
              <CardTitle>Bornes de Recharge - Alger</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative w-full h-64 bg-green-50 rounded-lg border-2 border-green-200 overflow-hidden">
                {/* Simulation de carte */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-200">
                  {stations.map((station) => (
                    <div
                      key={station.id}
                      className={`absolute w-6 h-6 rounded-full cursor-pointer transform -translate-x-1/2 -translate-y-1/2 ${getStatusColor(station.status)} border-2 border-white shadow-lg hover:scale-110 transition-transform`}
                      style={{
                        left: `${station.coordinates.x}%`,
                        top: `${station.coordinates.y}%`
                      }}
                      onClick={() => setSelectedStation(station)}
                    />
                  ))}
                </div>
                
                {/* Légende */}
                <div className="absolute bottom-4 left-4 bg-white p-3 rounded-lg shadow-md">
                  <div className="space-y-1 text-xs">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                      <span>Disponible</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <span>Occupée</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <span>Maintenance</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Détails de la station */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedStation ? selectedStation.name : "Sélectionnez une station"}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStation ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedStation.status)}
                    <Badge variant={selectedStation.status === 'available' ? 'default' : 'secondary'}>
                      {selectedStation.status === 'available' ? 'Disponible' :
                       selectedStation.status === 'occupied' ? 'Occupée' : 'Maintenance'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>Adresse:</strong> {selectedStation.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Puissance:</strong> {selectedStation.power} ({selectedStation.type})
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Tarif:</strong> {selectedStation.price}
                    </p>
                  </div>

                  {selectedStation.status === 'available' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      Réserver cette borne
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  Cliquez sur une borne sur la carte pour voir les détails
                </p>
              )}
            </CardContent>
          </Card>

          {/* Statistiques rapides */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">Statistiques</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {stations.filter(s => s.status === 'available').length}
                  </div>
                  <div className="text-xs text-gray-500">Disponibles</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {stations.filter(s => s.status === 'occupied').length}
                  </div>
                  <div className="text-xs text-gray-500">Occupées</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
