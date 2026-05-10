import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiLock, FiEye, FiEyeOff, FiArrowRight } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function LoginPage() {
  const [form, setForm]         = useState({ email: '', password: '' })
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading]   = useState(false)
  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from      = location.state?.from?.pathname || '/dashboard'

  const handleChange = (e) =>
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!form.email.trim())    return toast.error('Please enter your email')
    if (!form.password.trim()) return toast.error('Please enter your password')

    setLoading(true)
    try {
      const { user } = await login({ email: form.email, password: form.password })
      if (user.role === 'admin')      navigate('/admin/dashboard', { replace: true })
      else if (user.role === 'owner') navigate('/owner/dashboard', { replace: true })
      else                            navigate(from === '/login' ? '/dashboard' : from, { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || err.message || 'Login failed. Please try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4 py-12 relative overflow-hidden">
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

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
          <h1 className="text-white font-display font-bold text-3xl">Welcome Back</h1>
          <p className="text-gray-400 mt-2 text-sm">Sign in to your account</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10 shadow-card">
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="text-gray-400 text-sm mb-1.5 block">Email Address</label>
              <div className="relative">
                <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type="email" name="email" value={form.email}
                  onChange={handleChange} placeholder="you@example.com"
                  className="input-field pl-11" autoComplete="email" required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-gray-400 text-sm">Password</label>
                <Link to="/forgot-password" className="text-primary text-xs hover:text-primary-light transition-colors">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                <input
                  type={showPass ? 'text' : 'password'}
                  name="password" value={form.password}
                  onChange={handleChange} placeholder="Enter your password"
                  className="input-field pl-11 pr-11" autoComplete="current-password" required
                />
                <button type="button" onClick={() => setShowPass(!showPass)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPass ? <FiEyeOff size={16} /> : <FiEye size={16} />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              type="submit" disabled={loading}
              className="btn-gradient w-full flex items-center justify-center gap-2 py-3.5 text-base font-semibold"
            >
              {loading
                ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                : <>Sign In <FiArrowRight size={16} /></>
              }
            </motion.button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-dark-border" />
            <span className="text-gray-600 text-xs">New here?</span>
            <div className="flex-1 h-px bg-dark-border" />
          </div>

          <Link to="/signup"
            className="btn-secondary w-full flex items-center justify-center gap-2 py-3 text-sm font-semibold">
            Create Free Account
          </Link>
        </div>
      </motion.div>
    </div>
  )
}
