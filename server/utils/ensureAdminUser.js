import { AdminUser } from '../models/AdminUser.js';

export async function ensureAdminUser() {
  const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
  const password = String(process.env.ADMIN_PASSWORD || '');
  const name = process.env.ADMIN_NAME || 'Kitale Admin';

  if (!email || !password) {
    console.warn('ADMIN_EMAIL or ADMIN_PASSWORD not set; skipping startup admin user setup.');
    return;
  }

  if (password.length < 8) {
    throw new Error('ADMIN_PASSWORD must be at least 8 characters.');
  }

  const passwordHash = await AdminUser.hashPassword(password);
  const existing = await AdminUser.findOne({ email }).select('+passwordHash');

  if (existing) {
    existing.name = name;
    existing.passwordHash = passwordHash;
    existing.role = 'admin';
    existing.active = true;
    await existing.save();
    console.log(`Admin user ready: ${email}`);
    return;
  }

  await AdminUser.create({
    name,
    email,
    passwordHash,
    role: 'admin',
    active: true
  });
  console.log(`Admin user created: ${email}`);
}
