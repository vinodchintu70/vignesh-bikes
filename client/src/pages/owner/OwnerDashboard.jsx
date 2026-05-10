import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTrendingUp, FiCalendar, FiDollarSign, FiList, FiArrowRight, FiPlus } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bikeAPI, bookingAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const earningsData = [
  { month: 'Jan', earnings: 4200 }, { month: 'Feb', earnings: 6800 },
  { month: 'Mar', earnings: 5400 }, { month: 'Apr', earnings: 9200 },
  { month: 'May', earnings: 7600 }, { month: 'Jun', earnings: 11400 },
]

export default function OwnerDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ totalBikes: 0, totalBookings: 0, totalEarnings: 0, pendingBookings: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([bikeAPI.getOwnerBikes(), bookingAPI.getOwnerBookings()])
      .then(([bikesRes, bookingsRes]) => {
        const bikes = bikesRes.data.bikes || []
        const bookings = bookingsRes.data.bookings || []
        setStats({
          totalBikes: bikes.length,
          totalBookings: bookings.length,
          totalEarnings: bookings.filter(b => b.status === 'completed').reduce((s, b) => s + (b.totalAmount || 0), 0),
          pendingBookings: bookings.filter(b => b.status === 'pending').length,
        })
        setRecentBookings(bookings.slice(0, 5))
      })
      .catch(() => {
        setStats({ totalBikes: 3, totalBookings: 24, totalEarnings: 44600, pendingBookings: 2 })
        setRecentBookings(mockBookings)
      })
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: MdDirectionsBike, label: 'My Bikes', value: stats.totalBikes, color: 'text-primary', bg: 'bg-primary/20', link: '/owner/bikes' },
    { icon: FiCalendar, label: 'Total Bookings', value: stats.totalBookings, color: 'text-secondary', bg: 'bg-secondary/20', link: '/owner/bookings' },
    { icon: FiDollarSign, label: 'Total Earnings', value: `₹${stats.totalEarnings.toLocaleString()}`, color: 'text-green-400', bg: 'bg-green-400/20', link: '/owner/earnings' },
    { icon: FiTrendingUp, label: 'Pending', value: stats.pendingBookings, color: 'text-yellow-400', bg: 'bg-yellow-400/20', link: '/owner/bookings' },
  ]

  return (
    <>
      <Helmet><title>Owner Dashboard - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">Owner Dashboard</h2>
            <p className="text-gray-400 mt-1">Manage your bikes and track earnings</p>
          </div>
          <Link to="/owner/bikes/add" className="btn-gradient flex items-center gap-2 text-sm">
            <FiPlus size={16} /> Add Bike
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ icon: Icon, label, value, color, bg, link }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={link} className="card block hover:border-primary/30 group">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`${color} text-lg`} />
                  </div>
                  <FiArrowRight size={14} className="text-gray-600 group-hover:text-primary transition-colors" />
                </div>
                <p className="text-white font-bold text-2xl">{loading ? <span className="h-6 w-16 skeleton rounded inline-block" /> : value}</p>
                <p className="text-gray-400 text-xs mt-1">{label}</p>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Monthly Earnings</h3>
              <span className="badge bg-green-500/20 text-green-400 text-xs">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={earningsData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" />
                <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} formatter={(v) => [`₹${v}`, 'Earnings']} />
                <Bar dataKey="earnings" fill="#3B82F6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-white font-semibold">Recent Bookings</h3>
              <Link to="/owner/bookings" className="text-primary text-sm flex items-center gap-1">View All <FiArrowRight size={14} /></Link>
            </div>
            <div className="space-y-3">
              {recentBookings.map((booking) => (
                <div key={booking._id} className="flex items-center gap-3 p-3 bg-dark-hover rounded-xl">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MdDirectionsBike className="text-primary text-xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white text-sm font-medium truncate">{booking.user?.name || 'Customer'}</p>
                    <p className="text-gray-500 text-xs">{booking.bike?.name || 'Bike'}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-white text-sm font-semibold">₹{booking.totalAmount}</p>
                    <span className={`badge text-xs ${booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' : booking.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-gray-500/20 text-gray-400'}`}>
                      {booking.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}

const mockBookings = [
  { _id: 'b1', user: { name: 'Arjun Sharma' }, bike: { name: 'Royal Enfield Classic 350' }, totalAmount: 1797, status: 'confirmed' },
  { _id: 'b2', user: { name: 'Priya Patel' }, bike: { name: 'Yamaha MT-15' }, totalAmount: 1598, status: 'pending' },
  { _id: 'b3', user: { name: 'Rahul Verma' }, bike: { name: 'KTM Duke 390' }, totalAmount: 2997, status: 'completed' },
]
