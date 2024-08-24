import mongoose from 'mongoose';

const regularPatientSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Patient',
        required: true
    },
    doctorId: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        default: true
    }
}, { timestamps: true });

const RegularPatient = mongoose.model('RegularPatient', regularPatientSchema);

export default RegularPatient;
