import { useState } from 'react'
import { motion } from 'framer-motion'
import { FiMail, FiPhone, FiMapPin, FiSend } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import toast from 'react-hot-toast'

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    toast.success('Message sent! We\'ll get back to you within 24 hours.')
    setForm({ name: '', email: '', subject: '', message: '' })
    setLoading(false)
  }

  return (
    <>
      <Helmet><title>Contact Us - BikeRent</title></Helmet>
      <div className="min-h-screen bg-dark-bg pt-20">
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-16">
              <p className="text-primary text-sm font-semibold uppercase tracking-wider mb-3">Get In Touch</p>
              <h1 className="font-display font-bold text-5xl text-white mb-4">Contact <span className="gradient-text">Us</span></h1>
              <p className="text-gray-400 text-lg max-w-xl mx-auto">Have a question or need help? Our team is here for you 24/7.</p>
            </motion.div>

            <div className="grid lg:grid-cols-3 gap-10">
              {/* Contact Info */}
              <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="space-y-6">
                {[
                  { icon: FiMail, title: 'Email Us', value: 'vinodchintu70@gmail.com', sub: 'We reply within 2 hours', color: 'text-primary', bg: 'bg-primary/20' },
                  { icon: FiPhone, title: 'Call Us', value: '+91 98765 43210', sub: 'Mon-Sat, 9AM - 8PM', color: 'text-secondary', bg: 'bg-secondary/20' },
                  { icon: FiMapPin, title: 'Visit Us', value: 'Hyderabad, Telangana', sub: 'India - 500081', color: 'text-accent', bg: 'bg-accent/20' },
                ].map(({ icon: Icon, title, value, sub, color, bg }) => (
                  <div key={title} className="card flex items-start gap-4">
                    <div className={`w-12 h-12 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}><Icon className={`${color} text-xl`} /></div>
                    <div>
                      <h3 className="text-white font-semibold">{title}</h3>
                      <p className="text-gray-300 text-sm mt-0.5">{value}</p>
                      <p className="text-gray-500 text-xs">{sub}</p>
                    </div>
                  </div>
                ))}
              </motion.div>

              {/* Form */}
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="lg:col-span-2 card">
                <h3 className="text-white font-bold text-xl mb-6">Send a Message</h3>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-gray-400 text-sm mb-1.5 block">Your Name</label>
                      <input type="text" value={form.name} onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))} placeholder="John Doe" className="input-field" required />
                    </div>
                    <div>
                      <label className="text-gray-400 text-sm mb-1.5 block">Email Address</label>
                      <input type="email" value={form.email} onChange={(e) => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@example.com" className="input-field" required />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Subject</label>
                    <input type="text" value={form.subject} onChange={(e) => setForm(p => ({ ...p, subject: e.target.value }))} placeholder="How can we help?" className="input-field" required />
                  </div>
                  <div>
                    <label className="text-gray-400 text-sm mb-1.5 block">Message</label>
                    <textarea value={form.message} onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))} rows={5} placeholder="Tell us more..." className="input-field resize-none" required />
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" disabled={loading} className="btn-gradient flex items-center gap-2 px-8 py-3.5">
                    {loading ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <><FiSend size={16} /> Send Message</>}
                  </motion.button>
                </form>
              </motion.div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
