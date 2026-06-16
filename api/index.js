import 'dotenv/config';
import app from '../backend/src/app.js';

// Export de l'application Express pour Vercel / serverless
export default app;

// Also provide CommonJS export for platforms expecting module.exports
try {
	if (typeof module !== 'undefined') module.exports = app;
} catch (e) {
	// ignore in ESM-only environments
}
