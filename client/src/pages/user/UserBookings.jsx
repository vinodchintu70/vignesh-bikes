import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCalendar, FiX, FiClock, FiMapPin } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bookingAPI } from '../../services/api'
import toast from 'react-hot-toast'

const statusColors = {
  pending:   'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  active:    'bg-blue-500/20 text-blue-400',
  completed: 'bg-gray-500/20 text-gray-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

export default function UserBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading]   = useState(true)
  const [filter, setFilter]     = useState('all')

  useEffect(() => {
    bookingAPI.getUserBookings()
      .then(({ data }) => setBookings(data.bookings || []))
      .catch(() => setBookings([]))
      .finally(() => setLoading(false))
  }, [])

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return
    try {
      await bookingAPI.cancel(id)
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'cancelled' } : b))
      toast.success('Booking cancelled')
    } catch { toast.error('Failed to cancel booking') }
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <>
      <Helmet><title>My Bookings - Vignesh Konda Bike Rentals</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">My Bookings</h2>
          <p className="text-gray-400 mt-1">Track and manage all your bike rentals</p>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'pending', 'confirmed', 'cancelled'].map(status => (
            <button key={status} onClick={() => setFilter(status)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${
                filter === status ? 'bg-primary text-white' : 'glass border border-dark-border text-gray-400 hover:text-white'
              }`}>{status}</button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 skeleton rounded-2xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16">
            <FiCalendar className="text-gray-600 text-5xl mx-auto mb-3" />
            <p className="text-gray-400 mb-2">No {filter !== 'all' ? filter : ''} bookings found</p>
            <a href="/bikes" className="btn-gradient inline-block mt-2 text-sm px-6 py-2">Browse Bikes</a>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => (
              <motion.div key={booking._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card hover:border-primary/30">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    {booking.bike?.images?.[0]
                      ? <img src={booking.bike.images[0]} alt={booking.bike.name} className="w-full h-full object-cover rounded-xl" />
                      : <MdDirectionsBike className="text-primary text-3xl" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                      <h3 className="text-white font-semibold">{booking.bike?.name || 'Bike'}</h3>
                      <span className={`badge text-xs ${statusColors[booking.status] || 'bg-gray-500/20 text-gray-400'}`}>{booking.status}</span>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-1 text-xs text-gray-400">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={11} className="text-primary" />
                        {new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiMapPin size={11} className="text-secondary" />
                        {booking.bike?.location || 'N/A'}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiClock size={11} className="text-primary" />
                        {booking.totalDays} day{booking.totalDays > 1 ? 's' : ''}
                      </span>
                      <span className="text-gray-500">ID: #{booking._id?.slice(-8).toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-bold text-lg">₹{booking.totalAmount}</p>
                    <p className="text-accent text-xs mb-2">Pay at pickup</p>
                    {booking.status === 'pending' && (
                      <button onClick={() => handleCancel(booking._id)}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-all">
                        <FiX size={12} /> Cancel
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </>
  )
}
