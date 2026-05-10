import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiXCircle, FiRefreshCw } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

export default function PaymentFailed() {
  const navigate = useNavigate()

  return (
    <>
      <Helmet><title>Payment Failed - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="max-w-md w-full">
          <div className="card text-center">
            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring' }}
              className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <FiXCircle className="text-red-400 text-5xl" />
            </motion.div>
            <h1 className="font-display font-bold text-3xl text-white mb-2">Payment Failed</h1>
            <p className="text-gray-400 mb-8">Something went wrong with your payment. Please try again.</p>
            <div className="space-y-3">
              <button onClick={() => navigate(-1)} className="btn-gradient w-full flex items-center justify-center gap-2 py-3">
                <FiRefreshCw size={16} /> Try Again
              </button>
              <Link to="/bikes" className="btn-secondary w-full flex items-center justify-center gap-2 py-3">
                Browse Bikes
              </Link>
              <Link to="/contact" className="block text-gray-400 hover:text-white text-sm transition-colors py-2">
                Contact Support
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
