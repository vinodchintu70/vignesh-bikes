import { Helmet } from 'react-helmet-async'
import { motion } from 'framer-motion'
import FAQSection from '../../components/home/FAQSection'

export default function FAQPage() {
  return (
    <>
      <Helmet><title>FAQ - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg pt-20">
        <div className="py-16 px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="font-display font-bold text-5xl text-white mb-4">Help <span className="gradient-text">Center</span></h1>
            <p className="text-gray-400 text-lg">Find answers to common questions about BikeRent</p>
          </motion.div>
        </div>
        <FAQSection />
      </div>
    </>
  )
}
