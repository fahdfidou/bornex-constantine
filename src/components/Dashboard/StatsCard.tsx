
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
      case 'positive': return 'text-green-600';
      case 'negative': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getIconColor = () => {
    switch (color) {
      case 'orange': return 'text-orange-600 bg-orange-50';
      case 'green': return 'text-green-600 bg-green-50';
      case 'blue': return 'text-blue-600 bg-blue-50';
      case 'purple': return 'text-purple-600 bg-purple-50';
      case 'red': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <Card className="hover:shadow-md transition-all duration-200 border-gray-200 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
        <CardTitle className="text-sm font-medium text-gray-600">
          {title}
        </CardTitle>
        <div className={`p-2.5 rounded-xl ${getIconColor()}`}>
          <Icon className="h-4 w-4" />
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="text-2xl font-bold text-gray-900 mb-1">{value}</div>
        {trend && (
          <p className={`text-xs font-medium ${getChangeColor()}`}>
            {trend} ce mois
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatsCard;
