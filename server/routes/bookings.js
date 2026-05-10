const express = require('express')
const router = express.Router()
const { createBooking, getUserBookings, getOwnerBookings, getBooking, cancelBooking, approveBooking, rejectBooking, completeBooking } = require('../controllers/bookingController')
const { protect, authorize } = require('../middleware/auth')

router.post('/', protect, createBooking)
router.get('/user/my-bookings', protect, getUserBookings)
router.get('/owner/bookings', protect, authorize('owner', 'admin'), getOwnerBookings)
router.get('/:id', protect, getBooking)
router.put('/:id/cancel', protect, cancelBooking)
router.put('/:id/approve', protect, authorize('owner', 'admin'), approveBooking)
router.put('/:id/reject', protect, authorize('owner', 'admin'), rejectBooking)
router.put('/:id/complete', protect, authorize('owner', 'admin'), completeBooking)

module.exports = router
