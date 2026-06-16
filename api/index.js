import 'dotenv/config';

// Charger dynamiquement l'app ESM du backend afin d'éviter les problèmes de résolution
// de chemins lorsque `api/index.js` est positionné à la racine.
const { default: app } = await import('../backend/src/app.js');

// Export ESM (pour les environnements qui l'utilisent)
export default app;

// Export CommonJS strict requis par certains adaptateurs :
// on l'ajoute ici de façon sûre (ne lèvera pas en ESM pur si `module` est undefined).
try {
	module.exports = app;
} catch (e) {
	// ignore
}
