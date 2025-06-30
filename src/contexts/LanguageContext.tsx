
import React, { createContext, useState, useContext, useEffect } from 'react';

interface LanguageContextProps {
  language: string;
  setLanguage: (language: string) => void;
  t: (key: string) => string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

const translations = {
  fr: {
    // Navigation
    nav: {
      dashboard: 'Tableau de Bord',
      map: 'Carte',
      maintenance: 'Maintenance',
      payments: 'Paiements',
      users: 'Utilisateurs',
      analytics: 'Analytiques',
    },
    
    // Dashboard
    dashboard: {
      title: 'Tableau de Bord',
      subtitle: 'Aperçu de votre réseau de bornes de recharge',
      totalStations: 'Total des Stations',
      activeCharging: 'Recharge Active',
      totalUsers: 'Total Utilisateurs',
      revenue: 'Revenus',
      recentActivity: 'Activité Récente',
      lastSessions: 'Dernières sessions de recharge',
      systemStatus: 'État du Système',
      stationsMaintenanceStatus: 'État de maintenance des stations',
      scheduledMaintenance: 'Maintenance programmée',
      tomorrow9am: 'Demain 9h',
      globalNetwork: 'Réseau Global',
      optimalOperation: 'Fonctionnement optimal',
      activeSessions: 'Sessions Actives',
      connectedUsers: 'Utilisateurs connectés',
      active: 'actif',
      inProgress: 'En cours',
      completed: 'Terminé',
      systemOperational: 'Système opérationnel'
    },
    
    // Maintenance
    maintenance: {
      title: 'Maintenance',
      newTicket: 'Nouveau Ticket',
      activeTickets: 'Tickets Actifs',
      inProgress: 'En Cours',
      completed: 'Terminé',
      technicians: 'Techniciens',
      tickets: 'Tickets',
      history: 'Historique',
      preventive: 'Préventive',
      urgent: 'Urgent',
      medium: 'Moyen',
      low: 'Faible',
      technician: 'Technicien',
      createdOn: 'Créé le',
      estimatedTime: 'Temps Estimé',
      viewDetails: 'Voir Détails',
      scheduled: 'Maintenance Programmée',
      scheduledLabel: 'Programmé',
      quarterlyMaintenance: 'Maintenance trimestrielle',
      monthlyInspection: 'Inspection mensuelle'
    },
    
    // Payments
    payments: {
      title: 'Gestion des Paiements',
      configurePricing: 'Configurer Tarifs',
      todayRevenue: 'Revenus Aujourd\'hui',
      monthRevenue: 'Revenus du Mois',
      transactions: 'Transactions',
      averageRate: 'Tarif Moyen',
      allTypes: 'Tous types confondus',
      vsYesterday: 'vs hier',
      vsLastMonth: 'vs mois dernier',
      recentTransactions: 'Transactions Récentes',
      paymentMethods: 'Méthodes de Paiement',
      pricingConfig: 'Configuration Tarifs',
      completed: 'Complété',
      pending: 'En cours',
      failed: 'Échoué',
      revenue: 'Revenus',
      bankCard: 'Carte bancaire',
      digitalWallet: 'Portefeuille digital',
      qrCode: 'QR Code',
      bankCardCib: 'Carte Bancaire (CIB)',
      edahabia: 'EDAHABIA',
      qrCodeMobile: 'QR Code / Mobile Pay',
      subscription: 'Abonnement',
      acPricing: 'Tarification AC (Charge Normale)',
      dcPricing: 'Tarification DC (Charge Rapide)',
      baseRate: 'Tarif de base (DA/kWh)',
      nightRate: 'Tarif nocturne (22h-6h)',
      peakRate: 'Tarif heures de pointe',
      modify: 'Modifier',
      subscriptions: 'Abonnements',
      basic: 'Basique',
      premium: 'Premium',
      enterprise: 'Entreprise',
      month: 'mois',
      included: 'inclus',
      configure: 'Configurer'
    },
    
    // Users
    users: {
      title: 'Gestion des Utilisateurs',
      addUser: 'Ajouter Utilisateur',
      totalUsers: 'Total Utilisateurs',
      totalSessions: 'Sessions Totales',
      energyConsumed: 'Énergie Consommée',
      userRevenue: 'Revenus Utilisateurs',
      active: 'actifs',
      thisMonth: 'Ce mois',
      total: 'Total',
      usersList: 'Liste des Utilisateurs',
      recentSessions: 'Sessions Récentes',
      analytics: 'Analytiques',
      registeredUsers: 'Utilisateurs Enregistrés',
      searchUser: 'Rechercher un utilisateur...',
      inactive: 'Inactif',
      contact: 'Contact',
      vehicle: 'Véhicule',
      statistics: 'Statistiques',
      sessions: 'sessions',
      lastSession: 'Dernière session',
      viewProfile: 'Voir Profil',
      history: 'Historique',
      recentChargingSessions: 'Sessions de Recharge Récentes',
      subscriptionDistribution: 'Répartition par Abonnement',
      users: 'utilisateurs',
      topUsers: 'Top Utilisateurs'
    },
    
    // Analytics
    analytics: {
      title: 'Analytiques Avancées',
      last6Months: 'Derniers 6 mois',
      lastYear: 'Dernière année',
      all: 'Tout',
      totalRevenue: 'Revenus Totaux',
      totalSessions: 'Sessions Totales',
      energyDistributed: 'Énergie Distribuée',
      co2Saved: 'CO₂ Économisé',
      environmentalImpact: 'Impact environnemental',
      vsPrevious: 'vs période précédente',
      revenue: 'Revenus',
      usage: 'Utilisation',
      stations: 'Stations',
      environmental: 'Impact Environnemental',
      revenueEvolution: 'Évolution des Revenus',
      revenueByStation: 'Revenus par Station',
      paymentMethods: 'Méthodes de Paiement',
      usageByHour: 'Utilisation par Heure',
      sessions: 'sessions',
      sessionsPerMonth: 'Sessions par Mois',
      averageSessionDuration: 'Durée Moyenne des Sessions',
      minutes: 'minutes',
      averagePerSession: 'Durée moyenne par session',
      vsLastMonth: 'vs mois dernier',
      stationPerformance: 'Performance des Stations',
      utilizationRate: 'Taux d\'Utilisation',
      stationAvailability: 'Disponibilité des Stations',
      co2SavedPerMonth: 'CO₂ Économisé par Mois',
      totalCo2Saved: 'CO₂ total économisé',
      equivalentTrees: 'Équivalent à 42 arbres plantés',
      cleanEnergyDistributed: 'Énergie propre distribuée',
      renewableEnergy: '100% énergie renouvelable',
      chargingSessions: 'Sessions de recharge',
      sustainableMobility: 'Mobilité durable'
    },
    
    // Stations
    stations: {
      centreville: 'Station Centre-ville',
      university: 'Station Université',
      airport: 'Station Aéroport',
      port: 'Station Port'
    },
    
    // Months
    months: {
      jan: 'Jan',
      feb: 'Fév',
      mar: 'Mar',
      apr: 'Avr',
      may: 'Mai',
      jun: 'Jun'
    },
    
    // Common terms
    common: {
      thisMonth: 'ce mois',
      profile: 'Profil',
      settings: 'Paramètres',
      logout: 'Se déconnecter'
    }
  },
  
  ar: {
    // Navigation
    nav: {
      dashboard: 'لوحة التحكم',
      map: 'الخريطة',
      maintenance: 'الصيانة',
      payments: 'المدفوعات',
      users: 'المستخدمين',
      analytics: 'التحليلات',
    },
    
    // Dashboard
    dashboard: {
      title: 'لوحة التحكم',
      subtitle: 'نظرة عامة على شبكة محطات الشحن الخاصة بك',
      totalStations: 'إجمالي المحطات',
      activeCharging: 'الشحن النشط',
      totalUsers: 'إجمالي المستخدمين',
      revenue: 'الإيرادات',
      recentActivity: 'النشاط الأخير',
      lastSessions: 'جلسات الشحن الأخيرة',
      systemStatus: 'حالة النظام',
      stationsMaintenanceStatus: 'حالة صيانة المحطات',
      scheduledMaintenance: 'الصيانة المجدولة',
      tomorrow9am: 'غداً الساعة 9 صباحاً',
      globalNetwork: 'الشبكة العالمية',
      optimalOperation: 'التشغيل الأمثل',
      activeSessions: 'الجلسات النشطة',
      connectedUsers: 'المستخدمين المتصلين',
      active: 'نشط',
      inProgress: 'قيد التقدم',
      completed: 'مكتمل',
      systemOperational: 'النظام يعمل'
    },
    
    // Maintenance
    maintenance: {
      title: 'الصيانة',
      newTicket: 'تذكرة جديدة',
      activeTickets: 'التذاكر النشطة',
      inProgress: 'قيد التقدم',
      completed: 'مكتمل',
      technicians: 'الفنيين',
      tickets: 'التذاكر',
      history: 'التاريخ',
      preventive: 'وقائية',
      urgent: 'عاجل',
      medium: 'متوسط',
      low: 'منخفض',
      technician: 'الفني',
      createdOn: 'تم الإنشاء في',
      estimatedTime: 'الوقت المقدر',
      viewDetails: 'عرض التفاصيل',
      scheduled: 'الصيانة المجدولة',
      scheduledLabel: 'مجدول',
      quarterlyMaintenance: 'الصيانة الفصلية',
      monthlyInspection: 'الفحص الشهري'
    },
    
    // Payments
    payments: {
      title: 'إدارة المدفوعات',
      configurePricing: 'تكوين الأسعار',
      todayRevenue: 'إيرادات اليوم',
      monthRevenue: 'إيرادات الشهر',
      transactions: 'المعاملات',
      averageRate: 'السعر المتوسط',
      allTypes: 'جميع الأنواع مجتمعة',
      vsYesterday: 'مقابل الأمس',
      vsLastMonth: 'مقابل الشهر الماضي',
      recentTransactions: 'المعاملات الأخيرة',
      paymentMethods: 'طرق الدفع',
      pricingConfig: 'تكوين الأسعار',
      completed: 'مكتمل',
      pending: 'قيد الانتظار',
      failed: 'فشل',
      revenue: 'الإيرادات',
      bankCard: 'البطاقة المصرفية',
      digitalWallet: 'المحفظة الرقمية',
      qrCode: 'رمز الاستجابة السريعة',
      bankCardCib: 'البطاقة المصرفية (CIB)',
      edahabia: 'الذهبية',
      qrCodeMobile: 'رمز الاستجابة السريعة / الدفع المحمول',
      subscription: 'الاشتراك',
      acPricing: 'تسعير التيار المتردد (الشحن العادي)',
      dcPricing: 'تسعير التيار المستمر (الشحن السريع)',
      baseRate: 'السعر الأساسي (د.ج/كيلوواط ساعة)',
      nightRate: 'السعر الليلي (10 مساءً - 6 صباحاً)',
      peakRate: 'سعر ساعات الذروة',
      modify: 'تعديل',
      subscriptions: 'الاشتراكات',
      basic: 'أساسي',
      premium: 'مميز',
      enterprise: 'مؤسسة',
      month: 'شهر',
      included: 'مشمول',
      configure: 'تكوين'
    },
    
    // Users
    users: {
      title: 'إدارة المستخدمين',
      addUser: 'إضافة مستخدم',
      totalUsers: 'إجمالي المستخدمين',
      totalSessions: 'إجمالي الجلسات',
      energyConsumed: 'الطاقة المستهلكة',
      userRevenue: 'إيرادات المستخدمين',
      active: 'نشط',
      thisMonth: 'هذا الشهر',
      total: 'المجموع',
      usersList: 'قائمة المستخدمين',
      recentSessions: 'الجلسات الأخيرة',
      analytics: 'التحليلات',
      registeredUsers: 'المستخدمين المسجلين',
      searchUser: 'البحث عن مستخدم...',
      inactive: 'غير نشط',
      contact: 'الاتصال',
      vehicle: 'المركبة',
      statistics: 'الإحصائيات',
      sessions: 'الجلسات',
      lastSession: 'الجلسة الأخيرة',
      viewProfile: 'عرض الملف الشخصي',
      history: 'التاريخ',
      recentChargingSessions: 'جلسات الشحن الأخيرة',
      subscriptionDistribution: 'توزيع الاشتراكات',
      users: 'المستخدمين',
      topUsers: 'أفضل المستخدمين'
    },
    
    // Analytics
    analytics: {
      title: 'التحليلات المتقدمة',
      last6Months: 'آخر 6 أشهر',
      lastYear: 'السنة الماضية',
      all: 'الكل',
      totalRevenue: 'إجمالي الإيرادات',
      totalSessions: 'إجمالي الجلسات',
      energyDistributed: 'الطاقة الموزعة',
      co2Saved: 'ثاني أكسيد الكربون الموفر',
      environmentalImpact: 'التأثير البيئي',
      vsPrevious: 'مقابل الفترة السابقة',
      revenue: 'الإيرادات',
      usage: 'الاستخدام',
      stations: 'المحطات',
      environmental: 'التأثير البيئي',
      revenueEvolution: 'تطور الإيرادات',
      revenueByStation: 'الإيرادات حسب المحطة',
      paymentMethods: 'طرق الدفع',
      usageByHour: 'الاستخدام حسب الساعة',
      sessions: 'الجلسات',
      sessionsPerMonth: 'الجلسات شهرياً',
      averageSessionDuration: 'متوسط مدة الجلسة',
      minutes: 'دقائق',
      averagePerSession: 'المتوسط لكل جلسة',
      vsLastMonth: 'مقابل الشهر الماضي',
      stationPerformance: 'أداء المحطات',
      utilizationRate: 'معدل الاستخدام',
      stationAvailability: 'توفر المحطات',
      co2SavedPerMonth: 'ثاني أكسيد الكربون الموفر شهرياً',
      totalCo2Saved: 'إجمالي ثاني أكسيد الكربون الموفر',
      equivalentTrees: 'يعادل زراعة 42 شجرة',
      cleanEnergyDistributed: 'الطاقة النظيفة الموزعة',
      renewableEnergy: '100% طاقة متجددة',
      chargingSessions: 'جلسات الشحن',
      sustainableMobility: 'التنقل المستدام'
    },
    
    // Stations
    stations: {
      centreville: 'محطة وسط المدينة',
      university: 'محطة الجامعة',
      airport: 'محطة المطار',
      port: 'محطة الميناء'
    },
    
    // Months
    months: {
      jan: 'يناير',
      feb: 'فبراير',
      mar: 'مارس',
      apr: 'أبريل',
      may: 'مايو',
      jun: 'يونيو'
    },
    
    // Common terms
    common: {
      thisMonth: 'هذا الشهر',
      profile: 'الملف الشخصي',
      settings: 'الإعدادات',
      logout: 'تسجيل الخروج'
    }
  },
  
  en: {
    // Navigation
    nav: {
      dashboard: 'Dashboard',
      map: 'Map',
      maintenance: 'Maintenance',
      payments: 'Payments',
      users: 'Users',
      analytics: 'Analytics',
    },
    
    // Dashboard
    dashboard: {
      title: 'Dashboard',
      subtitle: 'Overview of your charging station network',
      totalStations: 'Total Stations',
      activeCharging: 'Active Charging',
      totalUsers: 'Total Users',
      revenue: 'Revenue',
      recentActivity: 'Recent Activity',
      lastSessions: 'Latest charging sessions',
      systemStatus: 'System Status',
      stationsMaintenanceStatus: 'Station maintenance status',
      scheduledMaintenance: 'Scheduled maintenance',
      tomorrow9am: 'Tomorrow 9am',
      globalNetwork: 'Global Network',
      optimalOperation: 'Optimal operation',
      activeSessions: 'Active Sessions',
      connectedUsers: 'Connected users',
      active: 'active',
      inProgress: 'In Progress',
      completed: 'Completed',
      systemOperational: 'System operational'
    },
    
    // Maintenance
    maintenance: {
      title: 'Maintenance',
      newTicket: 'New Ticket',
      activeTickets: 'Active Tickets',
      inProgress: 'In Progress',
      completed: 'Completed',
      technicians: 'Technicians',
      tickets: 'Tickets',
      history: 'History',
      preventive: 'Preventive',
      urgent: 'Urgent',
      medium: 'Medium',
      low: 'Low',
      technician: 'Technician',
      createdOn: 'Created On',
      estimatedTime: 'Estimated Time',
      viewDetails: 'View Details',
      scheduled: 'Scheduled Maintenance',
      scheduledLabel: 'Scheduled',
      quarterlyMaintenance: 'Quarterly maintenance',
      monthlyInspection: 'Monthly inspection'
    },
    
    // Payments
    payments: {
      title: 'Payment Management',
      configurePricing: 'Configure Pricing',
      todayRevenue: 'Today\'s Revenue',
      monthRevenue: 'Monthly Revenue',
      transactions: 'Transactions',
      averageRate: 'Average Rate',
      allTypes: 'All types combined',
      vsYesterday: 'vs yesterday',
      vsLastMonth: 'vs last month',
      recentTransactions: 'Recent Transactions',
      paymentMethods: 'Payment Methods',
      pricingConfig: 'Pricing Configuration',
      completed: 'Completed',
      pending: 'Pending',
      failed: 'Failed',
      revenue: 'Revenue',
      bankCard: 'Bank card',
      digitalWallet: 'Digital wallet',
      qrCode: 'QR Code',
      bankCardCib: 'Bank Card (CIB)',
      edahabia: 'EDAHABIA',
      qrCodeMobile: 'QR Code / Mobile Pay',
      subscription: 'Subscription',
      acPricing: 'AC Pricing (Normal Charging)',
      dcPricing: 'DC Pricing (Fast Charging)',
      baseRate: 'Base rate (DA/kWh)',
      nightRate: 'Night rate (10pm-6am)',
      peakRate: 'Peak hours rate',
      modify: 'Modify',
      subscriptions: 'Subscriptions',
      basic: 'Basic',
      premium: 'Premium',
      enterprise: 'Enterprise',
      month: 'month',
      included: 'included',
      configure: 'Configure'
    },
    
    // Users
    users: {
      title: 'User Management',
      addUser: 'Add User',
      totalUsers: 'Total Users',
      totalSessions: 'Total Sessions',
      energyConsumed: 'Energy Consumed',
      userRevenue: 'User Revenue',
      active: 'active',
      thisMonth: 'This month',
      total: 'Total',
      usersList: 'Users List',
      recentSessions: 'Recent Sessions',
      analytics: 'Analytics',
      registeredUsers: 'Registered Users',
      searchUser: 'Search user...',
      inactive: 'Inactive',
      contact: 'Contact',
      vehicle: 'Vehicle',
      statistics: 'Statistics',
      sessions: 'sessions',
      lastSession: 'Last session',
      viewProfile: 'View Profile',
      history: 'History',
      recentChargingSessions: 'Recent Charging Sessions',
      subscriptionDistribution: 'Subscription Distribution',
      users: 'users',
      topUsers: 'Top Users'
    },
    
    // Analytics
    analytics: {
      title: 'Advanced Analytics',
      last6Months: 'Last 6 months',
      lastYear: 'Last year',
      all: 'All',
      totalRevenue: 'Total Revenue',
      totalSessions: 'Total Sessions',
      energyDistributed: 'Energy Distributed',
      co2Saved: 'CO₂ Saved',
      environmentalImpact: 'Environmental impact',
      vsPrevious: 'vs previous period',
      revenue: 'Revenue',
      usage: 'Usage',
      stations: 'Stations',
      environmental: 'Environmental Impact',
      revenueEvolution: 'Revenue Evolution',
      revenueByStation: 'Revenue by Station',
      paymentMethods: 'Payment Methods',
      usageByHour: 'Usage by Hour',
      sessions: 'sessions',
      sessionsPerMonth: 'Sessions per Month',
      averageSessionDuration: 'Average Session Duration',
      minutes: 'minutes',
      averagePerSession: 'Average per session',
      vsLastMonth: 'vs last month',
      stationPerformance: 'Station Performance',
      utilizationRate: 'Utilization Rate',
      stationAvailability: 'Station Availability',
      co2SavedPerMonth: 'CO₂ Saved per Month',
      totalCo2Saved: 'Total CO₂ saved',
      equivalentTrees: 'Equivalent to 42 trees planted',
      cleanEnergyDistributed: 'Clean energy distributed',
      renewableEnergy: '100% renewable energy',
      chargingSessions: 'Charging sessions',
      sustainableMobility: 'Sustainable mobility'
    },
    
    // Stations
    stations: {
      centreville: 'Downtown Station',
      university: 'University Station',
      airport: 'Airport Station',
      port: 'Port Station'
    },
    
    // Months
    months: {
      jan: 'Jan',
      feb: 'Feb',
      mar: 'Mar',
      apr: 'Apr',
      may: 'May',
      jun: 'Jun'
    },
    
    // Common terms
    common: {
      thisMonth: 'this month',
      profile: 'Profile',
      settings: 'Settings',
      logout: 'Logout'
    }
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>((typeof localStorage !== 'undefined' && localStorage.getItem('language')) || 'fr');
  const [darkMode, setDarkMode] = useState<boolean>(
    (typeof localStorage !== 'undefined' && localStorage.getItem('darkMode') === 'true') || false
  );

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('language', language);
    }
  }, [language]);

  useEffect(() => {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('darkMode', String(darkMode));
    }
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const t = (key: string) => {
    const keys = key.split('.');
    let value: any = translations[language as keyof typeof translations];
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return key;
      }
    }
    return value !== undefined ? value : key;
  };

  const value: LanguageContextProps = {
    language,
    setLanguage,
    t,
    darkMode,
    toggleDarkMode,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
