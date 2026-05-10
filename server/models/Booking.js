const mongoose = require('mongoose')

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  totalDays: { type: Number, required: true },
  pricePerDay: { type: Number, required: true },
  totalAmount: { type: Number, required: true },
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'active', 'completed', 'cancelled', 'rejected'],
    default: 'pending',
  },
  cancellationReason: { type: String },
  rejectionReason: { type: String },
  pickupLocation: { type: String },
  pickupTime: { type: String },
  dropTime: { type: String },
  notes: { type: String },
}, { timestamps: true })

bookingSchema.index({ user: 1, status: 1 })
bookingSchema.index({ bike: 1, startDate: 1, endDate: 1 })

module.exports = mongoose.model('Booking', bookingSchema)
