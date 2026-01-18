const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  otp: { type: String }, // Store OTP temporarily
  otpExpires: { type: Date }
});

module.exports = mongoose.model('User', UserSchema);