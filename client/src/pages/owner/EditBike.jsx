import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiSave } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { bikeAPI } from '../../services/api'
import toast from 'react-hot-toast'

const categories = ['Sports', 'Cruiser', 'Adventure', 'Classic', 'Electric', 'Scooter']
const brands = ['Royal Enfield', 'Yamaha', 'Honda', 'KTM', 'Bajaj', 'TVS', 'Suzuki', 'Kawasaki']

export default function EditBike() {
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [form, setForm] = useState({ name: '', brand: '', category: '', pricePerDay: '', location: '', description: '', year: 2023, specs: { engine: '', fuelType: 'Petrol', mileage: '', maxSpeed: '', transmission: 'Manual' } })

  useEffect(() => {
    bikeAPI.getById(id).then(({ data }) => {
      const b = data.bike
      setForm({ name: b.name || '', brand: b.brand || '', category: b.category || '', pricePerDay: b.pricePerDay || '', location: b.location || '', description: b.description || '', year: b.year || 2023, specs: b.specs || { engine: '', fuelType: 'Petrol', mileage: '', maxSpeed: '', transmission: 'Manual' } })
    }).catch(() => toast.error('Failed to load bike')).finally(() => setLoading(false))
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('specs.')) {
      const key = name.split('.')[1]
      setForm(prev => ({ ...prev, specs: { ...prev.specs, [key]: value } }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    try {
      await bikeAPI.update(id, form)
      toast.success('Bike updated successfully!')
      navigate('/owner/bikes')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to update bike')
    } finally {
      setSaving(false)
    }
  }

  if (loading) return <div className="flex items-center justify-center h-64"><div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" /></div>

  return (
    <>
      <Helmet><title>Edit Bike - BikeRent</title></Helmet>
      <div className="max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Edit Bike</h2>
          <p className="text-gray-400 mt-1">Update your bike listing details</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 className="text-white font-semibold mb-4">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-gray-400 text-sm mb-1.5 block">Bike Name</label><input type="text" name="name" value={form.name} onChange={handleChange} className="input-field" required /></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Brand</label><select name="brand" value={form.brand} onChange={handleChange} className="input-field">{brands.map(b => <option key={b} value={b}>{b}</option>)}</select></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Category</label><select name="category" value={form.category} onChange={handleChange} className="input-field">{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Price Per Day (₹)</label><input type="number" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} className="input-field" required /></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Location</label><input type="text" name="location" value={form.location} onChange={handleChange} className="input-field" required /></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Year</label><input type="number" name="year" value={form.year} onChange={handleChange} className="input-field" /></div>
            </div>
            <div className="mt-4"><label className="text-gray-400 text-sm mb-1.5 block">Description</label><textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input-field resize-none" /></div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 className="text-white font-semibold mb-4">Specifications</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div><label className="text-gray-400 text-sm mb-1.5 block">Engine</label><input type="text" name="specs.engine" value={form.specs.engine} onChange={handleChange} className="input-field" /></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Mileage</label><input type="text" name="specs.mileage" value={form.specs.mileage} onChange={handleChange} className="input-field" /></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Max Speed</label><input type="text" name="specs.maxSpeed" value={form.specs.maxSpeed} onChange={handleChange} className="input-field" /></div>
              <div><label className="text-gray-400 text-sm mb-1.5 block">Fuel Type</label><select name="specs.fuelType" value={form.specs.fuelType} onChange={handleChange} className="input-field">{['Petrol', 'Electric', 'Diesel'].map(f => <option key={f} value={f}>{f}</option>)}</select></div>
            </div>
          </motion.div>

          <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={saving} className="btn-gradient flex items-center gap-2 px-8 py-4">
            {saving ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FiSave size={18} /> Save Changes</>}
          </motion.button>
        </form>
      </div>
    </>
  )
}
