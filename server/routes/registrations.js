import { Router } from 'express';
import { Registration, registrationCategories } from '../models/Registration.js';
import { Payment } from '../models/Payment.js';
import { getCategoryFee } from '../utils/fees.js';
import { createRegistrationNumber } from '../utils/registrationNumber.js';

const router = Router();

function cleanString(value) {
  return typeof value === 'string' ? value.trim() : '';
}

function validateRegistration(body) {
  const payload = {
    category: cleanString(body.category),
    fullName: cleanString(body.fullName),
    phone: cleanString(body.phone),
    email: cleanString(body.email).toLowerCase(),
    ageGroup: cleanString(body.ageGroup),
    gender: cleanString(body.gender),
    shirtSize: cleanString(body.shirtSize),
    emergencyContactName: cleanString(body.emergencyContactName),
    emergencyContactPhone: cleanString(body.emergencyContactPhone),
    notes: cleanString(body.notes)
  };

  const required = ['category', 'fullName', 'phone', 'email', 'ageGroup', 'gender', 'shirtSize'];
  const missing = required.filter((field) => !payload[field]);

  if (missing.length) {
    return { error: `Missing required field(s): ${missing.join(', ')}` };
  }

  if (!registrationCategories.includes(payload.category)) {
    return { error: 'Invalid race category selected.' };
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(payload.email)) {
    return { error: 'Enter a valid email address.' };
  }

  if (!/^\+?[0-9\s-]{7,20}$/.test(payload.phone)) {
    return { error: 'Enter a valid phone number.' };
  }

  return { payload };
}

router.post('/', async (req, res, next) => {
  try {
    const validation = validateRegistration(req.body);

    if (validation.error) {
      return res.status(400).json({ message: validation.error });
    }

    const feeAmount = getCategoryFee(validation.payload.category);
    const registration = await Registration.create({
      ...validation.payload,
      feeAmount,
      registrationNumber: createRegistrationNumber()
    });

    const payment = await Payment.create({
      registration: registration._id,
      amount: feeAmount,
      status: 'pending',
      provider: 'manual'
    });

    return res.status(201).json({
      message: 'Registration created. Payment is pending.',
      registration: {
        id: registration._id,
        registrationNumber: registration.registrationNumber,
        category: registration.category,
        feeAmount: registration.feeAmount,
        currency: registration.currency,
        status: registration.status
      },
      payment: {
        id: payment._id,
        provider: payment.provider,
        amount: payment.amount,
        currency: payment.currency,
        status: payment.status
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ message: 'A registration with this reference already exists. Please try again.' });
    }

    return next(error);
  }
});

router.get('/:registrationNumber', async (req, res, next) => {
  try {
    const registration = await Registration.findOne({
      registrationNumber: req.params.registrationNumber
    }).lean();

    if (!registration) {
      return res.status(404).json({ message: 'Registration not found.' });
    }

    const payment = await Payment.findOne({ registration: registration._id })
      .select('-rawProviderResponse')
      .lean();

    return res.json({ registration, payment });
  } catch (error) {
    return next(error);
  }
});

export default router;
