import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { AreaChart, Area, BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts'

const revenueData = [
  { month: 'Jan', revenue: 42000, bookings: 70 }, { month: 'Feb', revenue: 68000, bookings: 110 },
  { month: 'Mar', revenue: 54000, bookings: 90 }, { month: 'Apr', revenue: 92000, bookings: 150 },
  { month: 'May', revenue: 76000, bookings: 130 }, { month: 'Jun', revenue: 114000, bookings: 190 },
]

const categoryData = [
  { name: 'Sports', value: 35, color: '#3B82F6' }, { name: 'Cruiser', value: 25, color: '#06B6D4' },
  { name: 'Adventure', value: 20, color: '#F97316' }, { name: 'Classic', value: 12, color: '#8B5CF6' },
  { name: 'Electric', value: 8, color: '#10B981' },
]

const cityData = [
  { city: 'Mumbai', bookings: 320 }, { city: 'Delhi', bookings: 280 },
  { city: 'Bangalore', bookings: 240 }, { city: 'Pune', bookings: 180 },
  { city: 'Chennai', bookings: 150 }, { city: 'Hyderabad', bookings: 130 },
]

export default function AdminAnalytics() {
  return (
    <>
      <Helmet><title>Analytics - Admin</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Platform Analytics</h2>
          <p className="text-gray-400 mt-1">Comprehensive platform performance metrics</p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 className="text-white font-semibold mb-6">Revenue & Bookings Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <defs>
                  <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" />
                <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} />
                <Area type="monotone" dataKey="revenue" stroke="#3B82F6" fill="url(#revGrad)" strokeWidth={2} name="Revenue (₹)" />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 className="text-white font-semibold mb-6">Bookings by Category</h3>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={categoryData} cx="50%" cy="50%" outerRadius={80} paddingAngle={3} dataKey="value">
                  {categoryData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {categoryData.map(({ name, value, color }) => (
                <div key={name} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full flex-shrink-0" style={{ background: color }} />
                  <span className="text-gray-400 text-xs">{name}: {value}%</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Top Cities by Bookings</h3>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={cityData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" />
                <XAxis type="number" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis dataKey="city" type="category" stroke="#6B7280" tick={{ fontSize: 12 }} width={80} />
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} />
                <Bar dataKey="bookings" fill="#06B6D4" radius={[0, 6, 6, 0]} name="Bookings" />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      </div>
    </>
  )
}
