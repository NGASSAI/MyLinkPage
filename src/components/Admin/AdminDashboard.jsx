import React, { useState, useEffect } from 'react';
import { BarChart3, Users, FileText, TrendingUp, Lock, LogOut, Activity, Zap, Shield, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import HelpButton from '../shared/HelpButton';

/**
 * Composant AdminDashboard
 * Tableau de bord administrateur avec statistiques simulées
 * Design moderne et élégant avec animations
 */
export default function AdminDashboard({ onLogout }) {
  // État pour les statistiques
  const [stats, setStats] = useState({
    totalVisitors: 0,
    totalPages: 0,
    socialClicks: {
      whatsapp: 0,
      github: 0,
      email: 0,
      portfolio: 0,
      facebook: 0,
      linkedin: 0,
      youtube: 0,
      tiktok: 0,
    }
  });

  // Charger les statistiques depuis le LocalStorage au montage
  useEffect(() => {
    const savedStats = localStorage.getItem('admin_stats');
    if (savedStats) {
      try {
        const parsed = JSON.parse(savedStats);
        setStats(parsed);
      } catch (e) {
        console.error('Erreur parsing stats:', e);
      }
    } else {
      // Initialiser avec des statistiques simulées si aucune donnée n'existe
      const initialStats = {
        totalVisitors: Math.floor(Math.random() * 500) + 100,
        totalPages: Math.floor(Math.random() * 50) + 10,
        socialClicks: {
          whatsapp: Math.floor(Math.random() * 50) + 10,
          github: Math.floor(Math.random() * 80) + 30,
          email: Math.floor(Math.random() * 40) + 15,
          portfolio: Math.floor(Math.random() * 60) + 20,
          facebook: Math.floor(Math.random() * 30) + 5,
          linkedin: Math.floor(Math.random() * 70) + 25,
          youtube: Math.floor(Math.random() * 45) + 15,
          tiktok: Math.floor(Math.random() * 55) + 20,
        }
      };
      setStats(initialStats);
      localStorage.setItem('admin_stats', JSON.stringify(initialStats));
    }
  }, []);

  // Calculer le réseau social le plus cliqué
  const getMostClickedSocial = () => {
    const socialClicks = stats.socialClicks;
    let maxClicks = 0;
    let mostClicked = 'Aucun';
    
    for (const [platform, clicks] of Object.entries(socialClicks)) {
      if (clicks > maxClicks) {
        maxClicks = clicks;
        mostClicked = platform.charAt(0).toUpperCase() + platform.slice(1);
      }
    }
    
    return { platform: mostClicked, clicks: maxClicks };
  };

  const mostClicked = getMostClickedSocial();

  // Trier les réseaux sociaux par nombre de clics
  const sortedSocialClicks = Object.entries(stats.socialClicks)
    .sort(([, a], [, b]) => b - a)
    .map(([platform, clicks]) => ({
      platform: platform.charAt(0).toUpperCase() + platform.slice(1),
      clicks
    }));

  // Calculer le total des clics
  const totalClicks = Object.values(stats.socialClicks).reduce((a, b) => a + b, 0);

  return (
    <div className="w-full max-w-7xl mx-auto p-6 min-h-screen bg-gradient-to-br from-slate-50 via-violet-50 to-blue-50">
      {/* En-tête du tableau de bord avec effet glassmorphism */}
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8 mb-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-gradient-to-br from-violet-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <Shield className="text-white" size={32} />
            </div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent flex items-center gap-3">
                <Sparkles className="text-violet-500" size={28} />
                Tableau de Bord Admin
              </h1>
              <p className="text-slate-500 mt-1 flex items-center gap-2">
                <Activity className="text-green-500" size={16} />
                Statistiques et analytics en temps réel
              </p>
            </div>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-red-500 to-pink-500 text-white rounded-xl hover:from-red-600 hover:to-pink-600 transition-all duration-300 shadow-lg shadow-red-500/30 hover:shadow-red-500/50 hover:scale-105"
          >
            <LogOut size={18} />
            Déconnexion
          </button>
        </div>
      </div>

      {/* Cartes de statistiques principales avec design moderne */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {/* Carte Visiteurs */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
              <Users className="text-white" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={12} />
              +12%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-semibold">Visiteurs Totaux</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent mt-2">{stats.totalVisitors}</p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <Clock size={12} />
            Dernières 24h
          </p>
        </div>

        {/* Carte Pages Créées */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:shadow-violet-500/20 transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-violet-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <FileText className="text-white" size={24} />
            </div>
            <span className="text-xs font-bold text-green-600 bg-green-100 px-3 py-1 rounded-full flex items-center gap-1">
              <ArrowUpRight size={12} />
              +5%
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-semibold">Micro-pages Créées</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent mt-2">{stats.totalPages}</p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <Zap size={12} />
            Actives
          </p>
        </div>

        {/* Carte Réseau le Plus Cliqué */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:shadow-green-500/20 transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-green-500/30">
              <TrendingUp className="text-white" size={24} />
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-100 px-3 py-1 rounded-full">
              Top
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-semibold">Réseau le Plus Cliqué</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent mt-2">{mostClicked.platform}</p>
          <p className="text-xs text-slate-400 mt-2">{mostClicked.clicks} clics</p>
        </div>

        {/* Carte Total Clics */}
        <div className="bg-white/80 backdrop-blur-xl p-6 rounded-3xl shadow-xl border border-white/20 hover:shadow-2xl hover:shadow-orange-500/20 transition-all duration-300 hover:-translate-y-2">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg shadow-orange-500/30">
              <Activity className="text-white" size={24} />
            </div>
            <span className="text-xs font-bold text-orange-600 bg-orange-100 px-3 py-1 rounded-full">
              Total
            </span>
          </div>
          <h3 className="text-slate-500 text-sm font-semibold">Total des Clics</h3>
          <p className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent mt-2">{totalClicks}</p>
          <p className="text-xs text-slate-400 mt-2 flex items-center gap-1">
            <Sparkles size={12} />
            Tous réseaux
          </p>
        </div>
      </div>

      {/* Graphique des clics par réseau social avec design amélioré */}
      <div className="bg-white/80 backdrop-blur-xl p-8 rounded-3xl shadow-xl border border-white/20 mb-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-violet-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg shadow-violet-500/30">
              <BarChart3 className="text-white" size={20} />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-blue-600 bg-clip-text text-transparent">
              Clics par Réseau Social
            </h2>
          </div>
          <div className="text-xs text-slate-500 bg-slate-100 px-4 py-2 rounded-xl">
            Données en temps réel
          </div>
        </div>

        {/* Barres de progression pour chaque réseau */}
        <div className="space-y-6">
          {sortedSocialClicks.map(({ platform, clicks }, index) => {
            const maxClicks = Math.max(...Object.values(stats.socialClicks));
            const percentage = maxClicks > 0 ? (clicks / maxClicks) * 100 : 0;
            
            // Couleurs différentes pour chaque barre
            const gradients = [
              'from-green-500 to-emerald-500',
              'from-blue-500 to-cyan-500',
              'from-violet-500 to-purple-500',
              'from-pink-500 to-rose-500',
              'from-orange-500 to-amber-500',
              'from-red-500 to-pink-500',
              'from-indigo-500 to-blue-500',
              'from-teal-500 to-green-500',
            ];
            
            return (
              <div key={platform} className="group">
                <div className="flex justify-between items-center mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${gradients[index % gradients.length]} flex items-center justify-center shadow-lg`}>
                      <span className="text-white font-bold text-xs">{platform.charAt(0)}</span>
                    </div>
                    <span className="text-sm font-semibold text-slate-700 group-hover:text-violet-600 transition-colors">{platform}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold bg-gradient-to-r from-slate-700 to-slate-900 bg-clip-text text-transparent">{clicks}</span>
                    <span className="text-xs text-slate-400">clics</span>
                  </div>
                </div>
                <div className="w-full bg-slate-100 rounded-full h-4 overflow-hidden shadow-inner">
                  <div
                    className={`h-4 rounded-full bg-gradient-to-r ${gradients[index % gradients.length]} transition-all duration-700 ease-out shadow-lg group-hover:shadow-xl`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <div className="text-right mt-1">
                  <span className="text-xs font-semibold text-slate-500">{percentage.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Informations supplémentaires avec design amélioré */}
      <div className="bg-gradient-to-r from-violet-600 via-purple-600 to-blue-600 p-8 rounded-3xl shadow-2xl shadow-violet-500/30 text-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center">
              <Sparkles className="text-white" size={24} />
            </div>
            <h3 className="font-bold text-xl">💡 Fonctionnalités Premium</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <p className="text-white/90 text-sm font-medium">📊 Analytics avancés</p>
              <p className="text-white/70 text-xs mt-1">Statistiques détaillées en temps réel</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <p className="text-white/90 text-sm font-medium">🔒 Sécurité renforcée</p>
              <p className="text-white/70 text-xs mt-1">Protection des données utilisateur</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <p className="text-white/90 text-sm font-medium">💾 Sauvegarde automatique</p>
              <p className="text-white/70 text-xs mt-1">Persistance des données LocalStorage</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bouton d'aide flottant */}
      <HelpButton />
    </div>
  );
}
