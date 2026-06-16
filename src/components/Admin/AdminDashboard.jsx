import React, { useState, useEffect } from 'react';
import { BarChart3, Users, FileText, TrendingUp, LogOut, Activity, Shield, Clock, ArrowUpRight, Sparkles } from 'lucide-react';
import HelpButton from '../shared/HelpButton';
import { getAdminAnalytics } from '../../services/api';

export default function AdminDashboard({ onLogout, token }) {
  const [stats, setStats] = useState({
    totalVisits: 0,
    totalClicks: 0,
    links: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await getAdminAnalytics(token);
        setStats({
          totalVisits: data.totalVisits || 0,
          totalClicks: data.totalClicks || 0,
          links: data.links || [],
        });
      } catch (err) {
        setError(err?.details?.error || err.message || 'Impossible de charger les analytics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [token]);

  const mostClicked = stats.links.reduce(
    (acc, link) => {
      if (link.clickCount > acc.clicks) {
        return { platform: link.title, clicks: link.clickCount };
      }
      return acc;
    },
    { platform: 'Aucun', clicks: 0 }
  );

  return (
    <div className="w-full max-w-7xl mx-auto p-6 min-h-screen bg-slate-50">
      <div className="bg-white rounded-3xl shadow-2xl border border-slate-200 p-8 mb-8">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-6">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Tableau de bord admin</h1>
            <p className="text-sm text-slate-500 mt-2">Analytics dynamiques alimentées par le backend SQLite / Prisma.</p>
          </div>
          <button
            onClick={onLogout}
            className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-white font-semibold shadow-lg hover:bg-red-700 transition"
          >
            <LogOut size={18} /> Déconnexion
          </button>
        </div>

        {error && (
          <div className="mt-6 rounded-2xl bg-red-50 border border-red-200 p-4 text-sm text-red-700">
            {error}
          </div>
        )}

        {loading && (
          <div className="mt-6 rounded-2xl bg-slate-100 border border-slate-200 p-4 text-sm text-slate-700">
            Chargement des statistiques…
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-2xl bg-blue-500 p-3 text-white">
              <Users size={24} />
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-100 rounded-full px-3 py-1">Visites</span>
          </div>
          <p className="text-5xl font-bold text-slate-900">{stats.totalVisits}</p>
          <p className="mt-2 text-sm text-slate-500">Visites sur la page publique</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-2xl bg-orange-500 p-3 text-white">
              <Activity size={24} />
            </div>
            <span className="text-xs font-semibold text-orange-600 bg-orange-100 rounded-full px-3 py-1">Clics</span>
          </div>
          <p className="text-5xl font-bold text-slate-900">{stats.totalClicks}</p>
          <p className="mt-2 text-sm text-slate-500">Clics enregistrés sur les liens</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-2xl bg-violet-500 p-3 text-white">
              <FileText size={24} />
            </div>
            <span className="text-xs font-semibold text-violet-600 bg-violet-100 rounded-full px-3 py-1">Liens</span>
          </div>
          <p className="text-5xl font-bold text-slate-900">{stats.links.length}</p>
          <p className="mt-2 text-sm text-slate-500">Liens suivis dans la page</p>
        </div>

        <div className="rounded-3xl bg-white p-6 shadow-lg border border-slate-200">
          <div className="flex items-center justify-between mb-4">
            <div className="rounded-2xl bg-green-500 p-3 text-white">
              <TrendingUp size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-100 rounded-full px-3 py-1">Top lien</span>
          </div>
          <p className="text-2xl font-bold text-slate-900">{mostClicked.platform}</p>
          <p className="mt-2 text-sm text-slate-500">{mostClicked.clicks} clics</p>
        </div>
      </div>

      <div className="rounded-3xl bg-white p-8 shadow-lg border border-slate-200 mb-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-900">Détails des liens</h2>
            <p className="text-sm text-slate-500 mt-1">Liste des liens suivis avec leur nombre de clics.</p>
          </div>
          <span className="text-xs font-semibold text-slate-500 bg-slate-100 rounded-full px-3 py-1">{stats.links.length} liens</span>
        </div>

        <div className="space-y-4">
          {stats.links.map((link) => (
            <div key={link.id} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
                <div>
                  <p className="font-semibold text-slate-900">{link.title}</p>
                  <p className="text-sm text-slate-500">{link.url}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-slate-900">{link.clickCount}</p>
                  <p className="text-xs text-slate-500">clics</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-linear-to-r from-violet-600 via-purple-600 to-blue-600 p-8 text-white shadow-2xl">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-3xl bg-white/10 p-4">
            <h3 className="font-semibold">Sécurité</h3>
            <p className="text-sm text-slate-200 mt-2">JWT et mots de passe hachés (bcrypt) côté serveur.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <h3 className="font-semibold">Suivi</h3>
            <p className="text-sm text-slate-200 mt-2">Visites et clics enregistrés et indexés pour analytics.</p>
          </div>
          <div className="rounded-3xl bg-white/10 p-4">
            <h3 className="font-semibold">Connexion Front ↔ Back</h3>
            <p className="text-sm text-slate-200 mt-2">Frontend correctement connecté au backend via l'API.</p>
          </div>
        </div>
      </div>

      <HelpButton />
    </div>
  );
}
