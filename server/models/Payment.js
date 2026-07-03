import mongoose from 'mongoose';

const paymentSchema = new mongoose.Schema(
  {
    registration: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Registration',
      required: true,
      index: true
    },
    provider: {
      type: String,
      default: 'manual',
      enum: ['manual', 'mpesa', 'pesapal', 'flutterwave', 'paystack', 'stripe']
    },
    amount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'KES',
      enum: ['KES']
    },
    status: {
      type: String,
      enum: ['pending', 'processing', 'paid', 'failed', 'cancelled'],
      default: 'pending',
      index: true
    },
    providerReference: {
      type: String,
      trim: true,
      index: true
    },
    checkoutRequestId: {
      type: String,
      trim: true
    },
    paidAt: Date,
    rawProviderResponse: {
      type: mongoose.Schema.Types.Mixed,
      select: false
    }
  },
  { timestamps: true }
);

export const Payment = mongoose.model('Payment', paymentSchema);
