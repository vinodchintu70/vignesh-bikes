import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiCalendar, FiHeart, FiTruck, FiArrowRight } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import { bookingAPI, userAPI } from '../../services/api'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const spendingData = [
  { month: 'Jan', amount: 1200 }, { month: 'Feb', amount: 800 },
  { month: 'Mar', amount: 2400 }, { month: 'Apr', amount: 1600 },
  { month: 'May', amount: 3200 }, { month: 'Jun', amount: 2800 },
]

export default function UserDashboard() {
  const { user } = useAuth()
  const [stats, setStats] = useState({ totalBookings: 0, activeRentals: 0, wishlistCount: 0 })
  const [recentBookings, setRecentBookings] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    Promise.all([bookingAPI.getUserBookings(), userAPI.getWishlist()])
      .then(([bookingsRes, wishlistRes]) => {
        const bookings = bookingsRes.data.bookings || []
        const wishlist = wishlistRes.data.wishlist || []
        setStats({
          totalBookings: bookings.length,
          activeRentals: bookings.filter(b => b.status === 'active').length,
          wishlistCount: wishlist.length,
        })
        setRecentBookings(bookings.slice(0, 5))
      })
      .catch(() => setLoading(false))
      .finally(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: FiCalendar, label: 'Total Bookings', value: stats.totalBookings, color: 'text-primary', bg: 'bg-primary/20', link: '/dashboard/bookings' },
    { icon: FiTruck, label: 'Active Rentals', value: stats.activeRentals, color: 'text-green-400', bg: 'bg-green-400/20', link: '/dashboard/active-rentals' },
    { icon: FiHeart, label: 'Wishlist', value: stats.wishlistCount, color: 'text-red-400', bg: 'bg-red-400/20', link: '/dashboard/wishlist' },
  ]

  return (
    <>
      <Helmet><title>Dashboard - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">
              Welcome back, <span className="gradient-text">{user?.name?.split(' ')[0]}</span>! 👋
            </h2>
            <p className="text-gray-400 mt-1">Here's what's happening with your rentals</p>
          </div>
          <Link to="/bikes" className="btn-gradient hidden sm:flex items-center gap-2 text-sm">
            <MdDirectionsBike size={16} /> Browse Bikes
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
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

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-white font-semibold">Spending Overview</h3>
              <span className="badge bg-primary/20 text-primary text-xs">Last 6 months</span>
            </div>
            <ResponsiveContainer width="100%" height={200}>
              <AreaChart data={spendingData}>
                <defs>
                  <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" />
                <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} formatter={(value) => [`₹${value}`, 'Spent']} />
                <Area type="monotone" dataKey="amount" stroke="#3B82F6" fill="url(#colorAmount)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Browse Bikes', path: '/bikes', icon: MdDirectionsBike, color: 'text-primary bg-primary/20' },
                { label: 'My Bookings', path: '/dashboard/bookings', icon: FiCalendar, color: 'text-secondary bg-secondary/20' },
                { label: 'My Wishlist', path: '/dashboard/wishlist', icon: FiHeart, color: 'text-red-400 bg-red-400/20' },
              ].map(({ label, path, icon: Icon, color }) => (
                <Link key={path} to={path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-hover transition-all group">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}>
                    <Icon size={16} />
                  </div>
                  <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{label}</span>
                  <FiArrowRight size={14} className="ml-auto text-gray-600 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-white font-semibold">Recent Bookings</h3>
            <Link to="/dashboard/bookings" className="text-primary text-sm hover:text-primary-light transition-colors flex items-center gap-1">View All <FiArrowRight size={14} /></Link>
          </div>
          {loading ? (
            <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-16 skeleton rounded-xl" />)}</div>
          ) : recentBookings.length === 0 ? (
            <div className="text-center py-10">
              <MdDirectionsBike className="text-gray-600 text-5xl mx-auto mb-3" />
              <p className="text-gray-500">No bookings yet</p>
              <Link to="/bikes" className="btn-primary mt-4 inline-block text-sm">Browse Bikes</Link>
            </div>
          ) : (
            <div className="space-y-3">
              {recentBookings.map((booking, i) => (
                <div key={booking._id || i} className="flex items-center gap-4 p-4 bg-dark-hover rounded-xl">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center flex-shrink-0">
                    <MdDirectionsBike className="text-primary text-2xl" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-white font-medium text-sm truncate">{booking.bike?.name || 'Bike'}</p>
                    <p className="text-gray-500 text-xs">{new Date(booking.startDate).toLocaleDateString()} → {new Date(booking.endDate).toLocaleDateString()}</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-white font-semibold text-sm">₹{booking.totalAmount}</p>
                    <span className={`badge text-xs ${
                      booking.status === 'confirmed' ? 'bg-green-500/20 text-green-400' :
                      booking.status === 'cancelled' ? 'bg-red-500/20 text-red-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>{booking.status || 'pending'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </>
  )
}
