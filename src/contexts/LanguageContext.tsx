
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
    'nav.settings': 'Paramètres',
    
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
    'dashboard.systemOperational': 'Système opérationnel',
    'dashboard.lastSessions': 'Dernières sessions de charge',
    'dashboard.stationsMaintenanceStatus': 'Statut des bornes et maintenance',
    'dashboard.inProgress': 'En cours',
    'dashboard.completed': 'Terminé',
    'dashboard.scheduledMaintenance': 'Maintenance programmée',
    'dashboard.globalNetwork': 'Réseau global',
    'dashboard.optimalOperation': 'Fonctionnement optimal',
    'dashboard.activeSessions': 'Sessions actives',
    'dashboard.connectedUsers': 'Utilisateurs connectés',
    'dashboard.tomorrow9am': 'Demain 9h',
    'dashboard.active': 'actives',
    
    // Map
    'map.title': 'Carte Interactive',
    'map.available': 'Disponible',
    'map.occupied': 'Occupé',
    'map.offline': 'Hors ligne',
    'map.maintenance': 'Maintenance',
    'map.search': 'Rechercher une station...',
    'map.myLocation': 'Ma Position',
    'map.selectStation': 'Sélectionnez une station',
    'map.address': 'Adresse',
    'map.power': 'Puissance',
    'map.rate': 'Tarif',
    'map.reserveStation': 'Réserver cette borne',
    'map.clickStation': 'Cliquez sur une borne sur la carte pour voir les détails',
    'map.statistics': 'Statistiques',
    'map.nearbyStations': 'Stations proches',
    'map.chargingStationsAlgiers': 'Bornes de Recharge - Alger',
    'map.enterMapboxToken': 'Entrez votre token Mapbox pour accéder à la carte interactive',
    'map.confirm': 'Confirmer',
    'map.getTokenFrom': 'Obtenez votre token sur',
    
    // Maintenance
    'maintenance.title': 'Module de Maintenance',
    'maintenance.newTicket': 'Nouveau Ticket',
    'maintenance.activeTickets': 'Tickets Actifs',
    'maintenance.inProgress': 'En Cours',
    'maintenance.completed': 'Complétés',
    'maintenance.technicians': 'Techniciens',
    'maintenance.tickets': 'Tickets Actifs',
    'maintenance.history': 'Historique',
    'maintenance.preventive': 'Maintenance Préventive',
    'maintenance.viewDetails': 'Voir Détails',
    'maintenance.scheduled': 'Maintenance Programmée',
    'maintenance.quarterlyMaintenance': 'Maintenance trimestrielle',
    'maintenance.monthlyInspection': 'Inspection mensuelle',
    'maintenance.scheduledLabel': 'Programmée',
    'maintenance.technician': 'Technicien',
    'maintenance.createdOn': 'Créé le',
    'maintenance.estimatedTime': 'Temps estimé',
    'maintenance.urgent': 'Urgent',
    'maintenance.medium': 'Moyen',
    'maintenance.low': 'Faible',
    
    // Payments
    'payments.title': 'Gestion des Paiements',
    'payments.overview': 'Vue d\'ensemble des revenus',
    'payments.transactions': 'Transactions',
    'payments.revenue': 'Revenus',
    'payments.pending': 'En attente',
    
    // Users
    'users.title': 'Gestion des Utilisateurs',
    'users.total': 'Total Utilisateurs',
    'users.active': 'Actifs',
    'users.new': 'Nouveaux',
    
    // Analytics
    'analytics.title': 'Analytiques et Rapports',
    'analytics.usage': 'Utilisation',
    'analytics.performance': 'Performance',
    'analytics.trends': 'Tendances',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.profile': 'Profil',
    'settings.notifications': 'Notifications',
    'settings.system': 'Système',
    
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
    'common.profile': 'Profil',
    'common.logout': 'Déconnexion',
    'common.thisMonth': 'ce mois',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة القيادة',
    'nav.map': 'الخريطة التفاعلية',
    'nav.maintenance': 'الصيانة',
    'nav.payments': 'المدفوعات',
    'nav.users': 'المستخدمون',
    'nav.analytics': 'التحليلات',
    'nav.settings': 'الإعدادات',
    
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
    'dashboard.systemOperational': 'النظام يعمل بشكل طبيعي',
    'dashboard.lastSessions': 'آخر جلسات الشحن',
    'dashboard.stationsMaintenanceStatus': 'حالة المحطات والصيانة',
    'dashboard.inProgress': 'قيد التنفيذ',
    'dashboard.completed': 'مكتمل',
    'dashboard.scheduledMaintenance': 'صيانة مجدولة',
    'dashboard.globalNetwork': 'الشبكة العالمية',
    'dashboard.optimalOperation': 'تشغيل مثالي',
    'dashboard.activeSessions': 'الجلسات النشطة',
    'dashboard.connectedUsers': 'المستخدمون المتصلون',
    'dashboard.tomorrow9am': 'غداً الساعة 9 صباحاً',
    'dashboard.active': 'نشطة',
    
    // Map
    'map.title': 'الخريطة التفاعلية',
    'map.available': 'متاح',
    'map.occupied': 'مشغول',
    'map.offline': 'غير متصل',
    'map.maintenance': 'صيانة',
    'map.search': 'البحث عن محطة...',
    'map.myLocation': 'موقعي',
    'map.selectStation': 'اختر محطة',
    'map.address': 'العنوان',
    'map.power': 'القوة',
    'map.rate': 'التعرفة',
    'map.reserveStation': 'احجز هذه المحطة',
    'map.clickStation': 'انقر على محطة في الخريطة لرؤية التفاصيل',
    'map.statistics': 'إحصائيات',
    'map.nearbyStations': 'المحطات القريبة',
    'map.chargingStationsAlgiers': 'محطات الشحن - الجزائر',
    'map.enterMapboxToken': 'أدخل رمز Mapbox للوصول إلى الخريطة التفاعلية',
    'map.confirm': 'تأكيد',
    'map.getTokenFrom': 'احصل على رمزك من',
    
    // Maintenance
    'maintenance.title': 'وحدة الصيانة',
    'maintenance.newTicket': 'تذكرة جديدة',
    'maintenance.activeTickets': 'التذاكر النشطة',
    'maintenance.inProgress': 'قيد التنفيذ',
    'maintenance.completed': 'مكتملة',
    'maintenance.technicians': 'الفنيون',
    'maintenance.tickets': 'التذاكر النشطة',
    'maintenance.history': 'التاريخ',
    'maintenance.preventive': 'الصيانة الوقائية',
    'maintenance.viewDetails': 'عرض التفاصيل',
    'maintenance.scheduled': 'الصيانة المجدولة',
    'maintenance.quarterlyMaintenance': 'صيانة ربع سنوية',
    'maintenance.monthlyInspection': 'فحص شهري',
    'maintenance.scheduledLabel': 'مجدولة',
    'maintenance.technician': 'الفني',
    'maintenance.createdOn': 'تم الإنشاء في',
    'maintenance.estimatedTime': 'الوقت المقدر',
    'maintenance.urgent': 'عاجل',
    'maintenance.medium': 'متوسط',
    'maintenance.low': 'منخفض',
    
    // Payments
    'payments.title': 'إدارة المدفوعات',
    'payments.overview': 'نظرة عامة على الإيرادات',
    'payments.transactions': 'المعاملات',
    'payments.revenue': 'الإيرادات',
    'payments.pending': 'في الانتظار',
    
    // Users
    'users.title': 'إدارة المستخدمين',
    'users.total': 'إجمالي المستخدمين',
    'users.active': 'نشط',
    'users.new': 'جديد',
    
    // Analytics
    'analytics.title': 'التحليلات والتقارير',
    'analytics.usage': 'الاستخدام',
    'analytics.performance': 'الأداء',
    'analytics.trends': 'الاتجاهات',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.profile': 'الملف الشخصي',
    'settings.notifications': 'الإشعارات',
    'settings.system': 'النظام',
    
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
    'common.profile': 'الملف الشخصي',
    'common.logout': 'تسجيل الخروج',
    'common.thisMonth': 'هذا الشهر',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.map': 'Interactive Map',
    'nav.maintenance': 'Maintenance',
    'nav.payments': 'Payments',
    'nav.users': 'Users',
    'nav.analytics': 'Analytics',
    'nav.settings': 'Settings',
    
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
    'dashboard.systemOperational': 'System operational',
    'dashboard.lastSessions': 'Latest charging sessions',
    'dashboard.stationsMaintenanceStatus': 'Stations and maintenance status',
    'dashboard.inProgress': 'In Progress',
    'dashboard.completed': 'Completed',
    'dashboard.scheduledMaintenance': 'Scheduled maintenance',
    'dashboard.globalNetwork': 'Global network',
    'dashboard.optimalOperation': 'Optimal operation',
    'dashboard.activeSessions': 'Active sessions',
    'dashboard.connectedUsers': 'Connected users',
    'dashboard.tomorrow9am': 'Tomorrow 9am',
    'dashboard.active': 'active',
    
    // Map
    'map.title': 'Interactive Map',
    'map.available': 'Available',
    'map.occupied': 'Occupied',
    'map.offline': 'Offline',
    'map.maintenance': 'Maintenance',
    'map.search': 'Search Station...',
    'map.myLocation': 'My Location',
    'map.selectStation': 'Select a station',
    'map.address': 'Address',
    'map.power': 'Power',
    'map.rate': 'Rate',
    'map.reserveStation': 'Reserve this station',
    'map.clickStation': 'Click on a station on the map to see details',
    'map.statistics': 'Statistics',
    'map.nearbyStations': 'Nearby Stations',
    'map.chargingStationsAlgiers': 'Charging Stations - Algiers',
    'map.enterMapboxToken': 'Enter your Mapbox token to access the interactive map',
    'map.confirm': 'Confirm',
    'map.getTokenFrom': 'Get your token from',
    
    // Maintenance
    'maintenance.title': 'Maintenance Module',
    'maintenance.newTicket': 'New Ticket',
    'maintenance.activeTickets': 'Active Tickets',
    'maintenance.inProgress': 'In Progress',
    'maintenance.completed': 'Completed',
    'maintenance.technicians': 'Technicians',
    'maintenance.tickets': 'Active Tickets',
    'maintenance.history': 'History',
    'maintenance.preventive': 'Preventive Maintenance',
    'maintenance.viewDetails': 'View Details',
    'maintenance.scheduled': 'Scheduled Maintenance',
    'maintenance.quarterlyMaintenance': 'Quarterly maintenance',
    'maintenance.monthlyInspection': 'Monthly inspection',
    'maintenance.scheduledLabel': 'Scheduled',
    'maintenance.technician': 'Technician',
    'maintenance.createdOn': 'Created on',
    'maintenance.estimatedTime': 'Estimated time',
    'maintenance.urgent': 'Urgent',
    'maintenance.medium': 'Medium',
    'maintenance.low': 'Low',
    
    // Payments
    'payments.title': 'Payment Management',
    'payments.overview': 'Revenue overview',
    'payments.transactions': 'Transactions',
    'payments.revenue': 'Revenue',
    'payments.pending': 'Pending',
    
    // Users
    'users.title': 'User Management',
    'users.total': 'Total Users',
    'users.active': 'Active',
    'users.new': 'New',
    
    // Analytics
    'analytics.title': 'Analytics and Reports',
    'analytics.usage': 'Usage',
    'analytics.performance': 'Performance',
    'analytics.trends': 'Trends',
    
    // Settings
    'settings.title': 'Settings',
    'settings.profile': 'Profile',
    'settings.notifications': 'Notifications',
    'settings.system': 'System',
    
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
    'common.profile': 'Profile',
    'common.logout': 'Logout',
    'common.thisMonth': 'this month',
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('fr');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode');
    const savedLanguage = localStorage.getItem('language');
    if (savedTheme) {
      setDarkMode(JSON.parse(savedTheme));
    }
    if (savedLanguage && ['fr', 'ar', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage as Language);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    localStorage.setItem('language', language);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode, language]);

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
