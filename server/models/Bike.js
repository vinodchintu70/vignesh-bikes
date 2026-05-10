const mongoose = require('mongoose')

const bikeSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  brand: { type: String, required: true, trim: true },
  category: { type: String, required: true, enum: ['Sports', 'Cruiser', 'Adventure', 'Classic', 'Electric', 'Scooter'] },
  pricePerDay: { type: Number, required: true, min: 1 },
  location: { type: String, required: true },
  description: { type: String },
  images: [{ type: String }],
  available: { type: Boolean, default: true },
  status: { type: String, enum: ['pending', 'approved', 'rejected'], default: 'pending' },
  owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  year: { type: Number },
  specs: {
    engine: String,
    fuelType: { type: String, enum: ['Petrol', 'Electric', 'Diesel'], default: 'Petrol' },
    mileage: String,
    maxSpeed: String,
    transmission: { type: String, enum: ['Manual', 'Automatic', 'Semi-Automatic'], default: 'Manual' },
  },
  features: [{ type: String }],
  rating: { type: Number, default: 0, min: 0, max: 5 },
  totalReviews: { type: Number, default: 0 },
  totalBookings: { type: Number, default: 0 },
  coordinates: {
    lat: Number,
    lng: Number,
  },
  isFeatured: { type: Boolean, default: false },
}, { timestamps: true })

bikeSchema.index({ location: 'text', name: 'text', brand: 'text' })
bikeSchema.index({ category: 1, available: 1, pricePerDay: 1 })

module.exports = mongoose.model('Bike', bikeSchema)
