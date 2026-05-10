import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiMapPin, FiHeart, FiZap } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { userAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function BikeCard({ bike, index, viewMode = 'grid' }) {
  const [liked, setLiked] = useState(bike.isWishlisted || false)
  const { isAuthenticated } = useAuth()

  const handleWishlist = async (e) => {
    e.preventDefault()
    if (!isAuthenticated) return toast.error('Please login to save bikes')
    try {
      if (liked) {
        await userAPI.removeFromWishlist(bike._id)
        toast.success('Removed from wishlist')
      } else {
        await userAPI.addToWishlist(bike._id)
        toast.success('Added to wishlist')
      }
      setLiked(!liked)
    } catch {
      toast.error('Failed to update wishlist')
    }
  }

  if (viewMode === 'list') {
    return (
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 }}
        className="card flex gap-6 hover:border-primary/40 hover:-translate-y-0.5"
      >
        <div className="w-40 h-32 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl flex-shrink-0 flex items-center justify-center overflow-hidden">
          {bike.images?.[0] ? (
            <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover" />
          ) : (
            <MdDirectionsBike className="text-primary/40 text-5xl" />
          )}
        </div>
        <div className="flex-1 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`badge text-xs ${bike.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                {bike.available ? 'Available' : 'Booked'}
              </span>
              <span className="badge bg-primary/20 text-primary text-xs">{bike.category}</span>
            </div>
            <h3 className="text-white font-semibold text-lg">{bike.name}</h3>
            <p className="text-gray-500 text-sm">{bike.brand}</p>
            <div className="flex items-center gap-4 mt-2">
              <div className="flex items-center gap-1 text-gray-400 text-sm">
                <FiMapPin size={12} className="text-secondary" />
                <span>{bike.location}</span>
              </div>
              <div className="flex items-center gap-1">
                <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
                <span className="text-white text-sm font-medium">{bike.rating || 0}</span>
                <span className="text-gray-500 text-xs">({bike.totalReviews || 0})</span>
              </div>
            </div>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-primary font-bold text-2xl">₹{bike.pricePerDay}</p>
            <p className="text-gray-500 text-xs mb-3">/day</p>
            <Link to={`/bikes/${bike._id}`} className="btn-gradient text-sm px-6 py-2">
              View Details
            </Link>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      className="card group hover:border-primary/40 hover:-translate-y-1"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 overflow-hidden">
        {bike.images?.[0] ? (
          <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MdDirectionsBike className="text-primary/40 text-8xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}

        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge text-xs ${bike.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {bike.available ? '● Available' : '● Booked'}
          </span>
        </div>

        <button
          onClick={handleWishlist}
          className="absolute top-3 right-3 w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-all"
        >
          <FiHeart className={liked ? 'text-red-400 fill-red-400' : 'text-gray-400'} size={14} />
        </button>

        {bike.category === 'Electric' && (
          <div className="absolute bottom-3 left-3 flex items-center gap-1 bg-green-500/20 border border-green-500/30 px-2 py-1 rounded-lg">
            <FiZap size={10} className="text-green-400" />
            <span className="text-green-400 text-xs font-medium">Electric</span>
          </div>
        )}
      </div>

      <div>
        <div className="flex items-start justify-between mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors truncate">
              {bike.name}
            </h3>
            <p className="text-gray-500 text-xs">{bike.brand} · {bike.category}</p>
          </div>
          <div className="text-right flex-shrink-0 ml-2">
            <p className="text-primary font-bold text-lg">₹{bike.pricePerDay}</p>
            <p className="text-gray-500 text-xs">/day</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm mb-4">
          <div className="flex items-center gap-1 text-gray-400">
            <FiMapPin size={12} className="text-secondary" />
            <span className="text-xs">{bike.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{bike.rating || 0}</span>
            <span className="text-gray-500 text-xs">({bike.totalReviews || 0})</span>
          </div>
        </div>

        <Link
          to={`/bikes/${bike._id}`}
          className={`w-full py-2.5 rounded-xl text-sm font-semibold text-center block transition-all duration-300 ${
            bike.available ? 'btn-gradient' : 'bg-dark-hover text-gray-500 cursor-not-allowed pointer-events-none'
          }`}
        >
          {bike.available ? 'Book Now' : 'Not Available'}
        </Link>
      </div>
    </motion.div>
  )
}
