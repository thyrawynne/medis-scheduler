const express = require("express");
const router = express.Router();
const bookingController = require("../controllers/bookingController");

router.post("/", bookingController.createBooking); // Untuk membuat booking
router.get("/", bookingController.getBookings); // Untuk mengambil semua booking
router.get("/:patientId", bookingController.getBookingsByPatient); // Untuk mengambil booking berdasarkan patientId
router.get("/doctor/:doctorId", bookingController.getBookingsByDoctor); // Untuk mengambil booking berdasarkan doctorId

module.exports = router;
