import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { THEMES } from '../../config/themeConfig';

/**
 * Composant de sélection de thèmes
 * Affiche une grille de tous les thèmes disponibles
 */
export default function ThemeSelector() {
  const { pageData, updateProfile } = useContext(PageContext);
  const themeList = Object.values(THEMES);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-800">🎨 Thème de la page</h2>
      
      {/* Grille de thèmes avec scroll horizontal sur mobile */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 max-h-80 overflow-y-auto pr-2">
        {themeList.map((theme) => (
          <button
            key={theme.id}
            onClick={() => updateProfile({ theme: theme.id })}
            className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-all transform hover:scale-105 ${
              pageData.theme === theme.id
                ? 'border-violet-600 bg-violet-50/50 ring-2 ring-violet-600 shadow-lg'
                : 'border-slate-200 hover:bg-slate-50 shadow-md hover:shadow-lg'
            }`}
            title={theme.name}
          >
            {/* Aperçu visuel du thème */}
            <div className={`w-14 h-14 rounded-lg border-2 ${theme.preview} shadow-inner`} />
            
            {/* Nom du thème */}
            <span className="text-xs font-semibold text-slate-700 text-center leading-tight">
              {theme.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
