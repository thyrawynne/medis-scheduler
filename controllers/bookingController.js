const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Notification = require("../models/notificationModel");

exports.createBooking = async (req, res) => {
  const { patientId, doctorId, appointmentDate } = req.body;

  // Validasi ObjectId
  if (!mongoose.Types.ObjectId.isValid(patientId) || !mongoose.Types.ObjectId.isValid(doctorId)) {
    return res.status(400).json({ message: "Invalid Patient or Doctor ID" });
  }

  // Validasi appointmentDate
  if (new Date(appointmentDate) < new Date()) {
    return res.status(400).json({ message: "Appointment date cannot be in the past" });
  }

  try {
    // Cek data pasien dan dokter
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(400).json({ message: "Patient or Doctor not found" });
    }

    // Simpan booking baru
    const newBooking = new Booking({
      patientId,
      doctorId,
      appointmentDate,
    });

    await newBooking.save();

    // Tambahkan notifikasi untuk pasien dan dokter
    await Notification.create({
      message: `Booking berhasil dengan Dr. ${doctor.name} pada ${appointmentDate}`,
      recipientId: patientId,
      recipientType: "Patient",
    });

    await Notification.create({
      message: `Pasien ${patient.name} telah membuat booking pada ${appointmentDate}`,
      recipientId: doctorId,
      recipientType: "Doctor",
    });

    res.status(201).json(newBooking);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("patientId", "name")
      .populate("doctorId", "name specialty");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get booking by patientId
exports.getBookingsByPatient = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.patientId)) {
    return res.status(400).json({ message: "Invalid Patient ID" });
  }

  try {
    const bookings = await Booking.find({ patientId: req.params.patientId })
      .populate("doctorId", "name specialty");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Get booking by doctorId
exports.getBookingsByDoctor = async (req, res) => {
  if (!mongoose.Types.ObjectId.isValid(req.params.doctorId)) {
    return res.status(400).json({ message: "Invalid Doctor ID" });
  }

  try {
    const bookings = await Booking.find({ doctorId: req.params.doctorId })
      .populate("patientId", "name age address phone");
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
