const Bike = require('../models/Bike')
const Booking = require('../models/Booking')

// @GET /api/bikes
exports.getBikes = async (req, res) => {
  try {
    const { search, category, brand, minPrice, maxPrice, available, sortBy = 'createdAt', sortOrder = 'desc', page = 1, limit = 9, location } = req.query

    const query = { status: 'approved' }
    if (search) query.$text = { $search: search }
    if (category) query.category = category
    if (brand) query.brand = brand
    if (available === 'true') query.available = true
    if (location) query.location = { $regex: location, $options: 'i' }
    if (minPrice || maxPrice) {
      query.pricePerDay = {}
      if (minPrice) query.pricePerDay.$gte = Number(minPrice)
      if (maxPrice) query.pricePerDay.$lte = Number(maxPrice)
    }

    const sort = { [sortBy]: sortOrder === 'asc' ? 1 : -1 }
    const skip = (Number(page) - 1) * Number(limit)

    const [bikes, total] = await Promise.all([
      Bike.find(query).populate('owner', 'name avatar').sort(sort).skip(skip).limit(Number(limit)),
      Bike.countDocuments(query),
    ])

    res.json({ success: true, bikes, total, totalPages: Math.ceil(total / Number(limit)), currentPage: Number(page) })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/bikes/featured
exports.getFeaturedBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ status: 'approved', available: true, isFeatured: true }).populate('owner', 'name avatar').limit(6).sort({ rating: -1 })
    res.json({ success: true, bikes })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/bikes/owner/my-bikes
exports.getOwnerBikes = async (req, res) => {
  try {
    const bikes = await Bike.find({ owner: req.user._id }).sort({ createdAt: -1 })
    res.json({ success: true, bikes })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/bikes/:id
exports.getBike = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id).populate('owner', 'name avatar phone email')
    if (!bike) return res.status(404).json({ message: 'Bike not found' })
    res.json({ success: true, bike })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/bikes
exports.createBike = async (req, res) => {
  try {
    const bike = await Bike.create({ ...req.body, owner: req.user._id })
    res.status(201).json({ success: true, bike })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/bikes/:id
exports.updateBike = async (req, res) => {
  try {
    const bike = await Bike.findOne({ _id: req.params.id, owner: req.user._id })
    if (!bike && req.user.role !== 'admin') return res.status(404).json({ message: 'Bike not found or unauthorized' })

    const updated = await Bike.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
    res.json({ success: true, bike: updated })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @DELETE /api/bikes/:id
exports.deleteBike = async (req, res) => {
  try {
    const bike = await Bike.findOne({ _id: req.params.id, owner: req.user._id })
    if (!bike && req.user.role !== 'admin') return res.status(404).json({ message: 'Bike not found or unauthorized' })
    await Bike.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Bike deleted successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/bikes/:id/images
exports.uploadBikeImages = async (req, res) => {
  try {
    const bike = await Bike.findById(req.params.id)
    if (!bike) return res.status(404).json({ message: 'Bike not found' })

    const imageUrls = req.files.map(file => file.path)
    bike.images = [...bike.images, ...imageUrls].slice(0, 5)
    await bike.save()
    res.json({ success: true, images: bike.images })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/bikes/:id/availability
exports.checkAvailability = async (req, res) => {
  try {
    const { startDate, endDate } = req.body
    const conflicting = await Booking.findOne({
      bike: req.params.id,
      status: { $in: ['confirmed', 'active'] },
      $or: [
        { startDate: { $lte: new Date(endDate) }, endDate: { $gte: new Date(startDate) } },
      ],
    })
    res.json({ success: true, available: !conflicting })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
