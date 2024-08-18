const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
const generateID = require('../services/common/generateID.service');

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    userType: { type: String, required: true },
    role: { type: String, required: true },
    password: { type: String, required: true },
    status: { type: Boolean, default: true },
}, { timestamps: true });

// Pre-save hook to hash the password
// UserSchema.pre('save', async function(next) {
//     if (!this.isModified('password')) {
//         return next();
//     }
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// Pre-validate hook to generate userId
const customIdPrefix = 'USR';
const length = 5;

UserSchema.pre('validate', async function (next) {
    const MyModel = this.constructor;
    let lastDoc = await MyModel.find().sort({ _id: -1 }).limit(1);
    this.userId = generateID(customIdPrefix, lastDoc[0] ? lastDoc[0].userId : null, length);
    next();
});

// Method to check password
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', UserSchema);
module.exports = User;
