import { useState, useRef, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdDirectionsBike } from 'react-icons/md'
import { authAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'

export default function OTPVerificationPage() {
  const [otp, setOtp] = useState(['', '', '', '', '', ''])
  const [loading, setLoading] = useState(false)
  const [resendTimer, setResendTimer] = useState(60)
  const inputRefs = useRef([])
  const navigate = useNavigate()
  const location = useLocation()
  const { verifyOTP } = useAuth()
  const email = location.state?.email || ''

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(prev => prev - 1), 1000)
      return () => clearTimeout(timer)
    }
  }, [resendTimer])

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return
    const newOtp = [...otp]
    newOtp[index] = value.slice(-1)
    setOtp(newOtp)
    if (value && index < 5) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handlePaste = (e) => {
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6)
    if (pasted.length === 6) {
      setOtp(pasted.split(''))
      inputRefs.current[5]?.focus()
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const otpString = otp.join('')
    if (otpString.length !== 6) return toast.error('Please enter complete OTP')
    setLoading(true)
    try {
      const { user } = await verifyOTP({ email, otp: otpString })
      if (user.role === 'owner') navigate('/owner/dashboard', { replace: true })
      else navigate('/dashboard', { replace: true })
    } catch (err) {
      toast.error(err.response?.data?.message || 'Invalid OTP')
    } finally {
      setLoading(false)
    }
  }

  const handleResend = async () => {
    try {
      await authAPI.resendOTP(email)
      setResendTimer(60)
      toast.success('OTP resent!')
    } catch {
      toast.error('Failed to resend OTP')
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
          <h1 className="text-white font-display font-bold text-3xl">Verify Email</h1>
          <p className="text-gray-400 mt-2">
            Enter the 6-digit code sent to{' '}
            <span className="text-primary font-medium">{email || 'your email'}</span>
          </p>
        </div>

        <div className="glass rounded-3xl p-8 border border-white/10">
          <form onSubmit={handleSubmit}>
            <div className="flex gap-3 justify-center mb-8" onPaste={handlePaste}>
              {otp.map((digit, i) => (
                <motion.input
                  key={i}
                  ref={(el) => (inputRefs.current[i] = el)}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleChange(i, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(i, e)}
                  whileFocus={{ scale: 1.05 }}
                  className={`w-12 h-14 text-center text-white text-xl font-bold bg-dark-hover border rounded-xl focus:outline-none transition-all duration-200 ${
                    digit ? 'border-primary bg-primary/10' : 'border-dark-border focus:border-primary'
                  }`}
                />
              ))}
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading || otp.join('').length !== 6}
              className="btn-gradient w-full py-3.5 flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : 'Verify Email'}
            </motion.button>
          </form>

          <div className="text-center mt-6">
            {resendTimer > 0 ? (
              <p className="text-gray-500 text-sm">Resend code in <span className="text-primary font-medium">{resendTimer}s</span></p>
            ) : (
              <button onClick={handleResend} className="text-primary hover:text-primary-light text-sm font-medium transition-colors">
                Resend OTP
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  )
}
