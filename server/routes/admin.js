const express = require('express')
const router = express.Router()
const { getDashboard, getUsers, toggleUserStatus, getBikes, approveBike, rejectBike, getBookings, getPayments } = require('../controllers/adminController')
const { protect, authorize } = require('../middleware/auth')

router.use(protect, authorize('admin'))

router.get('/dashboard', getDashboard)
router.get('/users', getUsers)
router.put('/users/:id/toggle-status', toggleUserStatus)
router.get('/bikes', getBikes)
router.put('/bikes/:id/approve', approveBike)
router.put('/bikes/:id/reject', rejectBike)
router.get('/bookings', getBookings)
router.get('/payments', getPayments)

module.exports = router
