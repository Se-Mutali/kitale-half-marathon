import { Router } from 'express';
import { requireAdminAuth } from '../middleware/auth.js';
import { Payment } from '../models/Payment.js';
import { Registration } from '../models/Registration.js';

const router = Router();

router.get('/:paymentId', async (req, res, next) => {
  try {
    const payment = await Payment.findById(req.params.paymentId)
      .select('-rawProviderResponse')
      .populate('registration', 'registrationNumber fullName category status')
      .lean();

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    return res.json({ payment });
  } catch (error) {
    return next(error);
  }
});

router.post('/:paymentId/manual-confirm', requireAdminAuth, async (req, res, next) => {
  try {
    const { providerReference } = req.body ?? {};
    const payment = await Payment.findByIdAndUpdate(
      req.params.paymentId,
      {
        status: 'paid',
        providerReference,
        paidAt: new Date()
      },
      { new: true }
    );

    if (!payment) {
      return res.status(404).json({ message: 'Payment not found.' });
    }

    await Registration.findByIdAndUpdate(payment.registration, { status: 'paid' });

    return res.json({
      message: 'Payment marked as paid.',
      payment: {
        id: payment._id,
        status: payment.status,
        provider: payment.provider,
        providerReference: payment.providerReference,
        paidAt: payment.paidAt
      }
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
