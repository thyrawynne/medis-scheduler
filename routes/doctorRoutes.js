const express = require("express");
const router = express.Router();
const Doctor = require("../models/doctorModel");

// GET all doctors
router.get("/", async (req, res) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new doctor
router.post("/", async (req, res) => {
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
});

module.exports = router;
