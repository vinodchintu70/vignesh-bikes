import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSearch, FiMapPin, FiCalendar } from 'react-icons/fi'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

const categories = ['All', 'Sports', 'Cruiser', 'Adventure', 'Classic', 'Electric', 'Scooter']

export default function SearchSection() {
  const [location, setLocation] = useState('')
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [category, setCategory] = useState('All')
  const navigate = useNavigate()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (location) params.set('location', location)
    if (startDate) params.set('startDate', startDate.toISOString())
    if (endDate) params.set('endDate', endDate.toISOString())
    if (category !== 'All') params.set('category', category)
    navigate(`/bikes?${params.toString()}`)
  }

  return (
    <section className="relative -mt-8 z-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 md:p-8 border border-white/10 shadow-card"
        >
          <h2 className="text-white font-display font-bold text-2xl mb-6 text-center">
            Find Your Perfect <span className="gradient-text">Ride</span>
          </h2>

          {/* Category Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-4 mb-6 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  category === cat
                    ? 'bg-primary text-white shadow-glow-blue'
                    : 'glass text-gray-400 hover:text-white border border-dark-border'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Fields */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Location */}
            <div className="relative">
              <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-primary" size={18} />
              <input
                type="text"
                placeholder="Enter city or location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="input-field pl-11"
              />
            </div>

            {/* Start Date */}
            <div className="relative">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
              <DatePicker
                selected={startDate}
                onChange={setStartDate}
                selectsStart
                startDate={startDate}
                endDate={endDate}
                minDate={new Date()}
                placeholderText="Pickup date"
                className="input-field pl-11 w-full"
              />
            </div>

            {/* End Date */}
            <div className="relative">
              <FiCalendar className="absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10" size={18} />
              <DatePicker
                selected={endDate}
                onChange={setEndDate}
                selectsEnd
                startDate={startDate}
                endDate={endDate}
                minDate={startDate || new Date()}
                placeholderText="Return date"
                className="input-field pl-11 w-full"
              />
            </div>
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={handleSearch}
            className="btn-gradient w-full mt-4 flex items-center justify-center gap-2 py-4 text-base"
          >
            <FiSearch size={20} />
            Search Available Bikes
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
