import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiDollarSign, FiCheck, FiX } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

export default function AdminPayments() {
  const [payments] = useState(mockPayments)
  const [loading] = useState(false)

  const totalRevenue = payments.filter(p => p.status === 'success').reduce((s, p) => s + (p.amount || 0), 0)

  return (
    <>
      <Helmet><title>Payments - Admin</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Payment Management</h2>
          <p className="text-gray-400 mt-1">Total Revenue: <span className="text-green-400 font-bold">₹{totalRevenue.toLocaleString()}</span></p>
        </motion.div>

        <div className="card overflow-hidden">
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  {['Transaction ID', 'User', 'Bike', 'Amount', 'Method', 'Date', 'Status'].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-medium py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? [...Array(5)].map((_, i) => <tr key={i}><td colSpan={7} className="py-3 px-4"><div className="h-10 skeleton rounded-lg" /></td></tr>) :
                  payments.map((payment, i) => (
                    <motion.tr key={payment._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                      <td className="py-4 px-4 text-primary text-sm font-mono">#{payment._id?.slice(-8).toUpperCase()}</td>
                      <td className="py-4 px-4 text-white text-sm">{payment.user?.name || 'Unknown'}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{payment.booking?.bike?.name || 'Bike Rental'}</td>
                      <td className="py-4 px-4 text-white font-semibold">₹{payment.amount}</td>
                      <td className="py-4 px-4"><span className="badge bg-primary/20 text-primary text-xs">{payment.method || 'Cash'}</span></td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4">
                        <span className={`badge text-xs flex items-center gap-1 w-fit ${payment.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {payment.status === 'success' ? <FiCheck size={10} /> : <FiX size={10} />}
                          {payment.status === 'success' ? 'Success' : 'Failed'}
                        </span>
                      </td>
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

const mockPayments = [
  { _id: 'p001', user: { name: 'Arjun Sharma' }, booking: { bike: { name: 'Royal Enfield Classic 350' } }, amount: 1797, method: 'Cash', createdAt: '2024-03-01', status: 'success' },
  { _id: 'p002', user: { name: 'Priya Patel' }, booking: { bike: { name: 'Yamaha MT-15' } }, amount: 1598, method: 'Cash', createdAt: '2024-02-15', status: 'success' },
  { _id: 'p003', user: { name: 'Rahul Verma' }, booking: { bike: { name: 'KTM Duke 390' } }, amount: 1998, method: 'Cash', createdAt: '2024-01-20', status: 'success' },
]
