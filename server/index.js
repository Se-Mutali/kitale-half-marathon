import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { connectDb } from './config/db.js';
import registrationsRouter from './routes/registrations.js';
import paymentsRouter from './routes/payments.js';
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const port = process.env.PORT || 4000;
const isProduction = process.env.NODE_ENV === 'production';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

app.set('trust proxy', 1);
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
    contentSecurityPolicy: false
  })
);
app.use(express.json({ limit: '1mb' }));
app.use(morgan(isProduction ? 'combined' : 'dev'));

if (!isProduction) {
  app.use(
    cors({
      origin: process.env.CLIENT_ORIGIN || 'http://127.0.0.1:5173'
    })
  );
}

app.use(
  '/api',
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 120,
    standardHeaders: 'draft-8',
    legacyHeaders: false
  })
);

app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'kitale-half-marathon-api' });
});

app.use('/api/auth', authRouter);
app.use('/api/registrations', registrationsRouter);
app.use('/api/payments', paymentsRouter);
app.use('/api/admin', adminRouter);

const distDir = path.join(rootDir, 'dist');

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir));
  app.use((req, res, next) => {
    if (req.method === 'GET' && !req.path.startsWith('/api')) {
      return res.sendFile(path.join(distDir, 'index.html'));
    }

    return next();
  });
}

app.use((req, res) => {
  res.status(404).json({ message: `Route not found: ${req.method} ${req.path}` });
});

app.use((error, _req, res, _next) => {
  console.error(error);
  res.status(error.status || 500).json({
    message: error.message || 'Server error'
  });
});

try {
  await connectDb(process.env.MONGODB_URI);
  app.listen(port, () => {
    console.log(`Kitale Half Marathon API running on http://127.0.0.1:${port}`);
  });
} catch (error) {
  console.error('Failed to start API:', error.message);
  process.exit(1);
}
