import React, { useState, useEffect } from 'react';
import { PageProvider } from './context/PageContext';
import PageEditor from './components/Editor/PageEditor';
import PhonePreview from './components/preview/PhonePreview';
import AdminDashboard from './components/Admin/AdminDashboard';
import HelpButton from './components/shared/HelpButton';
import { Lock, X } from 'lucide-react';
import { adminLogin, trackVisit } from './services/api';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [email, setEmail] = useState(import.meta.env.VITE_ADMIN_EMAIL ?? '');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [token, setToken] = useState(() => localStorage.getItem('admin_token'));
  const [visitId, setVisitId] = useState(() => localStorage.getItem('visit_id'));

  useEffect(() => {
    if (token) {
      setIsAdmin(true);
      localStorage.setItem('admin_token', token);
    } else {
      localStorage.removeItem('admin_token');
    }
  }, [token]);

  useEffect(() => {
    const registerVisit = async () => {
      if (token || visitId) {
        return;
      }

      try {
        const visit = await trackVisit({
          userAgent: navigator.userAgent,
          referer: document.referrer || window.location.href,
          country: '',
        });
        if (visit?.visit?.id) {
          localStorage.setItem('visit_id', visit.visit.id);
          setVisitId(String(visit.visit.id));
        }
      } catch (error) {
        console.warn('Impossible d enregistrer la visite', error);
      }
    };

    registerVisit();
  }, [token, visitId]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError('');

    try {
      const data = await adminLogin(email, password);
      setToken(data.token);
      setIsAdmin(true);
      setShowLoginModal(false);
      setPassword('');
    } catch (error) {
      const message = error?.details?.error || error.message || 'Erreur de connexion';
      setLoginError(message);
    }
  };

  const handleLogout = () => {
    setToken(null);
    setIsAdmin(false);
  };

  // Si l'utilisateur est connecté en tant qu'admin, afficher le dashboard
  if (isAdmin) {
    return (
      <PageProvider>
        <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
          <AdminDashboard onLogout={handleLogout} token={token} />
        </div>
      </PageProvider>
    );
  }

  // Affichage normal de l'éditeur
  return (
    <PageProvider>
      <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col">
        
        {/* Barre de navigation simple */}
        <header className="w-full bg-white border-b border-slate-200 px-6 py-4 flex justify-between items-center">
          <span className="font-bold text-lg tracking-tight text-violet-600">
            MyLinkPage <span className="text-xs text-slate-400 font-normal"></span>
          </span>
          <div className="flex items-center gap-3">
            <div className="text-xs bg-green-50 text-green-700 px-3 py-1 rounded-full font-medium border border-green-200">
              Connexion  prête
            </div>
            <button
              onClick={() => setShowLoginModal(true)}
              className="text-xs text-slate-400 hover:text-violet-600 transition-colors flex items-center gap-1"
              title="Connexion Admin"
            >
              <Lock size={14} />
              Admin
            </button>
          </div>
        </header>

        {/* Layout principal en Grid (Éditeur à gauche, Téléphone à droite) */}
        <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <PageEditor />
          <PhonePreview />
        </main>

        {/* Modale de connexion Admin */}
        {showLoginModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 relative">
              {/* Bouton de fermeture */}
              <button
                onClick={() => {
                  setShowLoginModal(false);
                  setPassword('');
                  setLoginError('');
                }}
                className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
              >
                <X size={20} />
              </button>

              {/* En-tête de la modale */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-violet-100 rounded-full flex items-center justify-center">
                  <Lock className="text-violet-600" size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-slate-900">Connexion Admin</h2>
                  <p className="text-sm text-slate-500">Accès réservé au créateur</p>
                </div>
              </div>

              {/* Formulaire de connexion */}
              <form onSubmit={handleLogin}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Adresse email
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@example.com"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all mb-4"
                  />
                  <label className="block text-sm font-medium text-slate-700 mb-2">Mot de passe</label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Entrez votre mot de passe"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 focus:bg-white transition-all"
                    autoFocus
                  />
                  {loginError && (
                    <p className="text-red-500 text-xs mt-2">{loginError}</p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-violet-600 text-white font-medium rounded-xl hover:bg-violet-700 transition-colors"
                >
                  Se connecter
                </button>
              </form>

              {/* Information de sécurité */}
              <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-xs text-blue-700">
                  🔒 Cette connexion est sécurisée. Le mot de passe est requis pour accéder au tableau de bord administrateur.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Bouton d'aide flottant */}
        <HelpButton />

      </div>
    </PageProvider>
  );
}
