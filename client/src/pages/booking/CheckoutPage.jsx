import { useState, useEffect } from 'react'
import { useParams, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiMapPin, FiShield, FiCheck, FiClock, FiUser, FiPhone, FiMail } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bikeAPI, bookingAPI } from '../../services/api'
import { sendBookingRequestEmail } from '../../services/emailService'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { format } from 'date-fns'

export default function CheckoutPage() {
  const { bikeId } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { startDate, endDate, totalDays, totalPrice, pickupTime, returnTime, pickupLocation } = location.state || {}

  const [bike, setBike] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [phone, setPhone] = useState(user?.phone || '')
  const [notes, setNotes] = useState('')

  const serviceFee = Math.round((totalPrice || 0) * 0.05)
  const grandTotal = (totalPrice || 0) + serviceFee

  useEffect(() => {
    if (!startDate || !endDate) { navigate('/bikes'); return }
    bikeAPI.getById(bikeId)
      .then(({ data }) => setBike(data.bike))
      .catch(() => setBike(mockBike))
      .finally(() => setLoading(false))
  }, [bikeId])

  const handleConfirmBooking = async () => {
    if (!user?.name || !user?.email) {
      toast.error('Please login to confirm booking')
      navigate('/login')
      return
    }
    if (!phone) {
      toast.error('Please enter your phone number')
      return
    }

    setSubmitting(true)
    try {
      const res = await bookingAPI.create({
        bike: bikeId,
        startDate,
        endDate,
        totalAmount: grandTotal,
        pickupLocation,
        pickupTime,
        dropTime: returnTime,
        notes,
      })
      const bookingId = res.data.booking._id
      await sendBookingRequestEmail({
        customerName: user?.name, customerEmail: user?.email, customerPhone: phone,
        bikeName: bike?.name, bikeCategory: bike?.category, pricePerDay: bike?.pricePerDay,
        startDate, endDate, totalDays, pickupTime, returnTime, pickupLocation,
        totalAmount: grandTotal, bookingId, notes: notes || 'None',
      })
      toast.success('Booking request sent to owner! ✅')
      navigate(`/booking-confirmation/${bookingId}`)
    } catch (err) {
      toast.error(err.response?.data?.message || 'Something went wrong. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) return (
    <div className="min-h-screen bg-dark-bg pt-20 flex items-center justify-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  )

  return (
    <>
      <Helmet><title>Confirm Booking - Vignesh Konda Bike Rentals</title></Helmet>
      <div className="min-h-screen bg-dark-bg pt-20 px-4 py-8">
        <div className="max-w-4xl mx-auto">

          {/* Header */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-1">
              Vignesh Konda Bike Rentals
            </p>
            <h1 className="font-display font-bold text-3xl text-white">
              Confirm Your <span className="gradient-text">Booking</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm">
              Review your booking details and confirm. No payment required now — pay when you pick up the bike.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left */}
            <div className="lg:col-span-2 space-y-6">

              {/* Bike Details */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <MdDirectionsBike className="text-primary" /> Bike Details
                </h3>
                <div className="flex gap-4">
                  <div className="w-24 h-20 bg-primary/10 rounded-xl flex-shrink-0 overflow-hidden">
                    {bike?.images?.[0]
                      ? <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover rounded-xl" />
                      : <div className="w-full h-full flex items-center justify-center"><MdDirectionsBike className="text-primary text-4xl" /></div>}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-lg">{bike?.name}</h4>
                    <p className="text-gray-400 text-sm">{bike?.brand} · {bike?.category}</p>
                    <div className="flex items-center gap-1 text-gray-400 text-sm mt-1">
                      <FiMapPin size={12} className="text-secondary" />
                      <span>{bike?.location}</span>
                    </div>
                    <p className="text-primary font-bold mt-1">₹{bike?.pricePerDay}/day</p>
                  </div>
                </div>
              </motion.div>

              {/* Rental Schedule */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }} className="card">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FiCalendar className="text-primary" /> Rental Schedule
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-dark-hover rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FiCalendar size={12} className="text-primary" />
                      <p className="text-gray-400 text-xs">Pickup Date</p>
                    </div>
                    <p className="text-white font-semibold">
                      {startDate ? format(new Date(startDate), 'dd MMM yyyy') : '-'}
                    </p>
                  </div>
                  <div className="bg-dark-hover rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FiCalendar size={12} className="text-primary" />
                      <p className="text-gray-400 text-xs">Return Date</p>
                    </div>
                    <p className="text-white font-semibold">
                      {endDate ? format(new Date(endDate), 'dd MMM yyyy') : '-'}
                    </p>
                  </div>
                  <div className="bg-dark-hover rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FiClock size={12} className="text-primary" />
                      <p className="text-gray-400 text-xs">Pickup Time</p>
                    </div>
                    <p className="text-white font-semibold">{pickupTime || '-'}</p>
                  </div>
                  <div className="bg-dark-hover rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FiClock size={12} className="text-primary" />
                      <p className="text-gray-400 text-xs">Return Time</p>
                    </div>
                    <p className="text-white font-semibold">{returnTime || '-'}</p>
                  </div>
                </div>

                <div className="bg-primary/10 border border-primary/20 rounded-xl p-4 mt-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <FiMapPin size={12} className="text-secondary" />
                    <p className="text-gray-400 text-xs">Pickup Location</p>
                  </div>
                  <p className="text-white font-semibold">{pickupLocation || '-'}</p>
                </div>

                {totalDays > 0 && (
                  <div className="mt-3">
                    <span className="badge bg-secondary/20 text-secondary text-xs">
                      {totalDays} day{totalDays > 1 ? 's' : ''} rental
                    </span>
                  </div>
                )}
              </motion.div>

              {/* Customer Info */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
                <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                  <FiUser className="text-primary" /> Your Information
                </h3>
                <div className="grid sm:grid-cols-2 gap-4 mb-4">
                  <div className="bg-dark-hover rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FiUser size={12} className="text-primary" />
                      <p className="text-gray-400 text-xs">Full Name</p>
                    </div>
                    <p className="text-white font-medium text-sm">{user?.name}</p>
                  </div>
                  <div className="bg-dark-hover rounded-xl p-4">
                    <div className="flex items-center gap-1.5 mb-1">
                      <FiMail size={12} className="text-primary" />
                      <p className="text-gray-400 text-xs">Email</p>
                    </div>
                    <p className="text-white font-medium text-sm truncate">{user?.email}</p>
                  </div>
                </div>

                {/* Phone input */}
                <div>
                  <label className="text-gray-400 text-sm mb-1.5 flex items-center gap-1">
                    <FiPhone size={12} className="text-primary" /> Phone Number *
                  </label>
                  <div className="relative">
                    <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={15} />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="input-field pl-11"
                      required
                    />
                  </div>
                  <p className="text-gray-500 text-xs mt-1">Owner will call you on this number to confirm</p>
                </div>

                {/* Notes */}
                <div className="mt-4">
                  <label className="text-gray-400 text-sm mb-1.5 block">Special Notes (optional)</label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Any special requests or questions for the owner..."
                    rows={3}
                    className="input-field resize-none"
                  />
                </div>
              </motion.div>

              {/* Pay at pickup notice */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}
                className="flex items-start gap-3 p-4 bg-accent/10 border border-accent/20 rounded-xl"
              >
                <span className="text-2xl flex-shrink-0">💵</span>
                <div>
                  <p className="text-accent font-semibold text-sm">Pay at Pickup — No Online Payment Needed</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Just confirm your booking now. Pay the full amount of <span className="text-white font-semibold">₹{grandTotal}</span> in cash when you pick up the bike.
                  </p>
                </div>
              </motion.div>

              {/* Security */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}
                className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 rounded-xl"
              >
                <FiShield className="text-green-400 flex-shrink-0" size={20} />
                <p className="text-green-400 text-sm">
                  Your booking request will be sent directly to the owner's email and you'll receive a confirmation.
                </p>
              </motion.div>
            </div>

            {/* Right — Summary */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
              className="card h-fit sticky top-24"
            >
              <h3 className="text-white font-semibold mb-6">Booking Summary</h3>

              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">₹{bike?.pricePerDay} × {totalDays} day{totalDays > 1 ? 's' : ''}</span>
                  <span className="text-white">₹{totalPrice}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Service fee (5%)</span>
                  <span className="text-white">₹{serviceFee}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Insurance</span>
                  <span className="text-green-400">Included</span>
                </div>
                <div className="border-t border-dark-border pt-3 flex justify-between font-bold">
                  <span className="text-white text-lg">Total</span>
                  <span className="text-primary text-2xl">₹{grandTotal}</span>
                </div>
                <p className="text-accent text-xs text-center font-medium">
                  💵 Pay this amount at pickup
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {[
                  'No online payment required',
                  'Free cancellation up to 24h',
                  'Owner will confirm via call',
                  'Email confirmation sent',
                  'Pickup at selected location',
                ].map(item => (
                  <div key={item} className="flex items-center gap-2 text-gray-400 text-xs">
                    <FiCheck size={12} className="text-green-400 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleConfirmBooking}
                disabled={submitting}
                className="btn-gradient w-full py-4 flex items-center justify-center gap-2 text-base font-bold"
              >
                {submitting ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Sending Request...</span>
                  </div>
                ) : (
                  <>✅ Confirm Booking</>
                )}
              </motion.button>

              <p className="text-gray-500 text-xs text-center mt-3">
                By confirming, you agree to our Terms & Conditions
              </p>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  )
}

const mockBike = {
  _id: '1', name: 'Royal Enfield Classic 350', brand: 'Royal Enfield',
  category: 'Cruiser', pricePerDay: 599, location: 'Hyderabad, Telangana',
  images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
}
