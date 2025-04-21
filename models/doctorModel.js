const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  image: { type: String, required: true },  // URL untuk gambar
  availableTimes: [{ type: String }],  // Contoh: ["09:00-12:00", "14:00-17:00"]
});

module.exports = mongoose.model("Doctor", doctorSchema);
