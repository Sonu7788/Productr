const express = require('express');
const router = express.Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Import Nodemailer

// Helper to generate OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// @route   POST /api/auth/register
router.post('/register', async (req, res) => {
  const { name, email } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    user = new User({ name, email });
    await user.save();
    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/auth/send-otp
router.post('/send-otp', async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const otpExpires = new Date(Date.now() + 10 * 60 * 1000);

    user.otp = otp;
    user.otpExpires = otpExpires;
    await user.save();

    // --- BREVO CONFIGURATION ---
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_SERVICE, // smtp-relay.brevo.com
      port: 587,
      secure: false, 
      auth: {
        user: process.env.EMAIL_USER, // Your registered email
        pass: process.env.EMAIL_PASS  // Your xsmtpsib key
      }
    });

    const mailOptions = {
      from: `"Shopytr" <sonujangir992002@gmail.com>`, // Uses the email from .env
      to: email,
      subject: 'Your Verification Code',
      text: `Hello ${user.name},\n\nYour OTP is: ${otp}\n\nIt will expire in 10 minutes.`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log("Brevo email sent successfully!");
    res.json({ msg: 'OTP sent successfully' });

  } catch (err) {
    console.error("ERROR SENDING MAIL:", err.message);
    res.status(500).json({ msg: 'Error sending OTP', details: err.message });
  }
});

// @route   POST /api/auth/verify-otp
router.post('/verify-otp', async (req, res) => {
  const { email, otp } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'Invalid credentials' });

    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or expired OTP' });
    }

    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '5h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user._id, name: user.name, email: user.email } });
    });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;