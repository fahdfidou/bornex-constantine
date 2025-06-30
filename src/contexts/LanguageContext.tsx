
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

type Language = 'fr' | 'ar' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const translations = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de Bord',
    'nav.map': 'Carte Interactive',
    'nav.maintenance': 'Maintenance',
    'nav.payments': 'Paiements',
    'nav.users': 'Utilisateurs',
    'nav.analytics': 'Analytiques',
    
    // Welcome
    'welcome.title': 'Bienvenue sur BorneX',
    'welcome.subtitle': 'Plateforme de gestion intelligente des bornes de recharge électrique',
    'welcome.description': 'Gérez, surveillez et optimisez votre réseau de bornes de recharge en temps réel',
    
    // Dashboard
    'dashboard.title': 'Tableau de Bord',
    'dashboard.subtitle': 'Vue d\'ensemble de votre réseau de bornes',
    'dashboard.totalStations': 'Total des Bornes',
    'dashboard.activeCharging': 'Charges Actives',
    'dashboard.totalUsers': 'Utilisateurs Totaux',
    'dashboard.revenue': 'Revenus du Jour',
    'dashboard.sessions': 'Sessions Actives',
    'dashboard.users': 'Utilisateurs Connectés',
    'dashboard.recentActivity': 'Activité Récente',
    'dashboard.systemStatus': 'État du Système',
    
    // Map
    'map.title': 'Carte Interactive',
    'map.available': 'Disponible',
    'map.occupied': 'Occupé',
    'map.offline': 'Hors ligne',
    'map.maintenance': 'Maintenance',
    'map.search': 'Rechercher une station...',
    'map.myLocation': 'Ma Position',
    
    // Status
    'status.online': 'En Ligne',
    'status.offline': 'Hors Ligne',
    'status.charging': 'En Charge',
    'status.available': 'Disponible',
    'status.maintenance': 'Maintenance',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.success': 'Succès',
    'common.search': 'Rechercher',
    'common.filter': 'Filtrer',
    'common.export': 'Exporter',
    'common.settings': 'Paramètres',
    'common.darkMode': 'Mode Sombre',
    'common.lightMode': 'Mode Clair',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة القيادة',
    'nav.map': 'الخريطة التفاعلية',
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
    'dashboard.subtitle': 'نظرة عامة على شبكة المحطات الخاصة بك',
    'dashboard.totalStations': 'إجمالي المحطات',
    'dashboard.activeCharging': 'الشحن النشط',
    'dashboard.totalUsers': 'إجمالي المستخدمين',
    'dashboard.revenue': 'إيرادات اليوم',
    'dashboard.sessions': 'الجلسات النشطة',
    'dashboard.users': 'المستخدمون المتصلون',
    'dashboard.recentActivity': 'النشاط الأخير',
    'dashboard.systemStatus': 'حالة النظام',
    
    // Map
    'map.title': 'الخريطة التفاعلية',
    'map.available': 'متاح',
    'map.occupied': 'مشغول',
    'map.offline': 'غير متصل',
    'map.maintenance': 'صيانة',
    'map.search': 'البحث عن محطة...',
    'map.myLocation': 'موقعي',
    
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
    'common.settings': 'الإعدادات',
    'common.darkMode': 'الوضع المظلم',
    'common.lightMode': 'الوضع الفاتح',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.map': 'Interactive Map',
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
    'dashboard.subtitle': 'Overview of your station network',
    'dashboard.totalStations': 'Total Stations',
    'dashboard.activeCharging': 'Active Charging',
    'dashboard.totalUsers': 'Total Users',
    'dashboard.revenue': 'Today\'s Revenue',
    'dashboard.sessions': 'Active Sessions',
    'dashboard.users': 'Connected Users',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.systemStatus': 'System Status',
    
    // Map
    'map.title': 'Interactive Map',
    'map.available': 'Available',
    'map.occupied': 'Occupied',
    'map.offline': 'Offline',
    'map.maintenance': 'Maintenance',
    'map.search': 'Search Station...',
    'map.myLocation': 'My Location',
    
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
    'common.settings': 'Settings',
    'common.darkMode': 'Dark Mode',
    'common.lightMode': 'Light Mode',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations[typeof language]] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, darkMode, toggleDarkMode }}>
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
