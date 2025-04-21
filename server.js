require("dotenv").config(); // Memuat variabel lingkungan dari .env

const express = require("express");
const cors = require("cors"); // Menambahkan CORS untuk mengatasi masalah CORS
const mongoose = require("mongoose");
const app = express();

// Middleware
app.use(cors()); // Aktifkan CORS
app.use(express.json()); // Middleware untuk parsing JSON

// Routes
const doctorRoutes = require("./routes/doctorRoutes");
const patientRoutes = require("./routes/patientRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const notificationRoutes = require("./routes/notificationRoutes");

app.use("/api/doctors", doctorRoutes);
app.use("/api/patients", patientRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/notifications", notificationRoutes);

// Menghubungkan ke MongoDB dan memulai server
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(process.env.PORT || 3000, () => console.log(`Server berjalan di http://localhost:${process.env.PORT || 3000}`));
  })
  .catch((err) => console.error("Gagal connect MongoDB", err));

// Endpoint untuk mengecek server
app.get("/", (req, res) => {
  res.send("Medical Health Center API is running");
});
