
import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Zap, AlertCircle, CheckCircle, Navigation, Search, ArrowLeft, Filter } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { useLanguage } from '../../contexts/LanguageContext';
import ChargingStationImage from '../UI/ChargingStationImage';

interface StationsScreenProps {
  setActiveTab: (tab: string) => void;
}

const StationsScreen: React.FC<StationsScreenProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const [selectedStation, setSelectedStation] = useState<any>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showMap, setShowMap] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);

  const stations = [
    {
      id: 1,
      name: language === 'ar' ? "فندق نوفوتيل قسنطينة" : language === 'fr' ? "Hôtel Novotel Constantine" : "Novotel Constantine Hotel",
      address: language === 'ar' ? "طريق عين الباي، قسنطينة" : language === 'fr' ? "Route Ain El Bey, Constantine" : "Ain El Bey Road, Constantine",
      status: "available",
      power: "22 kW",
      type: "AC",
      coordinates: { lat: 36.3650, lng: 6.6147 },
      price: "35 DA/kWh",
      distance: "2.1 km"
    },
    {
      id: 2,
      name: language === 'ar' ? "جامعة قسنطينة 1" : language === 'fr' ? "Université Constantine 1" : "Constantine University 1",
      address: language === 'ar' ? "حي زواغي، قسنطينة" : language === 'fr' ? "Cité Zouaghi, Constantine" : "Zouaghi City, Constantine",
      status: "occupied",
      power: "50 kW",
      type: "DC",
      coordinates: { lat: 36.3397, lng: 6.5800 },
      price: "45 DA/kWh",
      distance: "3.5 km"
    },
    {
      id: 3,
      name: language === 'ar' ? "فندق إيبيس قسنطينة" : language === 'fr' ? "Hôtel Ibis Constantine" : "Ibis Constantine Hotel",
      address: language === 'ar' ? "وسط المدينة، قسنطينة" : language === 'fr' ? "Centre-ville, Constantine" : "City Center, Constantine",
      status: "maintenance",
      power: "75 kW",
      type: "DC",
      coordinates: { lat: 36.3570, lng: 6.6144 },
      price: "50 DA/kWh",
      distance: "1.8 km"
    },
    {
      id: 4,
      name: language === 'ar' ? "المدينة الجديدة علي منجلي" : language === 'fr' ? "Nouvelle Ville Ali Mendjeli" : "Ali Mendjeli New City",
      address: language === 'ar' ? "علي منجلي، قسنطينة" : language === 'fr' ? "Ali Mendjeli, Constantine" : "Ali Mendjeli, Constantine",
      status: "available",
      power: "11 kW",
      type: "AC",
      coordinates: { lat: 36.2800, lng: 6.5800 },
      price: "30 DA/kWh",
      distance: "8.2 km"
    },
    {
      id: 5,
      name: language === 'ar' ? "جامعة الأمير عبد القادر" : language === 'fr' ? "Université Emir Abdelkader" : "Emir Abdelkader University",
      address: language === 'ar' ? "طريق عين الباي، قسنطينة" : language === 'fr' ? "Route Ain El Bey, Constantine" : "Ain El Bey Road, Constantine",
      status: "available",
      power: "22 kW",
      type: "AC",
      coordinates: { lat: 36.3102, lng: 6.6147 },
      price: "40 DA/kWh",
      distance: "4.7 km"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'maintenance': return 'bg-yellow-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'available': return <CheckCircle className="h-4 w-4" />;
      case 'occupied': return <Zap className="h-4 w-4" />;
      case 'maintenance': return <AlertCircle className="h-4 w-4" />;
      default: return <MapPin className="h-4 w-4" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'available': return t('map.available');
      case 'occupied': return t('map.occupied');
      case 'maintenance': return t('map.maintenance');
      default: return status;
    }
  };

  const filteredStations = stations.filter(station =>
    station.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    station.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Initialize Google Maps
  useEffect(() => {
    if (showMap && mapRef.current) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        const map = new window.google.maps.Map(mapRef.current, {
          center: { lat: 36.3650, lng: 6.6147 },
          zoom: 12,
          styles: [
            {
              featureType: 'all',
              elementType: 'geometry.fill',
              stylers: [{ color: '#f5f5f5' }]
            },
            {
              featureType: 'water',
              elementType: 'geometry.fill',
              stylers: [{ color: '#e3f2fd' }]
            }
          ]
        });

        // Add markers for each station
        filteredStations.forEach(station => {
          const marker = new window.google.maps.Marker({
            position: station.coordinates,
            map: map,
            title: station.name,
            icon: {
              url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
                <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="20" cy="20" r="18" fill="${station.status === 'available' ? '#10b981' : station.status === 'occupied' ? '#ef4444' : '#f59e0b'}" stroke="white" stroke-width="2"/>
                  <text x="20" y="25" text-anchor="middle" fill="white" font-size="12" font-weight="bold">⚡</text>
                </svg>
              `)}`,
              scaledSize: new window.google.maps.Size(40, 40)
            }
          });

          const infoWindow = new window.google.maps.InfoWindow({
            content: `
              <div style="padding: 10px; min-width: 200px;">
                <h3 style="margin: 0 0 8px 0; font-size: 16px; font-weight: bold;">${station.name}</h3>
                <p style="margin: 0 0 4px 0; color: #666; font-size: 14px;">${station.address}</p>
                <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                  <span style="background: ${station.status === 'available' ? '#10b981' : station.status === 'occupied' ? '#ef4444' : '#f59e0b'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">${getStatusText(station.status)}</span>
                  <span style="font-weight: bold;">${station.power}</span>
                </div>
                <p style="margin: 4px 0 0 0; font-size: 14px; color: #888;">${station.price}</p>
              </div>
            `
          });

          marker.addListener('click', () => {
            infoWindow.open(map, marker);
            setSelectedStation(station);
          });
        });
      };

      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        document.head.appendChild(script);
      }
    }
  }, [showMap, filteredStations]);

  return (
    <div className="flex-1 bg-gradient-to-br from-blue-50/50 via-white to-green-50/50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/50 dark:border-gray-700/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setActiveTab('home')}
            className="p-2"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-bold text-gray-900 dark:text-white">
              {t('map.title')}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {t('map.chargingStationsConstantine')}
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="p-4 space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t('map.search')}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200 dark:border-gray-700"
            />
          </div>
          <Button variant="outline" size="sm" className="px-3">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        {/* Legend */}
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-3">
            <h3 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
              {language === 'ar' ? 'وصف الخريطة' : language === 'fr' ? 'Légende de la carte' : 'Map Legend'}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">{t('map.available')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">{t('map.occupied')}</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">{t('map.maintenance')}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google Maps */}
      <div className="mx-4 mb-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-0">
            <div 
              ref={mapRef}
              className="w-full h-80 rounded-lg"
              style={{ minHeight: '320px' }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Statistics */}
      <div className="px-4 mb-4">
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-green-600 dark:text-green-400">
                {filteredStations.filter(s => s.status === 'available').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('map.available')}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-red-600 dark:text-red-400">
                {filteredStations.filter(s => s.status === 'occupied').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('map.occupied')}
              </div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
            <CardContent className="p-3 text-center">
              <div className="text-lg font-bold text-yellow-600 dark:text-yellow-400">
                {filteredStations.filter(s => s.status === 'maintenance').length}
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                {t('map.maintenance')}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Stations List */}
      <div className="flex-1 px-4 pb-20 space-y-3">
        {filteredStations.map((station) => (
          <Card
            key={station.id}
            className={`bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 cursor-pointer transition-all duration-200 hover:shadow-lg ${
              selectedStation?.id === station.id ? 'ring-2 ring-blue-500 shadow-lg' : ''
            }`}
            onClick={() => setSelectedStation(station)}
          >
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                  <ChargingStationImage 
                    variant={station.type === 'DC' ? 'fastcharge' : 'modern'} 
                    className="w-8 h-8"
                    showBackground={false}
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-white text-sm">
                        {station.name}
                      </h3>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {station.address}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      {getStatusIcon(station.status)}
                      <Badge variant={station.status === 'available' ? 'default' : 'secondary'} className="text-xs">
                        {getStatusText(station.status)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex items-center justify-between mt-3 text-xs">
                    <div className="flex items-center gap-4 text-gray-600 dark:text-gray-300">
                      <span>{station.power} • {station.type}</span>
                      <span>{station.price}</span>
                      <span>{station.distance}</span>
                    </div>
                    {station.status === 'available' && (
                      <Button size="sm" className="h-7 px-3 text-xs">
                        {t('station.startCharging')}
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Station Details Modal */}
      {selectedStation && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end">
          <Card className="w-full bg-white dark:bg-gray-800 rounded-t-2xl border-t border-gray-200 dark:border-gray-700 animate-slide-up">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-lg dark:text-white">
                    {selectedStation.name}
                  </CardTitle>
                  <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                    {selectedStation.address}
                  </p>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedStation(null)}
                  className="p-2"
                >
                  ✕
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-center">
                <ChargingStationImage 
                  variant={selectedStation.type === 'DC' ? 'fastcharge' : 'modern'} 
                  className="w-24 h-24"
                  showBackground={false}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t('map.power')}</p>
                  <p className="font-medium dark:text-white">{selectedStation.power}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t('station.type')}</p>
                  <p className="font-medium dark:text-white">{selectedStation.type}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t('map.rate')}</p>
                  <p className="font-medium dark:text-white">{selectedStation.price}</p>
                </div>
                <div>
                  <p className="text-gray-500 dark:text-gray-400">{t('station.distance')}</p>
                  <p className="font-medium dark:text-white">{selectedStation.distance}</p>
                </div>
              </div>

              <div className="flex gap-2 mt-6">
                <Button className="flex-1" variant="outline">
                  <Navigation className="h-4 w-4 mr-2" />
                  {t('station.navigate')}
                </Button>
                {selectedStation.status === 'available' && (
                  <Button className="flex-1 bg-green-600 hover:bg-green-700">
                    <Zap className="h-4 w-4 mr-2" />
                    {t('station.startCharging')}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default StationsScreen;
