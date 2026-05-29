import React from 'react';
import ProfileForm from './ProfileForm';
import ThemeSelector from './ThemeSelector';
import FontSelector from './FontSelector';
import LinksManager from './LinksManager';
import SocialLinksManager from './SocialLinksManager';

/**
 * Composant principal de l'éditeur
 * Intègre tous les formulaires et sélecteurs pour personnaliser la page
 */
export default function PageEditor() {
  return (
    <div className="w-full max-w-2xl bg-white p-6 md:p-8 rounded-3xl shadow-lg border border-slate-200 flex flex-col gap-8 max-h-[90vh] overflow-y-auto no-scrollbar">
      
      {/* En-tête */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900">✨ Éditeur de Page</h1>
        <p className="text-sm text-slate-500 mt-1">Personnalisez votre micro-page en temps réel</p>
      </div>

      {/* === PROFIL === */}
      <section>
        <ProfileForm />
      </section>
      <hr className="border-slate-200" />

      {/* === THÈME === */}
      <section>
        <ThemeSelector />
      </section>
      <hr className="border-slate-200" />

      {/* === POLICE === */}
      <section>
        <FontSelector />
      </section>
      <hr className="border-slate-200" />

      {/* === LIENS === */}
      <section>
        <LinksManager />
      </section>
      <hr className="border-slate-200" />

      {/* === RÉSEAUX SOCIAUX === */}
      <section>
        <SocialLinksManager />
      </section>
    </div>
  );
}

{/* Styles CSS globaux pour le scrollbar personnalisé */}
<style>{`
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
`}</style>
