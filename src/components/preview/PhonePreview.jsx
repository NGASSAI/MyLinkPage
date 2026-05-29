import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { THEMES, SOCIAL_PLATFORMS, validateSocialUrl } from '../../config/themeConfig';

// SVG placeholder en data URL (pas de requête réseau)
const SVG_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23e2e8f0'/%3E%3Ccircle cx='75' cy='50' r='25' fill='%239ca3af'/%3E%3Cpath d='M30 120 Q75 80 120 120' fill='%239ca3af'/%3E%3C/svg%3E`;

/**
 * Composant de prévisualisation du téléphone
 * Affiche une maquette réaliste du rendu final de la micro-page
 */
export default function PhonePreview() {
  const { pageData, getSocialLink } = useContext(PageContext);

  // Récupère la configuration du thème sélectionné
  const currentTheme = THEMES[pageData.theme] || THEMES.minimalist;
  
  // Récupère la classe de police sélectionnée
  const fontClass = {
    sans: 'font-sans',
    serif: 'font-serif',
    mono: 'font-mono'
  }[pageData.typography] || 'font-sans';

  // Récupère les liens sociaux qui ont une URL valide
  const activeSocialLinks = (pageData.socialLinks || [])
    .filter(s => s.url?.trim())
    .filter(s => validateSocialUrl(s.id, s.url));

  return (
    <div className="flex justify-center items-center p-6 bg-gradient-to-br from-slate-100 to-slate-200 min-h-[80vh] w-full rounded-3xl">
      
      {/* ===== CONTENEUR MOCKUP TÉLÉPHONE ===== */}
      <div className="relative w-[360px] h-[740px] bg-black rounded-[50px] p-3 shadow-2xl border-4 border-slate-800 ring-1 ring-slate-900/10 flex-shrink-0 overflow-hidden">
        
        {/* Encoche (Notch) du smartphone */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-7 w-40 bg-black rounded-b-3xl z-20"></div>

        {/* ===== ÉCRAN INTERNE DU TÉLÉPHONE ===== */}
        <div 
          className={`w-full h-full rounded-[40px] overflow-y-auto no-scrollbar relative flex flex-col items-center pt-14 px-6 pb-6 transition-all duration-500 ${currentTheme.bg} ${fontClass}`}
        >
          
          {/* ===== SECTION PROFIL ===== */}
          <div className="flex flex-col items-center text-center mb-6 w-full z-10 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            
            {/* Avatar avec effet animé */}
            <div className="relative mb-4">
              {/* Cercle animé autour de l'avatar */}
              <div className={`absolute inset-0 rounded-full animate-spin-slow opacity-50 ${currentTheme.accent}`}
                   style={{ animationDuration: '20s' }}>
              </div>

              {/* Image d'avatar */}
              <img 
                src={pageData.avatar || 'https://via.placeholder.com/150'} 
                alt={pageData.username}
                className="relative w-24 h-24 rounded-full object-cover border-4 border-white shadow-xl"
                onError={(e) => {
                  e.currentTarget.src = 'https://via.placeholder.com/150';
                }}
              />
            </div>

            {/* Nom d'utilisateur */}
            <h2 className={`text-2xl font-bold tracking-tight mb-1 ${currentTheme.text}`}>
              {pageData.username || 'Votre Nom'}
            </h2>

            {/* Biographie */}
            <p className={`text-sm max-w-[250px] leading-relaxed ${currentTheme.bio}`}>
              {pageData.bio || 'Votre biographie apparaîtra ici...'}
            </p>
          </div>

          {/* ===== SECTION LIENS ===== */}
          <div className="w-full flex flex-col gap-3 mb-6 z-10">
            {pageData.links.map((link, index) => (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full py-3.5 px-4 text-center font-medium rounded-2xl text-sm transition-all duration-300 transform hover:shadow-xl block animate-fade-in-up ${currentTheme.button} ${currentTheme.buttonHover}`}
                style={{ 
                  animationDelay: `${0.2 + index * 0.1}s`,
                  animation: 'fadeInUp 0.6s ease-out forwards',
                  opacity: 0
                }}
              >
                {link.title || 'Lien sans titre'}
              </a>
            ))}
          </div>

          {/* ===== SECTION RÉSEAUX SOCIAUX ===== */}
          {activeSocialLinks.length > 0 && (
            <div className="w-full flex justify-center gap-4 mt-auto mb-4 z-10 flex-wrap animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {activeSocialLinks.map((social) => {
                const platform = SOCIAL_PLATFORMS.find(p => p.id === social.id);
                if (!platform) return null;
                
                // Rendu dynamique de l'icône Lucide-React
                const IconComponent = platform.icon;
                
                // Vérifier que l'icône existe avant de l'utiliser
                if (!IconComponent) return null;
                
                return (
                  <a
                    key={social.id}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`transition-transform duration-200 transform hover:scale-125 ${platform.color}`}
                    title={platform.name}
                  >
                    <IconComponent size={28} />
                  </a>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

{/* Styles CSS pour les animations */}
<style>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes spin-slow {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animate-fade-in {
    animation: fade-in 0.6s ease-out;
  }

  .animate-fade-in-up {
    animation: fadeInUp 0.6s ease-out forwards;
  }

  .animate-spin-slow {
    animation: spin-slow 20s linear infinite;
  }

  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>
