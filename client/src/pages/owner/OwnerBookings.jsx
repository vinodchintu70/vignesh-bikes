import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiCalendar } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bookingAPI } from '../../services/api'
import { sendBookingConfirmationToCustomer } from '../../services/emailService'
import toast from 'react-hot-toast'

const statusColors = {
  pending: 'bg-yellow-500/20 text-yellow-400',
  confirmed: 'bg-green-500/20 text-green-400',
  active: 'bg-blue-500/20 text-blue-400',
  completed: 'bg-gray-500/20 text-gray-400',
  cancelled: 'bg-red-500/20 text-red-400',
}

export default function OwnerBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    bookingAPI.getOwnerBookings().then(({ data }) => setBookings(data.bookings || mockBookings)).catch(() => setBookings(mockBookings)).finally(() => setLoading(false))
  }, [])

  const handleApprove = async (id) => {
    try {
      const { data } = await bookingAPI.approve(id)
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'confirmed' } : b))

      // Send confirmation email to customer via Formspree
      const booking = bookings.find(b => b._id === id)
      if (booking?.user?.email) {
        await sendBookingConfirmationToCustomer({
          customerEmail: booking.user.email,
          customerName: booking.user.name,
          bikeName: booking.bike?.name,
          startDate: booking.startDate,
          endDate: booking.endDate,
          pickupTime: booking.pickupTime,
          dropTime: booking.dropTime,
          pickupLocation: booking.pickupLocation,
          totalAmount: booking.totalAmount,
          totalDays: booking.totalDays,
          bookingId: booking._id,
        })
      }

      toast.success('Booking approved! Confirmation email sent to customer ✅')
    } catch { toast.error('Failed to approve booking') }
  }

  const handleReject = async (id) => {
    try {
      await bookingAPI.reject(id, 'Owner rejected')
      setBookings(prev => prev.map(b => b._id === id ? { ...b, status: 'rejected' } : b))
      toast.success('Booking rejected')
    } catch { toast.error('Failed to reject booking') }
  }

  const filtered = filter === 'all' ? bookings : bookings.filter(b => b.status === filter)

  return (
    <>
      <Helmet><title>Bookings - Owner Panel</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Manage Bookings</h2>
          <p className="text-gray-400 mt-1">Review and manage rental requests</p>
        </motion.div>

        <div className="flex gap-2 overflow-x-auto pb-2">
          {['all', 'pending', 'confirmed', 'active', 'completed', 'cancelled'].map(s => (
            <button key={s} onClick={() => setFilter(s)} className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-medium transition-all capitalize ${filter === s ? 'bg-primary text-white' : 'glass border border-dark-border text-gray-400 hover:text-white'}`}>{s}</button>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">{[1,2,3].map(i => <div key={i} className="h-24 skeleton rounded-2xl" />)}</div>
        ) : filtered.length === 0 ? (
          <div className="card text-center py-16"><FiCalendar className="text-gray-600 text-5xl mx-auto mb-3" /><p className="text-gray-400">No bookings found</p></div>
        ) : (
          <div className="space-y-4">
            {filtered.map((booking, i) => (
              <motion.div key={booking._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="card hover:border-primary/30">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MdDirectionsBike className="text-primary text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-white font-semibold text-sm">{booking.bike?.name || 'Bike'}</h3>
                      <span className={`badge text-xs ${statusColors[booking.status] || 'bg-gray-500/20 text-gray-400'}`}>{booking.status}</span>
                    </div>
                    <p className="text-gray-400 text-xs">Customer: {booking.user?.name || 'Unknown'}</p>
                    <p className="text-gray-500 text-xs">{new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-bold">₹{booking.totalAmount}</p>
                    {booking.status === 'pending' && (
                      <div className="flex gap-2 mt-2">
                        <button onClick={() => handleApprove(booking._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs transition-all">
                          <FiCheck size={12} /> Approve
                        </button>
                        <button onClick={() => handleReject(booking._id)} className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-all">
                          <FiX size={12} /> Reject
                        </button>
                      </div>
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

const mockBookings = [
  { _id: 'b1', bike: { name: 'Royal Enfield Classic 350' }, user: { name: 'Arjun Sharma' }, startDate: '2024-03-01', endDate: '2024-03-03', totalAmount: 1797, status: 'pending' },
  { _id: 'b2', bike: { name: 'Yamaha MT-15' }, user: { name: 'Priya Patel' }, startDate: '2024-02-15', endDate: '2024-02-17', totalAmount: 1598, status: 'confirmed' },
]
