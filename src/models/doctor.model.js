import mongoose from 'mongoose';
import generateID from '../utils/generateID.js';

const doctorSchema = new mongoose.Schema({
    doctorId: {
        type: String,     
        required: true,
        unique: true,
    },
    userId: {
        type: String,   
    },
    // personal details
    fName: {
        type: String,
        required: true,
    },
    lName: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true,
    },
    email: {
        type: String,
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
    specialization: [  // doctor's specialization list
        { 
            type: String,
        },
    ],
    description: {
        type: String,
        maxlength: [1000, 'Description can not be more than 1000 characters'],
    },
    experience: {
        type: Number,
    },
    availability: {      // doctor is active or not
        type: Boolean,
        required: true,
        default: true,
    },
    treatments: [        // treatment list populate this
        {
            treatmentId: {
                type: String,
            },
        },
    ],
    appointmentPrice: {
        type: String,
    },
    profilePic: {
        type: String,
    },
    status: {                       // for delete purpose
        type: Boolean,
        default: true,
    }
}, { timestamps: true });

const prefix = 'DC';
const length = 10;

// Pre-save hook to generate id
doctorSchema.pre('validate', async function (next) {
    const MyModel = this.constructor; // get the model
    // Generate the new custom ID
    let doctorId = await generateID(MyModel, prefix, 'doctorId', length);
    if (doctorId != null && doctorId != undefined) {
        this.doctorId = doctorId;
        next();
    } else {
        next(new Error('Error in ID generation'));
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);

export default Doctor;
