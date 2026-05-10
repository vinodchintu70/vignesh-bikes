import { motion } from 'framer-motion'
import { FiDollarSign, FiTrendingUp, FiCalendar } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

const monthlyData = [
  { month: 'Jan', earnings: 4200, bookings: 7 }, { month: 'Feb', earnings: 6800, bookings: 11 },
  { month: 'Mar', earnings: 5400, bookings: 9 }, { month: 'Apr', earnings: 9200, bookings: 15 },
  { month: 'May', earnings: 7600, bookings: 13 }, { month: 'Jun', earnings: 11400, bookings: 19 },
]

const bikeData = [
  { name: 'Royal Enfield', value: 45, color: '#3B82F6' },
  { name: 'Yamaha MT-15', value: 30, color: '#06B6D4' },
  { name: 'KTM Duke', value: 25, color: '#F97316' },
]

export default function OwnerEarnings() {
  const totalEarnings = monthlyData.reduce((s, d) => s + d.earnings, 0)
  const totalBookings = monthlyData.reduce((s, d) => s + d.bookings, 0)

  return (
    <>
      <Helmet><title>Earnings - Owner Panel</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Earnings Analytics</h2>
          <p className="text-gray-400 mt-1">Track your rental income and performance</p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { label: 'Total Earnings', value: `₹${totalEarnings.toLocaleString()}`, icon: FiDollarSign, color: 'text-green-400', bg: 'bg-green-400/20' },
            { label: 'This Month', value: '₹11,400', icon: FiTrendingUp, color: 'text-primary', bg: 'bg-primary/20' },
            { label: 'Total Bookings', value: totalBookings, icon: FiCalendar, color: 'text-secondary', bg: 'bg-secondary/20' },
            { label: 'Avg Per Booking', value: `₹${Math.round(totalEarnings / totalBookings)}`, icon: FiDollarSign, color: 'text-accent', bg: 'bg-accent/20' },
          ].map(({ label, value, icon: Icon, color, bg }, i) => (
            <motion.div key={label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }} className="card">
              <div className={`w-10 h-10 ${bg} rounded-xl flex items-center justify-center mb-3`}><Icon className={`${color} text-lg`} /></div>
              <p className="text-white font-bold text-2xl">{value}</p>
              <p className="text-gray-400 text-xs mt-1">{label}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card lg:col-span-2">
            <h3 className="text-white font-semibold mb-6">Monthly Earnings</h3>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={monthlyData}>
                <defs>
                  <linearGradient id="earningsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#2A2D35" />
                <XAxis dataKey="month" stroke="#6B7280" tick={{ fontSize: 12 }} />
                <YAxis stroke="#6B7280" tick={{ fontSize: 12 }} />
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} formatter={(v) => [`₹${v}`, 'Earnings']} />
                <Area type="monotone" dataKey="earnings" stroke="#3B82F6" fill="url(#earningsGrad)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
            <h3 className="text-white font-semibold mb-6">Earnings by Bike</h3>
            <ResponsiveContainer width="100%" height={180}>
              <PieChart>
                <Pie data={bikeData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                  {bikeData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Pie>
                <Tooltip contentStyle={{ background: '#1A1D24', border: '1px solid #2A2D35', borderRadius: '12px', color: '#fff' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="space-y-2 mt-4">
              {bikeData.map(({ name, value, color }) => (
                <div key={name} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ background: color }} />
                    <span className="text-gray-400 text-xs">{name}</span>
                  </div>
                  <span className="text-white text-xs font-medium">{value}%</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </>
  )
}
