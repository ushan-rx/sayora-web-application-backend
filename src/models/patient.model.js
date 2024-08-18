const mongoose = require("mongoose");
const generateID = require("../services/common/generateID.service");

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

  prescriptions: {
    doctorId: {type: String,},
    medications: [{medication: {type: String,},dosage: {type: String,}, frequency: {type: String,}}],
    instructions: {type: String,},
    disease: {type: String,},
    date: {type: Date,default: Date.now}
  },

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
const customIdPrefix = "PAT";
const length = 5;

// Pre-save hook to generate id
patientSchema.pre("validate", async function (next) {
  const MyModel = this.constructor;
  // Find the last document with a custom ID starting with the provided prefix
  let lastPatient = await MyModel.find().sort({ _id: -1 }).limit(1);
  // Generate the new custom ID
  this.patientId = generateID(customIdPrefix, lastPatient[0] ? lastPatient[0].patientId : null, length);
  next();
});

// Create the patient model
const Patient = mongoose.model("Patient", patientSchema);

module.exports = Patient;