const mongoose = require('mongoose');

const DokterSchema = new mongoose.Schema({
  nama: String,
  spesialis: String,
  jadwal: [String], // misal: ['Senin 08:00-12:00', 'Rabu 13:00-16:00']
  notifikasi: String
});

module.exports = mongoose.model('Dokter', DokterSchema);
