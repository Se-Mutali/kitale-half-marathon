import mongoose from 'mongoose';

const categories = [
  '21KM Half Marathon',
  '15KM Race',
  '10KM Race',
  "10KM CEO's Challenge",
  '5KM Family Fun Run'
];

const registrationSchema = new mongoose.Schema(
  {
    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    category: {
      type: String,
      enum: categories,
      required: true
    },
    feeAmount: {
      type: Number,
      required: true,
      min: 0
    },
    currency: {
      type: String,
      default: 'KES',
      enum: ['KES']
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      minlength: 2,
      maxlength: 120
    },
    phone: {
      type: String,
      required: true,
      trim: true,
      maxlength: 30
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
      maxlength: 160
    },
    ageGroup: {
      type: String,
      required: true,
      enum: ['10-18', '19-34', '35-49', '50-70']
    },
    gender: {
      type: String,
      required: true,
      enum: ['Female', 'Male', 'Prefer not to say']
    },
    shirtSize: {
      type: String,
      required: true,
      enum: ['XS', 'S', 'M', 'L', 'XL', 'XXL']
    },
    emergencyContactName: {
      type: String,
      trim: true,
      maxlength: 120
    },
    emergencyContactPhone: {
      type: String,
      trim: true,
      maxlength: 30
    },
    status: {
      type: String,
      enum: ['pending_payment', 'paid', 'cancelled'],
      default: 'pending_payment',
      index: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: 500
    }
  },
  { timestamps: true }
);

registrationSchema.index({ email: 1, category: 1 });

export const Registration = mongoose.model('Registration', registrationSchema);
export const registrationCategories = categories;
