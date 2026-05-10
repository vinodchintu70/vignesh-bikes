import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FiArrowRight, FiPlay, FiStar } from 'react-icons/fi'
import { MdDirectionsBike, MdSpeed, MdSecurity } from 'react-icons/md'

const floatingBadges = [
  { icon: MdSpeed, label: 'Fast Booking', color: 'text-primary', bg: 'bg-primary/20', delay: 0 },
  { icon: MdSecurity, label: '100% Secure', color: 'text-secondary', bg: 'bg-secondary/20', delay: 0.2 },
  { icon: FiStar, label: '4.9 Rating', color: 'text-accent', bg: 'bg-accent/20', delay: 0.4 },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-dark-bg">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
        {/* Grid Pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: 'linear-gradient(rgba(59,130,246,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(59,130,246,0.3) 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div>
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full mb-6"
            >
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-gray-300 text-sm font-medium">🏍️ Hyderabad's #1 Bike Rental Service</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="font-display font-bold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6"
            >
              Vignesh Konda{' '}
              <span className="gradient-text">Bike</span>
              <br />
              <span className="gradient-text-orange">Rentals</span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-gray-400 text-lg leading-relaxed mb-8 max-w-lg"
            >
              Experience the thrill of premium bikes in Hyderabad. Book instantly, ride freely, and return effortlessly with Vignesh Konda Bike Rentals.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap gap-4 mb-10"
            >
              <Link to="/bikes" className="btn-gradient flex items-center gap-2 text-base px-8 py-4">
                Browse Bikes <FiArrowRight size={18} />
              </Link>
              <button className="flex items-center gap-3 text-white hover:text-primary transition-colors group">
                <div className="w-12 h-12 glass rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-all">
                  <FiPlay size={16} className="ml-0.5" />
                </div>
                <span className="font-medium">Watch Demo</span>
              </button>
            </motion.div>

            {/* Floating Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-wrap gap-3"
            >
              {floatingBadges.map(({ icon: Icon, label, color, bg, delay }) => (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.6 + delay }}
                  className={`flex items-center gap-2 ${bg} px-4 py-2 rounded-full border border-white/10`}
                >
                  <Icon className={color} size={16} />
                  <span className="text-white text-sm font-medium">{label}</span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right - Hero Visual */}
          <div className="relative hidden lg:block">
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              {/* Main Card */}
              <div className="relative glass rounded-3xl p-8 border border-white/10 shadow-card">
                {/* Bike Image */}
                <div className="w-full h-64 rounded-2xl mb-6 overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=700&q=80"
                    alt="Royal Enfield Classic 350"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-card/60 to-transparent" />
                  <div className="absolute bottom-3 left-3 flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <FiStar key={i} className="text-yellow-400 fill-yellow-400" size={12} />
                    ))}
                  </div>
                </div>

                {/* Bike Info */}
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-bold text-xl">Royal Enfield Classic 350</h3>
                    <p className="text-gray-400 text-sm">Hyderabad, Telangana</p>
                  </div>
                  <div className="text-right">
                    <p className="text-primary font-bold text-2xl">₹599</p>
                    <p className="text-gray-500 text-xs">per day</p>
                  </div>
                </div>

                <Link to="/bikes" className="btn-gradient w-full text-center mt-4 block">
                  Book Now
                </Link>
              </div>

              {/* Floating Stats Cards */}
              <motion.div
                animate={{ y: [-5, 5, -5] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-6 -left-6 glass rounded-2xl p-4 border border-white/10 shadow-card"
              >
                <p className="text-gray-400 text-xs">Active Riders</p>
                <p className="text-white font-bold text-2xl">12,450+</p>
                <div className="flex -space-x-2 mt-2">
                  {['bg-blue-400', 'bg-green-400', 'bg-purple-400', 'bg-orange-400'].map((color, i) => (
                    <div key={i} className={`w-6 h-6 ${color} rounded-full border-2 border-dark-card`} />
                  ))}
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [5, -5, 5] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -bottom-6 -right-6 glass rounded-2xl p-4 border border-white/10 shadow-card"
              >
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                  <p className="text-gray-400 text-xs">Just Booked</p>
                </div>
                <p className="text-white font-semibold text-sm">Yamaha MT-15</p>
                <p className="text-primary text-xs">Hyderabad · 2 mins ago</p>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-500 text-xs">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-5 h-8 border-2 border-gray-600 rounded-full flex items-start justify-center p-1"
          >
            <div className="w-1 h-2 bg-primary rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
