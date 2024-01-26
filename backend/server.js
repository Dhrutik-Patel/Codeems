import express from 'express';
import dotenv from 'dotenv';
import colors from 'colors';

import connectDB from './configuration/database.js';
import productRoutes from './routes/productRoutes.js';
import { errorHandler, notFound } from './middleware/errorMiddleware.js';

// Load env variables
dotenv.config();

// Connect to database
connectDB();

// Initialize express app
const app = express();

// Routes
app.use('/api/products', productRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log('\n' + `http://localhost:${PORT}`.yellow.bold);
});
