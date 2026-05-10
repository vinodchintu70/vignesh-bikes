const jwt = require('jsonwebtoken')

exports.generateToken = (id) => jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE || '7d' })

exports.generateRefreshToken = (id) => jwt.sign({ id }, process.env.JWT_REFRESH_SECRET, { expiresIn: process.env.JWT_REFRESH_EXPIRE || '30d' })

exports.sendTokenResponse = (user, statusCode, res) => {
  const token = exports.generateToken(user._id)
  const userObj = user.toObject ? user.toObject() : { ...user }
  delete userObj.password
  delete userObj.otp
  delete userObj.otpExpiry
  delete userObj.resetPasswordToken
  delete userObj.resetPasswordExpiry
  res.status(statusCode).json({ success: true, token, user: userObj })
}
