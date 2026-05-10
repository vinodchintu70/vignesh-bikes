import { motion } from 'framer-motion'
import { FiSearch, FiCalendar, FiCreditCard, FiCheckCircle } from 'react-icons/fi'

const steps = [
  {
    step: '01',
    icon: FiSearch,
    title: 'Search & Discover',
    description: 'Browse our extensive collection of premium bikes. Filter by location, type, price, and availability.',
    color: 'text-primary',
    bg: 'bg-primary/20',
    border: 'border-primary/30',
  },
  {
    step: '02',
    icon: FiCalendar,
    title: 'Choose Your Dates',
    description: 'Select your pickup and return dates. Our real-time calendar shows exact availability.',
    color: 'text-secondary',
    bg: 'bg-secondary/20',
    border: 'border-secondary/30',
  },
  {
    step: '03',
    icon: FiCreditCard,
    title: 'Secure Payment',
    description: 'Pay securely via Razorpay. Multiple payment options including UPI, cards, and net banking.',
    color: 'text-accent',
    bg: 'bg-accent/20',
    border: 'border-accent/30',
  },
  {
    step: '04',
    icon: FiCheckCircle,
    title: 'Ride & Enjoy',
    description: 'Pick up your bike and hit the road! Return it when done and leave a review.',
    color: 'text-green-400',
    bg: 'bg-green-400/20',
    border: 'border-green-400/30',
  },
]

export default function HowItWorks() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-accent text-sm font-semibold uppercase tracking-wider mb-2">Simple Process</p>
          <h2 className="font-display font-bold text-4xl text-white">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-gray-400 mt-2 max-w-xl mx-auto">
            Get on the road in just 4 simple steps. Our streamlined process makes bike rental effortless.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-0.5 bg-gradient-to-r from-primary via-secondary to-green-400 opacity-30" />

          {steps.map(({ step, icon: Icon, title, description, color, bg, border }, i) => (
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="relative text-center group"
            >
              {/* Step Number */}
              <div className="relative inline-block mb-6">
                <div className={`w-16 h-16 ${bg} border ${border} rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={`${color} text-2xl`} />
                </div>
                <span className={`absolute -top-2 -right-2 w-6 h-6 ${bg} border ${border} rounded-full text-xs font-bold ${color} flex items-center justify-center`}>
                  {i + 1}
                </span>
              </div>

              <h3 className="text-white font-semibold text-lg mb-3">{title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
