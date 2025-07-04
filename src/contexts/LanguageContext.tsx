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
    'nav.myStation': 'Ma Borne',
    'nav.subscription': 'Abonnement',
    'nav.profile': 'Profil',
    'nav.settings': 'Paramètres',
    'nav.help': 'Aide',
    
    // Map translations
    'map.title': 'Carte des Stations',
    'map.search': 'Rechercher une station...',
    'map.myLocation': 'Ma position',
    'map.available': 'Disponible',
    'map.occupied': 'Occupée',
    'map.maintenance': 'Maintenance',
    'map.selectStation': 'Sélectionner une station',
    'map.clickStation': 'Cliquez sur une station pour voir les détails',
    'map.address': 'Adresse',
    'map.power': 'Puissance',
    'map.rate': 'Tarif',
    'map.reserveStation': 'Réserver cette station',
    'map.statistics': 'Statistiques',
    'map.nearbyStations': 'Stations à proximité',
    'map.chargingStationsConstantine': 'Stations de recharge - Constantine',
    'map.enterMapboxToken': 'Veuillez entrer votre token Mapbox pour afficher la carte',
    'map.confirm': 'Confirmer',
    'map.getTokenFrom': 'Obtenez votre token depuis',
    
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
    'settings.preferences': 'Préférences',
    'settings.support': 'Support',
    'settings.changeLanguage': 'Changer la langue',
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
    
    // Help
    'help.title': 'Aide',
    
    // My Station
    'myStation.title': 'Ma Borne',
    'myStation.addStation': 'Ajouter une borne',
    'myStation.addNewStation': 'Ajouter une nouvelle borne',
    'myStation.stationName': 'Nom de la borne',
    'myStation.power': 'Puissance',
    'myStation.capacity': 'Capacité',
    'myStation.location': 'Emplacement',
    'myStation.estimatedChargeTime': 'Temps de charge estimé',
    'myStation.maxTemperature': 'Température maximale',
    'myStation.description': 'Description',
    'myStation.descriptionPlaceholder': 'Décrivez votre borne et ses caractéristiques...',
    'myStation.enableNotifications': 'Activer les notifications',
    'myStation.configure': 'Configurer',
    'myStation.reportIssue': 'Signaler un problème',
    'myStation.notificationsEnabled': 'Notifications activées',
    'myStation.noStations': 'Aucune borne ajoutée',
    'myStation.noStationsDescription': 'Commencez par ajouter votre première borne de recharge',
    'myStation.addFirstStation': 'Ajouter ma première borne',
    'myStation.temperature': 'Température',
    'myStation.chargeTime': 'Temps de charge',
    'myStation.error': 'Erreur',
    'myStation.charging': 'En charge',

    // Authentication
    'auth.welcome': 'Bienvenue',
    'auth.title': 'Connexion / Inscription',
    'auth.login': 'Connexion',
    'auth.register': 'Inscription',
    'auth.email': 'Email',
    'auth.password': 'Mot de passe',
    'auth.confirmPassword': 'Confirmer le mot de passe',
    'auth.phone': 'Téléphone',
    'auth.firstName': 'Prénom',
    'auth.lastName': 'Nom',
    'auth.loginWithEmail': 'Se connecter avec email',
    'auth.loginWithPhone': 'Se connecter avec téléphone',
    'auth.loginWithGoogle': 'Se connecter avec Google',
    'auth.registerWithGoogle': 'S\'inscrire avec Google',
    'auth.createAccount': 'Créer un compte',
    'auth.or': 'ou',
    
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
    'common.dza': 'DZA',
    
    // Payments
    'payments.ccp': 'CCP (Compte Courant Postal)',
    'payments.baridiMob': 'Baridi Mob',
    'payments.bankTransfer': 'Virement Bancaire',
    'payments.edahabia': 'EDAHABIA',
    'payments.bankCard': 'Carte Bancaire',
    'payments.qrCode': 'Code QR',
    
    // Dashboard
    'dashboard.title': 'Tableau de bord',
    'dashboard.totalStations': 'Stations totales',
    'dashboard.activeStations': 'Stations actives',
    
    // Status
    'status.operational': 'Opérationnel',
    'status.charging': 'En charge',
    'status.maintenance': 'Maintenance',
    
    // Stations
    'stations.title': 'Gestion des Stations',
    'stations.subtitle': 'Surveillez et contrôlez vos stations de recharge',
    'stations.addStation': 'Ajouter une station',
    'stations.centreville': 'Station Centre-ville',
    'stations.university': 'Station Université',
    'stations.airport': 'Station Aéroport',
    'stations.industrial': 'Station Zone Industrielle',
    'stations.batteryLevel': 'Niveau batterie',
    'stations.powerOutput': 'Puissance de sortie',
    'stations.connectorType': 'Type de connecteur',
    'stations.operationalTime': 'Temps opérationnel',
    'stations.viewDetails': 'Voir détails',
    'stations.configure': 'Configurer',
    'stations.remoteControl': 'Contrôle à distance',
    
    // Common
    'common.profile': 'Profil',
    'common.settings': 'Paramètres',
    'common.logout': 'Déconnexion',
  },
  ar: {
    // Navigation
    'nav.home': 'الرئيسية',
    'nav.stations': 'المحطات',
    'nav.charging': 'الشحن',
    'nav.myStation': 'محطتي',
    'nav.subscription': 'الاشتراك',
    'nav.profile': 'الملف الشخصي',
    'nav.settings': 'الإعدادات',
    'nav.help': 'المساعدة',
    
    // Map translations
    'map.title': 'خريطة المحطات',
    'map.search': 'البحث عن محطة...',
    'map.myLocation': 'موقعي',
    'map.available': 'متاحة',
    'map.occupied': 'مشغولة',
    'map.maintenance': 'صيانة',
    'map.selectStation': 'اختر محطة',
    'map.clickStation': 'انقر على محطة لمشاهدة التفاصيل',
    'map.address': 'العنوان',
    'map.power': 'القوة',
    'map.rate': 'السعر',
    'map.reserveStation': 'احجز هذه المحطة',
    'map.statistics': 'الإحصائيات',
    'map.nearbyStations': 'المحطات القريبة',
    'map.chargingStationsConstantine': 'محطات الشحن - قسنطينة',
    'map.enterMapboxToken': 'يرجى إدخال رمز Mapbox لعرض الخريطة',
    'map.confirm': 'تأكيد',
    'map.getTokenFrom': 'احصل على الرمز من',
    
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
    'settings.preferences': 'التفضيلات',
    'settings.support': 'الدعم',
    'settings.changeLanguage': 'تغيير اللغة',
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
    
    // Help
    'help.title': 'المساعدة',
    
    // My Station  
    'myStation.title': 'محطتي',
    'myStation.addStation': 'إضافة محطة',
    'myStation.addNewStation': 'إضافة محطة جديدة',
    'myStation.stationName': 'اسم المحطة',
    'myStation.power': 'القوة',
    'myStation.capacity': 'السعة',
    'myStation.location': 'الموقع',
    'myStation.estimatedChargeTime': 'وقت الشحن المقدر',
    'myStation.maxTemperature': 'الحد الأقصى لدرجة الحرارة',
    'myStation.description': 'الوصف',
    'myStation.descriptionPlaceholder': 'اوصف محطتك وخصائصها...',
    'myStation.enableNotifications': 'تفعيل الإشعارات',
    'myStation.configure': 'تكوين',
    'myStation.reportIssue': 'الإبلاغ عن مشكلة',
    'myStation.notificationsEnabled': 'الإشعارات مفعلة',
    'myStation.noStations': 'لم يتم إضافة محطات',
    'myStation.noStationsDescription': 'ابدأ بإضافة محطة الشحن الأولى',
    'myStation.addFirstStation': 'إضافة محطتي الأولى',
    'myStation.temperature': 'درجة الحرارة',
    'myStation.chargeTime': 'وقت الشحن',
    'myStation.error': 'خطأ',
    'myStation.charging': 'قيد الشحن',

    // Authentication
    'auth.welcome': 'مرحباً',
    'auth.title': 'تسجيل الدخول / التسجيل',
    'auth.login': 'تسجيل الدخول',
    'auth.register': 'التسجيل',
    'auth.email': 'البريد الإلكتروني',
    'auth.password': 'كلمة المرور',
    'auth.confirmPassword': 'تأكيد كلمة المرور',
    'auth.phone': 'الهاتف',
    'auth.firstName': 'الاسم الأول',
    'auth.lastName': 'الاسم الأخير',
    'auth.loginWithEmail': 'تسجيل الدخول بالبريد الإلكتروني',
    'auth.loginWithPhone': 'تسجيل الدخول بالهاتف',
    'auth.loginWithGoogle': 'تسجيل الدخول مع جوجل',
    'auth.registerWithGoogle': 'التسجيل مع جوجل',
    'auth.createAccount': 'إنشاء حساب',
    'auth.or': 'أو',
    
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
    'common.dza': 'د.ج',
    
    // Payments
    'payments.ccp': 'حساب جاري بريدي (CCP)',
    'payments.baridiMob': 'بريدي موب',
    'payments.bankTransfer': 'تحويل مصرفي',
    'payments.edahabia': 'الذهبية',
    'payments.bankCard': 'بطاقة مصرفية',
    'payments.qrCode': 'رمز الاستجابة السريعة',
    
    // Dashboard
    'dashboard.title': 'لوحة التحكم',
    'dashboard.totalStations': 'إجمالي المحطات',
    'dashboard.activeStations': 'المحطات النشطة',
    
    // Status
    'status.operational': 'تعمل',
    'status.charging': 'قيد الشحن',
    'status.maintenance': 'صيانة',
    
    // Stations
    'stations.title': 'إدارة المحطات',
    'stations.subtitle': 'راقب وتحكم في محطات الشحن الخاصة بك',
    'stations.addStation': 'إضافة محطة',
    'stations.centreville': 'محطة وسط المدينة',
    'stations.university': 'محطة الجامعة',
    'stations.airport': 'محطة المطار',
    'stations.industrial': 'محطة المنطقة الصناعية',
    'stations.batteryLevel': 'مستوى البطارية',
    'stations.powerOutput': 'قوة الإخراج',
    'stations.connectorType': 'نوع الموصل',
    'stations.operationalTime': 'وقت التشغيل',
    'stations.viewDetails': 'عرض التفاصيل',
    'stations.configure': 'تكوين',
    'stations.remoteControl': 'التحكم عن بعد',
    
    // Common
    'common.profile': 'الملف الشخصي',
    'common.settings': 'الإعدادات',
    'common.logout': 'تسجيل الخروج',
  },
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.stations': 'Stations',
    'nav.charging': 'Charging',
    'nav.myStation': 'My Station',
    'nav.subscription': 'Subscription',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.help': 'Help',
    
    // Map translations
    'map.title': 'Stations Map',
    'map.search': 'Search for a station...',
    'map.myLocation': 'My Location',
    'map.available': 'Available',
    'map.occupied': 'Occupied',
    'map.maintenance': 'Maintenance',
    'map.selectStation': 'Select a station',
    'map.clickStation': 'Click on a station to see details',
    'map.address': 'Address',
    'map.power': 'Power',
    'map.rate': 'Rate',
    'map.reserveStation': 'Reserve this station',
    'map.statistics': 'Statistics',
    'map.nearbyStations': 'Nearby Stations',
    'map.chargingStationsConstantine': 'Charging Stations - Constantine',
    'map.enterMapboxToken': 'Please enter your Mapbox token to display the map',
    'map.confirm': 'Confirm',
    'map.getTokenFrom': 'Get your token from',
    
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
    'settings.preferences': 'Preferences',
    'settings.support': 'Support',
    'settings.changeLanguage': 'Change Language',
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
    
    // Help
    'help.title': 'Help',
    
    // My Station
    'myStation.title': 'My Station',
    'myStation.addStation': 'Add Station',
    'myStation.addNewStation': 'Add New Station',
    'myStation.stationName': 'Station Name',
    'myStation.power': 'Power',
    'myStation.capacity': 'Capacity',
    'myStation.location': 'Location',
    'myStation.estimatedChargeTime': 'Estimated Charge Time',
    'myStation.maxTemperature': 'Maximum Temperature',
    'myStation.description': 'Description',
    'myStation.descriptionPlaceholder': 'Describe your station and its features...',
    'myStation.enableNotifications': 'Enable Notifications',
    'myStation.configure': 'Configure',
    'myStation.reportIssue': 'Report Issue',
    'myStation.notificationsEnabled': 'Notifications Enabled',
    'myStation.noStations': 'No stations added',
    'myStation.noStationsDescription': 'Start by adding your first charging station',
    'myStation.addFirstStation': 'Add My First Station',
    'myStation.temperature': 'Temperature',
    'myStation.chargeTime': 'Charge Time',
    'myStation.error': 'Error',
    'myStation.charging': 'Charging',

    // Authentication
    'auth.welcome': 'Welcome',
    'auth.title': 'Login / Register',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.phone': 'Phone',
    'auth.firstName': 'First Name',
    'auth.lastName': 'Last Name',
    'auth.loginWithEmail': 'Login with Email',
    'auth.loginWithPhone': 'Login with Phone',
    'auth.loginWithGoogle': 'Login with Google',
    'auth.registerWithGoogle': 'Register with Google',
    'auth.createAccount': 'Create Account',
    'auth.or': 'or',
    
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
    'common.dza': 'DZA',
    
    // Payments
    'payments.ccp': 'CCP (Postal Current Account)',
    'payments.baridiMob': 'Baridi Mob',
    'payments.bankTransfer': 'Bank Transfer',
    'payments.edahabia': 'EDAHABIA',
    'payments.bankCard': 'Bank Card',
    'payments.qrCode': 'QR Code',
    
    // Dashboard
    'dashboard.title': 'Dashboard',
    'dashboard.totalStations': 'Total Stations',
    'dashboard.activeStations': 'Active Stations',
    
    // Status
    'status.operational': 'Operational',
    'status.charging': 'Charging',
    'status.maintenance': 'Maintenance',
    
    // Stations
    'stations.title': 'Station Management',
    'stations.subtitle': 'Monitor and control your charging stations',
    'stations.addStation': 'Add Station',
    'stations.centreville': 'Downtown Station',
    'stations.university': 'University Station',
    'stations.airport': 'Airport Station',
    'stations.industrial': 'Industrial Zone Station',
    'stations.batteryLevel': 'Battery Level',
    'stations.powerOutput': 'Power Output',
    'stations.connectorType': 'Connector Type',
    'stations.operationalTime': 'Operational Time',
    'stations.viewDetails': 'View Details',
    'stations.configure': 'Configure',
    'stations.remoteControl': 'Remote Control',
    
    // Common
    'common.profile': 'Profile',
    'common.settings': 'Settings',
    'common.logout': 'Logout',
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
