const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// Image Upload Config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'), // This points to backend/uploads/
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname))
});

// Add file filter to ensure only images are uploaded
const upload = multer({ 
    storage,
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png|webp/;
        const mimeType = fileTypes.test(file.mimetype);
        const extName = fileTypes.test(path.extname(file.originalname));
        if (mimeType && extName) {
            return cb(null, true);
        } else {
            cb(new Error('Images Only!'));
        }
    },
    limits: { fileSize: 5 * 1024 * 1024 } // Limit to 5MB
});

// @route   GET /api/products
router.get('/', async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// @route   POST /api/products
router.post('/', upload.array('images', 5), async (req, res) => {
  try {
    const { name, type, stock, mrp, sellingPrice, brand, exchangeOrReturn, published } = req.body;

    const imageUrls = req.files
      ? req.files.map(file => `/uploads/${file.filename}`)
      : [];

    const newProduct = new Product({
      name,
      type,
      stock,
      mrp,
      sellingPrice,
      brand,
      imageUrls,
      exchangeOrReturn: exchangeOrReturn === 'true',
      published: published === 'true'
    });

    const product = await newProduct.save();
    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// @route   PUT /api/products/:id
router.put('/:id', upload.array('images', 5), async (req, res) => {
  try {
    const { name, type, stock, mrp, sellingPrice, brand, exchangeOrReturn, published } = req.body;

    const productFields = {
      name,
      type,
      stock,
      mrp,
      sellingPrice,
      brand,
      exchangeOrReturn,
      published
    };

    if (req.files && req.files.length > 0) {
      productFields.imageUrls = req.files.map(file => `/uploads/${file.filename}`);
    }

    const product = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: productFields },
      { new: true }
    );

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server Error' });
  }
});


// @route   DELETE /api/products/:id
router.delete('/:id', async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Product deleted' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;