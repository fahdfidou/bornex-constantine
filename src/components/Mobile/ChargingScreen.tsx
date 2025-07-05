
import React, { useState, useEffect } from 'react';
import { Zap, Clock, Battery, DollarSign, Unlock, Crown } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface ChargingScreenProps {
  setActiveTab: (tab: string) => void;
}

const ChargingScreen: React.FC<ChargingScreenProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [batteryLevel, setBatteryLevel] = useState(45);
  const [chargingSpeed, setChargingSpeed] = useState(22);
  const [timeRemaining, setTimeRemaining] = useState(85);
  const [energyAdded, setEnergyAdded] = useState(12.5);
  const [currentCost, setCurrentCost] = useState(3.15);

  // Simulate charging progress
  useEffect(() => {
    if (isSubscribed) {
      const interval = setInterval(() => {
        setBatteryLevel(prev => Math.min(prev + 0.5, 100));
        setEnergyAdded(prev => prev + 0.1);
        setCurrentCost(prev => prev + 0.025);
        setTimeRemaining(prev => Math.max(prev - 1, 0));
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isSubscribed]);

  if (!isSubscribed) {
    return (
      <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
        {/* Header */}
        <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
          <div className="max-w-md mx-auto text-center">
            <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
              <Unlock className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
              {t('charging.subscriptionRequired')}
            </h1>
            <p className="text-gray-600 dark:text-gray-300">
              {t('charging.subscribeToStart')}
            </p>
          </div>
        </div>

        {/* Subscription Prompt */}
        <div className="flex-1 flex items-center justify-center p-6">
          <Card className="w-full max-w-md bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader className="text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-bounce">
                <Crown className="h-10 w-10 text-white" />
              </div>
              <CardTitle className="text-xl text-gray-900 dark:text-white">
                {t('charging.unlockCharging')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center space-y-2">
                <p className="text-gray-600 dark:text-gray-300">
                  Accédez à toutes nos stations de recharge premium
                </p>
                <div className="flex items-center justify-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                  <span>✓ Recharge illimitée</span>
                  <span>✓ Support 24/7</span>
                </div>
              </div>
              
              <Button 
                onClick={() => setActiveTab('subscription')}
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/25 transition-all duration-300 transform hover:scale-105"
              >
                {t('subscription.subscribe')}
              </Button>
              
              <Button 
                variant="outline"
                onClick={() => setIsSubscribed(true)}
                className="w-full bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border-white/30 dark:border-gray-600/30 hover:bg-white/70 dark:hover:bg-gray-700/70"
              >
                Essai gratuit (Demo)
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-green-50 via-blue-50 to-teal-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center animate-pulse">
            <Zap className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            {t('charging.title')}
          </h1>
          <p className="text-green-600 dark:text-green-400 font-medium">
            Station Centre-ville • 22 kW
          </p>
        </div>
      </div>

      {/* Charging Stats */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* Battery Level */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Battery className="h-5 w-5 text-green-600 dark:text-green-400" />
                {t('charging.batteryLevel')}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                    {batteryLevel}%
                  </div>
                  <Progress value={batteryLevel} className="h-3 rounded-full" />
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div className="text-center">
                    <p className="text-green-600 dark:text-green-400 font-medium">
                      {chargingSpeed} {t('common.kw')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('charging.chargingSpeed')}
                    </p>
                  </div>
                  <div className="text-center">
                    <p className="text-blue-600 dark:text-blue-400 font-medium">
                      {energyAdded} {t('common.kwh')}
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      {t('charging.energyAdded')}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Time and Cost */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardContent className="p-4 text-center">
                <Clock className="h-6 w-6 mx-auto mb-2 text-purple-600 dark:text-purple-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {Math.floor(timeRemaining / 60)}h {timeRemaining % 60}m
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('charging.timeRemaining')}
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
              <CardContent className="p-4 text-center">
                <DollarSign className="h-6 w-6 mx-auto mb-2 text-orange-600 dark:text-orange-400" />
                <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                  {currentCost.toFixed(2)} {t('common.dza')}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {t('charging.cost')}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Charging Animation */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardContent className="p-6 text-center">
              <div className="relative w-32 h-32 mx-auto mb-4">
                <div className="absolute inset-0 bg-gradient-to-br from-green-400 to-blue-500 rounded-full animate-spin-slow opacity-20"></div>
                <div className="absolute inset-4 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                  <Zap className="h-12 w-12 text-white animate-pulse" />
                </div>
              </div>
              <p className="text-green-600 dark:text-green-400 font-medium">
                Recharge en cours...
              </p>
            </CardContent>
          </Card>

          {/* Stop Charging Button */}
          <Button 
            variant="destructive"
            size="lg"
            className="w-full h-12 rounded-xl font-semibold"
            onClick={() => setIsSubscribed(false)}
          >
            {t('charging.stopCharging')}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChargingScreen;
