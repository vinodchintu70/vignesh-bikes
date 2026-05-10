const User = require('../models/User')
const Bike = require('../models/Bike')

// @GET /api/users/wishlist
exports.getWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('wishlist')
    res.json({ success: true, wishlist: user.wishlist })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/users/wishlist/:bikeId
exports.addToWishlist = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    if (user.wishlist.includes(req.params.bikeId)) return res.status(400).json({ message: 'Already in wishlist' })
    user.wishlist.push(req.params.bikeId)
    await user.save()
    res.json({ success: true, message: 'Added to wishlist' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @DELETE /api/users/wishlist/:bikeId
exports.removeFromWishlist = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.user._id, { $pull: { wishlist: req.params.bikeId } })
    res.json({ success: true, message: 'Removed from wishlist' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/users/avatar
exports.uploadAvatar = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' })
    const user = await User.findByIdAndUpdate(req.user._id, { avatar: req.file.path }, { new: true })
    res.json({ success: true, avatar: user.avatar })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
