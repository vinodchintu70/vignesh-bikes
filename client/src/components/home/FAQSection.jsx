import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiPlus, FiMinus } from 'react-icons/fi'

const faqs = [
  {
    q: 'What documents do I need to rent a bike?',
    a: 'You need a valid driving license (2-wheeler), a government-issued ID proof (Aadhaar/Passport), and a security deposit. All documents can be uploaded digitally through our platform.',
  },
  {
    q: 'How does the booking process work?',
    a: 'Simply search for available bikes in your city, select your dates, complete the secure payment via Razorpay, and receive instant booking confirmation. The owner will approve your booking within 30 minutes.',
  },
  {
    q: 'What is the cancellation policy?',
    a: 'Free cancellation up to 24 hours before pickup. 50% refund for cancellations within 24 hours. No refund for no-shows. Cancellations can be done directly from your dashboard.',
  },
  {
    q: 'Is insurance included in the rental?',
    a: 'Basic third-party insurance is included with all rentals. We also offer comprehensive insurance add-ons for complete peace of mind during your ride.',
  },
  {
    q: 'How do I become a bike owner on BikeRent?',
    a: 'Register as an owner, complete KYC verification, list your bike with photos and details, set your pricing, and start earning. Our team reviews listings within 24 hours.',
  },
  {
    q: 'What payment methods are accepted?',
    a: 'We accept all major payment methods including UPI (GPay, PhonePe, Paytm), credit/debit cards, net banking, and EMI options through our secure Razorpay integration.',
  },
]

function FAQItem({ faq, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
        open ? 'border-primary/40 bg-primary/5' : 'border-dark-border bg-dark-card hover:border-primary/20'
      }`}
    >
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between p-5 text-left"
      >
        <span className="text-white font-medium pr-4">{faq.q}</span>
        <div className={`flex-shrink-0 w-7 h-7 rounded-lg flex items-center justify-center transition-all duration-300 ${
          open ? 'bg-primary text-white' : 'bg-dark-hover text-gray-400'
        }`}>
          {open ? <FiMinus size={14} /> : <FiPlus size={14} />}
        </div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <p className="px-5 pb-5 text-gray-400 text-sm leading-relaxed">{faq.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQSection() {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-secondary text-sm font-semibold uppercase tracking-wider mb-2">Got Questions?</p>
          <h2 className="font-display font-bold text-4xl text-white">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-400 mt-2">Everything you need to know about BikeRent</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
