import { Router } from 'express';
import { Payment } from '../models/Payment.js';
import { Registration } from '../models/Registration.js';
import { requireAdminAuth } from '../middleware/auth.js';

const router = Router();

router.use(requireAdminAuth);

router.get('/registrations', async (req, res, next) => {
  try {
    const { status, category, search } = req.query;
    const filters = {};

    if (status) {
      filters.status = status;
    }

    if (category) {
      filters.category = category;
    }

    if (search) {
      const searchRegex = new RegExp(String(search).trim(), 'i');
      filters.$or = [
        { registrationNumber: searchRegex },
        { fullName: searchRegex },
        { email: searchRegex },
        { phone: searchRegex }
      ];
    }

    const registrations = await Registration.find(filters)
      .sort({ createdAt: -1 })
      .limit(250)
      .lean();

    const payments = await Payment.find({
      registration: { $in: registrations.map((registration) => registration._id) }
    })
      .select('-rawProviderResponse')
      .lean();

    const paymentsByRegistration = new Map(
      payments.map((payment) => [String(payment.registration), payment])
    );

    const rows = registrations.map((registration) => ({
      ...registration,
      payment: paymentsByRegistration.get(String(registration._id)) || null
    }));

    const summary = {
      total: rows.length,
      paid: rows.filter((row) => row.status === 'paid').length,
      pendingPayment: rows.filter((row) => row.status === 'pending_payment').length,
      cancelled: rows.filter((row) => row.status === 'cancelled').length
    };

    return res.json({ summary, registrations: rows });
  } catch (error) {
    return next(error);
  }
});

export default router;
