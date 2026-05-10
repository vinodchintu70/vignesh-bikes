import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiHeart } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { userAPI } from '../../services/api'
import BikeCard from '../../components/bikes/BikeCard'

export default function UserWishlist() {
  const [wishlist, setWishlist] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    userAPI.getWishlist().then(({ data }) => setWishlist(data.wishlist || [])).catch(() => setWishlist([])).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet><title>Wishlist - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">My Wishlist</h2>
          <p className="text-gray-400 mt-1">Bikes you've saved for later</p>
        </motion.div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1,2,3].map(i => <div key={i} className="h-64 skeleton rounded-2xl" />)}
          </div>
        ) : wishlist.length === 0 ? (
          <div className="card text-center py-16">
            <FiHeart className="text-gray-600 text-5xl mx-auto mb-3" />
            <p className="text-gray-400 mb-4">Your wishlist is empty</p>
            <a href="/bikes" className="btn-primary inline-block">Browse Bikes</a>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {wishlist.map((bike, i) => <BikeCard key={bike._id} bike={{ ...bike, isWishlisted: true }} index={i} />)}
          </div>
        )}
      </div>
    </>
  )
}
