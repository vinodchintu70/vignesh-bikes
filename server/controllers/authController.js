const crypto = require('crypto')
const User = require('../models/User')
const Notification = require('../models/Notification')
const { sendTokenResponse } = require('../utils/jwt')
const { sendPasswordResetEmail } = require('../utils/email')
const { OAuth2Client } = require('google-auth-library')

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

// @POST /api/auth/register
exports.register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body
    if (!name || !email || !password) return res.status(400).json({ message: 'Please provide name, email and password' })

    const existingUser = await User.findOne({ email })
    if (existingUser) return res.status(400).json({ message: 'Email already registered' })

    const user = await User.create({
      name, email, password, phone,
      role: ['customer', 'owner'].includes(role) ? role : 'customer',
      isVerified: true,
    })

    sendTokenResponse(user, 201, res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/verify-otp
exports.verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body
    const user = await User.findOne({ email }).select('+otp +otpExpiry')
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.otp !== otp) return res.status(400).json({ message: 'Invalid OTP' })
    if (user.otpExpiry < Date.now()) return res.status(400).json({ message: 'OTP has expired' })

    user.isVerified = true
    user.otp = undefined
    user.otpExpiry = undefined
    await user.save()

    await Notification.create({ user: user._id, title: 'Welcome to BikeRent!', message: 'Your account has been verified successfully.', type: 'system' })
    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/resend-otp
exports.resendOTP = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'User not found' })
    if (user.isVerified) return res.status(400).json({ message: 'Email already verified' })

    const otp = generateOTP()
    user.otp = otp
    user.otpExpiry = new Date(Date.now() + 10 * 60 * 1000)
    await user.save()
    await sendOTPEmail(email, otp)
    res.json({ success: true, message: 'OTP resent successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body
    if (!email || !password) return res.status(400).json({ message: 'Please provide email and password' })

    const user = await User.findOne({ email }).select('+password')
    if (!user || !user.password) return res.status(401).json({ message: 'Invalid credentials' })
    if (!user.isActive) return res.status(401).json({ message: 'Account has been deactivated' })

    const isMatch = await user.comparePassword(password)
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' })

    user.lastLogin = new Date()
    await user.save({ validateBeforeSave: false })
    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/google
exports.googleLogin = async (req, res) => {
  try {
    const { token } = req.body
    let payload

    // Try as ID token first, then as access token
    try {
      const ticket = await googleClient.verifyIdToken({ idToken: token, audience: process.env.GOOGLE_CLIENT_ID })
      payload = ticket.getPayload()
    } catch {
      const response = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
      payload = await response.json()
    }

    if (!payload?.email) return res.status(400).json({ message: 'Invalid Google token' })

    let user = await User.findOne({ email: payload.email })
    if (!user) {
      user = await User.create({
        name: payload.name,
        email: payload.email,
        avatar: payload.picture,
        googleId: payload.sub,
        isVerified: true,
        role: 'customer',
      })
    } else {
      user.googleId = payload.sub
      if (!user.avatar) user.avatar = payload.picture
      user.lastLogin = new Date()
      await user.save({ validateBeforeSave: false })
    }

    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @GET /api/auth/me
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id)
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/auth/profile
exports.updateProfile = async (req, res) => {
  try {
    const { name, phone, address, bio } = req.body
    const user = await User.findByIdAndUpdate(req.user._id, { name, phone, address, bio }, { new: true, runValidators: true })
    res.json({ success: true, user })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @PUT /api/auth/change-password
exports.changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body
    const user = await User.findById(req.user._id).select('+password')
    if (!user.password) return res.status(400).json({ message: 'No password set. Use Google login.' })

    const isMatch = await user.comparePassword(currentPassword)
    if (!isMatch) return res.status(400).json({ message: 'Current password is incorrect' })

    user.password = newPassword
    await user.save()
    res.json({ success: true, message: 'Password changed successfully' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/forgot-password
exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body
    const user = await User.findOne({ email })
    if (!user) return res.status(404).json({ message: 'No account with that email' })

    const resetToken = crypto.randomBytes(32).toString('hex')
    user.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex')
    user.resetPasswordExpiry = new Date(Date.now() + 60 * 60 * 1000)
    await user.save({ validateBeforeSave: false })

    const resetUrl = `${process.env.CLIENT_URL}/reset-password/${resetToken}`
    await sendPasswordResetEmail(email, resetUrl)
    res.json({ success: true, message: 'Password reset email sent' })
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}

// @POST /api/auth/reset-password/:token
exports.resetPassword = async (req, res) => {
  try {
    const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex')
    const user = await User.findOne({
      resetPasswordToken: hashedToken,
      resetPasswordExpiry: { $gt: Date.now() },
    })
    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' })

    user.password = req.body.password
    user.resetPasswordToken = undefined
    user.resetPasswordExpiry = undefined
    await user.save()
    sendTokenResponse(user, 200, res)
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
}
