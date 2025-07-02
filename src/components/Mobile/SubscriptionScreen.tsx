
import React, { useState } from 'react';
import { Crown, Check, Zap, Shield, Star, Smartphone, Car, Clock, Battery } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface SubscriptionScreenProps {
  setActiveTab: (tab: string) => void;
}

const SubscriptionScreen: React.FC<SubscriptionScreenProps> = ({ setActiveTab }) => {
  const { t, language } = useLanguage();
  const [selectedPlan, setSelectedPlan] = useState<'basic' | 'premium' | 'ultra'>('premium');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  const plans = {
    basic: {
      name: language === 'ar' ? 'الباقة الأساسية' : language === 'fr' ? 'Plan Basique' : 'Basic Plan',
      monthlyPrice: 19.99,
      yearlyPrice: 199.99,
      color: 'from-blue-500 to-blue-600',
      icon: Car,
      features: [
        language === 'ar' ? 'الوصول لـ 10 محطات' : language === 'fr' ? 'Accès à 10 stations' : 'Access to 10 stations',
        language === 'ar' ? 'شحن حتى 50 كيلو واط' : language === 'fr' ? 'Charge jusqu\'à 50kW' : 'Charge up to 50kW',
        language === 'ar' ? 'دعم عبر الإيميل' : language === 'fr' ? 'Support par email' : 'Email support',
        language === 'ar' ? 'تطبيق الجوال الأساسي' : language === 'fr' ? 'Application mobile de base' : 'Basic mobile app'
      ]
    },
    premium: {
      name: language === 'ar' ? 'الباقة المميزة' : language === 'fr' ? 'Plan Premium' : 'Premium Plan',
      monthlyPrice: 39.99,
      yearlyPrice: 399.99,
      color: 'from-purple-500 to-purple-600',
      icon: Zap,
      popular: true,
      features: [
        language === 'ar' ? 'الوصول لجميع المحطات' : language === 'fr' ? 'Accès à toutes les stations' : 'Access to all stations',
        language === 'ar' ? 'شحن حتى 150 كيلو واط' : language === 'fr' ? 'Charge jusqu\'à 150kW' : 'Charge up to 150kW',
        language === 'ar' ? 'دعم أولوية 24/7' : language === 'fr' ? 'Support prioritaire 24/7' : 'Priority 24/7 support',
        language === 'ar' ? 'تطبيق متقدم' : language === 'fr' ? 'Application avancée' : 'Advanced app features',
        language === 'ar' ? 'حجز المحطات' : language === 'fr' ? 'Réservation de stations' : 'Station reservations'
      ]
    },
    ultra: {
      name: language === 'ar' ? 'الباقة الفائقة' : language === 'fr' ? 'Plan Ultra' : 'Ultra Plan',
      monthlyPrice: 69.99,
      yearlyPrice: 699.99,
      color: 'from-yellow-500 to-orange-500',
      icon: Crown,
      features: [
        language === 'ar' ? 'الوصول لجميع المحطات المميزة' : language === 'fr' ? 'Accès à toutes les stations premium' : 'Access to all premium stations',
        language === 'ar' ? 'شحن فائق السرعة 350 كيلو واط' : language === 'fr' ? 'Charge ultra-rapide 350kW' : 'Ultra-fast 350kW charging',
        language === 'ar' ? 'دعم مخصص' : language === 'fr' ? 'Support dédié' : 'Dedicated support',
        language === 'ar' ? 'تطبيق كامل المميزات' : language === 'fr' ? 'Application complète' : 'Full-featured app',
        language === 'ar' ? 'شحن مجاني في المنزل' : language === 'fr' ? 'Installation à domicile gratuite' : 'Free home installation',
        language === 'ar' ? 'أولوية الوصول' : language === 'fr' ? 'Accès prioritaire' : 'Priority access'
      ]
    }
  };

  const getCurrentPrice = (plan: any) => {
    return billingCycle === 'monthly' ? plan.monthlyPrice : plan.yearlyPrice;
  };

  const getSavingsPercentage = (plan: any) => {
    if (billingCycle === 'yearly') {
      const monthlyCost = plan.monthlyPrice * 12;
      const yearlyCost = plan.yearlyPrice;
      return Math.round(((monthlyCost - yearlyCost) / monthlyCost) * 100);
    }
    return 0;
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
            <Crown className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {language === 'ar' ? 'اختر باقتك' : language === 'fr' ? 'Choisissez votre plan' : 'Choose Your Plan'}
          </h1>
          <p className="text-gray-600 dark:text-gray-300">
            {language === 'ar' ? 'اشحن بدون حدود مع باقاتنا المرنة' : language === 'fr' ? 'Rechargez sans limites avec nos plans flexibles' : 'Charge without limits with our flexible plans'}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Billing Toggle */}
          <div className="flex items-center justify-center">
            <div className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl p-1 rounded-full border border-white/20 dark:border-gray-700/20">
              <div className="flex">
                <button
                  onClick={() => setBillingCycle('monthly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    billingCycle === 'monthly'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                  }`}
                >
                  {language === 'ar' ? 'شهري' : language === 'fr' ? 'Mensuel' : 'Monthly'}
                </button>
                <button
                  onClick={() => setBillingCycle('yearly')}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all relative ${
                    billingCycle === 'yearly'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-600 dark:text-gray-300 hover:text-purple-600'
                  }`}
                >
                  {language === 'ar' ? 'سنوي' : language === 'fr' ? 'Annuel' : 'Yearly'}
                  <span className="absolute -top-2 -right-1 bg-green-500 text-white text-xs px-1 py-0.5 rounded-full">
                    {language === 'ar' ? 'وفر' : language === 'fr' ? 'Économie' : 'Save'}
                  </span>
                </button>
              </div>
            </div>
          </div>

          {/* Plans */}
          <div className="space-y-4">
            {Object.entries(plans).map(([key, plan]) => {
              const Icon = plan.icon;
              const isSelected = selectedPlan === key;
              const savings = getSavingsPercentage(plan);
              
              return (
                <Card 
                  key={key}
                  className={`cursor-pointer transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                    isSelected
                      ? `bg-gradient-to-br ${plan.color} text-white shadow-xl shadow-purple-500/25`
                      : 'bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 hover:shadow-lg'
                  }`}
                  onClick={() => setSelectedPlan(key as 'basic' | 'premium' | 'ultra')}
                >
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-3 py-1 text-xs font-bold">
                      {language === 'ar' ? 'الأكثر شعبية' : language === 'fr' ? 'Plus populaire' : 'Most Popular'}
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-3">
                        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                          isSelected ? 'bg-white/20' : `bg-gradient-to-br ${plan.color}`
                        }`}>
                          <Icon className={`h-6 w-6 ${isSelected ? 'text-white' : 'text-white'}`} />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg">{plan.name}</h3>
                          <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold">
                              {getCurrentPrice(plan)}€
                            </span>
                            <span className="text-sm opacity-80">
                              /{billingCycle === 'monthly' ? 
                                (language === 'ar' ? 'شهر' : language === 'fr' ? 'mois' : 'month') : 
                                (language === 'ar' ? 'سنة' : language === 'fr' ? 'an' : 'year')
                              }
                            </span>
                          </div>
                          {savings > 0 && (
                            <Badge className="mt-1 bg-green-500 text-white text-xs">
                              {language === 'ar' ? `وفر ${savings}%` : language === 'fr' ? `Économisez ${savings}%` : `Save ${savings}%`}
                            </Badge>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-2">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-2">
                          <Check className="h-4 w-4 flex-shrink-0" />
                          <span className="text-sm">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Subscribe Button */}
          <div className="space-y-3">
            <Button 
              size="lg"
              className={`w-full h-14 bg-gradient-to-r ${plans[selectedPlan].color} hover:opacity-90 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105`}
              onClick={() => {
                setTimeout(() => {
                  setActiveTab('charging');
                }, 1000);
              }}
            >
              <Crown className="h-5 w-5 mr-2" />
              {language === 'ar' ? 
                `اشترك في ${plans[selectedPlan].name} - ${getCurrentPrice(plans[selectedPlan])}€` :
                language === 'fr' ? 
                `S'abonner ${plans[selectedPlan].name} - ${getCurrentPrice(plans[selectedPlan])}€` :
                `Subscribe to ${plans[selectedPlan].name} - ${getCurrentPrice(plans[selectedPlan])}€`
              }
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70"
              onClick={() => setActiveTab('home')}
            >
              {language === 'ar' ? 'المتابعة بدون اشتراك' : language === 'fr' ? 'Continuer sans abonnement' : 'Continue without subscription'}
            </Button>
          </div>

          {/* Terms */}
          <Card className="bg-blue-50/70 dark:bg-blue-900/20 backdrop-blur-xl border-blue-200/30 dark:border-blue-700/30">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300 mb-2">
                <Shield className="h-5 w-5" />
                <span className="font-medium">
                  {language === 'ar' ? 'ضمان الرضا' : language === 'fr' ? 'Garantie satisfaction' : 'Satisfaction Guarantee'}
                </span>
              </div>
              <ul className="space-y-1 text-sm text-blue-600 dark:text-blue-300">
                <li>• {language === 'ar' ? 'يمكن الإلغاء في أي وقت' : language === 'fr' ? 'Annulation à tout moment' : 'Cancel anytime'}</li>
                <li>• {language === 'ar' ? 'بدون التزام' : language === 'fr' ? 'Aucun engagement' : 'No commitment'}</li>
                <li>• {language === 'ar' ? 'استرداد خلال 30 يوم' : language === 'fr' ? 'Remboursement sous 30 jours' : '30-day money back'}</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionScreen;
