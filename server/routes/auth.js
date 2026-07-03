import { Router } from 'express';
import { AdminUser } from '../models/AdminUser.js';
import { requireAdminAuth, signAdminToken } from '../middleware/auth.js';
import { cleanEnvValue } from '../utils/env.js';

const router = Router();

router.post('/login', async (req, res, next) => {
  try {
    const email = cleanEnvValue(req.body?.email).toLowerCase();
    const password = cleanEnvValue(req.body?.password);

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    const admin = await AdminUser.findOne({ email }).select('+passwordHash');

    if (!admin || !admin.active) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    const passwordOk = await admin.verifyPassword(password);

    if (!passwordOk) {
      return res.status(401).json({ message: 'Invalid admin credentials.' });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    const token = signAdminToken(admin);

    return res.json({
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role
      }
    });
  } catch (error) {
    return next(error);
  }
});

router.get('/me', requireAdminAuth, (req, res) => {
  res.json({ admin: req.admin });
});

export default router;
