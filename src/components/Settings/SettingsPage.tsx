
import React, { useState } from 'react';
import { Settings, Shield, Bell, Globe, Zap, Users, CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const SettingsPage = () => {
  const [notifications, setNotifications] = useState({
    email: true,
    sms: true,
    maintenance: true,
    payments: false,
    lowBattery: true
  });

  const [systemSettings, setSystemSettings] = useState({
    autoMaintenance: true,
    energyOptimization: true,
    loadBalancing: false,
    emergencyMode: true
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres Système</h1>
        <Button className="bg-green-600 hover:bg-green-700">
          <Settings className="h-4 w-4 mr-2" />
          Sauvegarder
        </Button>
      </div>

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="general">Général</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Sécurité</TabsTrigger>
          <TabsTrigger value="stations">Stations</TabsTrigger>
          <TabsTrigger value="users">Utilisateurs</TabsTrigger>
          <TabsTrigger value="billing">Facturation</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Globe className="h-5 w-5 mr-2" />
                Paramètres Généraux
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="company-name">Nom de l'entreprise</Label>
                  <Input id="company-name" defaultValue="BorneX Algeria" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="contact-email">Email de contact</Label>
                  <Input id="contact-email" defaultValue="contact@bornex.dz" />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="default-language">Langue par défaut</Label>
                  <Select defaultValue="fr">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="fr">Français</SelectItem>
                      <SelectItem value="ar">العربية</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="timezone">Fuseau horaire</Label>
                  <Select defaultValue="africa-algiers">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="africa-algiers">Afrique/Alger (GMT+1)</SelectItem>
                      <SelectItem value="europe-paris">Europe/Paris (GMT+1)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Paramètres Système</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-maintenance">Maintenance automatique</Label>
                      <p className="text-sm text-gray-500">Planifier automatiquement la maintenance préventive</p>
                    </div>
                    <Switch 
                      id="auto-maintenance"
                      checked={systemSettings.autoMaintenance}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, autoMaintenance: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="energy-optimization">Optimisation énergétique</Label>
                      <p className="text-sm text-gray-500">Optimiser la distribution d'énergie selon la demande</p>
                    </div>
                    <Switch 
                      id="energy-optimization"
                      checked={systemSettings.energyOptimization}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, energyOptimization: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="load-balancing">Équilibrage de charge</Label>
                      <p className="text-sm text-gray-500">Répartir intelligemment la charge entre les bornes</p>
                    </div>
                    <Switch 
                      id="load-balancing"
                      checked={systemSettings.loadBalancing}
                      onCheckedChange={(checked) => setSystemSettings({...systemSettings, loadBalancing: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bell className="h-5 w-5 mr-2" />
                Paramètres de Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Canaux de communication</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-notifications">Notifications par email</Label>
                      <p className="text-sm text-gray-500">Recevoir les alertes par email</p>
                    </div>
                    <Switch 
                      id="email-notifications"
                      checked={notifications.email}
                      onCheckedChange={(checked) => setNotifications({...notifications, email: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="sms-notifications">Notifications SMS</Label>
                      <p className="text-sm text-gray-500">Recevoir les alertes critiques par SMS</p>
                    </div>
                    <Switch 
                      id="sms-notifications"
                      checked={notifications.sms}
                      onCheckedChange={(checked) => setNotifications({...notifications, sms: checked})}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Types d'alertes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="maintenance-alerts">Alertes de maintenance</Label>
                      <p className="text-sm text-gray-500">Notifications pour les pannes et maintenances</p>
                    </div>
                    <Switch 
                      id="maintenance-alerts"
                      checked={notifications.maintenance}
                      onCheckedChange={(checked) => setNotifications({...notifications, maintenance: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="payment-alerts">Alertes de paiement</Label>
                      <p className="text-sm text-gray-500">Notifications pour les transactions et échecs de paiement</p>
                    </div>
                    <Switch 
                      id="payment-alerts"
                      checked={notifications.payments}
                      onCheckedChange={(checked) => setNotifications({...notifications, payments: checked})}
                    />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="battery-alerts">Alertes batterie faible</Label>
                      <p className="text-sm text-gray-500">Notifications quand les véhicules ont une batterie faible</p>
                    </div>
                    <Switch 
                      id="battery-alerts"
                      checked={notifications.lowBattery}
                      onCheckedChange={(checked) => setNotifications({...notifications, lowBattery: checked})}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-5 w-5 mr-2" />
                Sécurité et Accès
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Authentification</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="session-timeout">Timeout de session (minutes)</Label>
                    <Input id="session-timeout" type="number" defaultValue="30" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-attempts">Tentatives max de connexion</Label>
                    <Input id="max-attempts" type="number" defaultValue="5" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Sécurité des bornes</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="encryption">Chiffrement des communications</Label>
                      <p className="text-sm text-gray-500">Chiffrer toutes les communications avec les bornes</p>
                    </div>
                    <Switch id="encryption" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="remote-access">Accès à distance</Label>
                      <p className="text-sm text-gray-500">Permettre l'accès à distance aux bornes</p>
                    </div>
                    <Switch id="remote-access" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Logs et Audit</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="log-retention">Rétention des logs (jours)</Label>
                    <Input id="log-retention" type="number" defaultValue="90" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="backup-frequency">Fréquence de sauvegarde</Label>
                    <Select defaultValue="daily">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="hourly">Toutes les heures</SelectItem>
                        <SelectItem value="daily">Quotidienne</SelectItem>
                        <SelectItem value="weekly">Hebdomadaire</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="stations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Zap className="h-5 w-5 mr-2" />
                Configuration des Stations
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Paramètres de charge</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="max-power">Puissance max par borne (kW)</Label>
                    <Input id="max-power" type="number" defaultValue="22" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="max-session">Durée max de session (heures)</Label>
                    <Input id="max-session" type="number" defaultValue="4" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="idle-timeout">Timeout d'inactivité (minutes)</Label>
                    <Input id="idle-timeout" type="number" defaultValue="15" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="reservation-time">Temps de réservation (minutes)</Label>
                    <Input id="reservation-time" type="number" defaultValue="10" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Gestion intelligente</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="smart-charging">Charge intelligente</Label>
                      <p className="text-sm text-gray-500">Optimiser la charge selon les tarifs électriques</p>
                    </div>
                    <Switch id="smart-charging" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="queue-management">Gestion de file d'attente</Label>
                      <p className="text-sm text-gray-500">File d'attente automatique quand toutes les bornes sont occupées</p>
                    </div>
                    <Switch id="queue-management" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="users" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Users className="h-5 w-5 mr-2" />
                Gestion des Utilisateurs
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Inscription et validation</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="auto-approval">Approbation automatique</Label>
                      <p className="text-sm text-gray-500">Approuver automatiquement les nouveaux utilisateurs</p>
                    </div>
                    <Switch id="auto-approval" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="email-verification">Vérification email obligatoire</Label>
                      <p className="text-sm text-gray-500">Exiger la vérification email avant utilisation</p>
                    </div>
                    <Switch id="email-verification" defaultChecked />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Limites et restrictions</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="daily-sessions">Sessions max par jour</Label>
                    <Input id="daily-sessions" type="number" defaultValue="5" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="monthly-energy">Énergie max par mois (kWh)</Label>
                    <Input id="monthly-energy" type="number" defaultValue="200" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="h-5 w-5 mr-2" />
                Configuration de Facturation
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Méthodes de paiement</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-cib">Carte bancaire CIB</Label>
                      <p className="text-sm text-gray-500">Accepter les paiements par carte bancaire</p>
                    </div>
                    <Switch id="enable-cib" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-edahabia">EDAHABIA</Label>
                      <p className="text-sm text-gray-500">Accepter les paiements EDAHABIA</p>
                    </div>
                    <Switch id="enable-edahabia" defaultChecked />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <Label htmlFor="enable-qr">Paiement QR Code</Label>
                      <p className="text-sm text-gray-500">Accepter les paiements par QR Code</p>
                    </div>
                    <Switch id="enable-qr" />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Facturation</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Taux de TVA (%)</Label>
                    <Input id="tax-rate" type="number" defaultValue="19" />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="currency">Devise</Label>
                    <Select defaultValue="dzd">
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="dzd">Dinar Algérien (DA)</SelectItem>
                        <SelectItem value="eur">Euro (€)</SelectItem>
                        <SelectItem value="usd">Dollar US ($)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SettingsPage;
