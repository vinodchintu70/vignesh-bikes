const Booking = require('../models/Booking')
const Bike = require('../models/Bike')
const Notification = require('../models/Notification')
const { sendBookingRequestToOwner, sendBookingConfirmation } = require('../utils/email')
const { differenceInDays } = require('date-fns')

exports.createBooking = async (req, res) => {
  try {
    const { bike: bikeId, startDate, endDate, totalAmount, pickupLocation, pickupTime, dropTime, notes, customerPhone } = req.body

    const bike = await Bike.findById(bikeId).populate('owner', 'name email phone')
    if (!bike) return res.status(404).json({ message: 'Bike not found' })
    if (!bike.available) return res.status(400).json({ message: 'Bike is not available' })

    if (!pickupLocation) return res.status(400).json({ message: 'Pickup location is required' })
    if (!pickupTime) return res.status(400).json({ message: 'Pickup time is required' })
    if (!dropTime) return res.status(400).json({ message: 'Drop time is required' })

    const conflict = await Booking.findOne({
      bike: bikeId,
      status: { $in: ['confirmed', 'active'] },
      $or: [{ startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } }],
    })
    if (conflict) return res.status(400).json({ message: 'Bike is already booked for these dates' })

    const totalDays = Math.max(1, differenceInDays(new Date(endDate), new Date(startDate)))

    const booking = await Booking.create({
      user: req.user._id,
      bike: bikeId,
      owner: bike.owner._id,
      startDate,
      endDate,
      totalDays,
      pricePerDay: bike.pricePerDay,
      totalAmount: totalAmount || Math.round(bike.pricePerDay * totalDays),
      pickupLocation,
      pickupTime,
      dropTime,
      notes,
      status: 'pending',
    })

    await booking.populate('bike')
    await booking.populate('user', 'name email phone')

    // Send email to owner about new booking request
    await sendBookingRequestToOwner({
      ownerEmail: bike.owner.email,
      ownerName: bike.owner.name,
      customerName: req.user.name,
      customerEmail: req.user.email,
      customerPhone: customerPhone || req.user.phone || 'Not provided',
      bikeName: bike.name,
      bikeCategory: bike.category,
      pricePerDay: bike.pricePerDay,
      startDate,
      endDate,
      totalDays,
      totalAmount: booking.totalAmount,
      pickupLocation,
      pickupTime,
      dropTime,
      notes: notes || 'None',
      bookingId: booking._id,
    })

    await Notification.create({
      user: bike.owner._id,
      title: 'New Booking Request',
      message: `${req.user.name} wants to book ${bike.name}`,
      type: 'booking',
      link: '/owner/bookings',
    })

    res.status(201).json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('bike', 'name brand images location pricePerDay')
      .sort({ createdAt: -1 })
    res.json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getOwnerBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ owner: req.user._id })
      .populate('bike', 'name brand images')
      .populate('user', 'name email phone avatar')
      .sort({ createdAt: -1 })
    res.json({ success: true, bookings })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.getBooking = async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.id).populate('bike').populate('user', 'name email phone')
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (booking.user._id.toString() !== req.user._id.toString() &&
        booking.owner.toString() !== req.user._id.toString() &&
        req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' })
    }
    res.json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.cancelBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, user: req.user._id })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    if (!['pending', 'confirmed'].includes(booking.status))
      return res.status(400).json({ message: 'Cannot cancel this booking' })

    booking.status = 'cancelled'
    booking.cancellationReason = req.body.reason || 'Cancelled by user'
    await booking.save()

    await Notification.create({
      user: booking.owner,
      title: 'Booking Cancelled',
      message: `A booking has been cancelled by the customer`,
      type: 'booking',
    })
    res.json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.approveBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, owner: req.user._id })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    booking.status = 'confirmed'
    await booking.save()
    await booking.populate(['bike', 'user'])

    await sendBookingConfirmation(booking.user.email, booking)

    await Notification.create({
      user: booking.user._id,
      title: 'Booking Approved!',
      message: `Your booking for ${booking.bike.name} has been approved`,
      type: 'booking',
      link: '/dashboard/bookings',
    })
    res.json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.rejectBooking = async (req, res) => {
  try {
    const booking = await Booking.findOne({ _id: req.params.id, owner: req.user._id })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    booking.status = 'rejected'
    booking.rejectionReason = req.body.reason || 'Rejected by owner'
    await booking.save()

    await Notification.create({
      user: booking.user,
      title: 'Booking Rejected',
      message: `Your booking has been rejected. Reason: ${booking.rejectionReason}`,
      type: 'booking',
    })
    res.json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

exports.completeBooking = async (req, res) => {
  try {
    const booking = await Booking.findByIdAndUpdate(req.params.id, { status: 'completed' }, { new: true })
    if (!booking) return res.status(404).json({ message: 'Booking not found' })
    await Bike.findByIdAndUpdate(booking.bike, { $inc: { totalBookings: 1 } })
    res.json({ success: true, booking })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
