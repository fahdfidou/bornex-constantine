
import React from 'react';
import { LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  color?: string;
}

const StatsCard: React.FC<StatsCardProps> = ({ 
  title, 
  value, 
  icon: Icon, 
  trend, 
  changeType = 'positive',
  color = 'blue'
}) => {
  const getChangeColor = () => {
    switch (changeType) {
      case 'positive': return 'text-green-600 dark:text-green-400';
      case 'negative': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'orange': return 'text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-900/20';
      case 'green': return 'text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20';
      case 'blue': return 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20';
      case 'purple': return 'text-purple-600 dark:text-purple-400 bg-purple-50 dark:bg-purple-900/20';
      case 'red': return 'text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-900/20';
      default: return 'text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900/20';
    }
  };

  return (
    <Card className="hover:shadow-lg transition-all duration-300 border-gray-200 dark:border-gray-700 shadow-sm bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm hover:scale-105">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors duration-200">
          {title}
        </CardTitle>
        <div className={`p-2.5 rounded-xl transition-colors duration-200 ${getIconColor()}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold text-gray-900 dark:text-white mb-1 transition-colors duration-200">{value}</div>
        {trend && (
          <p className={`text-xs font-medium transition-colors duration-200 ${getChangeColor()}`}>
            {trend} ce mois
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
