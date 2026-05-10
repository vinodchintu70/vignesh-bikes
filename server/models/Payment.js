const mongoose = require('mongoose')

const paymentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: 'INR' },
  status: { type: String, enum: ['pending', 'success', 'failed', 'refunded'], default: 'pending' },
  method: { type: String },
  razorpayOrderId: { type: String },
  razorpayPaymentId: { type: String },
  razorpaySignature: { type: String },
  refundId: { type: String },
  refundAmount: { type: Number },
  refundedAt: { type: Date },
  invoiceUrl: { type: String },
}, { timestamps: true })

module.exports = mongoose.model('Payment', paymentSchema)
