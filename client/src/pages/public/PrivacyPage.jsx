import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'

const sections = [
  { title: 'Information We Collect', content: 'We collect information you provide directly to us, such as your name, email address, phone number, and payment information when you create an account or make a booking.' },
  { title: 'How We Use Your Information', content: 'We use the information we collect to provide, maintain, and improve our services, process transactions, send notifications, and comply with legal obligations.' },
  { title: 'Information Sharing', content: 'We do not sell your personal information. We may share your information with bike owners to facilitate rentals, payment processors, and service providers who assist in our operations.' },
  { title: 'Data Security', content: 'We implement industry-standard security measures to protect your personal information. All payment data is encrypted using SSL technology and processed by Razorpay.' },
  { title: 'Cookies', content: 'We use cookies and similar tracking technologies to enhance your experience on our platform. You can control cookie settings through your browser preferences.' },
  { title: 'Your Rights', content: 'You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time through your account settings.' },
  { title: 'Contact Us', content: 'If you have questions about this Privacy Policy, please contact us at privacy@bikerent.com or through our Contact page.' },
]

export default function PrivacyPage() {
  return (
    <>
      <Helmet><title>Privacy Policy - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
            <h1 className="font-display font-bold text-4xl text-white mb-4">Privacy <span className="gradient-text">Policy</span></h1>
            <p className="text-gray-400">Last updated: March 1, 2024</p>
          </motion.div>
          <div className="space-y-6">
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
