import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MdDirectionsBike, MdElectricBike } from 'react-icons/md'

const categories = [
  { name: 'Sports', icon: MdDirectionsBike, count: 45, color: 'from-blue-500/20 to-blue-600/10', border: 'border-blue-500/30', text: 'text-blue-400' },
  { name: 'Cruiser', icon: MdDirectionsBike, count: 32, color: 'from-orange-500/20 to-orange-600/10', border: 'border-orange-500/30', text: 'text-orange-400' },
  { name: 'Adventure', icon: MdDirectionsBike, count: 28, color: 'from-green-500/20 to-green-600/10', border: 'border-green-500/30', text: 'text-green-400' },
  { name: 'Classic', icon: MdDirectionsBike, count: 19, color: 'from-purple-500/20 to-purple-600/10', border: 'border-purple-500/30', text: 'text-purple-400' },
  { name: 'Electric', icon: MdElectricBike, count: 15, color: 'from-cyan-500/20 to-cyan-600/10', border: 'border-cyan-500/30', text: 'text-cyan-400' },
  { name: 'Scooter', icon: MdDirectionsBike, count: 38, color: 'from-pink-500/20 to-pink-600/10', border: 'border-pink-500/30', text: 'text-pink-400' },
]

export default function CategoriesSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Browse by Type</p>
          <h2 className="font-display font-bold text-4xl text-white">
            Explore <span className="gradient-text">Categories</span>
          </h2>
          <p className="text-gray-400 mt-2">Find the perfect bike for every adventure</p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map(({ name, icon: Icon, count, color, border, text }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              whileHover={{ y: -5, scale: 1.02 }}
            >
              <Link
                to={`/bikes?category=${name}`}
                className={`block bg-gradient-to-br ${color} border ${border} rounded-2xl p-6 text-center hover:shadow-card transition-all duration-300 group`}
              >
                <div className={`${text} text-4xl mb-3 group-hover:scale-110 transition-transform duration-300 flex justify-center`}>
                  <Icon />
                </div>
                <h3 className="text-white font-semibold text-sm mb-1">{name}</h3>
                <p className="text-gray-500 text-xs">{count} bikes</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
