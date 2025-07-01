
import React, { createContext, useContext, useState, useEffect } from 'react';

interface LanguageContextType {
  language: 'fr' | 'ar' | 'en';
  setLanguage: (lang: 'fr' | 'ar' | 'en') => void;
  t: (key: string) => string;
}

const translations = {
  fr: {
    // Navigation
    'nav.dashboard': 'Tableau de bord',
    'nav.stations': 'Gestion des bornes',
    'nav.monitoring': 'Surveillance',
    'nav.maintenance': 'Maintenance',
    'nav.users': 'Techniciens',
    'nav.analytics': 'Analytiques',
    'nav.inventory': 'Inventaire',
    
    // Common
    'common.settings': 'Paramètres',
    'common.thisMonth': 'ce mois',
    'common.loading': 'Chargement...',
    'common.save': 'Enregistrer',
    'common.cancel': 'Annuler',
    'common.edit': 'Modifier',
    'common.delete': 'Supprimer',
    'common.add': 'Ajouter',
    'common.status': 'État',
    'common.actions': 'Actions',
    
    // Dashboard
    'dashboard.title': 'Gestion des bornes de recharge',
    'dashboard.subtitle': 'Surveillance et contrôle centralisé',
    'dashboard.totalStations': 'Bornes totales',
    'dashboard.activeStations': 'Bornes actives',
    'dashboard.totalTechnicians': 'Techniciens',
    'dashboard.revenue': 'Revenus mensuels',
    'dashboard.recentActivity': 'Activité récente',
    'dashboard.lastSessions': 'Dernières sessions de charge',
    'dashboard.systemStatus': 'État du système',
    'dashboard.stationsMaintenanceStatus': 'État de maintenance des bornes',
    'dashboard.scheduledMaintenance': 'Maintenance programmée',
    'dashboard.tomorrow9am': 'Demain 9h',
    'dashboard.globalNetwork': 'Réseau global',
    'dashboard.optimalOperation': 'Fonctionnement optimal',
    'dashboard.activeSessions': 'Sessions actives',
    'dashboard.connectedUsers': 'Utilisateurs connectés',
    'dashboard.active': 'actifs',
    'dashboard.inProgress': 'En cours',
    'dashboard.completed': 'Terminé',
    'dashboard.systemOperational': 'Système opérationnel',
    
    // Stations Management
    'stations.title': 'Gestion des bornes',
    'stations.subtitle': 'Contrôle et configuration des bornes',
    'stations.addStation': 'Ajouter une borne',
    'stations.stationCapacity': 'Capacité de charge',
    'stations.batteryLevel': 'Niveau batterie',
    'stations.powerOutput': 'Puissance de sortie',
    'stations.connectorType': 'Type de connecteur',
    'stations.operationalTime': 'Temps opérationnel',
    'stations.lastMaintenance': 'Dernière maintenance',
    'stations.remoteControl': 'Contrôle à distance',
    'stations.enableStation': 'Activer la borne',
    'stations.disableStation': 'Désactiver la borne',
    'stations.resetStation': 'Réinitialiser la borne',
    'stations.viewDetails': 'Voir détails',
    'stations.configure': 'Configurer',
    
    // Station names
    'stations.centreville': 'Centre-ville Alger',
    'stations.university': 'Université',
    'stations.airport': 'Aéroport',
    'stations.port': 'Port',
    'stations.industrial': 'Zone industrielle',
    'stations.hospital': 'Hôpital',
    
    // Monitoring
    'monitoring.title': 'Surveillance en temps réel',
    'monitoring.subtitle': 'Monitoring des performances',
    'monitoring.realTimeData': 'Données en temps réel',
    'monitoring.powerConsumption': 'Consommation électrique',
    'monitoring.chargingEfficiency': 'Efficacité de charge',
    'monitoring.networkStatus': 'État du réseau',
    'monitoring.alerts': 'Alertes système',
    'monitoring.criticalAlert': 'Alerte critique',
    'monitoring.warningAlert': 'Alerte d\'avertissement',
    'monitoring.infoAlert': 'Information',
    
    // Maintenance
    'maintenance.title': 'Maintenance des bornes',
    'maintenance.newTicket': 'Nouveau ticket',
    'maintenance.activeTickets': 'Tickets actifs',
    'maintenance.inProgress': 'En cours',
    'maintenance.completed': 'Terminés',
    'maintenance.technicians': 'Techniciens',
    'maintenance.tickets': 'Tickets',
    'maintenance.history': 'Historique',
    'maintenance.preventive': 'Maintenance préventive',
    'maintenance.urgent': 'Urgente',
    'maintenance.medium': 'Moyenne',
    'maintenance.low': 'Faible',
    'maintenance.technician': 'Technicien',
    'maintenance.createdOn': 'Créé le',
    'maintenance.estimatedTime': 'Temps estimé',
    'maintenance.viewDetails': 'Voir détails',
    'maintenance.scheduled': 'Maintenance programmée',
    'maintenance.scheduledLabel': 'Programmée',
    'maintenance.quarterlyMaintenance': 'Maintenance trimestrielle',
    'maintenance.monthlyInspection': 'Inspection mensuelle',
    
    // Technicians (formerly Users)
    'technicians.title': 'Gestion des techniciens',
    'technicians.subtitle': 'Personnel technique et maintenance',
    'technicians.addTechnician': 'Ajouter technicien',
    'technicians.totalTechnicians': 'Total techniciens',
    'technicians.activeTechnicians': 'Techniciens actifs',
    'technicians.onDuty': 'En service',
    'technicians.specialist': 'Spécialiste',
    'technicians.experience': 'Expérience',
    'technicians.certifications': 'Certifications',
    'technicians.currentAssignment': 'Affectation actuelle',
    'technicians.contactInfo': 'Contact',
    'technicians.performance': 'Performance',
    
    // Analytics
    'analytics.title': 'Analytiques de performance',
    'analytics.subtitle': 'Analyses et rapports détaillés',
    'analytics.performanceMetrics': 'Métriques de performance',
    'analytics.utilizationRate': 'Taux d\'utilisation',
    'analytics.averageChargingTime': 'Temps de charge moyen',
    'analytics.energyConsumption': 'Consommation énergétique',
    'analytics.maintenanceCosts': 'Coûts de maintenance',
    'analytics.revenueAnalysis': 'Analyse des revenus',
    'analytics.weeklyReport': 'Rapport hebdomadaire',
    'analytics.monthlyReport': 'Rapport mensuel',
    'analytics.customReport': 'Rapport personnalisé',
    
    // Inventory
    'inventory.title': 'Gestion d\'inventaire',
    'inventory.subtitle': 'Pièces détachées et équipements',
    'inventory.spareParts': 'Pièces détachées',
    'inventory.equipment': 'Équipements',
    'inventory.suppliers': 'Fournisseurs',
    'inventory.orders': 'Commandes',
    'inventory.stockLevel': 'Niveau de stock',
    'inventory.reorderPoint': 'Seuil de réapprovisionnement',
    'inventory.lastOrdered': 'Dernière commande',
    'inventory.addItem': 'Ajouter article',
    
    // Settings
    'settings.title': 'Paramètres du système',
    'settings.general': 'Général',
    'settings.network': 'Réseau',
    'settings.security': 'Sécurité',
    'settings.notifications': 'Notifications',
    'settings.backup': 'Sauvegardes',
    
    // Status
    'status.operational': 'Opérationnel',
    'status.maintenance': 'Maintenance',
    'status.offline': 'Hors ligne',
    'status.charging': 'En charge',
    'status.available': 'Disponible',
    'status.error': 'Erreur',
  },
  ar: {
    // Navigation
    'nav.dashboard': 'لوحة التحكم',
    'nav.stations': 'إدارة المحطات',
    'nav.monitoring': 'المراقبة',
    'nav.maintenance': 'الصيانة',
    'nav.users': 'الفنيين',
    'nav.analytics': 'التحليلات',
    'nav.inventory': 'المخزون',
    
    // Common
    'common.settings': 'الإعدادات',
    'common.thisMonth': 'هذا الشهر',
    'common.loading': 'جاري التحميل...',
    'common.save': 'حفظ',
    'common.cancel': 'إلغاء',
    'common.edit': 'تعديل',
    'common.delete': 'حذف',
    'common.add': 'إضافة',
    'common.status': 'الحالة',
    'common.actions': 'الإجراءات',
    
    // Dashboard
    'dashboard.title': 'إدارة محطات الشحن',
    'dashboard.subtitle': 'المراقبة والتحكم المركزي',
    'dashboard.totalStations': 'إجمالي المحطات',
    'dashboard.activeStations': 'المحطات النشطة',
    'dashboard.totalTechnicians': 'الفنيين',
    'dashboard.revenue': 'الإيرادات الشهرية',
    'dashboard.recentActivity': 'النشاط الحديث',
    'dashboard.lastSessions': 'جلسات الشحن الأخيرة',
    'dashboard.systemStatus': 'حالة النظام',
    'dashboard.stationsMaintenanceStatus': 'حالة صيانة المحطات',
    'dashboard.scheduledMaintenance': 'صيانة مجدولة',
    'dashboard.tomorrow9am': 'غداً 9 صباحاً',
    'dashboard.globalNetwork': 'الشبكة العامة',
    'dashboard.optimalOperation': 'تشغيل مثالي',
    'dashboard.activeSessions': 'الجلسات النشطة',
    'dashboard.connectedUsers': 'المستخدمين المتصلين',
    'dashboard.active': 'نشط',
    'dashboard.inProgress': 'قيد التنفيذ',
    'dashboard.completed': 'مكتمل',
    'dashboard.systemOperational': 'النظام يعمل',
    
    // Stations Management
    'stations.title': 'إدارة المحطات',
    'stations.subtitle': 'التحكم وتكوين المحطات',
    'stations.addStation': 'إضافة محطة',
    'stations.stationCapacity': 'سعة الشحن',
    'stations.batteryLevel': 'مستوى البطارية',
    'stations.powerOutput': 'قوة الإخراج',
    'stations.connectorType': 'نوع الموصل',
    'stations.operationalTime': 'وقت التشغيل',
    'stations.lastMaintenance': 'آخر صيانة',
    'stations.remoteControl': 'التحكم عن بُعد',
    'stations.enableStation': 'تشغيل المحطة',
    'stations.disableStation': 'إيقاف المحطة',
    'stations.resetStation': 'إعادة تعيين المحطة',
    'stations.viewDetails': 'عرض التفاصيل',
    'stations.configure': 'تكوين',
    
    // Station names
    'stations.centreville': 'وسط الجزائر',
    'stations.university': 'الجامعة',
    'stations.airport': 'المطار',
    'stations.port': 'الميناء',
    'stations.industrial': 'المنطقة الصناعية',
    'stations.hospital': 'المستشفى',
  },
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.stations': 'Station Management',
    'nav.monitoring': 'Monitoring',
    'nav.maintenance': 'Maintenance',
    'nav.users': 'Technicians',
    'nav.analytics': 'Analytics',
    'nav.inventory': 'Inventory',
    
    // Common
    'common.settings': 'Settings',
    'common.thisMonth': 'this month',
    'common.loading': 'Loading...',
    'common.save': 'Save',
    'common.cancel': 'Cancel',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.add': 'Add',
    'common.status': 'Status',
    'common.actions': 'Actions',
    
    // Dashboard
    'dashboard.title': 'Charging Station Management',
    'dashboard.subtitle': 'Centralized monitoring and control',
    'dashboard.totalStations': 'Total Stations',
    'dashboard.activeStations': 'Active Stations',
    'dashboard.totalTechnicians': 'Technicians',
    'dashboard.revenue': 'Monthly Revenue',
    'dashboard.recentActivity': 'Recent Activity',
    'dashboard.lastSessions': 'Latest charging sessions',
    'dashboard.systemStatus': 'System Status',
    'dashboard.stationsMaintenanceStatus': 'Station maintenance status',
    'dashboard.scheduledMaintenance': 'Scheduled maintenance',
    'dashboard.tomorrow9am': 'Tomorrow 9 AM',
    'dashboard.globalNetwork': 'Global Network',
    'dashboard.optimalOperation': 'Optimal operation',
    'dashboard.activeSessions': 'Active Sessions',
    'dashboard.connectedUsers': 'Connected users',
    'dashboard.active': 'active',
    'dashboard.inProgress': 'In Progress',
    'dashboard.completed': 'Completed',
    'dashboard.systemOperational': 'System operational',
    
    // Stations Management
    'stations.title': 'Station Management',
    'stations.subtitle': 'Station control and configuration',
    'stations.addStation': 'Add Station',
    'stations.stationCapacity': 'Charging Capacity',
    'stations.batteryLevel': 'Battery Level',
    'stations.powerOutput': 'Power Output',
    'stations.connectorType': 'Connector Type',
    'stations.operationalTime': 'Operational Time',
    'stations.lastMaintenance': 'Last Maintenance',
    'stations.remoteControl': 'Remote Control',
    'stations.enableStation': 'Enable Station',
    'stations.disableStation': 'Disable Station',
    'stations.resetStation': 'Reset Station',
    'stations.viewDetails': 'View Details',
    'stations.configure': 'Configure',
    
    // Station names
    'stations.centreville': 'Algiers Downtown',
    'stations.university': 'University',
    'stations.airport': 'Airport',
    'stations.port': 'Port',
    'stations.industrial': 'Industrial Zone',
    'stations.hospital': 'Hospital',
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<'fr' | 'ar' | 'en'>(() => {
    const saved = localStorage.getItem('preferred-language');
    return (saved as 'fr' | 'ar' | 'en') || 'fr';
  });

  useEffect(() => {
    localStorage.setItem('preferred-language', language);
    document.documentElement.dir = language === 'ar' ? 'rtl' : 'ltr';
    document.documentElement.lang = language;
  }, [language]);

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
