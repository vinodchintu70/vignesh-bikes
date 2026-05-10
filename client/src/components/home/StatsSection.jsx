import { useInView } from 'react-intersection-observer'
import CountUp from 'react-countup'
import { motion } from 'framer-motion'
import { FiUsers, FiTrendingUp } from 'react-icons/fi'
import { MdDirectionsBike, MdLocationOn } from 'react-icons/md'

const stats = [
  { icon: MdDirectionsBike, value: 500, suffix: '+', label: 'Premium Bikes', color: 'text-primary', bg: 'bg-primary/20' },
  { icon: FiUsers, value: 12450, suffix: '+', label: 'Happy Riders', color: 'text-secondary', bg: 'bg-secondary/20' },
  { icon: MdLocationOn, value: 50, suffix: '+', label: 'Cities Covered', color: 'text-accent', bg: 'bg-accent/20' },
  { icon: FiTrendingUp, value: 98, suffix: '%', label: 'Satisfaction Rate', color: 'text-green-400', bg: 'bg-green-400/20' },
]

export default function StatsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 })

  return (
    <section ref={ref} className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map(({ icon: Icon, value, suffix, label, color, bg }, i) => (
            <motion.div
              key={label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card text-center group hover:border-primary/30"
            >
              <div className={`w-14 h-14 ${bg} rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`${color} text-2xl`} />
              </div>
              <div className="font-display font-bold text-4xl text-white mb-1">
                {inView ? (
                  <CountUp end={value} duration={2.5} separator="," suffix={suffix} />
                ) : (
                  <span>0{suffix}</span>
                )}
              </div>
              <p className="text-gray-400 text-sm">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
