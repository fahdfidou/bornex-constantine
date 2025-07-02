
import React, { useEffect, useRef } from 'react';
import { MapPin, ArrowLeft } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '../../contexts/LanguageContext';

interface StationsScreenProps {
  setActiveTab: (tab: string) => void;
}

const StationsScreen: React.FC<StationsScreenProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const mapRef = useRef<HTMLDivElement>(null);

  const stations = [
    {
      id: 1,
      name: language === 'ar' ? "فندق نوفوتيل بورنز AI" : language === 'fr' ? "Hôtel Novotel Bornes AI" : "Novotel Bornes AI Hotel",
      coordinates: { lat: 36.3650, lng: 6.6147 },
      status: "available"
    },
    {
      id: 2,
      name: language === 'ar' ? "جامعة بورنز AI 1" : language === 'fr' ? "Université Bornes AI 1" : "Bornes AI University 1",
      coordinates: { lat: 36.3397, lng: 6.5800 },
      status: "occupied"
    },
    {
      id: 3,
      name: language === 'ar' ? "فندق إيبيس بورنز AI" : language === 'fr' ? "Hôtel Ibis Bornes AI" : "Ibis Bornes AI Hotel",
      coordinates: { lat: 36.3570, lng: 6.6144 },
      status: "maintenance"
    },
    {
      id: 4,
      name: language === 'ar' ? "المدينة الجديدة بورنز AI" : language === 'fr' ? "Nouvelle Ville Bornes AI" : "Bornes AI New City",
      coordinates: { lat: 36.2800, lng: 6.5800 },
      status: "available"
    }
  ];

  // Initialize Google Maps
  useEffect(() => {
    if (mapRef.current) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=YOUR_GOOGLE_MAPS_API_KEY&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        if (window.google && mapRef.current) {
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
          stations.forEach(station => {
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
                  <div style="display: flex; justify-content: space-between; margin: 8px 0;">
                    <span style="background: ${station.status === 'available' ? '#10b981' : station.status === 'occupied' ? '#ef4444' : '#f59e0b'}; color: white; padding: 2px 8px; border-radius: 12px; font-size: 12px;">
                      ${station.status === 'available' ? 
                        (language === 'ar' ? 'متاح' : language === 'fr' ? 'Disponible' : 'Available') :
                        station.status === 'occupied' ?
                        (language === 'ar' ? 'مشغول' : language === 'fr' ? 'Occupé' : 'Occupied') :
                        (language === 'ar' ? 'صيانة' : language === 'fr' ? 'Maintenance' : 'Maintenance')
                      }
                    </span>
                  </div>
                </div>
              `
            });

            marker.addListener('click', () => {
              infoWindow.open(map, marker);
            });
          });
        }
      };

      if (!document.querySelector('script[src*="maps.googleapis.com"]')) {
        document.head.appendChild(script);
      }
    }
  }, [language, stations]);

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
              {language === 'ar' ? 'محطات الشحن' : language === 'fr' ? 'Stations de recharge' : 'Charging Stations'}
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {language === 'ar' ? 'محطات الشحن بورنز AI' : language === 'fr' ? 'Stations de recharge Bornes AI' : 'Bornes AI Charging Stations'}
            </p>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50">
          <CardContent className="p-3">
            <h3 className="font-semibold text-sm mb-2 text-gray-900 dark:text-white">
              {language === 'ar' ? 'وصف الخريطة' : language === 'fr' ? 'Légende de la carte' : 'Map Legend'}
            </h3>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'متاح' : language === 'fr' ? 'Disponible' : 'Available'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'مشغول' : language === 'fr' ? 'Occupé' : 'Occupied'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <span className="text-gray-600 dark:text-gray-300">
                  {language === 'ar' ? 'صيانة' : language === 'fr' ? 'Maintenance' : 'Maintenance'}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Google Maps */}
      <div className="flex-1 px-4 pb-20">
        <Card className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm border-gray-200/50 dark:border-gray-700/50 h-full">
          <CardContent className="p-0 h-full">
            <div 
              ref={mapRef}
              className="w-full h-full rounded-lg"
              style={{ minHeight: '500px' }}
            />
          </CardContent>
        </Card>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-24 left-4 right-4">
        <Card className="bg-blue-50/90 dark:bg-blue-900/30 backdrop-blur-xl border-blue-200/50 dark:border-blue-700/50">
          <CardContent className="p-3">
            <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 text-sm">
              <MapPin className="h-4 w-4" />
              <span>
                {language === 'ar' ? 
                  'لاستخدام الخريطة، أضف مفتاح Google Maps API الخاص بك' :
                  language === 'fr' ? 
                  'Pour utiliser la carte, ajoutez votre clé API Google Maps' :
                  'To use the map, add your Google Maps API key'
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default StationsScreen;
