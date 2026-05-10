import { NavLink, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiHome, FiUser, FiCalendar, FiHeart, FiSettings, FiLogOut, FiX, FiTruck } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'
import { useAuth } from '../../context/AuthContext'

const navItems = [
  { icon: FiHome, label: 'Dashboard', path: '/dashboard' },
  { icon: FiUser, label: 'Profile', path: '/dashboard/profile' },
  { icon: FiCalendar, label: 'My Bookings', path: '/dashboard/bookings' },
  { icon: FiTruck, label: 'Active Rentals', path: '/dashboard/active-rentals' },
  { icon: FiHeart, label: 'Wishlist', path: '/dashboard/wishlist' },
  { icon: FiSettings, label: 'Settings', path: '/dashboard/settings' },
]

export default function UserSidebar({ isOpen, onClose }) {
  const { user, logout } = useAuth()

  return (
    <>
      <aside className={`fixed left-0 top-0 h-full w-64 bg-dark-card border-r border-dark-border z-30 flex flex-col transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        {/* Logo */}
        <div className="p-6 border-b border-dark-border flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-cta-gradient rounded-lg flex items-center justify-center">
              <MdDirectionsBike className="text-white text-lg" />
            </div>
            <span className="font-display font-bold text-lg text-white">
              VK <span className="gradient-text">Bikes</span>
            </span>
          </Link>
          <button onClick={onClose} className="lg:hidden text-gray-400 hover:text-white">
            <FiX size={20} />
          </button>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-dark-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-cta-gradient rounded-xl flex items-center justify-center text-white font-bold overflow-hidden">
              {user?.avatar ? (
                <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
              ) : (
                user?.name?.charAt(0).toUpperCase()
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm truncate">{user?.name}</p>
              <p className="text-gray-500 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/dashboard'}
              onClick={onClose}
              className={({ isActive }) =>
                `sidebar-link ${isActive ? 'active' : ''}`
              }
            >
              <Icon size={18} />
              <span className="text-sm">{label}</span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className="p-4 border-t border-dark-border space-y-2">
          {user?.role === 'owner' && (
            <Link to="/owner/dashboard" className="sidebar-link text-secondary hover:text-secondary">
              <MdDirectionsBike size={18} />
              <span className="text-sm">Owner Panel</span>
            </Link>
          )}
          <button
            onClick={logout}
            className="sidebar-link text-red-400 hover:text-red-300 hover:bg-red-500/10 w-full"
          >
            <FiLogOut size={18} />
            <span className="text-sm">Logout</span>
          </button>
        </div>
      </aside>
    </>
  )
}
