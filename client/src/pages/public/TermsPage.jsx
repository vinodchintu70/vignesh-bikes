import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const sections = [
  { title: '1. Acceptance of Terms', content: 'By accessing and using BikeRent, you accept and agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our platform.' },
  { title: '2. User Accounts', content: 'You must create an account to use our services. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.' },
  { title: '3. Rental Agreement', content: 'Each rental is subject to a separate rental agreement. You must have a valid driving license and be at least 18 years old to rent a bike. You are responsible for the bike during the rental period.' },
  { title: '4. Payment Terms', content: 'All payments are processed securely through Razorpay. Prices are in Indian Rupees (INR) and include applicable taxes. A security deposit may be required for certain bikes.' },
  { title: '5. Cancellation Policy', content: 'Free cancellation is available up to 24 hours before the rental start time. Cancellations within 24 hours will incur a 50% charge. No-shows will be charged the full rental amount.' },
  { title: '6. Liability', content: 'BikeRent acts as a marketplace connecting bike owners and renters. We are not liable for accidents, damages, or losses during the rental period. Renters are responsible for any damage to the bike.' },
  { title: '7. Privacy', content: 'Your privacy is important to us. Please review our Privacy Policy to understand how we collect, use, and protect your personal information.' },
  { title: '8. Modifications', content: 'BikeRent reserves the right to modify these terms at any time. Continued use of the platform after changes constitutes acceptance of the new terms.' },
]

export default function TermsPage() {
  return (
    <>
      <Helmet><title>Terms & Conditions - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="font-display font-bold text-4xl text-white mb-4">Terms & <span className="gradient-text">Conditions</span></h1>
            <p className="text-gray-400">Last updated: March 1, 2024</p>
          </motion.div>
          <div className="space-y-8">
            {sections.map(({ title, content }, i) => (
              <motion.div key={title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }} className="card">
                <h2 className="text-white font-bold text-lg mb-3">{title}</h2>
                <p className="text-gray-400 leading-relaxed">{content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
