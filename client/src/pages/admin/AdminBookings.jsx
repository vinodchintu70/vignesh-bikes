import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiCalendar } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { adminAPI } from '../../services/api'

const statusColors = { pending: 'bg-yellow-500/20 text-yellow-400', confirmed: 'bg-green-500/20 text-green-400', active: 'bg-blue-500/20 text-blue-400', completed: 'bg-gray-500/20 text-gray-400', cancelled: 'bg-red-500/20 text-red-400' }

export default function AdminBookings() {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminAPI.getBookings().then(({ data }) => setBookings(data.bookings || mockBookings)).catch(() => setBookings(mockBookings)).finally(() => setLoading(false))
  }, [])

  const filtered = bookings.filter(b => b.bike?.name?.toLowerCase().includes(search.toLowerCase()) || b.user?.name?.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Helmet><title>Manage Bookings - Admin</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Manage Bookings</h2>
          <p className="text-gray-400 mt-1">{bookings.length} total bookings</p>
        </motion.div>

        <div className="relative max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" placeholder="Search bookings..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
        </div>

        <div className="card overflow-hidden">
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  {['Booking ID', 'Customer', 'Bike', 'Dates', 'Amount', 'Status'].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-medium py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={6} className="py-3 px-4"><div className="h-10 skeleton rounded-lg" /></td></tr>) :
                  filtered.map((booking, i) => (
                    <motion.tr key={booking._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                      <td className="py-4 px-4 text-primary text-sm font-mono">#{booking._id?.slice(-6).toUpperCase()}</td>
                      <td className="py-4 px-4 text-white text-sm">{booking.user?.name || 'Unknown'}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{booking.bike?.name || 'Bike'}</td>
                      <td className="py-4 px-4 text-gray-400 text-xs">{new Date(booking.startDate).toLocaleDateString()} - {new Date(booking.endDate).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-white font-semibold">₹{booking.totalAmount}</td>
                      <td className="py-4 px-4"><span className={`badge text-xs ${statusColors[booking.status] || 'bg-gray-500/20 text-gray-400'}`}>{booking.status}</span></td>
                    </motion.tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const mockBookings = [
  { _id: 'bk001', user: { name: 'Arjun Sharma' }, bike: { name: 'Royal Enfield Classic 350' }, startDate: '2024-03-01', endDate: '2024-03-03', totalAmount: 1797, status: 'confirmed' },
  { _id: 'bk002', user: { name: 'Priya Patel' }, bike: { name: 'Yamaha MT-15' }, startDate: '2024-02-15', endDate: '2024-02-17', totalAmount: 1598, status: 'completed' },
  { _id: 'bk003', user: { name: 'Rahul Verma' }, bike: { name: 'KTM Duke 390' }, startDate: '2024-01-20', endDate: '2024-01-22', totalAmount: 1998, status: 'cancelled' },
]
