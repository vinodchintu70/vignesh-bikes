const Notification = require('../models/Notification')

exports.getNotifications = async (req, res) => {
  try {
    const notifications = await Notification.find({ user: req.user._id }).sort({ createdAt: -1 }).limit(20)
    res.json({ success: true, notifications })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.markRead = async (req, res) => {
  try {
    await Notification.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, { read: true })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.markAllRead = async (req, res) => {
  try {
    await Notification.updateMany({ user: req.user._id, read: false }, { read: true })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.deleteNotification = async (req, res) => {
  try {
    await Notification.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    res.json({ success: true })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
