import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiArrowLeft } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'

export default function NotFoundPage() {
  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="text-center">
        <motion.div
          animate={{ rotate: [0, -10, 10, -10, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          className="text-9xl mb-6"
        >
          <MdDirectionsBike className="text-primary/30 mx-auto" />
        </motion.div>
        <h1 className="font-display font-bold text-8xl gradient-text mb-4">404</h1>
        <h2 className="text-white font-bold text-2xl mb-3">Page Not Found</h2>
        <p className="text-gray-400 mb-8 max-w-md mx-auto">
          Looks like you've taken a wrong turn. The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link to="/" className="btn-gradient flex items-center gap-2">
            <FiArrowLeft size={16} /> Back to Home
          </Link>
          <Link to="/bikes" className="btn-secondary">Browse Bikes</Link>
        </div>
      </motion.div>
    </div>
  )
}
