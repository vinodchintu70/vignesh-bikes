import { motion } from 'framer-motion'
import { FiStar } from 'react-icons/fi'

const testimonials = [
  {
    name: 'Arjun Sharma',
    role: 'Adventure Rider',
    avatar: 'AS',
    rating: 5,
    text: 'BikeRent completely transformed my travel experience in Hyderabad. The booking process is seamless, and the bikes are always in perfect condition. Highly recommended!',
    location: 'Hyderabad',
    color: 'bg-blue-500',
  },
  {
    name: 'Priya Patel',
    role: 'Weekend Explorer',
    avatar: 'PP',
    rating: 5,
    text: 'I\'ve used many rental services, but BikeRent stands out with its premium selection and excellent customer support. Perfect for exploring Hyderabad!',
    location: 'Hyderabad',
    color: 'bg-purple-500',
  },
  {
    name: 'Rahul Verma',
    role: 'Daily Commuter',
    avatar: 'RV',
    rating: 5,
    text: 'The pricing is transparent, the bikes are well-maintained, and the pickup/drop process is super convenient. BikeRent is my go-to for all rentals in Hyderabad.',
    location: 'Hyderabad',
    color: 'bg-green-500',
  },
  {
    name: 'Sneha Reddy',
    role: 'Travel Blogger',
    avatar: 'SR',
    rating: 5,
    text: 'As a travel blogger based in Hyderabad, I need reliable transportation. BikeRent has never let me down. The variety of bikes available is impressive!',
    location: 'Hyderabad',
    color: 'bg-orange-500',
  },
  {
    name: 'Karan Mehta',
    role: 'Sports Enthusiast',
    avatar: 'KM',
    rating: 5,
    text: 'The KTM Duke I rented was in showroom condition. The entire experience from booking to return was flawless. Best bike rental in Hyderabad!',
    location: 'Hyderabad',
    color: 'bg-cyan-500',
  },
  {
    name: 'Ananya Singh',
    role: 'College Student',
    avatar: 'AN',
    rating: 4,
    text: 'Affordable, reliable, and convenient. BikeRent makes it easy for students like me to explore Hyderabad without breaking the bank.',
    location: 'Hyderabad',
    color: 'bg-pink-500',
  },
]

export default function TestimonialsSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-dark-card/30 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-2">Customer Stories</p>
          <h2 className="font-display font-bold text-4xl text-white">
            What Riders <span className="gradient-text">Say</span>
          </h2>
          <p className="text-gray-400 mt-2">Join thousands of satisfied riders across India</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map(({ name, role, avatar, rating, text, location, color }, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="card hover:border-primary/30 group"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <FiStar
                    key={j}
                    size={14}
                    className={j < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'}
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-gray-300 text-sm leading-relaxed mb-6 italic">"{text}"</p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 ${color} rounded-xl flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                  {avatar}
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">{name}</p>
                  <p className="text-gray-500 text-xs">{role} · {location}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
