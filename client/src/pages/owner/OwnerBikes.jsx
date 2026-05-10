import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiEdit2, FiTrash2, FiPlus, FiToggleLeft, FiToggleRight } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bikeAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function OwnerBikes() {
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    bikeAPI.getOwnerBikes().then(({ data }) => setBikes(data.bikes || mockBikes)).catch(() => setBikes(mockBikes)).finally(() => setLoading(false))
  }, [])

  const handleDelete = async (id) => {
    if (!confirm('Delete this bike listing?')) return
    try {
      await bikeAPI.delete(id)
      setBikes(prev => prev.filter(b => b._id !== id))
      toast.success('Bike deleted')
    } catch { toast.error('Failed to delete bike') }
  }

  const toggleAvailability = async (id, current) => {
    try {
      await bikeAPI.update(id, { available: !current })
      setBikes(prev => prev.map(b => b._id === id ? { ...b, available: !current } : b))
      toast.success(`Bike marked as ${!current ? 'available' : 'unavailable'}`)
    } catch { toast.error('Failed to update availability') }
  }

  return (
    <>
      <Helmet><title>My Bikes - BikeRent</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="flex items-center justify-between">
          <div>
            <h2 className="font-display font-bold text-2xl text-white">My Bikes</h2>
            <p className="text-gray-400 mt-1">{bikes.length} bikes listed</p>
          </div>
          <Link to="/owner/bikes/add" className="btn-gradient flex items-center gap-2 text-sm">
            <FiPlus size={16} /> Add Bike
          </Link>
        </motion.div>

        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">{[1,2,3].map(i => <div key={i} className="h-64 skeleton rounded-2xl" />)}</div>
        ) : bikes.length === 0 ? (
          <div className="card text-center py-16">
            <MdDirectionsBike className="text-gray-600 text-5xl mx-auto mb-3" />
            <p className="text-gray-400 mb-4">No bikes listed yet</p>
            <Link to="/owner/bikes/add" className="btn-gradient inline-flex items-center gap-2"><FiPlus size={16} /> Add Your First Bike</Link>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {bikes.map((bike, i) => (
              <motion.div key={bike._id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }} className="card hover:border-primary/30">
                <div className="h-40 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
                  {bike.images?.[0] ? <img src={bike.images[0]} alt={bike.name} className="w-full h-full object-cover" /> : <MdDirectionsBike className="text-primary/40 text-7xl" />}
                </div>
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{bike.name}</h3>
                    <p className="text-gray-500 text-xs">{bike.brand} · {bike.category}</p>
                  </div>
                  <p className="text-primary font-bold">₹{bike.pricePerDay}<span className="text-gray-500 text-xs font-normal">/day</span></p>
                </div>
                <div className="flex items-center justify-between">
                  <button onClick={() => toggleAvailability(bike._id, bike.available)} className={`flex items-center gap-1.5 text-xs font-medium transition-colors ${bike.available ? 'text-green-400' : 'text-gray-500'}`}>
                    {bike.available ? <FiToggleRight size={18} /> : <FiToggleLeft size={18} />}
                    {bike.available ? 'Available' : 'Unavailable'}
                  </button>
                  <div className="flex gap-2">
                    <Link to={`/owner/bikes/edit/${bike._id}`} className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 transition-all">
                      <FiEdit2 size={14} />
                    </Link>
                    <button onClick={() => handleDelete(bike._id)} className="p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all">
                      <FiTrash2 size={14} />
                    </button>
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

const mockBikes = [
  { _id: '1', name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', category: 'Cruiser', pricePerDay: 599, available: true, images: [] },
  { _id: '2', name: 'Yamaha MT-15', brand: 'Yamaha', category: 'Sports', pricePerDay: 799, available: true, images: [] },
  { _id: '3', name: 'KTM Duke 390', brand: 'KTM', category: 'Sports', pricePerDay: 999, available: false, images: [] },
]
