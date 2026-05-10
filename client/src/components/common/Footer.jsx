import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiTwitter, FiInstagram, FiFacebook, FiLinkedin, FiMail, FiPhone, FiMapPin } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'

const footerLinks = {
  Company: [
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' },
    { label: 'FAQ', path: '/faq' },
    { label: 'Blog', path: '#' },
  ],
  Legal: [
    { label: 'Terms & Conditions', path: '/terms' },
    { label: 'Privacy Policy', path: '/privacy' },
    { label: 'Cookie Policy', path: '#' },
    { label: 'Refund Policy', path: '#' },
  ],
  Services: [
    { label: 'Browse Bikes', path: '/bikes' },
    { label: 'List Your Bike', path: '/signup' },
    { label: 'Pricing', path: '#' },
    { label: 'Insurance', path: '#' },
  ],
}

const socials = [
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiInstagram, href: '#', label: 'Instagram' },
  { icon: FiFacebook, href: '#', label: 'Facebook' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
]

export default function Footer() {
  return (
    <footer className="bg-dark-card border-t border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-cta-gradient rounded-xl flex items-center justify-center">
                <MdDirectionsBike className="text-white text-2xl" />
              </div>
              <span className="font-display font-bold text-lg text-white">
                Vignesh Konda <span className="gradient-text">Bike Rentals</span>
              </span>
            </Link>
            <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
              Vignesh Konda Bike Rentals — Hyderabad's premium bike rental platform. Fast, secure, and affordable.
            </p>
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMail size={14} className="text-primary" />
                <span>vinodchintu70@gmail.com</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FiPhone size={14} className="text-primary" />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400 text-sm">
                <FiMapPin size={14} className="text-primary" />
                <span>Hyderabad, Telangana, India</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mt-6">
              {socials.map(({ icon: Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 glass rounded-lg flex items-center justify-center text-gray-400 hover:text-primary transition-colors"
                  aria-label={label}
                >
                  <Icon size={16} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-semibold mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      to={link.path}
                      className="text-gray-400 hover:text-primary text-sm transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-dark-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} Vignesh Konda Bike Rentals. All rights reserved.
          </p>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-gray-500 text-sm">All systems operational</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
