const User = require('../models/User')
const Bike = require('../models/Bike')
const Booking = require('../models/Booking')
const Payment = require('../models/Payment')
const Notification = require('../models/Notification')

// @GET /api/admin/dashboard
exports.getDashboard = async (req, res) => {
  try {
    const [totalUsers, totalBikes, totalBookings, payments] = await Promise.all([
      User.countDocuments(),
      Bike.countDocuments(),
      Booking.countDocuments(),
      Payment.find({ status: 'success' }),
    ])
    const totalRevenue = payments.reduce((s, p) => s + p.amount, 0)
    res.json({ success: true, stats: { totalUsers, totalBikes, totalBookings, totalRevenue } })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/admin/users
exports.getUsers = async (req, res) => {
  try {
    const { page = 1, limit = 20, search, role } = req.query
    const query = {}
    if (search) query.$or = [{ name: { $regex: search, $options: 'i' } }, { email: { $regex: search, $options: 'i' } }]
    if (role) query.role = role
    const users = await User.find(query).sort({ createdAt: -1 }).skip((page - 1) * limit).limit(Number(limit))
    const total = await User.countDocuments(query)
    res.json({ success: true, users, total })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/admin/users/:id/toggle-status
exports.toggleUserStatus = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) return res.status(404).json({ message: 'User not found' })
    user.isActive = !user.isActive
    await user.save()
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/admin/bikes
exports.getBikes = async (req, res) => {
  try {
    const bikes = await Bike.find().populate('owner', 'name email').sort({ createdAt: -1 })
    res.json({ success: true, bikes })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/admin/bikes/:id/approve
exports.approveBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, { status: 'approved' }, { new: true })
    if (!bike) return res.status(404).json({ message: 'Bike not found' })
    await Notification.create({ user: bike.owner, title: 'Bike Approved!', message: `Your bike "${bike.name}" has been approved and is now live.`, type: 'system' })
    res.json({ success: true, bike })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/admin/bikes/:id/reject
exports.rejectBike = async (req, res) => {
  try {
    const bike = await Bike.findByIdAndUpdate(req.params.id, { status: 'rejected' }, { new: true })
    if (!bike) return res.status(404).json({ message: 'Bike not found' })
    await Notification.create({ user: bike.owner, title: 'Bike Rejected', message: `Your bike "${bike.name}" was rejected. Reason: ${req.body.reason}`, type: 'system' })
    res.json({ success: true, bike })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/admin/bookings
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user', 'name email').populate('bike', 'name brand').sort({ createdAt: -1 }).limit(100)
    res.json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/admin/payments
exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user', 'name email').populate({ path: 'booking', populate: { path: 'bike', select: 'name' } }).sort({ createdAt: -1 }).limit(100)
    res.json({ success: true, payments })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
