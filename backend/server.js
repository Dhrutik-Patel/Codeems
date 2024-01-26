import express from 'express';
import dotenv from 'dotenv';

import products from './data/products.js';

// Load env variables
dotenv.config();

// Initialize express app
const app = express();

// Routes
app.get('/api/products', (req, res) => {
    res.json(products);
});

app.get('/api/products/:id', (req, res) => {
    const product = products.find((product) => product._id === req.params.id);
    res.json(product);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`\nhttp://localhost:${PORT}\n`);
});
