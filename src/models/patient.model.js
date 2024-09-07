import mongoose from "mongoose";
import generateID from "../utils/generateID.js";

//vitals subdocuments
const bloodPressureSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  systolic: {
      type: Number,
      required: true,
      min: 0
  },
  diastolic: {
      type: Number,
      required: true,
      min: 0
  }
});    

const heightSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  value: {
      type: Number,
      required: true,
      min: 0 // Height in cm
  }
});

const weightSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  value: {
      type: Number,
      required: true,
      min: 0 // Weight in kg
  }
});

const temperatureSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  value: {
      type: Number,
      required: true,
      min: 0 // Temperature in Celsius 
  }
});

const bloodSugarSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  value: {
      type: Number,
      required: true,
      min: 0 // Blood sugar in mg/dL
  }
});

const pulseRateSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  value: {
      type: Number,
      required: true,
      min: 0 // Pulse rate in bpm
  }
});

const respiratoryRateSchema = new mongoose.Schema({
  date: {
      type: Date,
      required: true,
      default: Date.now
  },
  value: {
      type: Number,
      required: true,
      min: 0 // Respiratory rate in bpm
  }
});

// Define the schema for the regPatient collection
const patientSchema = new mongoose.Schema({
  patientId: {
    type: String,
    required: true,
    unique: true,
    index: true,
  },
  userId: {
    type: String,
  },
  fName: {
    type: String,
    required: true,
  },
  lName: {
    type: String,
    required: true,
  },
  dob: {
    type: Date,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    required: true,
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
  profilePic: {
    type: String,
  },
  bloodGroup: {
    type: String,
  },
  allergies: [
    {
      type: String,
    },
  ],

  familyHistory: [{ sickness: { type: String }, relationship: { type: String } }],

  currentMedications: [
    {
      name: { type: String },
      dosage: { type: String },
      frequency: { type: String },
      reason: { type: String },
    },
  ],
  surgicalHistory: [{ name: { type: String }, date: { type: Date } }],

  treatmentHistory: [
    {
      treatmentRecord: {
        type: mongoose.Schema.Types.ObjectId, // treatmentHistory referenced
        ref: "TreatmentHistory",
      },
    },
  ],

  prescriptions: [
    {
      prescriptionRecord: {
        type: mongoose.Schema.Types.ObjectId, // prescription referenced
        ref: "Prescription",
      },
    },
  ],
  
  bloodPressure: [bloodPressureSchema],
  height: [heightSchema],
  weight: [weightSchema],
  temperature: [temperatureSchema],
  bloodSugar: [bloodSugarSchema],
  pulseRate: [pulseRateSchema],
  respiratoryRate: [respiratoryRateSchema],

  status: {
    type: Boolean,
    default: true,
  },
}, { timestamps: true });


//for id generation
const prefix = "PT";
const length = 10;

// Pre-save hook to generate id
patientSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;

  let patientId = await generateID(MyModel, prefix, "patientId", length);
  if (patientId != null && patientId != undefined) {
      this.patientId = patientId;
      next();
  } else {
      next(new Error("Error in ID generation"));
  }
});

// Create the patient model
const Patient = mongoose.model("Patient", patientSchema);

export default Patient;