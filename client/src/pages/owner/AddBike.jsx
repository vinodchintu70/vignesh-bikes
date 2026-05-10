import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUpload, FiX, FiPlus } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import { bikeAPI } from '../../services/api'
import toast from 'react-hot-toast'

const categories = ['Sports', 'Cruiser', 'Adventure', 'Classic', 'Electric', 'Scooter']
const brands = ['Royal Enfield', 'Yamaha', 'Honda', 'KTM', 'Bajaj', 'TVS', 'Suzuki', 'Kawasaki', 'Ducati', 'BMW']

export default function AddBike() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [images, setImages] = useState([])
  const [form, setForm] = useState({
    name: '', brand: '', category: '', pricePerDay: '', location: '',
    description: '', year: new Date().getFullYear(),
    specs: { engine: '', fuelType: 'Petrol', mileage: '', maxSpeed: '', transmission: 'Manual' },
    features: [],
  })
  const [featureInput, setFeatureInput] = useState('')

  const handleChange = (e) => {
    const { name, value } = e.target
    if (name.startsWith('specs.')) {
      const key = name.split('.')[1]
      setForm(prev => ({ ...prev, specs: { ...prev.specs, [key]: value } }))
    } else {
      setForm(prev => ({ ...prev, [name]: value }))
    }
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    if (images.length + files.length > 5) return toast.error('Maximum 5 images allowed')
    const newImages = files.map(file => ({ file, preview: URL.createObjectURL(file) }))
    setImages(prev => [...prev, ...newImages])
  }

  const removeImage = (index) => {
    URL.revokeObjectURL(images[index].preview)
    setImages(prev => prev.filter((_, i) => i !== index))
  }

  const addFeature = () => {
    if (!featureInput.trim()) return
    setForm(prev => ({ ...prev, features: [...prev.features, featureInput.trim()] }))
    setFeatureInput('')
  }

  const removeFeature = (index) => setForm(prev => ({ ...prev, features: prev.features.filter((_, i) => i !== index) }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name || !form.brand || !form.category || !form.pricePerDay || !form.location) {
      return toast.error('Please fill all required fields')
    }
    setLoading(true)
    try {
      const { data } = await bikeAPI.create(form)
      if (images.length > 0) {
        const formData = new FormData()
        images.forEach(img => formData.append('images', img.file))
        await bikeAPI.uploadImages(data.bike._id, formData)
      }
      toast.success('Bike listed successfully!')
      navigate('/owner/bikes')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to add bike')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Add Bike - BikeRent</title></Helmet>
      <div className="max-w-3xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Add New Bike</h2>
          <p className="text-gray-400 mt-1">List your bike and start earning</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Images */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
            <h3 className="text-white font-semibold mb-4">Bike Photos</h3>
            <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
              {images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
                  <img src={img.preview} alt="" className="w-full h-full object-cover" />
                  <button type="button" onClick={() => removeImage(i)}
                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <FiX className="text-white" size={20} />
                  </button>
                </div>
              ))}
              {images.length < 5 && (
                <label className="aspect-square rounded-xl border-2 border-dashed border-dark-border hover:border-primary/50 flex flex-col items-center justify-center cursor-pointer transition-all group">
                  <FiUpload className="text-gray-500 group-hover:text-primary text-xl mb-1 transition-colors" />
                  <span className="text-gray-500 text-xs group-hover:text-primary transition-colors">Upload</span>
                  <input type="file" accept="image/*" multiple onChange={handleImageChange} className="hidden" />
                </label>
              )}
            </div>
            <p className="text-gray-500 text-xs mt-2">Upload up to 5 photos. First photo will be the cover image.</p>
          </motion.div>

          {/* Basic Info */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
            <h3 className="text-white font-semibold mb-4">Basic Information</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Bike Name *</label>
                <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="e.g. Royal Enfield Classic 350" className="input-field" required />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Brand *</label>
                <select name="brand" value={form.brand} onChange={handleChange} className="input-field" required>
                  <option value="">Select Brand</option>
                  {brands.map(b => <option key={b} value={b}>{b}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Category *</label>
                <select name="category" value={form.category} onChange={handleChange} className="input-field" required>
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Price Per Day (₹) *</label>
                <input type="number" name="pricePerDay" value={form.pricePerDay} onChange={handleChange} placeholder="e.g. 599" className="input-field" required min="1" />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Location *</label>
                <input type="text" name="location" value={form.location} onChange={handleChange} placeholder="e.g. Mumbai, Maharashtra" className="input-field" required />
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Year</label>
                <input type="number" name="year" value={form.year} onChange={handleChange} className="input-field" min="2000" max={new Date().getFullYear()} />
              </div>
            </div>
            <div className="mt-4">
              <label className="text-gray-400 text-sm mb-1.5 block">Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} rows={3} placeholder="Describe your bike..." className="input-field resize-none" />
            </div>
          </motion.div>

          {/* Specs */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card">
            <h3 className="text-white font-semibold mb-4">Specifications</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { name: 'specs.engine', label: 'Engine', placeholder: 'e.g. 350cc' },
                { name: 'specs.mileage', label: 'Mileage', placeholder: 'e.g. 35 kmpl' },
                { name: 'specs.maxSpeed', label: 'Max Speed', placeholder: 'e.g. 120 km/h' },
              ].map(({ name, label, placeholder }) => (
                <div key={name}>
                  <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
                  <input type="text" name={name} value={name.split('.')[1] ? form.specs[name.split('.')[1]] : form[name]} onChange={handleChange} placeholder={placeholder} className="input-field" />
                </div>
              ))}
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Fuel Type</label>
                <select name="specs.fuelType" value={form.specs.fuelType} onChange={handleChange} className="input-field">
                  {['Petrol', 'Electric', 'Diesel'].map(f => <option key={f} value={f}>{f}</option>)}
                </select>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Transmission</label>
                <select name="specs.transmission" value={form.specs.transmission} onChange={handleChange} className="input-field">
                  {['Manual', 'Automatic', 'Semi-Automatic'].map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>
          </motion.div>

          {/* Features */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }} className="card">
            <h3 className="text-white font-semibold mb-4">Features</h3>
            <div className="flex gap-2 mb-3">
              <input type="text" value={featureInput} onChange={(e) => setFeatureInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeature())} placeholder="e.g. ABS Brakes" className="input-field flex-1" />
              <button type="button" onClick={addFeature} className="btn-primary px-4 flex items-center gap-1"><FiPlus size={16} /> Add</button>
            </div>
            <div className="flex flex-wrap gap-2">
              {form.features.map((feature, i) => (
                <span key={i} className="flex items-center gap-1 bg-primary/20 text-primary px-3 py-1.5 rounded-lg text-sm">
                  {feature}
                  <button type="button" onClick={() => removeFeature(i)} className="hover:text-red-400 transition-colors"><FiX size={12} /></button>
                </span>
              ))}
            </div>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
            type="submit" disabled={loading}
            className="btn-gradient flex items-center gap-2 px-8 py-4 text-base"
          >
            {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><MdDirectionsBike size={20} /> List My Bike</>}
          </motion.button>
        </form>
      </div>
    </>
  )
}
