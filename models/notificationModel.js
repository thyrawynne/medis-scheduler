const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  message: {
    type: String,
    required: true, // Pesan notifikasi wajib ada
  },
  recipientId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, // ID penerima harus ada
    refPath: 'recipientType', // Mengacu pada tipe penerima (Patient atau Doctor)
  },
  recipientType: {
    type: String,
    required: true, // Tipe penerima wajib diisi
    enum: ['Patient', 'Doctor'], // Hanya menerima nilai 'Patient' atau 'Doctor'
  },
  createdAt: {
    type: Date,
    default: Date.now, // Default waktu pembuatan notifikasi adalah waktu saat ini
  },
  read: {
    type: Boolean,
    default: false, // Defaultnya notifikasi dianggap belum dibaca
  },
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
