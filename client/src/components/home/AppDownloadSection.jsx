import { motion } from 'framer-motion'
import { FiSmartphone, FiDownload } from 'react-icons/fi'
import { Link } from 'react-router-dom'

export default function AppDownloadSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary/20 via-dark-card to-secondary/20 border border-white/10 p-8 md:p-16"
        >
          {/* Background Blobs */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-secondary/20 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Coming Soon</p>
              <h2 className="font-display font-bold text-4xl md:text-5xl text-white mb-4">
                Download the <span className="gradient-text">BikeRent</span> App
              </h2>
              <p className="text-gray-400 text-lg mb-8 leading-relaxed">
                Book bikes on the go, track your rentals in real-time, and manage everything from your pocket. Available on iOS and Android.
              </p>

              <div className="flex flex-wrap gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 glass border border-white/20 px-6 py-3 rounded-2xl hover:border-primary/50 transition-all"
                >
                  <div className="text-2xl">🍎</div>
                  <div className="text-left">
                    <p className="text-gray-400 text-xs">Download on the</p>
                    <p className="text-white font-semibold">App Store</p>
                  </div>
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center gap-3 glass border border-white/20 px-6 py-3 rounded-2xl hover:border-primary/50 transition-all"
                >
                  <div className="text-2xl">🤖</div>
                  <div className="text-left">
                    <p className="text-gray-400 text-xs">Get it on</p>
                    <p className="text-white font-semibold">Google Play</p>
                  </div>
                </motion.button>
              </div>

              <div className="flex items-center gap-6 mt-8">
                <div className="text-center">
                  <p className="text-white font-bold text-2xl">4.9</p>
                  <p className="text-gray-500 text-xs">App Rating</p>
                </div>
                <div className="w-px h-10 bg-dark-border" />
                <div className="text-center">
                  <p className="text-white font-bold text-2xl">50K+</p>
                  <p className="text-gray-500 text-xs">Downloads</p>
                </div>
                <div className="w-px h-10 bg-dark-border" />
                <div className="text-center">
                  <p className="text-white font-bold text-2xl">24/7</p>
                  <p className="text-gray-500 text-xs">Support</p>
                </div>
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="flex justify-center">
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="relative"
              >
                <div className="w-56 h-96 bg-dark-card border-2 border-white/20 rounded-[3rem] p-3 shadow-card">
                  <div className="w-full h-full bg-gradient-to-br from-primary/30 to-secondary/30 rounded-[2.5rem] flex flex-col items-center justify-center gap-4">
                    <div className="w-16 h-16 bg-cta-gradient rounded-2xl flex items-center justify-center">
                      <FiSmartphone className="text-white text-3xl" />
                    </div>
                    <p className="text-white font-display font-bold text-xl">BikeRent</p>
                    <p className="text-gray-400 text-xs text-center px-4">Your premium bike rental companion</p>
                    <div className="flex gap-2">
                      {[...Array(3)].map((_, i) => (
                        <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-primary' : 'bg-gray-600'}`} />
                      ))}
                    </div>
                  </div>
                </div>
                {/* Notch */}
                <div className="absolute top-5 left-1/2 -translate-x-1/2 w-20 h-5 bg-dark-bg rounded-full" />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
