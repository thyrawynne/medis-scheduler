const Patient = require("../models/patientModel");
const mongoose = require("mongoose");

// Mendapatkan semua data pasien
exports.getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("doctorId");
    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Gagal mengambil data pasien: " + err.message });
  }
};

// Membuat data pasien baru
exports.createPatient = async (req, res) => {
  const { name, age, address, phone, doctorId, appointmentDate } = req.body;

  // Validasi data yang masuk
  if (!name || !age || !address || !phone || !doctorId || !appointmentDate) {
    return res.status(400).json({ message: "Semua field harus diisi." });
  }

  // Validasi format phone number (misalnya 10-15 digit)
  const phoneRegex = /^\d{10,15}$/;
  if (!phone.match(phoneRegex)) {
    return res.status(400).json({ message: "Nomor telepon tidak valid. Harus terdiri dari 10 hingga 15 digit." });
  }

  // Memastikan doctorId valid
  if (!mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ message: "doctorId tidak valid." });
  }

  // Mengonversi appointmentDate menjadi format Date jika perlu
  const appointment = new Date(appointmentDate);
  if (isNaN(appointment)) {
    return res.status(400).json({ message: "Tanggal janji temu tidak valid." });
  }

  // Membuat objek pasien baru
  const patient = new Patient({
    name,
    age,
    address,
    phone,
    doctorId,
    appointmentDate: appointment // Menyimpan dalam format Date
  });

  try {
    // Menyimpan pasien ke database
    const savedPatient = await patient.save();
    res.status(201).json(savedPatient);
  } catch (err) {
    res.status(400).json({ message: "Gagal menyimpan pasien: " + err.message });
  }
};

// Mengupdate data pasien berdasarkan ID
exports.updatePatient = async (req, res) => {
  const { id } = req.params;
  const { name, age, address, phone, doctorId, appointmentDate } = req.body;

  try {
    // Mencari pasien berdasarkan ID
    const patient = await Patient.findById(id);
    if (!patient) {
      return res.status(404).json({ message: "Pasien tidak ditemukan" });
    }

    // Validasi data yang masuk
    if (appointmentDate) {
      const appointment = new Date(appointmentDate);
      if (isNaN(appointment)) {
        return res.status(400).json({ message: "Tanggal janji temu tidak valid." });
      }
    }

    // Memperbarui data pasien
    patient.name = name || patient.name;
    patient.age = age || patient.age;
    patient.address = address || patient.address;
    patient.phone = phone || patient.phone;
    patient.doctorId = doctorId || patient.doctorId;
    patient.appointmentDate = appointmentDate ? new Date(appointmentDate) : patient.appointmentDate;

    // Menyimpan perubahan
    const updatedPatient = await patient.save();
    res.json(updatedPatient);
  } catch (err) {
    res.status(400).json({ message: "Gagal mengupdate pasien: " + err.message });
  }
};
