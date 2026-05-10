import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiCheck, FiX, FiDownload } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'

export default function UserPayments() {
  const [payments] = useState(mockPayments)
  const [loading] = useState(false)

  return (
    <>
      <Helmet><title>Payment History - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Payment History</h2>
          <p className="text-gray-400 mt-1">All your transactions in one place</p>
        </motion.div>

        {loading ? (
          <div className="space-y-3">{[1,2,3].map(i => <div key={i} className="h-20 skeleton rounded-2xl" />)}</div>
        ) : (
          <div className="card overflow-hidden">
            <div className="table-responsive">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-dark-border">
                    {['Transaction ID', 'Bike', 'Date', 'Amount', 'Status', 'Invoice'].map(h => (
                      <th key={h} className="text-left text-gray-400 text-xs font-medium py-3 px-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment, i) => (
                    <motion.tr
                      key={payment._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.05 }}
                      className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors"
                    >
                      <td className="py-4 px-4 text-gray-400 text-sm font-mono">#{payment._id?.slice(-8).toUpperCase()}</td>
                      <td className="py-4 px-4 text-white text-sm">{payment.booking?.bike?.name || 'Bike Rental'}</td>
                      <td className="py-4 px-4 text-gray-400 text-sm">{new Date(payment.createdAt).toLocaleDateString()}</td>
                      <td className="py-4 px-4 text-white font-semibold">₹{payment.amount}</td>
                      <td className="py-4 px-4">
                        <span className={`badge text-xs ${payment.status === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                          {payment.status === 'success' ? <><FiCheck size={10} className="inline mr-1" />Paid</> : <><FiX size={10} className="inline mr-1" />Failed</>}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <button className="flex items-center gap-1 text-primary hover:text-primary-light text-xs transition-colors">
                          <FiDownload size={12} /> PDF
                        </button>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </>
  )
}

const mockPayments = [
  { _id: 'pay001', booking: { bike: { name: 'Royal Enfield Classic 350' } }, createdAt: '2024-03-01', amount: 1797, status: 'success' },
  { _id: 'pay002', booking: { bike: { name: 'Yamaha MT-15' } }, createdAt: '2024-02-15', amount: 1598, status: 'success' },
  { _id: 'pay003', booking: { bike: { name: 'KTM Duke 390' } }, createdAt: '2024-01-20', amount: 1998, status: 'success' },
]
