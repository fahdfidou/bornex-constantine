
import React from 'react';

interface ElectricStationBackgroundProps {
  variant?: 'charging' | 'modern' | 'green' | 'urban';
  className?: string;
}

const ElectricStationBackground: React.FC<ElectricStationBackgroundProps> = ({ 
  variant = 'modern', 
  className = '' 
}) => {
  const getBackgroundSvg = (type: string) => {
    switch (type) {
      case 'charging':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-10">
            <defs>
              <linearGradient id="chargingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10B981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            
            {/* Station principale */}
            <rect x="150" y="120" width="100" height="160" rx="10" fill="url(#chargingGrad)" />
            <rect x="160" y="130" width="80" height="40" rx="5" fill="#ffffff" fillOpacity="0.9" />
            
            {/* Écran */}
            <rect x="170" y="140" width="60" height="20" rx="3" fill="#1f2937" />
            <circle cx="185" cy="150" r="2" fill="#10B981" />
            <circle cx="195" cy="150" r="2" fill="#10B981" />
            <circle cx="205" cy="150" r="2" fill="#10B981" />
            <circle cx="215" cy="150" r="2" fill="#22c55e" />
            
            {/* Câble */}
            <path d="M250 180 Q280 160 320 180 Q340 190 360 200" stroke="#1f2937" strokeWidth="8" fill="none" strokeLinecap="round" />
            <circle cx="360" cy="200" r="12" fill="#1f2937" />
            <circle cx="360" cy="200" r="8" fill="#10B981" />
            
            {/* Voiture en charge */}
            <rect x="300" y="200" width="80" height="40" rx="15" fill="#374151" />
            <circle cx="315" cy="235" r="12" fill="#1f2937" />
            <circle cx="365" cy="235" r="12" fill="#1f2937" />
            <rect x="305" y="205" width="70" height="25" rx="8" fill="#6b7280" />
            
            {/* Indicateurs de charge */}
            <rect x="340" y="190" width="4" height="8" fill="#10B981" opacity="0.8" />
            <rect x="346" y="185" width="4" height="13" fill="#10B981" opacity="0.6" />
            <rect x="352" y="180" width="4" height="18" fill="#22c55e" opacity="0.4" />
          </svg>
        );
        
      case 'modern':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-8">
            <defs>
              <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#22c55e" />
                <stop offset="100%" stopColor="#16a34a" />
              </linearGradient>
            </defs>
            
            {/* Station futuriste */}
            <path d="M100 200 L120 100 L180 100 L200 200 Z" fill="url(#modernGrad)" />
            <rect x="110" y="110" width="80" height="80" rx="15" fill="#ffffff" fillOpacity="0.9" />
            <circle cx="150" cy="150" r="25" fill="#10B981" />
            <circle cx="150" cy="150" r="20" fill="#ffffff" />
            <polygon points="145,140 145,160 165,150" fill="#10B981" />
            
            {/* Panneaux solaires */}
            <rect x="50" y="80" width="30" height="20" rx="2" fill="#1e40af" opacity="0.7" />
            <rect x="55" y="85" width="20" height="10" rx="1" fill="#3b82f6" opacity="0.8" />
            
            {/* Végétation */}
            <ellipse cx="80" cy="220" rx="20" ry="8" fill="#22c55e" opacity="0.6" />
            <ellipse cx="250" cy="210" rx="25" ry="10" fill="#16a34a" opacity="0.5" />
            
            {/* Éclairage LED */}
            <circle cx="120" cy="90" r="3" fill="#fbbf24" opacity="0.8" />
            <circle cx="180" cy="90" r="3" fill="#fbbf24" opacity="0.8" />
          </svg>
        );
        
      case 'green':
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-8">
            <defs>
              <radialGradient id="greenGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#dcfce7" />
                <stop offset="100%" stopColor="#bbf7d0" />
              </radialGradient>
            </defs>
            
            {/* Fond naturel */}
            <rect width="400" height="300" fill="url(#greenGrad)" />
            
            {/* Arbres */}
            <circle cx="50" cy="180" r="30" fill="#22c55e" opacity="0.6" />
            <rect x="45" y="180" width="10" height="40" fill="#92400e" />
            <circle cx="350" cy="160" r="25" fill="#16a34a" opacity="0.5" />
            <rect x="345" y="160" width="10" height="35" fill="#92400e" />
            
            {/* Station écologique */}
            <rect x="180" y="140" width="40" height="100" rx="8" fill="#22c55e" />
            <rect x="185" y="150" width="30" height="20" rx="3" fill="#ffffff" />
            <circle cx="200" cy="160" r="8" fill="#10B981" />
            
            {/* Feuilles flottantes */}
            <path d="M120 120 Q125 115 130 120 Q125 125 120 120" fill="#22c55e" opacity="0.4" />
            <path d="M280 100 Q285 95 290 100 Q285 105 280 100" fill="#16a34a" opacity="0.3" />
            <path d="M150 90 Q155 85 160 90 Q155 95 150 90" fill="#22c55e" opacity="0.5" />
          </svg>
        );
        
      default: // urban
        return (
          <svg viewBox="0 0 400 300" className="w-full h-full opacity-8">
            <defs>
              <linearGradient id="urbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f3f4f6" />
                <stop offset="100%" stopColor="#e5e7eb" />
              </linearGradient>
            </defs>
            
            {/* Fond urbain */}
            <rect width="400" height="300" fill="url(#urbanGrad)" />
            
            {/* Bâtiments */}
            <rect x="50" y="100" width="40" height="120" fill="#6b7280" opacity="0.6" />
            <rect x="300" y="80" width="50" height="140" fill="#374151" opacity="0.5" />
            <rect x="370" y="120" width="30" height="100" fill="#4b5563" opacity="0.4" />
            
            {/* Fenêtres */}
            <rect x="55" y="110" width="8" height="8" fill="#fbbf24" opacity="0.7" />
            <rect x="75" y="110" width="8" height="8" fill="#fbbf24" opacity="0.5" />
            <rect x="55" y="130" width="8" height="8" fill="#fbbf24" opacity="0.6" />
            
            {/* Station urbaine */}
            <rect x="160" y="150" width="80" height="120" rx="5" fill="#10B981" opacity="0.9" />
            <rect x="170" y="160" width="60" height="30" rx="3" fill="#ffffff" />
            <circle cx="200" cy="175" r="10" fill="#22c55e" />
            
            {/* Route */}
            <rect x="0" y="250" width="400" height="30" fill="#374151" opacity="0.3" />
            <rect x="0" y="260" width="400" height="2" fill="#ffffff" opacity="0.8" />
          </svg>
        );
    }
  };

  return (
    <div className={`absolute inset-0 pointer-events-none ${className}`}>
      {getBackgroundSvg(variant)}
    </div>
  );
};

export default ElectricStationBackground;
