const express = require('express')
const router = express.Router()
const { getBikes, getFeaturedBikes, getOwnerBikes, getBike, createBike, updateBike, deleteBike, uploadBikeImages, checkAvailability } = require('../controllers/bikeController')
const { protect, authorize } = require('../middleware/auth')
const { uploadBikeImages: uploadMiddleware } = require('../config/cloudinary')

router.get('/', getBikes)
router.get('/featured', getFeaturedBikes)
router.get('/owner/my-bikes', protect, authorize('owner', 'admin'), getOwnerBikes)
router.get('/:id', getBike)
router.post('/', protect, authorize('owner', 'admin'), createBike)
router.put('/:id', protect, authorize('owner', 'admin'), updateBike)
router.delete('/:id', protect, authorize('owner', 'admin'), deleteBike)
router.post('/:id/images', protect, authorize('owner', 'admin'), uploadMiddleware, uploadBikeImages)
router.post('/:id/availability', checkAvailability)

module.exports = router
