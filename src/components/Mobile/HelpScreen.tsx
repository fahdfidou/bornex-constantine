import React from 'react';
import { Phone, Mail, MessageCircle, FileText, Clock } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface HelpScreenProps {
  setActiveTab: (tab: string) => void;
}

const HelpScreen: React.FC<HelpScreenProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();

  const supportOptions = [
    {
      icon: Phone,
      title: 'Téléphone',
      subtitle: '+213 31 XX XX XX',
      description: 'Lun-Ven: 8h-18h',
      color: 'from-green-500 to-emerald-600'
    },
    {
      icon: Mail,
      title: 'Email',
      subtitle: 'support@echarge-dz.com',
      description: 'Réponse sous 24h',
      color: 'from-blue-500 to-blue-600'
    },
    {
      icon: MessageCircle,
      title: 'Chat en direct',
      subtitle: 'Assistance instantanée',
      description: 'Disponible 24/7',
      color: 'from-purple-500 to-purple-600'
    }
  ];

  const faqItems = [
    {
      question: 'Comment recharger ma voiture électrique ?',
      answer: 'Utilisez votre carte CCP, Baridi Mob ou effectuez un virement bancaire.'
    },
    {
      question: 'Quels sont les tarifs de recharge ?',
      answer: 'Les tarifs varient selon la station et le type de recharge (normale/rapide).'
    },
    {
      question: 'Comment trouver une station de recharge ?',
      answer: 'Utilisez la carte interactive dans l\'app pour localiser les stations proches.'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            {t('help.title')}
          </h1>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Support Options */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white px-2">
              Contactez-nous
            </h2>
            
            {supportOptions.map((option, index) => {
              const Icon = option.icon;
              return (
                <Card 
                  key={index}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20 cursor-pointer hover:shadow-lg transition-all duration-300 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-br ${option.color} rounded-full flex items-center justify-center`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 dark:text-white">
                          {option.title}
                        </h3>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {option.subtitle}
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {option.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* FAQ */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <FileText className="h-5 w-5" />
                Questions fréquentes
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {faqItems.map((item, index) => (
                <div 
                  key={index}
                  className="p-3 bg-gray-50/50 dark:bg-gray-700/50 rounded-lg animate-fade-in-up"
                  style={{ animationDelay: `${(index + 3) * 0.1}s` }}
                >
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm mb-2">
                    {item.question}
                  </h4>
                  <p className="text-xs text-gray-600 dark:text-gray-300">
                    {item.answer}
                  </p>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Back Button */}
          <Button
            onClick={() => setActiveTab('settings')}
            className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700"
          >
            Retour aux paramètres
          </Button>
        </div>
      </div>
    </div>
  );
};

export default HelpScreen;