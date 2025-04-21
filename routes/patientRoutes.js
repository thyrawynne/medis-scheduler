const express = require("express");
const router = express.Router();
const patientController = require("../controllers/patientController");

// GET all patients
router.get("/", patientController.getAllPatients);

// POST a new patient
router.post("/", patientController.createPatient);

// PUT update a patient by ID
router.put("/:id", patientController.updatePatient);

module.exports = router;
