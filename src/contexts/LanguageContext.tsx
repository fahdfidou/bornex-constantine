
import React, { createContext, useContext, useState, ReactNode } from 'react';

type Language = 'fr' | 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.map': 'Carte',
    'nav.maintenance': 'Maintenance',
    'nav.payments': 'Paiements',
    'nav.users': 'Utilisateurs',
    'nav.analytics': 'Analytique',
    
    // Welcome
    'welcome.title': 'Bienvenue sur BorneX',
    'welcome.subtitle': 'Plateforme de gestion intelligente des bornes de recharge électrique',
    'welcome.description': 'Gérez, surveillez et optimisez votre réseau de bornes de recharge en temps réel',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.totalStations': 'Total des Bornes',
    'dashboard.activeStations': 'Bornes Actives',
    'dashboard.maintenance': 'En Maintenance',
    'dashboard.revenue': 'Revenus du Jour',
    'dashboard.sessions': 'Sessions Actives',
    'dashboard.users': 'Utilisateurs Connectés',
    
    // Map
    'map.title': 'Carte Interactive',
    'map.available': 'Disponible',
    'map.occupied': 'Occupé',
    'map.offline': 'Hors ligne',
    'map.maintenance': 'Maintenance',
    
    // Status
    'status.online': 'En ligne',
    'status.offline': 'Hors ligne',
    'status.charging': 'En charge',
    'status.available': 'Disponible',
    'status.maintenance': 'Maintenance',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة القيادة',
    'nav.map': 'الخريطة',
    'nav.maintenance': 'الصيانة',
    'nav.payments': 'المدفوعات',
    'nav.users': 'المستخدمون',
    'nav.analytics': 'التحليلات',
    
    // Welcome
    'welcome.title': 'مرحباً بكم في BorneX',
    'welcome.subtitle': 'منصة إدارة ذكية لمحطات الشحن الكهربائية',
    'welcome.description': 'إدارة ومراقبة وتحسين شبكة محطات الشحن الخاصة بك في الوقت الفعلي',
    
    // Dashboard
    'dashboard.title': 'لوحة القيادة',
    'dashboard.totalStations': 'إجمالي المحطات',
    'dashboard.activeStations': 'المحطات النشطة',
    'dashboard.maintenance': 'قيد الصيانة',
    'dashboard.revenue': 'إيرادات اليوم',
    'dashboard.sessions': 'الجلسات النشطة',
    'dashboard.users': 'المستخدمون المتصلون',
    
    // Map
    'map.title': 'الخريطة التفاعلية',
    'map.available': 'متاح',
    'map.occupied': 'مشغول',
    'map.offline': 'غير متصل',
    'map.maintenance': 'صيانة',
    
    // Status
    'status.online': 'متصل',
    'status.offline': 'غير متصل',
    'status.charging': 'قيد الشحن',
    'status.available': 'متاح',
    'status.maintenance': 'صيانة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.success': 'نجح',
    'common.search': 'بحث',
    'common.filter': 'تصفية',
    'common.export': 'تصدير',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.map': 'Map',
    'nav.maintenance': 'Maintenance',
    'nav.payments': 'Payments',
    'nav.users': 'Users',
    'nav.analytics': 'Analytics',
    
    // Welcome
    'welcome.title': 'Welcome to BorneX',
    'welcome.subtitle': 'Smart charging station management platform',
    'welcome.description': 'Manage, monitor and optimize your charging station network in real-time',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalStations': 'Total Stations',
    'dashboard.activeStations': 'Active Stations',
    'dashboard.maintenance': 'Under Maintenance',
    'dashboard.revenue': 'Today\'s Revenue',
    'dashboard.sessions': 'Active Sessions',
    'dashboard.users': 'Connected Users',
    
    // Map
    'map.title': 'Interactive Map',
    'map.available': 'Available',
    'map.occupied': 'Occupied',
    'map.offline': 'Offline',
    'map.maintenance': 'Maintenance',
    
    // Status
    'status.online': 'Online',
    'status.offline': 'Offline',
    'status.charging': 'Charging',
    'status.available': 'Available',
    'status.maintenance': 'Maintenance',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.export': 'Export',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div className={language === 'ar' ? 'rtl' : 'ltr'}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
