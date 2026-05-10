import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiCalendar, FiDownload } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

export default function BookingConfirmation() {
  const { bookingId } = useParams()

  return (
    <>
      <Helmet><title>Booking Confirmed - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full text-center">
          <div className="card">
            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
              className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle className="text-green-400 text-4xl" />
            </motion.div>
            <h1 className="font-display font-bold text-3xl text-white mb-2">Booking Confirmed!</h1>
            <p className="text-gray-400 mb-2">Your booking has been confirmed successfully.</p>
            <p className="text-gray-500 text-sm mb-6">Booking ID: <span className="text-primary font-mono">#{bookingId?.slice(-8).toUpperCase()}</span></p>
            <div className="flex gap-3">
              <Link to="/dashboard/bookings" className="flex-1 btn-gradient flex items-center justify-center gap-2 py-3">
                <FiCalendar size={16} /> My Bookings
              </Link>
              <button className="flex-1 btn-secondary flex items-center justify-center gap-2 py-3">
                <FiDownload size={16} /> Invoice
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
