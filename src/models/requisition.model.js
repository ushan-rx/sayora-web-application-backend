import mongoose from "mongoose";

// Define the schema for the requesition model
const requesitionSchema = new mongoose.Schema({
  patientId: {
    type: String,
  },
  doctorId: {
    type: String,
  },
  testName: {
    type: String,
  },
  reqDate: {
    type: Date,
  },
  is_uploaded: {
    type: Boolean,
    default: false,
  },
});

// Create the requesition model
const Requesition = mongoose.model("requesition", requesitionSchema);

export default Requesition;
