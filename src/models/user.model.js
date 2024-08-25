import mongoose from 'mongoose';
// import bcrypt from 'bcryptjs';
import generateID from '../utils/generateID.js';

const UserSchema = new mongoose.Schema({
    userId: { type: String, required: true, unique: true, index: true },
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
const prefix = 'UR';
const length = 12;

UserSchema.pre('validate', async function (next) {
    const MyModel = this.constructor;
    // Generate the new custom ID
    let userId = await generateID(MyModel, prefix, 'userId', length);
    if (userId != null && userId != undefined) {
        this.userId = userId;
        next();
    } else {
        next(new Error('Error in ID generation'));
    }
    next();
});

// Method to check password
// UserSchema.methods.matchPassword = async function(enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

const User = mongoose.model('User', UserSchema);

export default User;
