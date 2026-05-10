const Razorpay = require('razorpay')
const crypto = require('crypto')
const Payment = require('../models/Payment')
const Booking = require('../models/Booking')
const Notification = require('../models/Notification')

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
})

// @POST /api/payments/create-order
exports.createOrder = async (req, res) => {
  try {
    const { bookingId, amount } = req.body

    const booking = await Booking.findById(bookingId)
    if (!booking) return res.status(404).json({ message: 'Booking not found' })

    const order = await razorpay.orders.create({
      amount: Math.round(amount * 100), // paise
      currency: 'INR',
      receipt: `booking_${bookingId}`,
      notes: { bookingId: bookingId.toString(), userId: req.user._id.toString() },
    })

    const payment = await Payment.create({
      user: req.user._id,
      booking: bookingId,
      amount,
      razorpayOrderId: order.id,
    })

    res.json({ success: true, orderId: order.id, amount: order.amount, currency: order.currency, paymentId: payment._id })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/payments/verify
exports.verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, bookingId } = req.body

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest('hex')

    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ message: 'Payment verification failed' })
    }

    // Get payment details from Razorpay
    const rzpPayment = await razorpay.payments.fetch(razorpay_payment_id)

    const payment = await Payment.findOneAndUpdate(
      { razorpayOrderId: razorpay_order_id },
      {
        razorpayPaymentId: razorpay_payment_id,
        razorpaySignature: razorpay_signature,
        status: 'success',
        method: rzpPayment.method,
      },
      { new: true }
    )

    // Update booking payment status
    await Booking.findByIdAndUpdate(bookingId, { paymentStatus: 'paid', status: 'confirmed' })

    await Notification.create({
      user: req.user._id,
      title: 'Payment Successful',
      message: `Payment of ₹${payment.amount} received successfully`,
      type: 'payment',
      link: '/dashboard/payments',
    })

    res.json({ success: true, payment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/payments/history
exports.getPaymentHistory = async (req, res) => {
  try {
    const payments = await Payment.find({ user: req.user._id })
      .populate({ path: 'booking', populate: { path: 'bike', select: 'name brand' } })
      .sort({ createdAt: -1 })
    res.json({ success: true, payments })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/payments/:id/refund
exports.refundPayment = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id)
    if (!payment) return res.status(404).json({ message: 'Payment not found' })
    if (payment.status !== 'success') return res.status(400).json({ message: 'Payment cannot be refunded' })

    const refund = await razorpay.payments.refund(payment.razorpayPaymentId, {
      amount: Math.round(payment.amount * 100),
    })

    payment.status = 'refunded'
    payment.refundId = refund.id
    payment.refundAmount = payment.amount
    payment.refundedAt = new Date()
    await payment.save()

    res.json({ success: true, payment })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
