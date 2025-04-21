const express = require("express");
const router = express.Router();
const Notification = require("../models/notificationModel");

// GET all notifications
router.get("/", async (req, res) => {
  try {
    const notifications = await Notification.find();
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST a new notification
router.post("/", async (req, res) => {
  const { message, recipientId, recipientType } = req.body;

  // Validasi input
  if (!message || !recipientId || !recipientType) {
    return res.status(400).json({ message: "All fields are required" });
  }

  // Membuat notifikasi baru
  const notification = new Notification({
    message,
    recipientId,
    recipientType
  });

  try {
    // Menyimpan notifikasi
    const savedNotification = await notification.save();
    res.status(201).json(savedNotification);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// PATCH to mark notification as read
router.patch("/:id", async (req, res) => {
  try {
    const notification = await Notification.findById(req.params.id);
    if (!notification) {
      return res.status(404).json({ message: "Notification not found" });
    }

    // Tandai notifikasi sebagai sudah dibaca
    notification.read = true;
    const updatedNotification = await notification.save();
    res.json(updatedNotification);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
