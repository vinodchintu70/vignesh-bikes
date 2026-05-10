import { motion } from 'framer-motion'
import { MdDirectionsBike } from 'react-icons/md'

export default function PageLoader() {
  return (
    <div className="fixed inset-0 bg-dark-bg flex items-center justify-center z-50">
      <div className="text-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="w-16 h-16 bg-cta-gradient rounded-2xl flex items-center justify-center mx-auto mb-4"
        >
          <MdDirectionsBike className="text-white text-3xl" />
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <p className="gradient-text font-display font-bold text-xl">Vignesh Konda Bikes</p>
          <p className="text-gray-500 text-sm mt-1">Loading...</p>
        </motion.div>
        <div className="mt-4 flex justify-center gap-1">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-primary rounded-full"
              animate={{ y: [-4, 4, -4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15 }}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
