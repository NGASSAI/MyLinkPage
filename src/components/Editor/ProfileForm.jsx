import React, { useContext, useRef } from 'react';
import { PageContext } from '../../context/PageContext';

// SVG placeholder en data URL (pas de requête réseau)
const SVG_PLACEHOLDER = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 150 150'%3E%3Crect width='150' height='150' fill='%23e2e8f0'/%3E%3Ccircle cx='75' cy='50' r='25' fill='%239ca3af'/%3E%3Cpath d='M30 120 Q75 80 120 120' fill='%239ca3af'/%3E%3C/svg%3E`;

/**
 * Composant d'édition du profil
 * Permet de modifier le nom, la bio et l'avatar (URL ou upload)
 */
export default function ProfileForm() {
  const { pageData, updateProfile } = useContext(PageContext);
  const fileInputRef = useRef(null);

  /**
   * Gère l'upload d'image et la conversion en base64
   * @param {Event} e - Événement du changement de fichier
   */
  const handleAvatarUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier que c'est une image
    if (!file.type.startsWith('image/')) {
      alert('Veuillez sélectionner une image valide');
      return;
    }

    // Limiter la taille à 5MB
    if (file.size > 5 * 1024 * 1024) {
      alert('L\'image est trop grande (max 5MB)');
      return;
    }

    // Convertir l'image en base64
    const reader = new FileReader();
    reader.onload = (event) => {
      updateProfile({ avatar: event.target?.result });
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-slate-800">👤 Mon Profil</h2>
      
      {/* ===== SECTION AVATAR ===== */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
          Photo de profil
        </label>

        {/* Aperçu actuel de l'avatar */}
        <div className="flex items-center gap-4">
          <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-slate-200 shadow-md bg-slate-100">
            <img
              src={pageData.avatar || SVG_PLACEHOLDER}
              alt="Avatar"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Éviter la boucle infinie en utilisant un placeholder SVG
                if (e.currentTarget.src !== SVG_PLACEHOLDER) {
                  e.currentTarget.src = SVG_PLACEHOLDER;
                }
              }}
            />
          </div>

          {/* Boutons d'action */}
          <div className="flex flex-col gap-2">
            {/* Bouton upload */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-3 py-2 bg-violet-600 text-white text-xs font-semibold rounded-lg hover:bg-violet-700 transition-colors"
            >
              📤 Charger une photo
            </button>

            {/* Input fichier caché */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarUpload}
              className="hidden"
              aria-label="Charger une image"
            />

            {/* Info */}
            <span className="text-xs text-slate-500">
              Max 5MB, JPG/PNG
            </span>
          </div>
        </div>

        {/* Champ URL alternative */}
        <div className="mt-2">
          <label className="text-xs font-medium text-slate-600 block mb-1.5">
            Ou collez une URL d'image
          </label>
          <input
            type="text"
            value={pageData.avatar}
            onChange={(e) => updateProfile({ avatar: e.target.value })}
            placeholder="https://exemple.com/image.jpg"
            className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
          />
        </div>
      </div>

      <hr className="border-slate-100" />

      {/* ===== CHAMP NOM ===== */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
          Nom
        </label>
        <input
          type="text"
          value={pageData.username}
          onChange={(e) => updateProfile({ username: e.target.value })}
          placeholder="Ex: Nathan Ngassai"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
        />
      </div>

      {/* ===== CHAMP BIOGRAPHIE ===== */}
      <div className="flex flex-col gap-1.5">
        <label className="text-xs font-medium text-slate-600 uppercase tracking-wider">
          Bio
        </label>
        <textarea
          value={pageData.bio}
          onChange={(e) => updateProfile({ bio: e.target.value })}
          placeholder="Ex: Développeur Front-end passionné par React..."
          rows="3"
          maxLength="150"
          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all resize-none"
        />
        <span className="text-xs text-slate-400">
          {pageData.bio.length}/150 caractères
        </span>
      </div>
    </div>
  );
}
