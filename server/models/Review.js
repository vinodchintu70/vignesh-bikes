const mongoose = require('mongoose')

const reviewSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  bike: { type: mongoose.Schema.Types.ObjectId, ref: 'Bike', required: true },
  booking: { type: mongoose.Schema.Types.ObjectId, ref: 'Booking', required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  comment: { type: String, required: true, trim: true },
  isApproved: { type: Boolean, default: true },
}, { timestamps: true })

reviewSchema.index({ bike: 1, user: 1 }, { unique: true })

// Update bike rating after review save
reviewSchema.post('save', async function () {
  const Bike = require('./Bike')
  const Review = this.constructor
  const stats = await Review.aggregate([
    { $match: { bike: this.bike } },
    { $group: { _id: '$bike', avgRating: { $avg: '$rating' }, count: { $sum: 1 } } },
  ])
  if (stats.length > 0) {
    await Bike.findByIdAndUpdate(this.bike, {
      rating: Math.round(stats[0].avgRating * 10) / 10,
      totalReviews: stats[0].count,
    })
  }
})

module.exports = mongoose.model('Review', reviewSchema)
