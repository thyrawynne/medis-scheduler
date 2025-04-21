const Notification = require("../models/notificationModel");

// Mengambil semua notifikasi
exports.getAllNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Membuat notifikasi baru
exports.createNotification = async (req, res) => {
  const { message, recipientId, recipientType } = req.body;

  // Validasi input
  if (!message || !recipientId || !recipientType) {
    return res.status(400).json({ message: "Message, recipientId, and recipientType are required" });
  }

  // Validasi recipientType harus 'Patient' atau 'Doctor'
  if (!['Patient', 'Doctor'].includes(recipientType)) {
    return res.status(400).json({ message: "Invalid recipientType. Must be 'Patient' or 'Doctor'" });
  }

  const notification = new Notification({
    message,
    recipientId,
    recipientType,
    createdAt: new Date(),
    read: false, // Notifikasi baru dianggap belum dibaca
  });

  try {
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Menandai notifikasi sebagai sudah dibaca
exports.markNotificationAsRead = async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    notification.read = true; // Menandai sebagai sudah dibaca
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Mendapatkan notifikasi berdasarkan recipientId dan recipientType
exports.getNotificationsByRecipient = async (req, res) => {
  const { recipientId, recipientType } = req.params;

  if (!['Patient', 'Doctor'].includes(recipientType)) {
    return res.status(400).json({ message: "Invalid recipientType. Must be 'Patient' or 'Doctor'" });
  }

  try {
    const notifications = await Notification.find({ recipientId, recipientType });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
