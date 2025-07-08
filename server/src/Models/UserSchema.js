import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  mobileNo: {
    type: String,
    required: true,
    validate: {
            validator: v => /^\d{10}$/.test(v),
            message: 'Phone number must be 10 digits'
        } // Validates 10-digit mobile numbers
  },
  userType: {
    type: String,
    required: true,
    enum: ['admin', 'student', 'faculty'] 
  },
  // isActive: {
  //   type: Boolean,
  //   default: true
  // }
});

export const User = mongoose.model('User', UserSchema);