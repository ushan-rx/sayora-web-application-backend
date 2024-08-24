import dotenv from 'dotenv';

dotenv.config();

const ENVIRONMENT = {
    PORT: process.env.PORT || 5000,
    NODE_ENV: process.env.NODE_ENV || 'development',
    MONGO_URI: process.env.MONGO_URI,
};

export default ENVIRONMENT;
