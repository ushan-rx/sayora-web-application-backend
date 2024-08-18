const mongoose = require('mongoose')
const generateID = require("../services/common/generateID.service");

const staffSchema =  new mongoose.Schema({
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

//for generating staffId
const customIdPrefix = "STF";
const length = 5;

// Pre-save hook to generate id
staffSchema.pre("validate", async function (next) {
    const MyModel = this.constructor;
    // Find the last document with a custom ID starting with the provided prefix
    let lastStaff = await MyModel.find().sort({ _id: -1 }).limit(1);
    // Generate the new custom ID
    this.staffId = generateID(customIdPrefix, lastStaff[0] ? lastStaff[0].staffId : null, length);
    next();
  });

// Create the patient model
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;