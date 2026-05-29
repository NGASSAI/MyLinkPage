import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { SOCIAL_PLATFORMS, getSocialUrlError } from '../../config/themeConfig';

/**
 * Composant de gestion des liens sociaux
 * Permet à l'utilisateur d'ajouter ou de modifier ses liens vers les réseaux sociaux
 * Affiche tous les réseaux sociaux avec des champs de saisie individuels
 */
export default function SocialLinksManager() {
  const { pageData, updateSocialLink, getSocialLink } = useContext(PageContext);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-800">📱 Mes Réseaux Sociaux</h2>
      
      {/* Message informatif */}
      <p className="text-xs text-slate-500 italic">
        Remplissez les champs ci-dessous pour afficher vos réseaux sociaux sur votre page
      </p>

      {/* Grille des réseaux sociaux */}
      <div className="grid grid-cols-1 gap-3 max-h-96 overflow-y-auto pr-2">
        {SOCIAL_PLATFORMS.map((platform) => {
          // Rendu dynamique de l'icône Lucide-React
          const IconComponent = platform.icon;
          
          // Vérifier que l'icône existe avant de l'utiliser
          if (!IconComponent) {
            return null;
          }
          
          return (
            <div
              key={platform.id}
              className="flex flex-col gap-1.5 p-3 bg-slate-50 rounded-lg border border-slate-200"
            >
              {/* Label avec icône Lucide-React */}
              <label className="text-xs font-semibold text-slate-700 flex items-center gap-2">
                <IconComponent size={18} className={platform.color.split(' ')[0]} />
                {platform.name}
              </label>

              {/* Input pour l'URL */}
              <input
                type="text"
                value={getSocialLink(platform.id)}
                onChange={(e) => updateSocialLink(platform.id, e.target.value)}
                placeholder={platform.placeholder || `https://${platform.id}.com/username`}
                aria-invalid={Boolean(getSocialUrlError(platform.id, getSocialLink(platform.id)))}
                className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
              />
              {getSocialUrlError(platform.id, getSocialLink(platform.id)) && (
                <p className="text-xs text-red-600 mt-1">
                  {getSocialUrlError(platform.id, getSocialLink(platform.id))}
                </p>
              )}
            </div>
          );
        })}
      </div>

      {/* Info sur les liens affichés */}
      <div className="text-xs text-slate-500 bg-blue-50 p-2 rounded-lg border border-blue-200">
        ℹ️ Seuls les profils ayant une URL valide s'afficheront sur votre page
      </div>
    </div>
  );
}
