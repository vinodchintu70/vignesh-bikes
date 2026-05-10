import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiMail, FiArrowLeft } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { authAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      await authAPI.forgotPassword(email)
      setSent(true)
      toast.success('Reset link sent to your email!')
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to send reset email')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-dark-bg flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-cta-gradient rounded-xl flex items-center justify-center">
              <MdDirectionsBike className="text-white text-2xl" />
            </div>
          </Link>
          <h1 className="text-white font-display font-bold text-3xl">Forgot Password?</h1>
          <p className="text-gray-400 mt-2">Enter your email to receive a reset link</p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10">
          {sent ? (
            <div className="text-center py-4">
              <div className="w-16 h-16 bg-green-500/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiMail className="text-green-400 text-3xl" />
              </div>
              <h3 className="text-white font-bold text-xl mb-2">Check Your Email</h3>
              <p className="text-gray-400 text-sm mb-6">We've sent a password reset link to <span className="text-primary">{email}</span></p>
              <Link to="/login" className="btn-gradient inline-block px-8 py-3">Back to Login</Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="text-gray-400 text-sm mb-1.5 block">Email Address</label>
                <div className="relative">
                  <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="input-field pl-11"
                    required
                  />
                </div>
              </div>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-gradient w-full py-3.5 flex items-center justify-center gap-2"
              >
                {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Send Reset Link'}
              </motion.button>
              <Link to="/login" className="flex items-center justify-center gap-2 text-gray-400 hover:text-white text-sm transition-colors mt-4">
                <FiArrowLeft size={14} /> Back to Login
              </Link>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  )
}
