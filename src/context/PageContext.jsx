import React, { createContext, useState, useEffect } from 'react';
import { getPublicProfile } from '../services/api';

export const PageContext = createContext();

export const PageProvider = ({ children }) => {
  // État initial par défaut
  const defaultState = {
    // Infos de profil
    username: "Nathan Ngassai",
    bio: "Développeur web passionné ",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    
    // Personnalisation visuelle
    theme: "minimalist",
    typography: "sans",
    
    // Liens de navigation
    links: [
      { id: '1', title: 'Portfolio', url: 'https://mon-portfolio.com' },
      { id: '2', title: 'GitHub', url: 'https://github.com' }
    ],
    
    // Réseaux sociaux avec toutes les plateformes
    socialLinks: [
      { id: 'whatsapp', url: '' },
      { id: 'github', url: '' },
      { id: 'email', url: '' },
      { id: 'portfolio', url: '' },
      { id: 'facebook', url: '' },
      { id: 'linkedin', url: '' },
      { id: 'youtube', url: '' },
      { id: 'tiktok', url: '' },
    ]
  };

  // État initial de la micro-page avec nouvelles fonctionnalités
  const [pageData, setPageData] = useState(() => {
    const saved = localStorage.getItem('micro_page_data');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        return { ...defaultState, ...parsed };
      } catch (e) {
        console.error('Erreur parsing localStorage:', e);
        return defaultState;
      }
    }
    return defaultState;
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPublicProfile = async () => {
      try {
        const data = await getPublicProfile();
        if (data?.profile) {
          // Mapper les données du backend aux champs de PageContext
          const backendProfile = {
            username: data.profile.username || data.profile.name,
            bio: data.profile.bio,
            avatar: data.profile.avatar,
            theme: data.profile.theme,
            typography: data.profile.typography,
            links: data.profile.links || [],
            socialLinks: data.profile.socialLinks || [],
          };
          setPageData(prev => ({ ...prev, ...backendProfile }));
        }
      } catch (err) {
        console.warn('Impossible de charger le profil public', err);
        setError(err?.details?.error || err.message || 'Erreur de chargement');
      } finally {
        setLoading(false);
      }
    };

    loadPublicProfile();
  }, []);

  useEffect(() => {
    localStorage.setItem('micro_page_data', JSON.stringify(pageData));
  }, [pageData]);

  // ========== GESTION DU PROFIL ==========
  
  /**
   * Met à jour les données de profil (username, bio, avatar, thème, typographie)
   * @param {Object} fields - Les champs à mettre à jour
   */
  const updateProfile = (fields) => {
    setPageData(prev => ({ ...prev, ...fields }));
  };

  // ========== GESTION DES LIENS ==========

  /**
   * Ajoute un nouveau lien vide à la liste
   */
  const addLink = () => {
    const newLink = { 
      id: Date.now().toString(), 
      title: 'Nouveau lien', 
      url: 'https://' 
    };
    setPageData(prev => ({ ...prev, links: [...prev.links, newLink] }));
  };

  /**
   * Met à jour un lien existant
   * @param {string} id - ID du lien
   * @param {Object} updatedFields - Champs à mettre à jour
   */
  const updateLink = (id, updatedFields) => {
    setPageData(prev => ({
      ...prev,
      links: prev.links.map(link => 
        link.id === id ? { ...link, ...updatedFields } : link
      )
    }));
  };

  /**
   * Supprime un lien de la liste
   * @param {string} id - ID du lien à supprimer
   */
  const deleteLink = (id) => {
    setPageData(prev => ({
      ...prev,
      links: prev.links.filter(link => link.id !== id)
    }));
  };

  // ========== GESTION DES RÉSEAUX SOCIAUX ==========

  /**
   * Met à jour l'URL d'un réseau social
   * @param {string} platformId - ID de la plateforme (github, linkedin, etc.)
   * @param {string} url - URL du profil
   */
  const updateSocialLink = (platformId, url) => {
    setPageData(prev => {
      const existingIndex = prev.socialLinks.findIndex(s => s.id === platformId);
      
      if (url.trim() === '') {
        // Supprime le lien social s'il est vide
        return {
          ...prev,
          socialLinks: prev.socialLinks.filter(s => s.id !== platformId)
        };
      } else if (existingIndex >= 0) {
        // Met à jour le lien existant
        const newSocialLinks = [...prev.socialLinks];
        newSocialLinks[existingIndex].url = url;
        return { ...prev, socialLinks: newSocialLinks };
      } else {
        // Ajoute un nouveau lien social
        return {
          ...prev,
          socialLinks: [...prev.socialLinks, { id: platformId, url }]
        };
      }
    });
  };

  /**
   * Récupère l'URL d'une plateforme sociale
   * @param {string} platformId - ID de la plateforme
   * @returns {string} - URL du profil ou chaîne vide
   */
  const getSocialLink = (platformId) => {
    // Vérification de sécurité - s'assurer que socialLinks existe
    if (!pageData.socialLinks || !Array.isArray(pageData.socialLinks)) {
      return '';
    }
    const social = pageData.socialLinks.find(s => s.id === platformId);
    return social ? social.url : '';
  };

  return (
    <PageContext.Provider value={{ 
      pageData, 
      updateProfile, 
      addLink, 
      updateLink, 
      deleteLink,
      updateSocialLink,
      getSocialLink
    }}>
      {children}
    </PageContext.Provider>
  );
};