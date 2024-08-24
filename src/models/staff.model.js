import mongoose from 'mongoose';
import generateID from '../services/common/generateID.service.js';

const staffSchema = new mongoose.Schema({
    staffId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    fName: {
        type: String,
        required: true
    },
    lName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true,
    },
    address: {
      street: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
    },
    gender: {
      type: String,
      enum: ['male', 'female', 'other'],
    },
    dob: {
      type: Date,
    },
    email: {
        type: String,
        required: false
    },
    status: {
        type: String,
        default: "Active"
    },
    profilePic: {
        type: String,
        default: "https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png"
    },
    JoinedDate: {
        type: Date,
        default: Date.now
    },
    jobRole: {
        type: String,
        required: false
    },
    baseSalary: {
        type: Number,
        default: 30000
    },
});

// For generating staffId
const customIdPrefix = "STF";
const length = 5;

// Pre-save hook to generate id
staffSchema.pre("validate", async function (next) {
    const MyModel = this.constructor;
    let lastStaff = await MyModel.find().sort({ _id: -1 }).limit(1);
    this.staffId = generateID(customIdPrefix, lastStaff[0] ? lastStaff[0].staffId : null, length);
    next();
});

// Create the staff model
const Staff = mongoose.model("Staff", staffSchema);

export default Staff;
