const Dokter = require('../models/Dokter');

// GET semua dokter
exports.getDokter = async (req, res) => {
  const data = await Dokter.find();
  res.json(data);
};

// POST tambah dokter
exports.tambahDokter = async (req, res) => {
  const newDokter = new Dokter(req.body);
  await newDokter.save();
  res.json({ message: 'Dokter ditambahkan!' });
};
