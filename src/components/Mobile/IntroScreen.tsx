
import React, { useState } from 'react';
import { ChevronRight, Zap, MapPin, Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface IntroScreenProps {
  onComplete: () => void;
}

const IntroScreen: React.FC<IntroScreenProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  const screens = [
    {
      id: 'logo',
      title: 'Bienvenue',
      subtitle: 'Votre solution de recharge intelligente',
      showLogo: true,
    },
    {
      id: 'services',
      title: 'Nos Services',
      subtitle: 'Découvrez nos solutions de recharge',
      icon: Crown,
      features: [
        'Bornes de recharge rapide',
        'Localisation en temps réel',
        'Paiement sécurisé',
        'Support 24/7'
      ]
    }
  ];

  const currentScreen = screens[currentStep];

  const handleNext = () => {
    if (currentStep < screens.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  return (
    <div className="dark min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center p-8">
        <div className="max-w-md w-full text-center space-y-8">
          
          {/* Logo ou Icône */}
          {currentScreen.showLogo ? (
            <div className="w-32 h-32 mx-auto mb-8 animate-fade-in">
              <div className="w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl p-4 border border-white/20">
                <img 
                  src="/lovable-uploads/4a4164ae-ab3a-43a0-9d61-01edf0113205.png" 
                  alt="Logo de l'application" 
                  className="w-full h-full object-contain filter brightness-110"
                />
              </div>
            </div>
          ) : currentScreen.icon && (
            <div className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center animate-bounce">
              <currentScreen.icon className="h-12 w-12 text-white" />
            </div>
          )}

          {/* Titre */}
          <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h1 className="text-3xl font-bold text-white">
              {currentScreen.title}
            </h1>
            <p className="text-lg text-gray-300">
              {currentScreen.subtitle}
            </p>
          </div>

          {/* Fonctionnalités pour la page services */}
          {currentScreen.features && (
            <div className="space-y-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              {currentScreen.features.map((feature, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-3 p-3 bg-gray-800/70 backdrop-blur-sm rounded-lg border border-gray-700/20"
                  style={{ animationDelay: `${0.5 + index * 0.1}s` }}
                >
                  <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                    <Zap className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-white font-medium">
                    {feature}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bouton Suivant */}
      <div className="p-8">
        <div className="max-w-md mx-auto">
          <Button 
            onClick={handleNext}
            size="lg"
            className="w-full h-14 bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-300 transform hover:scale-105"
          >
            {currentStep < screens.length - 1 ? 'Suivant' : 'Commencer'}
            <ChevronRight className="h-5 w-5 ml-2" />
          </Button>
        </div>
      </div>

      {/* Indicateurs de progression */}
      <div className="absolute bottom-24 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {screens.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentStep 
                ? 'bg-green-500 w-8' 
                : 'bg-gray-600'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default IntroScreen;
