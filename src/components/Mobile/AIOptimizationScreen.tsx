import React, { useState } from 'react';
import { Brain, Zap, TrendingUp, Clock, Battery, Thermometer, ArrowLeft, Settings } from 'lucide-react';
import { useLanguage } from '../../contexts/LanguageContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';

interface AIOptimizationScreenProps {
  setActiveTab: (tab: string) => void;
}

const AIOptimizationScreen: React.FC<AIOptimizationScreenProps> = ({ setActiveTab }) => {
  const { t } = useLanguage();
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [optimizationProgress, setOptimizationProgress] = useState(0);

  const handleOptimize = () => {
    setIsOptimizing(true);
    setOptimizationProgress(0);
    
    const interval = setInterval(() => {
      setOptimizationProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsOptimizing(false);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const optimizationSuggestions = [
    {
      icon: Clock,
      title: t('ai.suggestion.schedule'),
      description: t('ai.suggestion.scheduleDesc'),
      impact: 'high',
      savings: '25%'
    },
    {
      icon: Battery,
      title: t('ai.suggestion.battery'),
      description: t('ai.suggestion.batteryDesc'),
      impact: 'medium',
      savings: '15%'
    },
    {
      icon: Thermometer,
      title: t('ai.suggestion.temperature'),
      description: t('ai.suggestion.temperatureDesc'),
      impact: 'medium',
      savings: '12%'
    }
  ];

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white/70 dark:bg-gray-900/70 backdrop-blur-xl p-6 border-b border-white/20 dark:border-gray-700/20">
        <div className="max-w-md mx-auto">
          <div className="flex items-center gap-4 mb-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setActiveTab('mystation')}
              className="p-2"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {t('ai.title')}
              </h1>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {t('ai.subtitle')}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 p-6 overflow-y-auto pb-20">
        <div className="max-w-md mx-auto space-y-6">
          
          {/* AI Status */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <Brain className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                {t('ai.status')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-300">
                  {t('ai.efficiency')}
                </span>
                <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  87% {t('ai.optimal')}
                </Badge>
              </div>
              
              {isOptimizing && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">{t('ai.optimizing')}</span>
                    <span className="text-purple-600 dark:text-purple-400">{optimizationProgress}%</span>
                  </div>
                  <Progress value={optimizationProgress} className="h-2" />
                </div>
              )}
              
              <Button 
                onClick={handleOptimize}
                disabled={isOptimizing}
                className="w-full bg-gradient-to-r from-purple-500 to-blue-600 hover:from-purple-600 hover:to-blue-700 text-white"
              >
                <Brain className="h-4 w-4 mr-2" />
                {isOptimizing ? t('ai.optimizing') : t('ai.startOptimization')}
              </Button>
            </CardContent>
          </Card>

          {/* Suggestions */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t('ai.suggestions')}
            </h2>
            
            {optimizationSuggestions.map((suggestion, index) => {
              const Icon = suggestion.icon;
              return (
                <Card 
                  key={index}
                  className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start gap-3">
                      <div className={`p-2 rounded-lg ${
                        suggestion.impact === 'high' ? 'bg-green-100 dark:bg-green-900/30' :
                        'bg-yellow-100 dark:bg-yellow-900/30'
                      }`}>
                        <Icon className={`h-5 w-5 ${
                          suggestion.impact === 'high' ? 'text-green-600 dark:text-green-400' :
                          'text-yellow-600 dark:text-yellow-400'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="font-medium text-gray-900 dark:text-white">
                            {suggestion.title}
                          </h3>
                          <Badge variant="outline" className="text-xs">
                            -{suggestion.savings}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          {suggestion.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Energy Stats */}
          <Card className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl border-white/20 dark:border-gray-700/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-gray-900 dark:text-white">
                <TrendingUp className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                {t('ai.energyStats')}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">342</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('ai.kwhSaved')}</p>
                </div>
                <div className="text-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">1,250</p>
                  <p className="text-xs text-gray-600 dark:text-gray-300">{t('ai.dzaSaved')} DZA</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIOptimizationScreen;