const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/bookingController");

// Check if the controller methods are correctly imported
console.log(ctrl.createBooking); // This should print a function

router.post("/", ctrl.createBooking); 
router.get("/", ctrl.getBookings);
router.get("/patient/:patientId", ctrl.getBookingsByPatient);
router.get("/doctor/:doctorId", ctrl.getBookingsByDoctor);
router.patch("/:id", ctrl.updateBookingStatus);
router.delete("/:id", ctrl.deleteBooking);

module.exports = router;
