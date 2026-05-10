import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiLock, FiBell, FiShield, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function UserSettings() {
  const { user, logout } = useAuth()
  const [passwords, setPasswords] = useState({ currentPassword: '', newPassword: '', confirmPassword: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [notifications, setNotifications] = useState({ email: true, sms: false, push: true, marketing: false })

  const handlePasswordChange = async (e) => {
    e.preventDefault()
    if (passwords.newPassword !== passwords.confirmPassword) return toast.error('Passwords do not match')
    if (passwords.newPassword.length < 6) return toast.error('Password must be at least 6 characters')
    setLoading(true)
    try {
      // Update password in localStorage
      const users = JSON.parse(localStorage.getItem('vk_users') || '[]')
      const idx = users.findIndex(u => u._id === user._id)
      if (idx === -1) { toast.error('User not found'); return }
      if (users[idx].password !== passwords.currentPassword) {
        toast.error('Current password is incorrect')
        setLoading(false)
        return
      }
      users[idx].password = passwords.newPassword
      localStorage.setItem('vk_users', JSON.stringify(users))
      toast.success('Password changed successfully! ✅')
      setPasswords({ currentPassword: '', newPassword: '', confirmPassword: '' })
    } catch {
      toast.error('Failed to change password')
    } finally {
      setLoading(false)
    }
  }

  const handleDeleteAccount = () => {
    if (!confirm('Are you sure? This will permanently delete your account.')) return
    const users = JSON.parse(localStorage.getItem('vk_users') || '[]')
    const updated = users.filter(u => u._id !== user._id)
    localStorage.setItem('vk_users', JSON.stringify(updated))
    toast.success('Account deleted')
    logout()
  }

  return (
    <>
      <Helmet><title>Settings - Vignesh Konda Bike Rentals</title></Helmet>
      <div className="max-w-2xl space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Settings</h2>
          <p className="text-gray-400 mt-1">Manage your account preferences</p>
        </motion.div>

        {/* Change Password */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
              <FiLock className="text-primary" size={18} />
            </div>
            <div>
              <h3 className="text-white font-semibold">Change Password</h3>
              <p className="text-gray-500 text-xs">Update your account password</p>
            </div>
          </div>
          <form onSubmit={handlePasswordChange} className="space-y-4">
            {[
              { name: 'currentPassword', label: 'Current Password' },
              { name: 'newPassword', label: 'New Password' },
              { name: 'confirmPassword', label: 'Confirm New Password' },
            ].map(({ name, label }) => (
              <div key={name}>
                <label className="text-gray-400 text-sm mb-1.5 block">{label}</label>
                <div className="relative">
                  <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type={showPass ? 'text' : 'password'}
                    value={passwords[name]}
                    onChange={(e) => setPasswords(prev => ({ ...prev, [name]: e.target.value }))}
                    className="input-field pl-11 pr-11"
                    required
                  />
                  {name === 'newPassword' && (
                    <button type="button" onClick={() => setShowPass(!showPass)} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                      {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                    </button>
                  )}
                </div>
              </div>
            ))}
            <button type="submit" disabled={loading} className="btn-primary flex items-center gap-2">
              {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <FiLock size={16} />}
              Update Password
            </button>
          </form>
        </motion.div>

        {/* Notifications */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="card">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 bg-secondary/20 rounded-xl flex items-center justify-center">
              <FiBell className="text-secondary" size={18} />
            </div>
            <div>
              <h3 className="text-white font-semibold">Notifications</h3>
              <p className="text-gray-500 text-xs">Choose what you want to be notified about</p>
            </div>
          </div>
          <div className="space-y-4">
            {[
              { key: 'email', label: 'Email Notifications', desc: 'Booking confirmations and updates' },
              { key: 'sms', label: 'SMS Notifications', desc: 'Important alerts via text message' },
              { key: 'push', label: 'Push Notifications', desc: 'Real-time app notifications' },
              { key: 'marketing', label: 'Marketing Emails', desc: 'Deals, offers and promotions' },
            ].map(({ key, label, desc }) => (
              <div key={key} className="flex items-center justify-between p-4 bg-dark-hover rounded-xl">
                <div>
                  <p className="text-white text-sm font-medium">{label}</p>
                  <p className="text-gray-500 text-xs">{desc}</p>
                </div>
                <button
                  onClick={() => setNotifications(prev => ({ ...prev, [key]: !prev[key] }))}
                  className={`w-12 h-6 rounded-full transition-all duration-300 relative ${notifications[key] ? 'bg-primary' : 'bg-dark-border'}`}
                >
                  <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-all duration-300 ${notifications[key] ? 'left-6' : 'left-0.5'}`} />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Danger Zone */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="card border-red-500/20">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-red-500/20 rounded-xl flex items-center justify-center">
              <FiShield className="text-red-400" size={18} />
            </div>
            <div>
              <h3 className="text-white font-semibold">Danger Zone</h3>
              <p className="text-gray-500 text-xs">Irreversible actions</p>
            </div>
          </div>
          <button onClick={handleDeleteAccount} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 text-sm transition-all border border-red-500/20">
            <FiTrash2 size={14} /> Delete Account
          </button>
        </motion.div>
      </div>
    </>
  )
}
