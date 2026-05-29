import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { TYPOGRAPHY_OPTIONS } from '../../config/themeConfig';

/**
 * Composant de sélection de polices
 * Permet à l'utilisateur de choisir entre différentes familles de polices
 */
export default function FontSelector() {
  const { pageData, updateProfile } = useContext(PageContext);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-800">✍️ Police d'écriture</h2>
      
      {/* Grille de polices */}
      <div className="grid grid-cols-1 gap-2">
        {TYPOGRAPHY_OPTIONS.map((typography) => (
          <button
            key={typography.id}
            onClick={() => updateProfile({ typography: typography.id })}
            className={`flex flex-col gap-1 p-3 rounded-lg border transition-all ${
              pageData.typography === typography.id
                ? 'border-violet-600 bg-violet-50/50 ring-2 ring-violet-600'
                : 'border-slate-200 hover:bg-slate-50'
            }`}
          >
            {/* Prévisualisation du texte avec la police */}
            <span className={`text-sm font-semibold ${typography.fontClass}`}>
              {typography.name}
            </span>
            
            {/* Description */}
            <span className="text-xs text-slate-500">
              {typography.description}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
