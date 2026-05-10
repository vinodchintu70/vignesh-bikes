const Review = require('../models/Review')
const Booking = require('../models/Booking')

// @POST /api/reviews
exports.createReview = async (req, res) => {
  try {
    const { bike, booking, rating, comment } = req.body

    const completedBooking = await Booking.findOne({ _id: booking, user: req.user._id, status: 'completed' })
    if (!completedBooking) return res.status(400).json({ message: 'You can only review bikes you have rented' })

    const existing = await Review.findOne({ user: req.user._id, bike })
    if (existing) return res.status(400).json({ message: 'You have already reviewed this bike' })

    const review = await Review.create({ user: req.user._id, bike, booking, rating, comment })
    await review.populate('user', 'name avatar')
    res.status(201).json({ success: true, review })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/reviews/bike/:bikeId
exports.getBikeReviews = async (req, res) => {
  try {
    const reviews = await Review.find({ bike: req.params.bikeId, isApproved: true })
      .populate('user', 'name avatar')
      .sort({ createdAt: -1 })
    res.json({ success: true, reviews })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/reviews/:id
exports.updateReview = async (req, res) => {
  try {
    const review = await Review.findOneAndUpdate({ _id: req.params.id, user: req.user._id }, req.body, { new: true })
    if (!review) return res.status(404).json({ message: 'Review not found' })
    res.json({ success: true, review })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @DELETE /api/reviews/:id
exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ _id: req.params.id, user: req.user._id })
    if (!review) return res.status(404).json({ message: 'Review not found' })
    res.json({ success: true, message: 'Review deleted' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
