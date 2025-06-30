
import React from 'react';

interface ChargingStationImageProps {
  variant?: 'modern' | 'tesla' | 'fastcharge' | 'urban';
  className?: string;
  showBackground?: boolean;
}

const ChargingStationImage: React.FC<ChargingStationImageProps> = ({ 
  variant = 'modern', 
  className = '',
  showBackground = true 
}) => {
  const getStationSvg = (type: string) => {
    switch (type) {
      case 'tesla':
        return (
          <svg viewBox="0 0 200 300" className={`w-full h-full ${className}`}>
            <defs>
              <linearGradient id="teslaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#DC2626" />
                <stop offset="100%" stopColor="#991B1B" />
              </linearGradient>
              <linearGradient id="screenGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1F2937" />
                <stop offset="100%" stopColor="#111827" />
              </linearGradient>
            </defs>
            
            {showBackground && <rect width="200" height="300" fill="#F3F4F6" opacity="0.5" />}
            
            {/* Base de la borne */}
            <rect x="60" y="200" width="80" height="80" rx="8" fill="#374151" />
            
            {/* Corps principal Tesla */}
            <rect x="70" y="80" width="60" height="130" rx="30" fill="url(#teslaGrad)" />
            
            {/* Écran Tesla */}
            <rect x="80" y="100" width="40" height="25" rx="4" fill="url(#screenGrad)" />
            <rect x="85" y="105" width="30" height="15" rx="2" fill="#10B981" opacity="0.8" />
            <text x="100" y="115" textAnchor="middle" fill="white" fontSize="8" fontFamily="Arial">Tesla</text>
            
            {/* Port de charge */}
            <rect x="85" y="140" width="30" height="20" rx="5" fill="#1F2937" />
            <rect x="90" y="145" width="20" height="10" rx="2" fill="#EF4444" />
            
            {/* Câble Tesla */}
            <path d="M100 170 Q120 180 140 200 Q160 220 180 240" 
                  stroke="#1F2937" strokeWidth="6" fill="none" strokeLinecap="round" />
            <circle cx="180" cy="240" r="8" fill="#DC2626" />
            <circle cx="180" cy="240" r="5" fill="#FEF2F2" />
            
            {/* Logo Tesla stylisé */}
            <path d="M90 90 L110 90 L100 85 Z" fill="white" />
            <rect x="98" y="85" width="4" height="10" fill="white" />
          </svg>
        );
        
      case 'fastcharge':
        return (
          <svg viewBox="0 0 200 300" className={`w-full h-full ${className}`}>
            <defs>
              <linearGradient id="fastGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#7C3AED" />
                <stop offset="100%" stopColor="#5B21B6" />
              </linearGradient>
            </defs>
            
            {showBackground && <rect width="200" height="300" fill="#F8FAFC" opacity="0.5" />}
            
            {/* Station de charge rapide */}
            <rect x="50" y="50" width="100" height="200" rx="15" fill="url(#fastGrad)" />
            <rect x="60" y="60" width="80" height="40" rx="8" fill="#FFFFFF" />
            
            {/* Écran principal */}
            <rect x="70" y="70" width="60" height="20" rx="4" fill="#1F2937" />
            <rect x="75" y="75" width="50" height="10" rx="2" fill="#10B981" />
            <text x="100" y="82" textAnchor="middle" fill="white" fontSize="6">FAST CHARGE</text>
            
            {/* Ports multiples */}
            <rect x="70" y="120" width="25" height="30" rx="5" fill="#374151" />
            <rect x="105" y="120" width="25" height="30" rx="5" fill="#374151" />
            
            {/* Connecteurs */}
            <circle cx="82" cy="135" r="8" fill="#EF4444" />
            <circle cx="117" cy="135" r="8" fill="#10B981" />
            
            {/* Câbles doubles */}
            <path d="M82 150 Q90 170 100 190" stroke="#374151" strokeWidth="5" fill="none" />
            <path d="M117 150 Q125 170 135 190" stroke="#374151" strokeWidth="5" fill="none" />
            
            {/* Indicateurs de puissance */}
            <rect x="75" y="200" width="15" height="20" fill="#FEF2F2" rx="2" />
            <rect x="95" y="195" width="15" height="25" fill="#FECACA" rx="2" />
            <rect x="115" y="190" width="15" height="30" fill="#EF4444" rx="2" />
            
            {/* Texte puissance */}
            <text x="100" y="240" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">150kW</text>
          </svg>
        );
        
      case 'urban':
        return (
          <svg viewBox="0 0 200 300" className={`w-full h-full ${className}`}>
            <defs>
              <linearGradient id="urbanGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#059669" />
                <stop offset="100%" stopColor="#047857" />
              </linearGradient>
            </defs>
            
            {showBackground && (
              <>
                <rect width="200" height="300" fill="#F0FDF4" opacity="0.3" />
                {/* Éléments urbains en arrière-plan */}
                <rect x="10" y="250" width="180" height="30" fill="#6B7280" opacity="0.2" />
                <rect x="0" y="260" width="200" height="2" fill="#FFFFFF" opacity="0.5" />
              </>
            )}
            
            {/* Borne urbaine compacte */}
            <rect x="75" y="100" width="50" height="150" rx="10" fill="url(#urbanGrad)" />
            
            {/* Interface utilisateur */}
            <rect x="85" y="120" width="30" height="20" rx="4" fill="#FFFFFF" />
            <rect x="90" y="125" width="20" height="10" rx="2" fill="#1F2937" />
            <circle cx="100" cy="130" r="2" fill="#10B981" />
            
            {/* Port de charge */}
            <rect x="90" y="160" width="20" height="15" rx="3" fill="#374151" />
            <rect x="95" y="165" width="10" height="5" rx="1" fill="#22C55E" />
            
            {/* Câble urbain */}
            <path d="M100 180 Q110 190 120 210 Q130 230 140 250" 
                  stroke="#1F2937" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="140" cy="250" r="6" fill="#059669" />
            
            {/* Éléments de design urbain */}
            <rect x="80" y="200" width="5" height="40" fill="#34D399" opacity="0.6" />
            <rect x="115" y="200" width="5" height="40" fill="#34D399" opacity="0.6" />
            
            {/* Indicateur eco-friendly */}
            <circle cx="100" cy="90" r="8" fill="#22C55E" />
            <path d="M95 90 L98 93 L105 86" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" />
          </svg>
        );
        
      default: // modern
        return (
          <svg viewBox="0 0 200 300" className={`w-full h-full ${className}`}>
            <defs>
              <linearGradient id="modernGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3B82F6" />
                <stop offset="100%" stopColor="#1D4ED8" />
              </linearGradient>
              <linearGradient id="glassEffect" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            
            {showBackground && <rect width="200" height="300" fill="#EFF6FF" opacity="0.4" />}
            
            {/* Corps principal moderne */}
            <rect x="65" y="60" width="70" height="180" rx="12" fill="url(#modernGrad)" />
            <rect x="65" y="60" width="70" height="180" rx="12" fill="url(#glassEffect)" />
            
            {/* Écran tactile moderne */}
            <rect x="75" y="80" width="50" height="30" rx="6" fill="#1F2937" />
            <rect x="80" y="85" width="40" height="20" rx="4" fill="#10B981" opacity="0.9" />
            <circle cx="100" cy="95" r="3" fill="#FFFFFF" />
            <text x="100" y="102" textAnchor="middle" fill="white" fontSize="7">READY</text>
            
            {/* Indicateurs LED */}
            <circle cx="85" cy="130" r="3" fill="#22C55E" />
            <circle cx="100" cy="130" r="3" fill="#3B82F6" />
            <circle cx="115" cy="130" r="3" fill="#F59E0B" />
            
            {/* Port de charge moderne */}
            <rect x="85" y="150" width="30" height="25" rx="6" fill="#374151" />
            <rect x="90" y="155" width="20" height="15" rx="3" fill="#059669" />
            <circle cx="100" cy="162" r="4" fill="#FFFFFF" />
            
            {/* Câble élégant */}
            <path d="M100 180 Q115 195 130 220 Q145 245 160 270" 
                  stroke="#374151" strokeWidth="5" fill="none" strokeLinecap="round" />
            <circle cx="160" cy="270" r="7" fill="#3B82F6" />
            <circle cx="160" cy="270" r="4" fill="#FFFFFF" />
            
            {/* Design moderne avec lumières */}
            <rect x="70" y="200" width="3" height="30" fill="#60A5FA" opacity="0.8" />
            <rect x="127" y="200" width="3" height="30" fill="#60A5FA" opacity="0.8" />
            
            {/* Informations */}
            <text x="100" y="255" textAnchor="middle" fill="#1D4ED8" fontSize="8" fontWeight="bold">22kW AC</text>
          </svg>
        );
    }
  };

  return (
    <div className="flex items-center justify-center">
      {getStationSvg(variant)}
    </div>
  );
};

export default ChargingStationImage;
