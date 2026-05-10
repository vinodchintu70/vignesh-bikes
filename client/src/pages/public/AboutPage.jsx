import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FiUsers, FiTarget, FiAward, FiHeart } from 'react-icons/fi'
import { MdDirectionsBike } from 'react-icons/md'

const team = [
  { name: 'Vikram Nair', role: 'CEO & Co-Founder', avatar: 'VN', color: 'bg-blue-500' },
  { name: 'Ananya Iyer', role: 'CTO & Co-Founder', avatar: 'AI', color: 'bg-purple-500' },
  { name: 'Rohan Gupta', role: 'Head of Operations', avatar: 'RG', color: 'bg-green-500' },
  { name: 'Meera Krishnan', role: 'Head of Design', avatar: 'MK', color: 'bg-orange-500' },
]

const values = [
  { icon: FiTarget, title: 'Our Mission', desc: 'To make premium bike rentals accessible to everyone across India, enabling freedom of mobility.', color: 'text-primary', bg: 'bg-primary/20' },
  { icon: FiHeart, title: 'Our Vision', desc: 'A future where every journey is an adventure, powered by sustainable and affordable transportation.', color: 'text-secondary', bg: 'bg-secondary/20' },
  { icon: FiAward, title: 'Our Values', desc: 'Trust, transparency, and excellence in every interaction. We put our riders and owners first.', color: 'text-accent', bg: 'bg-accent/20' },
]

export default function AboutPage() {
  return (
    <>
      <Helmet><title>About Us - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg pt-20">
        {/* Hero */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 text-center relative overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-3xl" />
          </div>
          <div className="relative max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Our Story</p>
              <h1 className="font-display font-bold text-5xl text-white mb-6">
                Redefining <span className="gradient-text">Bike Rentals</span> in India
              </h1>
              <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
                Founded in 2022, BikeRent was born from a simple idea: make premium bike rentals as easy as ordering food online. We connect passionate riders with quality bikes across 50+ cities in India.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
          <div className="max-w-5xl mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6">
            {[{ value: '500+', label: 'Premium Bikes' }, { value: '12K+', label: 'Happy Riders' }, { value: '50+', label: 'Cities' }, { value: '4.9★', label: 'App Rating' }].map(({ value, label }, i) => (
              <motion.div key={label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center">
                <p className="font-display font-bold text-4xl gradient-text">{value}</p>
                <p className="text-gray-400 text-sm mt-1">{label}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-bold text-3xl text-white text-center mb-12">
              What Drives <span className="gradient-text">Us</span>
            </motion.h2>
            <div className="grid md:grid-cols-3 gap-6">
              {values.map(({ icon: Icon, title, desc, color, bg }, i) => (
                <motion.div key={title} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card text-center">
                  <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4`}><Icon className={`${color} text-2xl`} /></div>
                  <h3 className="text-white font-bold text-xl mb-3">{title}</h3>
                  <p className="text-gray-400 text-sm leading-relaxed">{desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
          <div className="max-w-5xl mx-auto">
            <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="font-display font-bold text-3xl text-white text-center mb-12">
              Meet the <span className="gradient-text">Team</span>
            </motion.h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map(({ name, role, avatar, color }, i) => (
                <motion.div key={name} initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="card text-center hover:border-primary/30">
                  <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center text-white font-bold text-xl mx-auto mb-4`}>{avatar}</div>
                  <h3 className="text-white font-semibold">{name}</h3>
                  <p className="text-gray-500 text-xs mt-1">{role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
