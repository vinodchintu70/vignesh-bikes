const express = require('express')
const router = express.Router()
const { getWishlist, addToWishlist, removeFromWishlist, uploadAvatar } = require('../controllers/userController')
const { protect } = require('../middleware/auth')
const { uploadAvatar: uploadMiddleware } = require('../config/cloudinary')

router.get('/wishlist', protect, getWishlist)
router.post('/wishlist/:bikeId', protect, addToWishlist)
router.delete('/wishlist/:bikeId', protect, removeFromWishlist)
router.post('/avatar', protect, uploadMiddleware, uploadAvatar)

module.exports = router
