import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiPhone, FiArrowRight } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

const roles = [
  { value: 'customer', label: 'Customer', desc: 'Rent bikes', icon: '🏍️' },
  { value: 'owner',    label: 'Bike Owner', desc: 'List & earn', icon: '🔑' },
]

export default function SignupPage() {
  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    password: '', confirmPassword: '', role: 'customer',
  })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const { register }            = useAuth()
  const navigate                = useNavigate()

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.name.trim())                      return toast.error('Please enter your name')
    if (!form.email.trim())                     return toast.error('Please enter your email')
    if (form.password.length < 6)               return toast.error('Password must be at least 6 characters')
    if (form.password !== form.confirmPassword) return toast.error('Passwords do not match')

    setLoading(true)
    try {
      const { user } = await register(form)
      if (user.role === 'owner') navigate('/owner/dashboard', { replace: true })
      else if (user.role === 'admin') navigate('/admin/dashboard', { replace: true })
      else navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Registration failed.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="relative w-full max-w-md z-10"
      >
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-cta-gradient rounded-xl flex items-center justify-center">
              <MdDirectionsBike className="text-white text-2xl" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Vignesh Konda <span className="gradient-text">Bikes</span>
            </span>
          </Link>
          <h1 className="text-white font-display font-bold text-3xl">Create Account</h1>
          <p className="text-gray-400 mt-2 text-sm">Join Vignesh Konda Bike Rentals today</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 shadow-card">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {roles.map((role) => (
              <button
                key={role.value}
                type="button"
                onClick={() => setForm(prev => ({ ...prev, role: role.value }))}
                className={`p-3 rounded-xl border text-center transition-all duration-200 ${
                  form.role === role.value
                    ? 'border-primary bg-primary/10 text-white'
                    : 'border-dark-border text-gray-400 hover:border-primary/30 hover:text-white'
                }`}
              >
                <div className="text-2xl mb-1">{role.icon}</div>
                <p className="font-semibold text-sm">{role.label}</p>
                <p className="text-xs text-gray-500">{role.desc}</p>
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Name */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Full Name *</label>
              <div className="relative">
                <FiUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="text" name="name" value={form.name}
                  onChange={handleChange} placeholder="Your full name"
                  className="input-field pl-11" autoComplete="name" required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email Address *</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com"
                  className="input-field pl-11" autoComplete="email" required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Phone Number</label>
              <div className="relative">
                <FiPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="tel" name="phone" value={form.phone}
                  onChange={handleChange} placeholder="+91 98765 43210"
                  className="input-field pl-11" autoComplete="tel"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Password *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="Min. 6 characters"
                  className="input-field pl-11 pr-11" autoComplete="new-password" required
                />
                <button
                  type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300"
                >
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Confirm Password *</label>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="password" name="confirmPassword" value={form.confirmPassword}
                  onChange={handleChange} placeholder="Repeat your password"
                  className="input-field pl-11" autoComplete="new-password" required
                />
              </div>
            </div>

            <p className="text-gray-500 text-xs">
              By creating an account, you agree to our{' '}
              <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
              <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </p>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <>Create Account <FiArrowRight size={16} /></>
              }
            </motion.button>
          </form>

          <p className="text-center text-gray-400 text-sm mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-primary hover:text-primary-light font-medium transition-colors">
              Sign in
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
