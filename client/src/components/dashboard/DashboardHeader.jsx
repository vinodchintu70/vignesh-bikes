import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMenu, FiBell, FiSun, FiMoon, FiChevronDown, FiUser, FiSettings, FiLogOut } from 'react-icons/fi'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import NotificationDropdown from '../common/NotificationDropdown'

export default function DashboardHeader({ onMenuClick, title = 'Dashboard', isAdmin = false }) {
  const { user, logout } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)

  return (
    <header className="sticky top-0 z-20 bg-dark-card/80 backdrop-blur-xl border-b border-dark-border px-4 md:px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={onMenuClick}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            <FiMenu size={20} />
          </button>
          <div>
            <h1 className="text-white font-display font-bold text-lg">{title}</h1>
            <p className="text-gray-500 text-xs hidden sm:block">
              {new Date().toLocaleDateString('en-IN', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
          >
            {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <FiBell size={18} />
              <span className="notification-dot" />
            </button>
            <AnimatePresence>
              {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
            </AnimatePresence>
          </div>

          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-all"
            >
              <div className="w-8 h-8 rounded-lg bg-cta-gradient flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  user?.name?.charAt(0).toUpperCase()
                )}
              </div>
              <span className="hidden sm:block text-sm text-white font-medium">{user?.name?.split(' ')[0]}</span>
              <FiChevronDown size={14} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
            </button>

            <AnimatePresence>
              {profileOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  className="absolute right-0 top-full mt-2 w-48 glass rounded-2xl shadow-card-hover border border-dark-border overflow-hidden"
                >
                  <div className="p-2">
                    <Link to="/dashboard/profile" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all">
                      <FiUser size={14} /> Profile
                    </Link>
                    <Link to="/dashboard/settings" onClick={() => setProfileOpen(false)} className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all">
                      <FiSettings size={14} /> Settings
                    </Link>
                    <button onClick={logout} className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all">
                      <FiLogOut size={14} /> Logout
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </header>
  )
}
