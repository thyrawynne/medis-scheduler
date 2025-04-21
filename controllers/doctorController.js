const Doctor = require("../models/doctorModel");

exports.getAllDoctors = async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

exports.createDoctor = async (req, res) => {
  const { name, specialty, image, availableTimes } = req.body;

  const doctor = new Doctor({
    name,
    specialty,
    image,
    availableTimes
  });

  try {
    const savedDoctor = await doctor.save();
    res.status(201).json(savedDoctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
