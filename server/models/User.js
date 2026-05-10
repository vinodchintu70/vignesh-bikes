const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, minlength: 8, select: false },
  phone: { type: String, trim: true },
  avatar: { type: String },
  role: { type: String, enum: ['customer', 'owner', 'admin'], default: 'customer' },
  address: { type: String },
  bio: { type: String },
  isVerified: { type: Boolean, default: false },
  isActive: { type: Boolean, default: true },
  googleId: { type: String },
  otp: { type: String, select: false },
  otpExpiry: { type: Date, select: false },
  resetPasswordToken: { type: String, select: false },
  resetPasswordExpiry: { type: Date, select: false },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Bike' }],
  lastLogin: { type: Date },
}, { timestamps: true })

userSchema.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

userSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password)
}

module.exports = mongoose.model('User', userSchema)
