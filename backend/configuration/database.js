import mongoose from 'mongoose';
import colors from 'colors';

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {});

        console.log(
            '\n' + `MongoDB Connected: ${conn.connection.host}`.cyan.bold
        );
    } catch (error) {
        console.error(`\nError: ${error.message}`);
        process.exit(1);
    }
};

export default connectDB;
