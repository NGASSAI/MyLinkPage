import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/auth.js';
import profileRoutes from './routes/profile.js';
import linksRoutes from './routes/links.js';
import socialsRoutes from './routes/socials.js';
import analyticsRoutes from './routes/analytics.js';
import trackingRoutes from './routes/tracking.js';
import publicRoutes from './routes/public.js';

const app = express();
app.disable('x-powered-by');

// Timeout global pour éviter que les requêtes bloquées par SQLite/Prisma restent en attente.
app.use((req, res, next) => {
  res.setTimeout(4000, () => {
    if (!res.headersSent) {
      res.status(504).json({ message: 'La base de données (Prisma/SQLite) a mis trop de temps à répondre.' });
    }
  });
  next();
});

app.use(helmet());
app.set('trust proxy', process.env.NODE_ENV === 'production');

app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: false, limit: '10kb' }));
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.CORS_ORIGIN || true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  })
);

app.use('/api/auth', authRoutes);
app.use('/api/admin/profile', profileRoutes);
app.use('/api/admin/links', linksRoutes);
app.use('/api/admin/socials', socialsRoutes);
app.use('/api/admin/analytics', analyticsRoutes);
app.use('/api/track', trackingRoutes);
app.use('/api/public', publicRoutes);

app.get('/api', (req, res) => {
  res.json({ message: 'API backend Linkpage active' });
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message || 'Erreur serveur' });
});

export default app;
