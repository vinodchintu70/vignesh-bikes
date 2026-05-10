import { useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCheckCircle, FiPhone, FiMail, FiCalendar } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'

export default function PaymentSuccess() {
  const location = useLocation()
  const { bookingId, amount, noPayment } = location.state || {}

  return (
    <>
      <Helmet><title>Booking Confirmed - Vignesh Konda Bike Rentals</title></Helmet>
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-lg w-full"
        >
          <div className="card text-center">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
              className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiCheckCircle className="text-green-400 text-5xl" />
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
              <h1 className="font-display font-bold text-3xl text-white mb-2">
                Booking Confirmed! 🎉
              </h1>
              <p className="text-gray-400 mb-6">
                Your booking request has been sent to the owner. They will contact you shortly to confirm.
              </p>

              {/* Booking ID */}
              {bookingId && (
                <div className="bg-dark-hover rounded-2xl p-4 mb-6">
                  <p className="text-gray-400 text-xs mb-1">Booking ID</p>
                  <p className="text-primary font-mono font-bold text-lg">
                    #{typeof bookingId === 'string' ? bookingId.slice(-10).toUpperCase() : bookingId}
                  </p>
                </div>
              )}

              {/* Pay at pickup notice */}
              <div className="bg-accent/10 border border-accent/20 rounded-2xl p-4 mb-6 text-left">
                <p className="text-accent font-semibold text-sm mb-2">💵 Payment at Pickup</p>
                <p className="text-gray-400 text-sm">
                  Please pay <span className="text-white font-bold">₹{amount}</span> in cash when you pick up the bike.
                </p>
              </div>

              {/* What happens next */}
              <div className="bg-dark-hover rounded-2xl p-4 mb-6 text-left space-y-3">
                <p className="text-white font-semibold text-sm mb-3">What happens next?</p>
                {[
                  { icon: FiMail, text: 'You will receive a confirmation email shortly', color: 'text-primary' },
                  { icon: FiPhone, text: 'Owner will call you to confirm the booking', color: 'text-secondary' },
                  { icon: MdDirectionsBike, text: 'Pick up the bike at your selected location & time', color: 'text-accent' },
                ].map(({ icon: Icon, text, color }, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className={`w-7 h-7 rounded-lg bg-dark-border flex items-center justify-center flex-shrink-0 mt-0.5`}>
                      <Icon size={14} className={color} />
                    </div>
                    <p className="text-gray-400 text-sm">{text}</p>
                  </div>
                ))}
              </div>

              {/* Owner Contact */}
              <div className="bg-primary/10 border border-primary/20 rounded-2xl p-4 mb-6">
                <p className="text-primary font-semibold text-sm mb-2">Owner Contact</p>
                <p className="text-white text-sm font-medium">Vignesh Konda Bike Rentals</p>
                <p className="text-gray-400 text-sm">📞 +91 98765 43210</p>
                <p className="text-gray-400 text-sm">📧 vinodchintu70@gmail.com</p>
              </div>

              {/* Buttons */}
              <div className="space-y-3">
                <Link
                  to="/dashboard/bookings"
                  className="btn-gradient w-full flex items-center justify-center gap-2 py-3"
                >
                  <FiCalendar size={16} /> View My Bookings
                </Link>
                <Link
                  to="/bikes"
                  className="btn-secondary w-full flex items-center justify-center gap-2 py-3"
                >
                  <MdDirectionsBike size={16} /> Browse More Bikes
                </Link>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
