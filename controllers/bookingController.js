const mongoose = require("mongoose");
const Booking = require("../models/bookingModel");
const Patient = require("../models/patientModel");
const Doctor = require("../models/doctorModel");
const Notification = require("../models/notificationModel");

// Create a new booking
exports.createBooking = async (req, res) => {
  const { patientId, doctorId, appointmentDate, phone, email, nomorRekamMedis, keluhan, metodeKonsultasi, status, address } = req.body;

  try {
    // Validate patient and doctor IDs
    const patient = await Patient.findById(patientId);
    const doctor = await Doctor.findById(doctorId);

    if (!patient || !doctor) {
      return res.status(400).json({ message: "Patient or Doctor not found" });
    }

    // Validate appointment date (cannot be in the past)
    const appointment = new Date(appointmentDate);
    if (appointment < new Date()) {
      return res.status(400).json({ message: "Appointment date cannot be in the past" });
    }

    // Check if the patient already has a booking with the doctor on the same date
    const existingBooking = await Booking.findOne({ patientId, doctorId, appointmentDate });
    if (existingBooking) {
      return res.status(400).json({ message: "You already have a booking with this doctor on this date" });
    }

    // Create new booking
    const newBooking = new Booking({
      patientId,
      doctorId,
      appointmentDate,
      phone,
      email,
      nomorRekamMedis,
      keluhan,
      metodeKonsultasi,
      status,
      address
    });

    await newBooking.save();

    // Return success response with new booking data
    res.status(201).json({
      message: "Booking created successfully",
      data: newBooking
    });
  } catch (err) {
    console.error("Error creating booking:", err);
    res.status(500).json({
      message: "Error creating booking",
      error: err.message
    });
  }
};

// Get all bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('patientId doctorId');
    res.status(200).json({
      message: "Bookings retrieved successfully",
      data: bookings
    });
  } catch (err) {
    console.error("Error retrieving bookings:", err);
    res.status(500).json({
      message: "Error retrieving bookings",
      error: err.message
    });
  }
};

// Get bookings by patient
exports.getBookingsByPatient = async (req, res) => {
  const { patientId } = req.params;
  
  try {
    const bookings = await Booking.find({ patientId }).populate('doctorId');
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this patient" });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully",
      data: bookings
    });
  } catch (err) {
    console.error("Error retrieving bookings for patient:", err);
    res.status(500).json({
      message: "Error retrieving bookings for patient",
      error: err.message
    });
  }
};

// Get bookings by doctor
exports.getBookingsByDoctor = async (req, res) => {
  const { doctorId } = req.params;

  try {
    const bookings = await Booking.find({ doctorId }).populate('patientId');
    if (!bookings || bookings.length === 0) {
      return res.status(404).json({ message: "No bookings found for this doctor" });
    }

    res.status(200).json({
      message: "Bookings retrieved successfully",
      data: bookings
    });
  } catch (err) {
    console.error("Error retrieving bookings for doctor:", err);
    res.status(500).json({
      message: "Error retrieving bookings for doctor",
      error: err.message
    });
  }
};

// Update booking status
exports.updateBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const updatedBooking = await Booking.findByIdAndUpdate(id, { status }, { new: true });
    if (!updatedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking status updated successfully",
      data: updatedBooking
    });
  } catch (err) {
    console.error("Error updating booking status:", err);
    res.status(500).json({
      message: "Error updating booking status",
      error: err.message
    });
  }
};

// Delete a booking
exports.deleteBooking = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBooking = await Booking.findByIdAndDelete(id);
    if (!deletedBooking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking deleted successfully"
    });
  } catch (err) {
    console.error("Error deleting booking:", err);
    res.status(500).json({
      message: "Error deleting booking",
      error: err.message
    });
  }
};
