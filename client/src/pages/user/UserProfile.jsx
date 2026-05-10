import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiPhone, FiMapPin, FiSave } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function UserProfile() {
  const { user, updateUser } = useAuth()
  const [form, setForm] = useState({
    name:    user?.name    || '',
    email:   user?.email   || '',
    phone:   user?.phone   || '',
    address: user?.address || '',
    bio:     user?.bio     || '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim()) return toast.error('Name cannot be empty')
    setLoading(true)
    try {
      updateUser({ name: form.name, phone: form.phone, address: form.address, bio: form.bio })
      toast.success('Profile updated successfully! ✅')
    } catch {
      toast.error('Failed to update profile')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Helmet><title>Profile - Vignesh Konda Bike Rentals</title></Helmet>
      <div className="max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">My Profile</h2>
          <p className="text-gray-400 mt-1">Manage your personal information</p>
        </motion.div>

        {/* Avatar Card */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
          <div className="flex items-center gap-6">
            <div className="w-20 h-20 bg-cta-gradient rounded-2xl flex items-center justify-center text-white text-3xl font-bold">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h3 className="text-white font-bold text-xl">{user?.name}</h3>
              <p className="text-gray-400 text-sm">{user?.email}</p>
              <span className="badge bg-primary/20 text-primary text-xs mt-1 capitalize">{user?.role}</span>
            </div>
          </div>
        </motion.div>

        {/* Form */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
          <h3 className="text-white font-semibold mb-6">Personal Information</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Full Name</label>
                <div className="relative">
                  <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" name="name" value={form.name} onChange={handleChange} className="input-field pl-11" required />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="email" value={form.email} className="input-field pl-11 opacity-50 cursor-not-allowed" disabled />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Phone Number</label>
                <div className="relative">
                  <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+91 98765 43210" className="input-field pl-11" />
                </div>
              </div>
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Address</label>
                <div className="relative">
                  <FiMapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input type="text" name="address" value={form.address} onChange={handleChange} placeholder="Your address" className="input-field pl-11" />
                </div>
              </div>
            </div>
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Bio</label>
              <textarea name="bio" value={form.bio} onChange={handleChange} rows={3} placeholder="Tell us about yourself..." className="input-field resize-none" />
            </div>
            <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-gradient flex items-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiSave size={16} />}
              Save Changes
            </motion.button>
          </form>
        </motion.div>
      </div>
    </>
  )
}
