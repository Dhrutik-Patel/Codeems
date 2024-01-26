import mongoose from 'mongoose';
import dotenv from 'dotenv';
import colors from 'colors';

import users from '../data/users.js';
import products from '../data/products.js';

import User from '../models/userModel.js';
import Product from '../models/productModel.js';
import Order from '../models/orderModel.js';

import connectDB from '../configuration/database.js';

// Load environment variables
dotenv.config();

// Connect to MongoDB
connectDB();

// Import data into MongoDB
const importData = async () => {
    try {
        // Delete all existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        // Insert new data
        const createdUsers = await User.insertMany(users);
        const adminUser = createdUsers[0]._id;
        const sampleProducts = products.map((product) => {
            return { ...product, user: adminUser };
        });
        await Product.insertMany(sampleProducts);

        console.log('Data imported!'.green.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Destroy data in MongoDB
const destroyData = async () => {
    try {
        // Delete all existing data
        await Order.deleteMany();
        await Product.deleteMany();
        await User.deleteMany();

        console.log('Data destroyed!'.red.inverse);
        process.exit();
    } catch (error) {
        console.error(`${error}`.red.inverse);
        process.exit(1);
    }
};

// Check if the argument is '-d' or '-destroy'
if (process.argv[2] === '-d') {
    destroyData();
} else {
    importData();
}

// Run this command in the terminal:
// $ npm run data:import
// $ npm run data:destroy
