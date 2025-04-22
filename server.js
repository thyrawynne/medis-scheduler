require("dotenv").config(); // Memuat variabel lingkungan dari .env

const express = require("express");
const cors = require("cors"); // Menambahkan CORS untuk mengatasi masalah CORS
const mongoose = require("mongoose");
const path = require("path"); // Untuk menangani path folder

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CORS_ORIGIN || "*", // Configure CORS to allow specific domains
  methods: "GET,POST,PUT,DELETE", // Allowed methods
  allowedHeaders: "Content-Type,Authorization", // Allowed headers
}));

app.use(express.json()); // Middleware untuk parsing JSON

// Menyajikan file statis (HTML, CSS, JS, dll) dari folder 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Routes
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);

// Endpoint untuk mengecek server
app.get("/", (req, res) => {
  res.send("Medical Health Center API is running");
});

// Health Check Endpoint - Mengembalikan status server
app.get("/health", (req, res) => {
  res.status(200).json({ status: "Server is running smoothly" });
});

// Menghubungkan ke MongoDB dan memulai server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server berjalan di http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((err) => {
    console.error("Gagal connect MongoDB", err);
    process.exit(1); // Menghentikan server jika gagal terhubung ke MongoDB
  });

// Global Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);  // Log error untuk debugging
  res.status(500).json({ message: "Something went wrong, please try again later" });
});
