import jwt from 'jsonwebtoken';
import { AdminUser } from '../models/AdminUser.js';

export function signAdminToken(admin) {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET is required');
  }

  return jwt.sign(
    {
      sub: String(admin._id),
      email: admin.email,
      role: admin.role
    },
    secret,
    { expiresIn: '8h' }
  );
}

export async function requireAdminAuth(req, res, next) {
  try {
    const authHeader = req.get('authorization') || '';
    const [, token] = authHeader.match(/^Bearer\s+(.+)$/i) || [];

    if (!token) {
      return res.status(401).json({ message: 'Admin login is required.' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const admin = await AdminUser.findById(decoded.sub).lean();

    if (!admin || !admin.active) {
      return res.status(401).json({ message: 'Admin account is not active.' });
    }

    req.admin = {
      id: String(admin._id),
      email: admin.email,
      name: admin.name,
      role: admin.role
    };

    return next();
  } catch (error) {
    return res.status(401).json({ message: 'Admin session is invalid or expired.' });
  }
}
