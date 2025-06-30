
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Zap, AlertCircle, CheckCircle, Clock, Navigation, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import ChargingStationImage from '../UI/ChargingStationImage';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const InteractiveMap = () => {
  const { t, language } = useLanguage();
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapboxToken, setMapboxToken] = useState('');
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useRef([]);

  const stations = [
    {
      id: 1,
      name: language === 'ar' ? "محطة وسط المدينة" : language === 'fr' ? "Station Centre-ville" : "Downtown Station",
      address: language === 'ar' ? "شارع ديدوش مراد، الجزائر" : language === 'fr' ? "Rue Didouche Mourad, Alger" : "Didouche Mourad Street, Algiers",
      status: "available",
      power: "22 kW",
      type: "AC",
      coordinates: [3.0588, 36.7538] as [number, number],
      price: "25 DA/kWh"
    },
    {
      id: 2,
      name: language === 'ar' ? "محطة الجامعة" : language === 'fr' ? "Station Université" : "University Station",
      address: language === 'ar' ? "الحرم الجامعي USTHB، باب الزوار" : language === 'fr' ? "Campus USTHB, Bab Ezzouar" : "USTHB Campus, Bab Ezzouar",
      status: "occupied",
      power: "50 kW",
      type: "DC",
      coordinates: [3.1496, 36.7114] as [number, number],
      price: "35 DA/kWh"
    },
    {
      id: 3,
      name: language === 'ar' ? "محطة المطار" : language === 'fr' ? "Station Aéroport" : "Airport Station",
      address: language === 'ar' ? "مطار هواري بومدين" : language === 'fr' ? "Aéroport Houari Boumediene" : "Houari Boumediene Airport",
      status: "maintenance",
      power: "75 kW",
      type: "DC",
      coordinates: [3.2154, 36.6910] as [number, number],
      price: "40 DA/kWh"
    },
    {
      id: 4,
      name: language === 'ar' ? "محطة الميناء" : language === 'fr' ? "Station Port" : "Port Station",
      address: language === 'ar' ? "ميناء الجزائر" : language === 'fr' ? "Port d'Alger" : "Port of Algiers",
      status: "available",
      power: "11 kW",
      type: "AC",
      coordinates: [3.0370, 36.7677] as [number, number],
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

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return t('map.available');
      case 'occupied': return t('map.occupied');
      case 'maintenance': return t('map.maintenance');
      default: return status;
    }
  };

  const getUserLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation([longitude, latitude]);
          if (map.current) {
            map.current.flyTo({
              center: [longitude, latitude],
              zoom: 14,
              essential: true
            });
          }
        },
        (error) => {
          console.error('Erreur de géolocalisation:', error);
        }
      );
    }
  };

  const initializeMap = () => {
    if (!mapContainer.current || !mapboxToken) return;

    mapboxgl.accessToken = mapboxToken;
    
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/light-v11',
      center: [3.0588, 36.7538], // Alger
      zoom: 12
    });

    // Ajouter les contrôles de navigation
    map.current.addControl(new mapboxgl.NavigationControl(), 'top-right');

    // Ajouter les marqueurs des stations
    stations.forEach((station) => {
      const el = document.createElement('div');
      el.className = `w-6 h-6 rounded-full cursor-pointer ${getStatusColor(station.status)} border-2 border-white shadow-lg`;
      el.addEventListener('click', () => setSelectedStation(station));

      const marker = new mapboxgl.Marker(el)
        .setLngLat(station.coordinates)
        .addTo(map.current);
      
      markers.current.push(marker);
    });

    // Ajouter marqueur de position utilisateur si disponible
    if (userLocation) {
      const userEl = document.createElement('div');
      userEl.className = 'w-4 h-4 rounded-full bg-blue-500 border-2 border-white shadow-lg';
      
      new mapboxgl.Marker(userEl)
        .setLngLat(userLocation)
        .addTo(map.current);
    }
  };

  useEffect(() => {
    if (mapboxToken) {
      initializeMap();
    }

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [mapboxToken, userLocation]);

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white transition-colors duration-200">
          {t('map.title')}
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('map.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
            />
          </div>
          <Button variant="outline" size="sm" onClick={getUserLocation} className="dark:border-gray-600 dark:text-white dark:hover:bg-gray-700">
            <Navigation className="h-4 w-4 mr-2" />
            {t('map.myLocation')}
          </Button>
        </div>
      </div>

      {!mapboxToken && (
        <Card className="border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-900/20">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 dark:text-yellow-200 mb-3">
              {t('map.enterMapboxToken')}
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1 dark:bg-gray-800 dark:border-gray-600"
              />
              <Button size="sm" onClick={() => console.log('Token configuré')}>
                {t('map.confirm')}
              </Button>
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">
              {t('map.getTokenFrom')}{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 dark:text-blue-400 hover:underline">
                mapbox.com
              </a>
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte */}
        <div className="lg:col-span-2">
          <Card className="h-[500px] dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">
                {t('map.chargingStationsAlgiers')}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div ref={mapContainer} className="w-full h-full rounded-b-lg" />
            </CardContent>
          </Card>
        </div>

        {/* Détails de la station */}
        <div className="space-y-4">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">
                {selectedStation ? selectedStation.name : t('map.selectStation')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedStation ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    {getStatusIcon(selectedStation.status)}
                    <Badge variant={selectedStation.status === 'available' ? 'default' : 'secondary'}>
                      {getStatusText(selectedStation.status)}
                    </Badge>
                  </div>
                  
                  {/* Image de la borne */}
                  <div className="w-full h-32 flex items-center justify-center bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <ChargingStationImage 
                      variant={selectedStation.type === 'DC' ? 'fastcharge' : 'modern'} 
                      className="w-20 h-20"
                      showBackground={false}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>{t('map.address')}:</strong> {selectedStation.address}
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>{t('map.power')}:</strong> {selectedStation.power} ({selectedStation.type})
                    </p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>{t('map.rate')}:</strong> {selectedStation.price}
                    </p>
                  </div>

                  {selectedStation.status === 'available' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {t('map.reserveStation')}
                    </Button>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <ChargingStationImage 
                    variant="urban" 
                    className="w-24 h-24 mx-auto mb-4 opacity-50"
                    showBackground={false}
                  />
                  <p className="text-gray-500 dark:text-gray-400">
                    {t('map.clickStation')}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Statistiques rapides */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">
                {t('map.statistics')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600 dark:text-green-400">
                    {filteredStations.filter(s => s.status === 'available').length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t('map.available')}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600 dark:text-red-400">
                    {filteredStations.filter(s => s.status === 'occupied').length}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">
                    {t('map.occupied')}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des stations filtrées */}
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="text-lg dark:text-white">
                {t('map.nearbyStations')}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {filteredStations.map((station) => (
                  <div
                    key={station.id}
                    className={`p-3 border dark:border-gray-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 ${
                      selectedStation?.id === station.id ? 'border-green-500 bg-green-50 dark:bg-green-900/20' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm dark:text-white">{station.name}</h4>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{station.power} • {station.price}</p>
                      </div>
                      <Badge variant={station.status === 'available' ? 'default' : 'secondary'} className="ml-2">
                        {getStatusText(station.status)}
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InteractiveMap;
