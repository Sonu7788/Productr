const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');
const fs = require('fs'); // 1. Import fs

// Routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/product');

dotenv.config();
const app = express();

// Connect Database
connectDB();

// --- FIX START: Ensure uploads folder exists ---
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
    console.log('Uploads directory created');
}
// --- FIX END ---

// Middleware
app.use(express.json());
app.use(cors());
// Serve static files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Define Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));