const DBError = require('../errors/db-error');
const ENVIRONMENT = require('./env.config');
const mongoose = require('mongoose');


const connectDB  = async () =>{
    try {
        await mongoose.connect(ENVIRONMENT.MONGO_URI)
        console.log('Database connected successfully');
    } catch (error) {
        throw new DBError(error.message);
    }
}


module.exports = connectDB;
