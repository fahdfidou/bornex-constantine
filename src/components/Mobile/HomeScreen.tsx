import React, { useState } from 'react';
import { Search, Filter, MapPin, Zap, Clock, Star } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
interface HomeScreenProps {
  setActiveTab: (tab: string) => void;
}
const HomeScreen: React.FC<HomeScreenProps> = ({
  setActiveTab
}) => {
  const {
    t
  } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const filters = [{
    id: 'all',
    label: t('home.filterAll')
  }, {
    id: 'available',
    label: t('home.filterAvailable')
  }, {
    id: 'fast',
    label: t('home.filterFast')
  }, {
    id: 'ultrafast',
    label: t('home.filterUltraFast')
  }];

  // Bornes de recharge à Constantine
  const stations = [{
    id: 1,
    name: 'Hôtel Cirta',
    address: 'Boulevard de la République, Constantine',
    distance: '0.8 km',
    status: 'available',
    power: '22 kW',
    type: 'Type 2',
    rating: 4.7,
    price: '35 DZA/kWh',
    amenities: ['Hôtel', 'Restaurant', 'WiFi']
  }, {
    id: 2,
    name: 'Université Constantine 1',
    address: 'Campus Universitaire, Ali Mendjeli',
    distance: '2.5 km',
    status: 'available',
    power: '50 kW',
    type: 'CCS',
    rating: 4.5,
    price: '42 DZA/kWh',
    amenities: ['Parking', 'Cafétéria', 'Sécurité']
  }, {
    id: 3,
    name: 'Université Salah Boubnider',
    address: 'Constantine 3, Nouvelle Ville',
    distance: '3.2 km',
    status: 'occupied',
    power: '22 kW',
    type: 'Type 2',
    rating: 4.6,
    price: '35 DZA/kWh',
    amenities: ['Parking', 'Bibliothèque', 'WiFi']
  }, {
    id: 4,
    name: 'Nouvelle Cité Ali Mendjeli',
    address: 'Centre Commercial, Ali Mendjeli',
    distance: '4.1 km',
    status: 'available',
    power: '150 kW',
    type: 'CCS Combo',
    rating: 4.8,
    price: '49 DZA/kWh',
    amenities: ['Centre Commercial', 'Parking', 'Restaurant']
  }, {
    id: 5,
    name: 'Hôtel Novotel Constantine',
    address: 'Rue Didouche Mourad, Constantine',
    distance: '1.2 km',
    status: 'available',
    power: '22 kW',
    type: 'Type 2',
    rating: 4.9,
    price: '39 DZA/kWh',
    amenities: ['Hôtel 5*', 'Spa', 'Restaurant']
  }, {
    id: 6,
    name: 'Projet Masaken Riadh',
    address: 'Nouvelle Ville, Constantine',
    distance: '5.3 km',
    status: 'maintenance',
    power: '75 kW',
    type: 'CHAdeMO',
    rating: 4.4,
    price: '45 DZA/kWh',
    amenities: ['Résidentiel', 'Parking', 'Sécurité']
  }, {
    id: 7,
    name: 'Hôtel Ibis Constantine',
    address: 'Route de Batna, Constantine',
    distance: '2.8 km',
    status: 'available',
    power: '50 kW',
    type: 'CCS',
    rating: 4.5,
    price: '42 DZA/kWh',
    amenities: ['Hôtel', 'Restaurant', 'WiFi']
  }, {
    id: 8,
    name: 'Cité 1000 Logements',
    address: 'Constantine, Nouvelle Extension',
    distance: '6.0 km',
    status: 'available',
    power: '22 kW',
    type: 'Type 2',
    rating: 4.3,
    price: '35 DZA/kWh',
    amenities: ['Résidentiel', 'Parking', 'Supérette']
  }];
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available':
        return 'bg-green-500';
      case 'occupied':
        return 'bg-red-500';
      case 'maintenance':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };
  const getStatusText = (status: string) => {
    switch (status) {
      case 'available':
        return t('station.available');
      case 'occupied':
        return t('station.occupied');
      case 'maintenance':
        return t('station.maintenance');
      default:
        return t('station.offline');
    }
  };
  return <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-purple-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header avec logo */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          {/* Logo en en-tête */}
          <div className="flex items-center gap-3 mb-4">
            <img src="/lovable-uploads/4a4164ae-ab3a-43a0-9d61-01edf0113205.png" alt="Logo" className="w-8 h-8 object-contain" />
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white animate-fade-in-up">Bornex Ai</h1>
          </div>
          
          <p className="text-gray-600 dark:text-gray-300 mb-4 animate-fade-in-up" style={{
          animationDelay: '0.1s'
        }}>
            Trouvez les bornes de recharge près de chez vous
          </p>
          
          {/* Search Bar */}
          <div className="relative animate-fade-in-up" style={{
          animationDelay: '0.2s'
        }}>
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input type="text" placeholder="Rechercher une borne..." value={searchQuery} onChange={e => setSearchQuery(e.target.value)} className="pl-10 pr-12 h-12 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500/50 transition-all duration-300" />
            <Button size="sm" variant="ghost" className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
              <Filter className="h-4 w-4" />
            </Button>
          </div>
          
          {/* Filter Buttons */}
          <div className="flex gap-2 mt-4 overflow-x-auto pb-2 animate-fade-in-up" style={{
          animationDelay: '0.3s'
        }}>
            {filters.map(filter => <Button key={filter.id} variant={activeFilter === filter.id ? "default" : "outline"} size="sm" onClick={() => setActiveFilter(filter.id)} className={`flex-shrink-0 rounded-full transition-all duration-300 ${activeFilter === filter.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25' : 'bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70'}`}>
                {filter.label}
              </Button>)}
          </div>
        </div>
      </div>

      {/* Stations List */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-4">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 animate-fade-in-up">
            Bornes à Constantine ({stations.length})
          </h2>
          
          {stations.map((station, index) => <Card key={station.id} className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 hover:shadow-xl transition-all duration-300 cursor-pointer animate-fade-in-up" style={{
          animationDelay: `${index * 0.1}s`
        }} onClick={() => setActiveTab('charging')}>
              <CardHeader className="pb-3">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white text-lg">
                      {station.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                      {station.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${getStatusColor(station.status)} animate-pulse`} />
                    <Badge variant="outline" className="text-xs bg-white/50 dark:bg-gray-700/50">
                      {getStatusText(station.status)}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Zap className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {station.power}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-600 dark:text-green-400" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {station.distance}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      {station.rating}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                    <span className="text-sm font-medium text-gray-900 dark:text-white">
                      {station.price}
                    </span>
                  </div>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {station.amenities.slice(0, 2).map(amenity => <Badge key={amenity} variant="secondary" className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300">
                      {amenity}
                    </Badge>)}
                  {station.amenities.length > 2 && <Badge variant="secondary" className="text-xs">
                      +{station.amenities.length - 2}
                    </Badge>}
                </div>
              </CardContent>
            </Card>)}
        </div>
      </div>
    </div>;
};
export default HomeScreen;