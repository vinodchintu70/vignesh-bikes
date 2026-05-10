import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FiBell, FiMenu, FiX, FiChevronDown, FiUser, FiSettings, FiLogOut, FiSun, FiMoon } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'
import { useTheme } from '../../context/ThemeContext'
import NotificationDropdown from './NotificationDropdown'

const navLinks = [
  { label: 'Home', path: '/' },
  { label: 'Bikes', path: '/bikes' },
  { label: 'About', path: '/about' },
  { label: 'Contact', path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [notifOpen, setNotifOpen] = useState(false)
  const { user, isAuthenticated, logout, isAdmin, isOwner } = useAuth()
  const { theme, toggleTheme } = useTheme()
  const navigate = useNavigate()
  const profileRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = () => {
    logout()
    navigate('/')
    setProfileOpen(false)
  }

  const getDashboardLink = () => {
    if (isAdmin) return '/admin/dashboard'
    if (isOwner) return '/owner/dashboard'
    return '/dashboard'
  }

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? 'glass shadow-card py-3' : 'bg-transparent py-5'
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-cta-gradient rounded-xl flex items-center justify-center group-hover:shadow-glow-blue transition-all duration-300">
              <MdDirectionsBike className="text-white text-xl" />
            </div>
            <span className="font-display font-bold text-xl text-white">
              Vignesh Konda <span className="gradient-text">Bikes</span>
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'text-primary bg-primary/10'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {/* Right Side */}
          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
            >
              {theme === 'dark' ? <FiSun size={18} /> : <FiMoon size={18} />}
            </button>

            {isAuthenticated ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setNotifOpen(!notifOpen)}
                    className="relative p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all duration-200"
                  >
                    <FiBell size={18} />
                    <span className="notification-dot" />
                  </button>
                  <AnimatePresence>
                    {notifOpen && <NotificationDropdown onClose={() => setNotifOpen(false)} />}
                  </AnimatePresence>
                </div>

                {/* Profile Dropdown */}
                <div className="relative" ref={profileRef}>
                  <button
                    onClick={() => setProfileOpen(!profileOpen)}
                    className="flex items-center gap-2 p-1.5 rounded-xl hover:bg-white/5 transition-all duration-200"
                  >
                    <div className="w-8 h-8 rounded-lg bg-cta-gradient flex items-center justify-center text-white text-sm font-bold overflow-hidden">
                      {user?.avatar ? (
                        <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                      ) : (
                        user?.name?.charAt(0).toUpperCase()
                      )}
                    </div>
                    <span className="hidden sm:block text-sm text-white font-medium max-w-[100px] truncate">
                      {user?.name?.split(' ')[0]}
                    </span>
                    <FiChevronDown size={14} className={`text-gray-400 transition-transform ${profileOpen ? 'rotate-180' : ''}`} />
                  </button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 top-full mt-2 w-56 glass rounded-2xl shadow-card-hover border border-dark-border overflow-hidden"
                      >
                        <div className="p-3 border-b border-dark-border">
                          <p className="text-white font-semibold text-sm">{user?.name}</p>
                          <p className="text-gray-500 text-xs truncate">{user?.email}</p>
                          <span className="badge bg-primary/20 text-primary mt-1 capitalize">{user?.role}</span>
                        </div>
                        <div className="p-2">
                          <Link
                            to={getDashboardLink()}
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                          >
                            <FiUser size={15} /> Dashboard
                          </Link>
                          <Link
                            to="/dashboard/settings"
                            onClick={() => setProfileOpen(false)}
                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 text-sm transition-all"
                          >
                            <FiSettings size={15} /> Settings
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-red-400 hover:text-red-300 hover:bg-red-500/10 text-sm transition-all"
                          >
                            <FiLogOut size={15} /> Logout
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <Link to="/login" className="btn-secondary text-sm py-2 px-4">
                  Login
                </Link>
                <Link to="/signup" className="btn-gradient text-sm py-2 px-4">
                  Get Started
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 transition-all"
            >
              {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden glass border-t border-dark-border mt-3"
          >
            <div className="px-4 py-4 space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={({ isActive }) =>
                    `block px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                      isActive ? 'text-primary bg-primary/10' : 'text-gray-400 hover:text-white hover:bg-white/5'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              {!isAuthenticated && (
                <div className="flex gap-3 pt-3 border-t border-dark-border">
                  <Link to="/login" onClick={() => setMobileOpen(false)} className="flex-1 btn-secondary text-sm text-center py-2.5">
                    Login
                  </Link>
                  <Link to="/signup" onClick={() => setMobileOpen(false)} className="flex-1 btn-gradient text-sm text-center py-2.5">
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}
