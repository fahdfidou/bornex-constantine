
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'fr' | 'ar' | 'en';
  setLanguage: (lang: 'fr' | 'ar' | 'en') => void;
  t: (key: string) => string;
  darkMode: boolean;
  toggleDarkMode: () => void;
}

const translations = {
  fr: {
    // Navigation
    'nav.home': 'Accueil',
    'nav.stations': 'Stations',
    'nav.charging': 'Recharge',
    'nav.subscription': 'Abonnement',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'nav.help': 'Aide',
    
    // Home Screen
    'home.title': 'Trouvez votre station',
    'home.subtitle': 'Rechargez votre véhicule électrique facilement',
    'home.nearbyStations': 'Stations à proximité',
    'home.searchPlaceholder': 'Rechercher une station...',
    'home.filterAll': 'Toutes',
    'home.filterAvailable': 'Disponibles',
    'home.filterFast': 'Rapide',
    'home.filterUltraFast': 'Ultra-rapide',
    
    // Station Details
    'station.details': 'Détails de la station',
    'station.available': 'Disponible',
    'station.occupied': 'Occupée',
    'station.offline': 'Hors ligne',
    'station.maintenance': 'Maintenance',
    'station.power': 'Puissance',
    'station.type': 'Type de connecteur',
    'station.distance': 'Distance',
    'station.pricing': 'Tarification',
    'station.navigate': 'Naviguer',
    'station.startCharging': 'Démarrer la recharge',
    'station.reviews': 'Avis',
    'station.amenities': 'Commodités',
    
    // Charging
    'charging.title': 'Recharge en cours',
    'charging.batteryLevel': 'Niveau de batterie',
    'charging.chargingSpeed': 'Vitesse de charge',
    'charging.timeRemaining': 'Temps restant',
    'charging.energyAdded': 'Énergie ajoutée',
    'charging.cost': 'Coût actuel',
    'charging.stopCharging': 'Arrêter la recharge',
    'charging.subscriptionRequired': 'Abonnement requis',
    'charging.subscribeToStart': 'Abonnez-vous pour commencer à recharger',
    'charging.unlockCharging': 'Débloquer la recharge',
    
    // Subscription
    'subscription.title': 'Choisissez votre plan',
    'subscription.subtitle': 'Rechargez sans limites avec nos plans flexibles',
    'subscription.monthly': 'Mensuel',
    'subscription.yearly': 'Annuel',
    'subscription.save': 'Économisez',
    'subscription.features': 'Fonctionnalités incluses',
    'subscription.unlimitedCharging': 'Recharge illimitée',
    'subscription.prioritySupport': 'Support prioritaire',
    'subscription.exclusiveStations': 'Accès aux stations exclusives',
    'subscription.mobileApp': 'Application mobile premium',
    'subscription.subscribe': 'S\'abonner',
    'subscription.cancelAnytime': 'Annulable à tout moment',
    'subscription.noCommitment': 'Aucun engagement',
    
    // Profile
    'profile.title': 'Mon profil',
    'profile.chargingHistory': 'Historique de recharge',
    'profile.totalSessions': 'Sessions totales',
    'profile.totalEnergy': 'Énergie totale',
    'profile.carbonSaved': 'CO2 économisé',
    'profile.favorites': 'Stations favorites',
    'profile.paymentMethods': 'Moyens de paiement',
    'profile.notifications': 'Notifications',
    'profile.editProfile': 'Modifier le profil',
    
    // Settings
    'settings.title': 'Paramètres',
    'settings.language': 'Langue',
    'settings.theme': 'Thème',
    'settings.lightMode': 'Mode clair',
    'settings.darkMode': 'Mode sombre',
    'settings.notifications': 'Notifications',
    'settings.chargingComplete': 'Recharge terminée',
    'settings.stationUpdates': 'Mises à jour des stations',
    'settings.promotions': 'Promotions',
    'settings.privacy': 'Confidentialité',
    'settings.terms': 'Conditions d\'utilisation',
    'settings.about': 'À propos',
    
    // Help & FAQ
    'help.title': 'Aide et FAQ',
    'help.searchPlaceholder': 'Rechercher dans l\'aide...',
    'help.gettingStarted': 'Commencer',
    'help.charging': 'Recharge',
    'help.subscription': 'Abonnement',
    'help.technical': 'Technique',
    'help.contactSupport': 'Contacter le support',
    'help.livechat': 'Chat en direct',
    
    // Common
    'common.loading': 'Chargement...',
    'common.error': 'Erreur',
    'common.retry': 'Réessayer',
    'common.cancel': 'Annuler',
    'common.confirm': 'Confirmer',
    'common.save': 'Enregistrer',
    'common.close': 'Fermer',
    'common.next': 'Suivant',
    'common.previous': 'Précédent',
    'common.finish': 'Terminer',
    'common.skip': 'Passer',
    'common.min': 'min',
    'common.hour': 'h',
    'common.km': 'km',
    'common.kw': 'kW',
    'common.kwh': 'kWh',
    'common.euro': '€',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.stations': 'المحطات',
    'nav.charging': 'الشحن',
    'nav.subscription': 'الاشتراك',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.help': 'المساعدة',
    
    // Home Screen
    'home.title': 'اعثر على محطتك',
    'home.subtitle': 'اشحن سيارتك الكهربائية بسهولة',
    'home.nearbyStations': 'المحطات القريبة',
    'home.searchPlaceholder': 'البحث عن محطة...',
    'home.filterAll': 'الكل',
    'home.filterAvailable': 'متاحة',
    'home.filterFast': 'سريع',
    'home.filterUltraFast': 'فائق السرعة',
    
    // Station Details
    'station.details': 'تفاصيل المحطة',
    'station.available': 'متاحة',
    'station.occupied': 'مشغولة',
    'station.offline': 'غير متصلة',
    'station.maintenance': 'صيانة',
    'station.power': 'القوة',
    'station.type': 'نوع الموصل',
    'station.distance': 'المسافة',
    'station.pricing': 'التسعير',
    'station.navigate': 'التنقل',
    'station.startCharging': 'بدء الشحن',
    'station.reviews': 'التقييمات',
    'station.amenities': 'المرافق',
    
    // Charging
    'charging.title': 'جاري الشحن',
    'charging.batteryLevel': 'مستوى البطارية',
    'charging.chargingSpeed': 'سرعة الشحن',
    'charging.timeRemaining': 'الوقت المتبقي',
    'charging.energyAdded': 'الطاقة المضافة',
    'charging.cost': 'التكلفة الحالية',
    'charging.stopCharging': 'إيقاف الشحن',
    'charging.subscriptionRequired': 'الاشتراك مطلوب',
    'charging.subscribeToStart': 'اشترك لبدء الشحن',
    'charging.unlockCharging': 'إلغاء قفل الشحن',
    
    // Subscription
    'subscription.title': 'اختر خطتك',
    'subscription.subtitle': 'اشحن بلا حدود مع خططنا المرنة',
    'subscription.monthly': 'شهري',
    'subscription.yearly': 'سنوي',
    'subscription.save': 'وفر',
    'subscription.features': 'الميزات المتضمنة',
    'subscription.unlimitedCharging': 'شحن غير محدود',
    'subscription.prioritySupport': 'دعم ذو أولوية',
    'subscription.exclusiveStations': 'الوصول للمحطات الحصرية',
    'subscription.mobileApp': 'تطبيق الجوال المميز',
    'subscription.subscribe': 'اشترك',
    'subscription.cancelAnytime': 'يمكن الإلغاء في أي وقت',
    'subscription.noCommitment': 'بدون التزام',
    
    // Profile
    'profile.title': 'ملفي الشخصي',
    'profile.chargingHistory': 'تاريخ الشحن',
    'profile.totalSessions': 'إجمالي الجلسات',
    'profile.totalEnergy': 'إجمالي الطاقة',
    'profile.carbonSaved': 'CO2 موفر',
    'profile.favorites': 'المحطات المفضلة',
    'profile.paymentMethods': 'طرق الدفع',
    'profile.notifications': 'الإشعارات',
    'profile.editProfile': 'تعديل الملف الشخصي',
    
    // Settings
    'settings.title': 'الإعدادات',
    'settings.language': 'اللغة',
    'settings.theme': 'السمة',
    'settings.lightMode': 'الوضع الفاتح',
    'settings.darkMode': 'الوضع المظلم',
    'settings.notifications': 'الإشعارات',
    'settings.chargingComplete': 'اكتمال الشحن',
    'settings.stationUpdates': 'تحديثات المحطات',
    'settings.promotions': 'العروض الترويجية',
    'settings.privacy': 'الخصوصية',
    'settings.terms': 'شروط الاستخدام',
    'settings.about': 'حول',
    
    // Help & FAQ
    'help.title': 'المساعدة والأسئلة الشائعة',
    'help.searchPlaceholder': 'البحث في المساعدة...',
    'help.gettingStarted': 'البدء',
    'help.charging': 'الشحن',
    'help.subscription': 'الاشتراك',
    'help.technical': 'تقني',
    'help.contactSupport': 'اتصل بالدعم',
    'help.livechat': 'دردشة مباشرة',
    
    // Common
    'common.loading': 'جاري التحميل...',
    'common.error': 'خطأ',
    'common.retry': 'إعادة المحاولة',
    'common.cancel': 'إلغاء',
    'common.confirm': 'تأكيد',
    'common.save': 'حفظ',
    'common.close': 'إغلاق',
    'common.next': 'التالي',
    'common.previous': 'السابق',
    'common.finish': 'إنهاء',
    'common.skip': 'تخطي',
    'common.min': 'دقيقة',
    'common.hour': 'ساعة',
    'common.km': 'كم',
    'common.kw': 'كيلو واط',
    'common.kwh': 'كيلو واط ساعة',
    'common.euro': '€',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.stations': 'Stations',
    'nav.charging': 'Charging',
    'nav.subscription': 'Subscription',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.help': 'Help',
    
    // Home Screen
    'home.title': 'Find your station',
    'home.subtitle': 'Charge your electric vehicle easily',
    'home.nearbyStations': 'Nearby stations',
    'home.searchPlaceholder': 'Search for a station...',
    'home.filterAll': 'All',
    'home.filterAvailable': 'Available',
    'home.filterFast': 'Fast',
    'home.filterUltraFast': 'Ultra-fast',
    
    // Station Details
    'station.details': 'Station details',
    'station.available': 'Available',
    'station.occupied': 'Occupied',
    'station.offline': 'Offline',
    'station.maintenance': 'Maintenance',
    'station.power': 'Power',
    'station.type': 'Connector type',
    'station.distance': 'Distance',
    'station.pricing': 'Pricing',
    'station.navigate': 'Navigate',
    'station.startCharging': 'Start charging',
    'station.reviews': 'Reviews',
    'station.amenities': 'Amenities',
    
    // Charging
    'charging.title': 'Charging in progress',
    'charging.batteryLevel': 'Battery level',
    'charging.chargingSpeed': 'Charging speed',
    'charging.timeRemaining': 'Time remaining',
    'charging.energyAdded': 'Energy added',
    'charging.cost': 'Current cost',
    'charging.stopCharging': 'Stop charging',
    'charging.subscriptionRequired': 'Subscription required',
    'charging.subscribeToStart': 'Subscribe to start charging',
    'charging.unlockCharging': 'Unlock charging',
    
    // Subscription
    'subscription.title': 'Choose your plan',
    'subscription.subtitle': 'Charge without limits with our flexible plans',
    'subscription.monthly': 'Monthly',
    'subscription.yearly': 'Yearly',
    'subscription.save': 'Save',
    'subscription.features': 'Included features',
    'subscription.unlimitedCharging': 'Unlimited charging',
    'subscription.prioritySupport': 'Priority support',
    'subscription.exclusiveStations': 'Access to exclusive stations',
    'subscription.mobileApp': 'Premium mobile app',
    'subscription.subscribe': 'Subscribe',
    'subscription.cancelAnytime': 'Cancel anytime',
    'subscription.noCommitment': 'No commitment',
    
    // Profile
    'profile.title': 'My profile',
    'profile.chargingHistory': 'Charging history',
    'profile.totalSessions': 'Total sessions',
    'profile.totalEnergy': 'Total energy',
    'profile.carbonSaved': 'CO2 saved',
    'profile.favorites': 'Favorite stations',
    'profile.paymentMethods': 'Payment methods',
    'profile.notifications': 'Notifications',
    'profile.editProfile': 'Edit profile',
    
    // Settings
    'settings.title': 'Settings',
    'settings.language': 'Language',
    'settings.theme': 'Theme',
    'settings.lightMode': 'Light mode',
    'settings.darkMode': 'Dark mode',
    'settings.notifications': 'Notifications',
    'settings.chargingComplete': 'Charging complete',
    'settings.stationUpdates': 'Station updates',
    'settings.promotions': 'Promotions',
    'settings.privacy': 'Privacy',
    'settings.terms': 'Terms of use',
    'settings.about': 'About',
    
    // Help & FAQ
    'help.title': 'Help & FAQ',
    'help.searchPlaceholder': 'Search in help...',
    'help.gettingStarted': 'Getting started',
    'help.charging': 'Charging',
    'help.subscription': 'Subscription',
    'help.technical': 'Technical',
    'help.contactSupport': 'Contact support',
    'help.livechat': 'Live chat',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.retry': 'Retry',
    'common.cancel': 'Cancel',
    'common.confirm': 'Confirm',
    'common.save': 'Save',
    'common.close': 'Close',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.finish': 'Finish',
    'common.skip': 'Skip',
    'common.min': 'min',
    'common.hour': 'h',
    'common.km': 'km',
    'common.kw': 'kW',
    'common.kwh': 'kWh',
    'common.euro': '€',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'ar' | 'en'>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as 'fr' | 'ar' | 'en') || 'fr';
  });

  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const saved = localStorage.getItem('dark-mode');
    return saved === 'true';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    localStorage.setItem('dark-mode', darkMode.toString());
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
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, darkMode, toggleDarkMode }}>
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
