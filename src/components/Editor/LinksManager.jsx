import React, { useContext } from 'react';
import { PageContext } from '../../context/PageContext';
import { Plus, Trash2, Link2 } from 'lucide-react'; // Icônes simples et modernes

export default function LinksManager() {
  const { pageData, addLink, updateLink, deleteLink } = useContext(PageContext);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-slate-800">Mes Liens</h2>
        
        {/* Bouton pour Ajouter un lien */}
        <button
          onClick={addLink}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-medium shadow-sm transition-all active:scale-95"
        >
          <Plus className="w-3.5 h-3.5" />
          Ajouter un lien
        </button>
      </div>

      {/* Liste des Liens dynamiques */}
      <div className="flex flex-col gap-4">
        {pageData.links.length === 0 ? (
          <div className="text-center py-6 border-2 border-dashed border-slate-200 rounded-2xl text-sm text-slate-400">
            Aucun lien pour le moment. Cliquez sur "Ajouter un lien".
          </div>
        ) : (
          pageData.links.map((link) => (
            <div 
              key={link.id} 
              className="p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col gap-3 relative group transition-all hover:border-slate-300"
            >
              {/* Bouton Supprimer en haut à droite */}
              <button
                onClick={() => deleteLink(link.id)}
                className="absolute top-3 right-3 text-slate-400 hover:text-red-500 p-1 rounded-lg hover:bg-red-50 transition-colors"
                title="Supprimer le lien"
              >
                <Trash2 className="w-4 h-4" />
              </button>

              {/* Input : Titre du bouton */}
              <div className="flex flex-col gap-1 w-[90%]">
                <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Titre du bouton</label>
                <input
                  type="text"
                  value={link.title}
                  onChange={(e) => updateLink(link.id, { title: e.target.value })}
                  placeholder="Ex: Mon Portfolio"
                  className="w-full bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 text-slate-700"
                />
              </div>

              {/* Input : URL du lien */}
              <div className="flex flex-col gap-1 w-[90%]">
                <label className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Lien (URL)</label>
                <div className="relative flex items-center">
                  <Link2 className="w-3.5 h-3.5 text-slate-400 absolute left-3" />
                  <input
                    type="url"
                    value={link.url}
                    onChange={(e) => updateLink(link.id, { url: e.target.value })}
                    placeholder="https://..."
                    className="w-full bg-white border border-slate-200 rounded-lg pl-9 pr-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-violet-500 text-slate-600 font-mono"
                  />
                </div>
              </div>

            </div>
          ))
        )}
      </div>
    </div>
  );
}