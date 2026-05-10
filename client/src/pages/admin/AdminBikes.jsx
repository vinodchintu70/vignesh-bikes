import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiCheck, FiX } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function AdminBikes() {
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminAPI.getBikes().then(({ data }) => setBikes(data.bikes || mockBikes)).catch(() => setBikes(mockBikes)).finally(() => setLoading(false))
  }, [])

  const handleApprove = async (id) => {
    try {
      await adminAPI.approveBike(id)
      setBikes(prev => prev.map(b => b._id === id ? { ...b, status: 'approved' } : b))
      toast.success('Bike approved!')
    } catch { toast.error('Failed to approve bike') }
  }

  const handleReject = async (id) => {
    try {
      await adminAPI.rejectBike(id, 'Does not meet platform standards')
      setBikes(prev => prev.map(b => b._id === id ? { ...b, status: 'rejected' } : b))
      toast.success('Bike rejected')
    } catch { toast.error('Failed to reject bike') }
  }

  const filtered = bikes.filter(b => b.name?.toLowerCase().includes(search.toLowerCase()) || b.brand?.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Helmet><title>Manage Bikes - Admin</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Manage Bikes</h2>
          <p className="text-gray-400 mt-1">{bikes.length} bikes on platform</p>
        </motion.div>

        <div className="relative max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" placeholder="Search bikes..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {loading ? [...Array(6)].map((_, i) => <div key={i} className="h-64 skeleton rounded-2xl" />) :
            filtered.map((bike, i) => (
              <motion.div key={bike._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.06 }} className="card hover:border-primary/30">
                <div className="h-36 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {bike.images?.[0] ? <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover" /> : <MdDirectionsBike className="text-primary/40 text-6xl" />}
                </div>
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-white font-semibold text-sm">{bike.name}</h3>
                    <p className="text-gray-500 text-xs">{bike.brand} · {bike.location}</p>
                  </div>
                  <span className={`badge text-xs ${bike.status === 'approved' ? 'bg-green-500/20 text-green-400' : bike.status === 'rejected' ? 'bg-red-500/20 text-red-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                    {bike.status || 'pending'}
                  </span>
                </div>
                <p className="text-primary font-bold mb-3">₹{bike.pricePerDay}/day</p>
                {(!bike.status || bike.status === 'pending') && (
                  <div className="flex gap-2">
                    <button onClick={() => handleApprove(bike._id)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-green-500/10 text-green-400 hover:bg-green-500/20 text-xs transition-all">
                      <FiCheck size={12} /> Approve
                    </button>
                    <button onClick={() => handleReject(bike._id)} className="flex-1 flex items-center justify-center gap-1 py-2 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs transition-all">
                      <FiX size={12} /> Reject
                    </button>
                  </div>
                )}
              </motion.div>
            ))
          }
        </div>
      </div>
    </>
  )
}

const mockBikes = [
  { _id: 'b1', name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', location: 'Mumbai', pricePerDay: 599, status: 'approved', images: [] },
  { _id: 'b2', name: 'Yamaha MT-15', brand: 'Yamaha', location: 'Delhi', pricePerDay: 799, status: 'pending', images: [] },
  { _id: 'b3', name: 'KTM Duke 390', brand: 'KTM', location: 'Bangalore', pricePerDay: 999, status: 'pending', images: [] },
]
