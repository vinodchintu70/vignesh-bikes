import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiMapPin, FiHeart, FiArrowRight } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { bikeAPI } from '../../services/api'

const mockBikes = [
  { _id: '1', name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', category: 'Cruiser', pricePerDay: 599, rating: 4.8, reviews: 124, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80', available: true },
  { _id: '2', name: 'Yamaha MT-15', brand: 'Yamaha', category: 'Sports', pricePerDay: 799, rating: 4.9, reviews: 89, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80', available: true },
  { _id: '3', name: 'KTM Duke 390', brand: 'KTM', category: 'Sports', pricePerDay: 999, rating: 4.7, reviews: 67, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80', available: true },
  { _id: '4', name: 'Honda CB500F', brand: 'Honda', category: 'Adventure', pricePerDay: 1199, rating: 4.6, reviews: 45, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80', available: false },
  { _id: '5', name: 'Bajaj Pulsar NS200', brand: 'Bajaj', category: 'Sports', pricePerDay: 499, rating: 4.5, reviews: 156, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80', available: true },
  { _id: '6', name: 'TVS Apache RR310', brand: 'TVS', category: 'Sports', pricePerDay: 899, rating: 4.8, reviews: 78, location: 'Hyderabad', image: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&q=80', available: true },
]

function BikeCard({ bike, index }) {
  const [liked, setLiked] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="card group cursor-pointer hover:border-primary/40 hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-48 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 overflow-hidden">
        {bike.image ? (
          <img src={bike.image} alt={bike.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <MdDirectionsBike className="text-primary/40 text-8xl group-hover:scale-110 transition-transform duration-300" />
          </div>
        )}

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`badge text-xs ${bike.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
            {bike.available ? 'Available' : 'Booked'}
          </span>
          <span className="badge bg-dark-card/80 text-gray-300 text-xs">{bike.category}</span>
        </div>

        {/* Like Button */}
        <button
          onClick={(e) => { e.preventDefault(); setLiked(!liked) }}
          className="absolute top-3 right-3 w-8 h-8 glass rounded-lg flex items-center justify-center hover:bg-red-500/20 transition-all"
        >
          <FiHeart className={liked ? 'text-red-400 fill-red-400' : 'text-gray-400'} size={14} />
        </button>
      </div>

      {/* Info */}
      <div>
        <div className="flex items-start justify-between mb-2">
          <div>
            <h3 className="text-white font-semibold text-base group-hover:text-primary transition-colors line-clamp-1">
              {bike.name}
            </h3>
            <p className="text-gray-500 text-xs">{bike.brand}</p>
          </div>
          <div className="text-right flex-shrink-0">
            <p className="text-primary font-bold text-lg">₹{bike.pricePerDay}</p>
            <p className="text-gray-500 text-xs">/day</p>
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-1 text-gray-400">
            <FiMapPin size={12} className="text-secondary" />
            <span className="text-xs">{bike.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <FiStar size={12} className="text-yellow-400 fill-yellow-400" />
            <span className="text-white text-xs font-medium">{bike.rating}</span>
            <span className="text-gray-500 text-xs">({bike.reviews})</span>
          </div>
        </div>

        <Link
          to={`/bikes/${bike._id}`}
          className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold text-center block transition-all duration-300 ${
            bike.available
              ? 'btn-gradient'
              : 'bg-dark-hover text-gray-500 cursor-not-allowed'
          }`}
        >
          {bike.available ? 'Book Now' : 'Not Available'}
        </Link>
      </div>
    </motion.div>
  )
}

export default function FeaturedBikes() {
  const [bikes, setBikes] = useState(mockBikes)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchFeatured = async () => {
      try {
        const { data } = await bikeAPI.getFeatured()
        if (data.bikes?.length) setBikes(data.bikes)
      } catch {
        // Use mock data
      }
    }
    fetchFeatured()
  }, [])

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-end justify-between mb-12"
        >
          <div>
            <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Featured Collection</p>
            <h2 className="font-display font-bold text-4xl text-white">
              Top Rated <span className="gradient-text">Bikes</span>
            </h2>
            <p className="text-gray-400 mt-2">Handpicked premium bikes for the best riding experience</p>
          </div>
          <Link to="/bikes" className="hidden md:flex items-center gap-2 text-primary hover:text-primary-light transition-colors font-medium">
            View All <FiArrowRight size={18} />
          </Link>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {bikes.slice(0, 6).map((bike, i) => (
            <BikeCard key={bike._id} bike={bike} index={i} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link to="/bikes" className="btn-secondary inline-flex items-center gap-2">
            Explore All Bikes <FiArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  )
}
