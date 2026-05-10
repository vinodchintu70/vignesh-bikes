import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUsers, FiCalendar, FiDollarSign, FiTrendingUp, FiArrowRight, FiAlertCircle } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { adminAPI } from '../../services/api'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const revenueData = [
  { day: 'Mon', revenue: 12400 }, { day: 'Tue', revenue: 18600 },
  { day: 'Wed', revenue: 15200 }, { day: 'Thu', revenue: 22800 },
  { day: 'Fri', revenue: 19400 }, { day: 'Sat', revenue: 31200 },
  { day: 'Sun', revenue: 28600 },
]

export default function AdminDashboard() {
  const [stats, setStats] = useState({ totalUsers: 0, totalBikes: 0, totalBookings: 0, totalRevenue: 0 })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    adminAPI.getDashboard().then(({ data }) => setStats(data.stats || mockStats)).catch(() => setStats(mockStats)).finally(() => setLoading(false))
  }, [])

  const statCards = [
    { icon: FiUsers, label: 'Total Users', value: stats.totalUsers.toLocaleString(), change: '+12%', color: 'text-primary', bg: 'bg-primary/20', link: '/admin/users' },
    { icon: MdDirectionsBike, label: 'Total Bikes', value: stats.totalBikes.toLocaleString(), change: '+8%', color: 'text-secondary', bg: 'bg-secondary/20', link: '/admin/bikes' },
    { icon: FiCalendar, label: 'Total Bookings', value: stats.totalBookings.toLocaleString(), change: '+24%', color: 'text-accent', bg: 'bg-accent/20', link: '/admin/bookings' },
    { icon: FiDollarSign, label: 'Total Revenue', value: `₹${(stats.totalRevenue / 100000).toFixed(1)}L`, change: '+18%', color: 'text-green-400', bg: 'bg-green-400/20', link: '/admin/payments' },
  ]

  return (
    <>
      <Helmet><title>Admin Dashboard - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">Admin Dashboard</h2>
            <p className="text-gray-400 mt-1">Platform overview and analytics</p>
          </div>
          <Link to="/admin/analytics" className="btn-gradient flex items-center gap-2 text-sm">
            <FiTrendingUp size={16} /> Analytics
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {statCards.map(({ icon: Icon, label, value, change, color, bg, link }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
              <Link to={link} className="card block hover:border-primary/30 group">
                <div className="flex items-center justify-between mb-3">
                  <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform`}>
                    <Icon className={`${color} text-lg`} />
                  </div>
                  <span className="text-green-400 text-xs font-medium">{change}</span>
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
              <h3 className="text-white font-semibold">Weekly Revenue</h3>
              <span className="badge bg-green-500/20 text-green-400 text-xs">This Week</span>
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" />
                <XAxis dataKey="day" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} formatter={(v) => [`₹${v}`, 'Revenue']} />
                <Line type="monotone" dataKey="revenue" stroke="#3B82F6" strokeWidth={2} dot={{ fill: '#3B82F6', r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
            <h3 className="text-white font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-3">
              {[
                { label: 'Manage Users', path: '/admin/users', icon: FiUsers, color: 'text-primary bg-primary/20' },
                { label: 'Review Bikes', path: '/admin/bikes', icon: MdDirectionsBike, color: 'text-secondary bg-secondary/20' },
                { label: 'View Bookings', path: '/admin/bookings', icon: FiCalendar, color: 'text-accent bg-accent/20' },
                { label: 'Payment Reports', path: '/admin/payments', icon: FiDollarSign, color: 'text-green-400 bg-green-400/20' },
              ].map(({ label, path, icon: Icon, color }) => (
                <Link key={path} to={path} className="flex items-center gap-3 p-3 rounded-xl hover:bg-dark-hover transition-all group">
                  <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}><Icon size={16} /></div>
                  <span className="text-gray-400 group-hover:text-white text-sm transition-colors">{label}</span>
                  <FiArrowRight size={14} className="ml-auto text-gray-600 group-hover:text-primary transition-colors" />
                </Link>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Recent Activity */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="card">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white font-semibold">Recent Activity</h3>
            <span className="badge bg-primary/20 text-primary text-xs">Live</span>
          </div>
          <div className="space-y-3">
            {[
              { msg: 'New user registered: Arjun Sharma', time: '2 min ago', type: 'user' },
              { msg: 'New bike listed: KTM Duke 390 in Bangalore', time: '15 min ago', type: 'bike' },
              { msg: 'Booking confirmed: #BK2024001', time: '32 min ago', type: 'booking' },
              { msg: 'Payment received: ₹1,797 for booking #BK2024001', time: '1 hr ago', type: 'payment' },
            ].map(({ msg, time, type }, i) => (
              <div key={i} className="flex items-center gap-3 p-3 bg-dark-hover rounded-xl">
                <div className={`w-2 h-2 rounded-full flex-shrink-0 ${type === 'user' ? 'bg-primary' : type === 'bike' ? 'bg-secondary' : type === 'booking' ? 'bg-accent' : 'bg-green-400'}`} />
                <p className="text-gray-300 text-sm flex-1">{msg}</p>
                <span className="text-gray-500 text-xs flex-shrink-0">{time}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </>
  )
}

const mockStats = { totalUsers: 12450, totalBikes: 534, totalBookings: 8920, totalRevenue: 4560000 }
