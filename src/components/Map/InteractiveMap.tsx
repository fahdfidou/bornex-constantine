
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Zap, AlertCircle, CheckCircle, Clock, Navigation, Search } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const InteractiveMap = () => {
  const { t, language } = useLanguage();
  const [selectedStation, setSelectedStation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [mapboxToken, setMapboxToken] = useState('');
  const [userLocation, setUserLocation] = useState(null);
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
      coordinates: [3.0588, 36.7538],
      price: "25 DA/kWh"
    },
    {
      id: 2,
      name: language === 'ar' ? "محطة الجامعة" : language === 'fr' ? "Station Université" : "University Station",
      address: language === 'ar' ? "الحرم الجامعي USTHB، باب الزوار" : language === 'fr' ? "Campus USTHB, Bab Ezzouar" : "USTHB Campus, Bab Ezzouar",
      status: "occupied",
      power: "50 kW",
      type: "DC",
      coordinates: [3.1496, 36.7114],
      price: "35 DA/kWh"
    },
    {
      id: 3,
      name: language === 'ar' ? "محطة المطار" : language === 'fr' ? "Station Aéroport" : "Airport Station",
      address: language === 'ar' ? "مطار هواري بومدين" : language === 'fr' ? "Aéroport Houari Boumediene" : "Houari Boumediene Airport",
      status: "maintenance",
      power: "75 kW",
      type: "DC",
      coordinates: [3.2154, 36.6910],
      price: "40 DA/kWh"
    },
    {
      id: 4,
      name: language === 'ar' ? "محطة الميناء" : language === 'fr' ? "Station Port" : "Port Station",
      address: language === 'ar' ? "ميناء الجزائر" : language === 'fr' ? "Port d'Alger" : "Port of Algiers",
      status: "available",
      power: "11 kW",
      type: "AC",
      coordinates: [3.0370, 36.7677],
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
      case 'available': return language === 'ar' ? 'متاح' : language === 'fr' ? 'Disponible' : 'Available';
      case 'occupied': return language === 'ar' ? 'مشغول' : language === 'fr' ? 'Occupée' : 'Occupied';
      case 'maintenance': return language === 'ar' ? 'صيانة' : language === 'fr' ? 'Maintenance' : 'Maintenance';
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
        <h1 className="text-3xl font-bold text-gray-900">
          {language === 'ar' ? 'الخريطة التفاعلية' : language === 'fr' ? 'Carte Interactive' : 'Interactive Map'}
        </h1>
        <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2 w-full sm:w-auto">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={language === 'ar' ? 'البحث عن محطة...' : language === 'fr' ? 'Rechercher une station...' : 'Search station...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-full sm:w-64"
            />
          </div>
          <Button variant="outline" size="sm" onClick={getUserLocation}>
            <Navigation className="h-4 w-4 mr-2" />
            {language === 'ar' ? 'موقعي' : language === 'fr' ? 'Ma position' : 'My Location'}
          </Button>
        </div>
      </div>

      {!mapboxToken && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="p-4">
            <p className="text-sm text-yellow-800 mb-3">
              {language === 'ar' ? 'أدخل رمز Mapbox للوصول إلى الخريطة التفاعلية:' : 
               language === 'fr' ? 'Entrez votre token Mapbox pour accéder à la carte interactive:' : 
               'Enter your Mapbox token to access the interactive map:'}
            </p>
            <div className="flex gap-2">
              <Input
                type="password"
                placeholder="pk.eyJ1Ijoi..."
                value={mapboxToken}
                onChange={(e) => setMapboxToken(e.target.value)}
                className="flex-1"
              />
              <Button size="sm" onClick={() => console.log('Token configuré')}>
                {language === 'ar' ? 'تأكيد' : language === 'fr' ? 'Confirmer' : 'Confirm'}
              </Button>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              {language === 'ar' ? 'احصل على رمزك من' : language === 'fr' ? 'Obtenez votre token sur' : 'Get your token from'}{' '}
              <a href="https://mapbox.com" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                mapbox.com
              </a>
            </p>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Carte */}
        <div className="lg:col-span-2">
          <Card className="h-[500px]">
            <CardHeader>
              <CardTitle>
                {language === 'ar' ? 'محطات الشحن - الجزائر' : 
                 language === 'fr' ? 'Bornes de Recharge - Alger' : 
                 'Charging Stations - Algiers'}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0 h-full">
              <div ref={mapContainer} className="w-full h-full rounded-b-lg" />
            </CardContent>
          </Card>
        </div>

        {/* Détails de la station */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>
                {selectedStation ? selectedStation.name : 
                 (language === 'ar' ? 'اختر محطة' : 
                  language === 'fr' ? 'Sélectionnez une station' : 
                  'Select a station')}
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
                  
                  <div className="space-y-2">
                    <p className="text-sm text-gray-600">
                      <strong>
                        {language === 'ar' ? 'العنوان:' : language === 'fr' ? 'Adresse:' : 'Address:'}
                      </strong> {selectedStation.address}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>
                        {language === 'ar' ? 'القوة:' : language === 'fr' ? 'Puissance:' : 'Power:'}
                      </strong> {selectedStation.power} ({selectedStation.type})
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>
                        {language === 'ar' ? 'التعرفة:' : language === 'fr' ? 'Tarif:' : 'Rate:'}
                      </strong> {selectedStation.price}
                    </p>
                  </div>

                  {selectedStation.status === 'available' && (
                    <Button className="w-full bg-green-600 hover:bg-green-700">
                      {language === 'ar' ? 'احجز هذه المحطة' : 
                       language === 'fr' ? 'Réserver cette borne' : 
                       'Reserve this station'}
                    </Button>
                  )}
                </div>
              ) : (
                <p className="text-gray-500 text-center py-8">
                  {language === 'ar' ? 'انقر على محطة في الخريطة لرؤية التفاصيل' : 
                   language === 'fr' ? 'Cliquez sur une borne sur la carte pour voir les détails' : 
                   'Click on a station on the map to see details'}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Statistiques rapides */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'ar' ? 'إحصائيات' : language === 'fr' ? 'Statistiques' : 'Statistics'}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-green-600">
                    {filteredStations.filter(s => s.status === 'available').length}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'ar' ? 'متاح' : language === 'fr' ? 'Disponibles' : 'Available'}
                  </div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-red-600">
                    {filteredStations.filter(s => s.status === 'occupied').length}
                  </div>
                  <div className="text-xs text-gray-500">
                    {language === 'ar' ? 'مشغول' : language === 'fr' ? 'Occupées' : 'Occupied'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Liste des stations filtrées */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">
                {language === 'ar' ? 'المحطات القريبة' : language === 'fr' ? 'Stations proches' : 'Nearby Stations'}
              </CardTitle>
            </CardHeader>
            <CardContent className="max-h-64 overflow-y-auto">
              <div className="space-y-2">
                {filteredStations.map((station) => (
                  <div
                    key={station.id}
                    className={`p-3 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                      selectedStation?.id === station.id ? 'border-green-500 bg-green-50' : 'border-gray-200'
                    }`}
                    onClick={() => setSelectedStation(station)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h4 className="font-medium text-sm">{station.name}</h4>
                        <p className="text-xs text-gray-500">{station.power} • {station.price}</p>
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
