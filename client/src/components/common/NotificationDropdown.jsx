import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiBell } from 'react-icons/fi'

export default function NotificationDropdown({ onClose }) {
  const [notifications] = useState([])

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.95 }}
      transition={{ duration: 0.15 }}
      className="absolute right-0 top-full mt-2 w-72 glass rounded-2xl shadow-card-hover border border-dark-border overflow-hidden z-50"
    >
      <div className="p-4 border-b border-dark-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FiBell size={16} className="text-primary" />
          <span className="text-white font-semibold text-sm">Notifications</span>
        </div>
      </div>
      <div className="p-8 text-center">
        <FiBell size={32} className="text-gray-600 mx-auto mb-2" />
        <p className="text-gray-500 text-sm">No notifications yet</p>
      </div>
    </motion.div>
  )
}
