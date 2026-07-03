import dotenv from 'dotenv';
import mongoose from 'mongoose';
import { connectDb } from '../config/db.js';
import { AdminUser } from '../models/AdminUser.js';

dotenv.config();

const email = String(process.env.ADMIN_EMAIL || '').trim().toLowerCase();
const password = String(process.env.ADMIN_PASSWORD || '');
const name = process.env.ADMIN_NAME || 'Kitale Admin';

if (!email || !password) {
  console.error('ADMIN_EMAIL and ADMIN_PASSWORD are required in .env');
  process.exit(1);
}

if (password.length < 8) {
  console.error('ADMIN_PASSWORD must be at least 8 characters.');
  process.exit(1);
}

try {
  await connectDb(process.env.MONGODB_URI);

  const existing = await AdminUser.findOne({ email });
  const passwordHash = await AdminUser.hashPassword(password);

  if (existing) {
    existing.name = name;
    existing.passwordHash = passwordHash;
    existing.role = 'admin';
    existing.active = true;
    await existing.save();
    console.log(`Updated admin user: ${email}`);
  } else {
    await AdminUser.create({
      name,
      email,
      passwordHash,
      role: 'admin'
    });
    console.log(`Created admin user: ${email}`);
  }
} catch (error) {
  console.error(error.message);
  process.exitCode = 1;
} finally {
  await mongoose.disconnect();
}
