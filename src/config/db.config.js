import mongoose from 'mongoose';
import DBError from '../errors/db-error.js';
import ENVIRONMENT from './env.config.js';

const connectDB = async () => {
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_URI);
        console.log('Database connected successfully');
    } catch (error) {
        throw new DBError(error.message);
    }
};

export default connectDB;
