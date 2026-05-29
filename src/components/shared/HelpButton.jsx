import React, { useState } from 'react';
import { HelpCircle, X } from 'lucide-react';

export default function HelpButton() {
  const [showHelp, setShowHelp] = useState(false);

  const helpItems = [
    {
      title: '👤 Mon Profil',
      description: 'Modifiez votre nom, votre bio et votre photo de profil. Ces informations s\'affichent en haut de votre page.'
    },
    {
      title: '🎨 Personnalisation',
      description: 'Changez le thème (couleurs, style) et la typographie (police d\'écriture) de votre page pour qu\'elle vous ressemble.'
    },
    {
      title: '🔗 Mes Liens',
      description: 'Ajoutez, modifiez ou supprimez des liens (Portfolio, GitHub, etc.) qui apparaîtront sous forme de boutons sur votre page.'
    },
    {
      title: '📱 Réseaux Sociaux',
      description: 'Connectez vos profils sociaux (WhatsApp, LinkedIn, GitHub, etc.) pour que les visiteurs puissent vous suivre ou vous contacter.'
    },
    {
      title: '📱 Prévisualisation Mobile',
      description: 'L\'aperçu à droite montre exactement comment votre page apparaît sur un téléphone mobile. Les changements s\'appliquent en temps réel.'
    },
    {
      title: '💾 Sauvegarde Automatique',
      description: 'Tous vos changements sont sauvegardés automatiquement dans votre navigateur. Pas besoin de cliquer sur "Enregistrer".'
    },
    {
      title: '🔐 Mode Admin',
      description: 'Cliquez sur l\'icône cadenas en haut à droite pour accéder au tableau de bord admin et voir les statistiques de votre page.'
    },
    {
      title: '📊 Statistiques',
      description: 'Consultez le nombre de visiteurs, de pages vues et les clics sur vos réseaux sociaux dans le mode admin.'
    }
  ];

  return (
    <>
      {/* Bouton flottant d'aide */}
      <button
        onClick={() => setShowHelp(true)}
        className="fixed bottom-6 right-6 bg-linear-to-r from-violet-500 to-violet-600 text-white p-4 rounded-full shadow-lg hover:shadow-xl hover:from-violet-600 hover:to-violet-700 transition-all duration-200 transform hover:scale-110 z-40 border border-violet-400"
        title="Obtenir de l'aide"
        aria-label="Aide"
      >
        <HelpCircle size={24} />
      </button>

      {/* Modale d'aide */}
      {showHelp && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* En-tête */}
            <div className="sticky top-0 bg-linear-to-r from-violet-500 to-violet-600 text-white px-6 py-6 flex justify-between items-center border-b border-violet-400">
              <div>
                <h2 className="text-2xl font-bold">📚 Aide & Tutoriel</h2>
                <p className="text-violet-100 text-sm mt-1">Découvrez comment utiliser MyLinkPage</p>
              </div>
              <button
                onClick={() => setShowHelp(false)}
                className="p-2 hover:bg-violet-500/30 rounded-lg transition-colors"
              >
                <X size={24} />
              </button>
            </div>

            {/* Contenu */}
            <div className="p-6 space-y-6">
              {/* Introduction */}
              <div className="bg-linear-to-r from-violet-50 to-pink-50 p-4 rounded-xl border border-violet-200">
                <h3 className="font-semibold text-slate-800 mb-2">Bienvenue sur MyLinkPage!</h3>
                <p className="text-slate-600 text-sm">
                  Créez votre page personnalisée avec vos informations, vos liens et vos réseaux sociaux. 
                  Parfait pour une bio link, un portfolio ou un CV en ligne.
                </p>
              </div>

              {/* Liste d'aide */}
              <div className="grid gap-4">
                {helpItems.map((item, index) => (
                  <div key={index} className="border border-slate-200 rounded-xl p-4 hover:border-violet-300 hover:bg-violet-50/30 transition-all">
                    <h4 className="font-semibold text-slate-800 text-sm mb-2">{item.title}</h4>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </div>
                ))}
              </div>

              {/* Conseils */}
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
                <h4 className="font-semibold text-yellow-900 mb-2">💡 Conseils</h4>
                <ul className="text-yellow-800 text-sm space-y-1">
                  <li>• Utilisez une bio courte et captivante</li>
                  <li>• Gardez vos liens à jour et pertinents</li>
                  <li>• Testez votre page sur votre téléphone</li>
                  <li>• Partagez votre page via un lien court</li>
                </ul>
              </div>

              {/* Besoin d'aide */}
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <h4 className="font-semibold text-blue-900 mb-2">❓ Besoin d'aide supplémentaire?</h4>
                <p className="text-blue-800 text-sm">
                  Testez les changements directement dans l'aperçu mobile pour voir le résultat en temps réel. 
                  Votre page se sauvegarde automatiquement!
                </p>
              </div>
            </div>

            {/* Pied de page */}
            <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex justify-end">
              <button
                onClick={() => setShowHelp(false)}
                className="px-6 py-2 bg-linear-to-r from-violet-500 to-violet-600 text-white rounded-lg hover:from-violet-600 hover:to-violet-700 transition-all font-medium"
              >
                Fermer
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
