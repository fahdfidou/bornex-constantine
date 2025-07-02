
import React, { useState } from 'react';
import { Crown, Check, Zap, Shield, Star, Smartphone } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubscriptionScreenProps {
  setActiveTab: (tab: string) => void;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    monthly: {
      price: 29.99,
      period: t('subscription.monthly'),
      save: null,
    },
    yearly: {
      price: 299.99,
      period: t('subscription.yearly'),
      save: '17%',
      monthlyEquivalent: 24.99,
    }
  };

  const features = [
    {
      icon: Zap,
      title: t('subscription.unlimitedCharging'),
      description: 'Accès illimité à toutes nos stations de recharge'
    },
    {
      icon: Shield,
      title: t('subscription.prioritySupport'),
      description: 'Support client prioritaire 24/7'
    },
    {
      icon: Star,
      title: t('subscription.exclusiveStations'),
      description: 'Accès aux stations premium et ultra-rapides'
    },
    {
      icon: Smartphone,
      title: t('subscription.mobileApp'),
      description: 'Fonctionnalités avancées de l\'application'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('subscription.title')}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {t('subscription.subtitle')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Plan Selection */}
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(plans).map(([key, plan]) => (
              <Card 
                key={key}
                className={`cursor-pointer transition-all duration-300 transform hover:scale-105 ${
                  selectedPlan === key
                    ? 'bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-500/25'
                    : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 hover:shadow-lg'
                }`}
                onClick={() => setSelectedPlan(key as 'monthly' | 'yearly')}
              >
                <CardContent className="p-4 text-center">
                  {plan.save && (
                    <Badge className="mb-2 bg-yellow-500 text-white">
                      {t('subscription.save')} {plan.save}
                    </Badge>
                  )}
                  <div className="text-2xl font-bold mb-1">
                    {plan.price}€
                  </div>
                  <div className="text-sm opacity-80 mb-2">
                    {plan.period}
                  </div>
                  {plan.monthlyEquivalent && (
                    <div className="text-xs opacity-70">
                      {plan.monthlyEquivalent}€/mois
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Features */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="text-gray-900 dark:text-white">
                {t('subscription.features')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div 
                    key={index} 
                    className="flex items-start gap-3 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-900 dark:text-white mb-1">
                        {feature.title}
                      </h3>
                      <p className="text-sm text-gray-600 dark:text-gray-300">
                        {feature.description}
                      </p>
                    </div>
                    <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                  </div>
                );
              })}
            </CardContent>
          </Card>

          {/* Terms */}
          <Card className="bg-blue-50/70 dark:bg-blue-900/20 backdrop-blur-xl border-blue-200/30 dark:border-blue-700/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">Garantie satisfaction</span>
              </div>
              <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-300">
                <li>• {t('subscription.cancelAnytime')}</li>
                <li>• {t('subscription.noCommitment')}</li>
                <li>• Remboursement sous 30 jours</li>
              </ul>
            </CardContent>
          </Card>

          {/* Subscribe Button */}
          <div className="space-y-3">
            <Button 
              size="lg"
              className="w-full h-14 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              onClick={() => {
                // Simulate subscription success
                setTimeout(() => {
                  setActiveTab('charging');
                }, 1000);
              }}
            >
              <Crown className="h-5 w-5 mr-2" />
              {t('subscription.subscribe')} - {plans[selectedPlan].price}€
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70"
              onClick={() => setActiveTab('home')}
            >
              Continuer sans abonnement
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
