const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  address: { type: String, required: true },
  phone: { type: String, required: true },
  doctorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Doctor", // Menghubungkan dengan model Doctor
    required: true
  },
  appointmentDate: { type: Date, required: true }
}, { timestamps: true });

const Patient = mongoose.model("Patient", patientSchema);
module.exports = Patient;
