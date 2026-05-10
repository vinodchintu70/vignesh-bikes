import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiTruck, FiMapPin, FiCalendar, FiClock } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bookingAPI } from '../../services/api'
import { differenceInDays } from 'date-fns'

export default function ActiveRentals() {
  const [rentals, setRentals] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bookingAPI.getUserBookings().then(({ data }) => {
      const active = (data.bookings || []).filter(b => b.status === 'active')
      setRentals(active.length ? active : mockRentals)
    }).catch(() => setRentals(mockRentals)).finally(() => setLoading(false))
  }, [])

  return (
    <>
      <Helmet><title>Active Rentals - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Active Rentals</h2>
          <p className="text-gray-400 mt-1">Your currently active bike rentals</p>
        </motion.div>

        {loading ? (
          <div className="space-y-4">{[1,2].map(i => <div key={i} className="h-32 skeleton rounded-2xl" />)}</div>
        ) : rentals.length === 0 ? (
          <div className="card text-center py-16">
            <FiTruck className="text-gray-600 text-5xl mx-auto mb-3" />
            <p className="text-gray-400">No active rentals</p>
          </div>
        ) : (
          <div className="space-y-4">
            {rentals.map((rental, i) => {
              const daysLeft = differenceInDays(new Date(rental.endDate), new Date())
              return (
                <motion.div key={rental._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card border-green-500/20">
                  <div className="flex items-center gap-4">
                    <div className="w-16 h-16 bg-green-500/10 rounded-xl flex items-center justify-center flex-shrink-0">
                      <MdDirectionsBike className="text-green-400 text-3xl" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-white font-semibold">{rental.bike?.name || 'Bike'}</h3>
                        <span className="badge bg-green-500/20 text-green-400 text-xs">● Active</span>
                      </div>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-400">
                        <span className="flex items-center gap-1"><FiCalendar size={12} /> Until {new Date(rental.endDate).toLocaleDateString()}</span>
                        <span className="flex items-center gap-1"><FiMapPin size={12} /> {rental.bike?.location || 'Mumbai'}</span>
                        <span className="flex items-center gap-1 text-yellow-400"><FiClock size={12} /> {daysLeft > 0 ? `${daysLeft} days left` : 'Due today'}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-white font-bold">₹{rental.totalAmount}</p>
                      <p className="text-gray-500 text-xs">Total paid</p>
                    </div>
                  </div>
                  <div className="mt-4 bg-dark-hover rounded-xl p-3">
                    <div className="flex justify-between text-xs text-gray-400 mb-1">
                      <span>Rental Progress</span>
                      <span>{Math.max(0, 100 - Math.round((daysLeft / differenceInDays(new Date(rental.endDate), new Date(rental.startDate))) * 100))}%</span>
                    </div>
                    <div className="h-2 bg-dark-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                        style={{ width: `${Math.max(0, 100 - Math.round((daysLeft / Math.max(1, differenceInDays(new Date(rental.endDate), new Date(rental.startDate)))) * 100))}%` }}
                      />
                    </div>
                  </div>
                </motion.div>
              )
            })}
          </div>
        )}
      </div>
    </>
  )
}

const mockRentals = [
  { _id: 'r1', bike: { name: 'Royal Enfield Classic 350', location: 'Mumbai' }, startDate: new Date(Date.now() - 86400000).toISOString(), endDate: new Date(Date.now() + 2 * 86400000).toISOString(), totalAmount: 1797, status: 'active' },
]
