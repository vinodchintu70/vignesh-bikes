import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiStar, FiMapPin, FiHeart, FiShare2, FiChevronLeft, FiChevronRight, FiCheck, FiCalendar, FiClock } from 'react-icons/fi'
import { MdDirectionsBike, MdSpeed, MdLocalGasStation } from 'react-icons/md'
import { Helmet } from 'react-helmet-async'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { bikeAPI, reviewAPI } from '../../services/api'
import { useAuth } from '../../context/AuthContext'
import toast from 'react-hot-toast'
import { differenceInDays } from 'date-fns'

const pickupLocations = [
  'Banjara Hills, Hyderabad',
  'Jubilee Hills, Hyderabad',
  'Hitech City, Hyderabad',
  'Gachibowli, Hyderabad',
  'Secunderabad, Hyderabad',
  'Ameerpet, Hyderabad',
  'Kukatpally, Hyderabad',
  'Madhapur, Hyderabad',
  'Kondapur, Hyderabad',
  'Begumpet, Hyderabad',
]

const timeSlots = [
  '06:00 AM', '07:00 AM', '08:00 AM', '09:00 AM', '10:00 AM',
  '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM',
  '04:00 PM', '05:00 PM', '06:00 PM', '07:00 PM', '08:00 PM',
]

export default function BikeDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAuthenticated } = useAuth()
  const [bike, setBike] = useState(null)
  const [reviews, setReviews] = useState([])
  const [loading, setLoading] = useState(true)
  const [activeImage, setActiveImage] = useState(0)
  const [liked, setLiked] = useState(false)

  // Booking fields
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [pickupTime, setPickupTime] = useState('')
  const [returnTime, setReturnTime] = useState('')
  const [pickupLocation, setPickupLocation] = useState('')

  useEffect(() => {
    const fetchBike = async () => {
      try {
        const [bikeRes, reviewRes] = await Promise.all([
          bikeAPI.getById(id),
          reviewAPI.getBikeReviews(id),
        ])
        setBike(bikeRes.data.bike)
        setReviews(reviewRes.data.reviews || [])
      } catch {
        setBike(mockBike)
      } finally {
        setLoading(false)
      }
    }
    fetchBike()
  }, [id])

  const totalDays = startDate && endDate ? Math.max(1, differenceInDays(endDate, startDate)) : 0
  const totalPrice = totalDays * (bike?.pricePerDay || 0)

  const handleBookNow = () => {
    if (!isAuthenticated) {
      toast.error('Please login to book a bike')
      navigate('/login')
      return
    }
    if (!startDate || !endDate) return toast.error('Please select rental dates')
    if (!pickupTime) return toast.error('Please select pickup time')
    if (!returnTime) return toast.error('Please select return time')
    if (!pickupLocation) return toast.error('Please select pickup location')

    navigate(`/checkout/${id}`, {
      state: { startDate, endDate, totalDays, totalPrice, pickupTime, returnTime, pickupLocation },
    })
  }

  if (loading) return (
    <div className="min-h-screen bg-dark-bg pt-20 px-4">
      <div className="max-w-7xl mx-auto py-8">
        <div className="grid lg:grid-cols-2 gap-10">
          <div className="h-96 skeleton rounded-2xl" />
          <div className="space-y-4">
            <div className="h-8 skeleton rounded w-3/4" />
            <div className="h-4 skeleton rounded w-1/2" />
            <div className="h-32 skeleton rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )

  if (!bike) return null
  const images = bike.images?.length ? bike.images : [null]

  return (
    <>
      <Helmet><title>{bike.name} - Vignesh Konda Bike Rentals</title></Helmet>

      <div className="min-h-screen bg-dark-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
            <Link to="/bikes" className="hover:text-primary transition-colors">Bikes</Link>
            <span>/</span>
            <span className="text-white">{bike.name}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Image Gallery */}
            <div>
              <div className="relative h-80 md:h-96 bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl overflow-hidden mb-4">
                {images[activeImage] ? (
                  <img src={images[activeImage]} alt={bike.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <MdDirectionsBike className="text-primary/30 text-[10rem]" />
                  </div>
                )}
                {images.length > 1 && (
                  <>
                    <button onClick={() => setActiveImage(prev => (prev - 1 + images.length) % images.length)}
                      className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                      <FiChevronLeft className="text-white" />
                    </button>
                    <button onClick={() => setActiveImage(prev => (prev + 1) % images.length)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 glass rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                      <FiChevronRight className="text-white" />
                    </button>
                  </>
                )}
                <div className="absolute top-4 right-4 flex gap-2">
                  <button onClick={() => setLiked(!liked)} className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-red-500/20 transition-all">
                    <FiHeart className={liked ? 'text-red-400 fill-red-400' : 'text-white'} size={16} />
                  </button>
                  <button className="w-9 h-9 glass rounded-xl flex items-center justify-center hover:bg-white/20 transition-all">
                    <FiShare2 className="text-white" size={16} />
                  </button>
                </div>
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {images.map((img, i) => (
                    <button key={i} onClick={() => setActiveImage(i)}
                      className={`flex-shrink-0 w-20 h-16 rounded-xl overflow-hidden border-2 transition-all ${activeImage === i ? 'border-primary' : 'border-dark-border'}`}>
                      {img ? <img src={img} alt="" className="w-full h-full object-cover" /> : (
                        <div className="w-full h-full bg-dark-hover flex items-center justify-center">
                          <MdDirectionsBike className="text-gray-600 text-2xl" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              )}

              {/* Specs */}
              <div className="card mt-6">
                <h3 className="text-white font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-2 gap-4">
                  {[
                    { label: 'Engine', value: bike.specs?.engine || '350cc', icon: MdSpeed },
                    { label: 'Fuel Type', value: bike.specs?.fuelType || 'Petrol', icon: MdLocalGasStation },
                    { label: 'Mileage', value: bike.specs?.mileage || '35 kmpl', icon: MdSpeed },
                    { label: 'Max Speed', value: bike.specs?.maxSpeed || '120 km/h', icon: MdSpeed },
                    { label: 'Year', value: bike.year || '2023', icon: FiCalendar },
                    { label: 'Transmission', value: bike.specs?.transmission || 'Manual', icon: MdDirectionsBike },
                  ].map(({ label, value, icon: Icon }) => (
                    <div key={label} className="flex items-center gap-3 p-3 bg-dark-hover rounded-xl">
                      <Icon className="text-primary text-xl flex-shrink-0" />
                      <div>
                        <p className="text-gray-500 text-xs">{label}</p>
                        <p className="text-white text-sm font-medium">{value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Details & Booking */}
            <div>
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex gap-2 mb-2">
                    <span className={`badge text-xs ${bike.available ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                      {bike.available ? '● Available' : '● Not Available'}
                    </span>
                    <span className="badge bg-primary/20 text-primary text-xs">{bike.category}</span>
                  </div>
                  <h1 className="font-display font-bold text-3xl text-white">{bike.name}</h1>
                  <p className="text-gray-400 mt-1">{bike.brand}</p>
                </div>
                <div className="text-right">
                  <p className="text-primary font-bold text-3xl">₹{bike.pricePerDay}</p>
                  <p className="text-gray-500 text-sm">/day</p>
                </div>
              </div>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={16} className={i < Math.floor(bike.rating || 0) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                  ))}
                </div>
                <span className="text-white font-semibold">{bike.rating || 0}</span>
                <span className="text-gray-500 text-sm">({bike.totalReviews || 0} reviews)</span>
              </div>

              <div className="flex items-center gap-2 text-gray-400 mb-4">
                <FiMapPin size={16} className="text-secondary" />
                <span>{bike.location}</span>
              </div>

              <p className="text-gray-400 text-sm leading-relaxed mb-6">
                {bike.description || 'Experience the thrill of riding this premium bike. Well-maintained and ready for your adventure.'}
              </p>

              {bike.features?.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-white font-semibold mb-3">Features</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {bike.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-gray-400 text-sm">
                        <FiCheck size={14} className="text-green-400 flex-shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* ── Booking Card ── */}
              <div className="card border-primary/20 space-y-4">
                <h3 className="text-white font-semibold text-lg flex items-center gap-2">
                  <MdDirectionsBike className="text-primary" /> Book This Bike
                </h3>

                {/* Dates */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block flex items-center gap-1">
                      <FiCalendar size={11} /> Pickup Date
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={13} />
                      <DatePicker
                        selected={startDate}
                        onChange={setStartDate}
                        selectsStart startDate={startDate} endDate={endDate}
                        minDate={new Date()}
                        placeholderText="Select date"
                        className="input-field pl-9 py-2.5 text-sm w-full"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 block flex items-center gap-1">
                      <FiCalendar size={11} /> Return Date
                    </label>
                    <div className="relative">
                      <FiCalendar className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={13} />
                      <DatePicker
                        selected={endDate}
                        onChange={setEndDate}
                        selectsEnd startDate={startDate} endDate={endDate}
                        minDate={startDate || new Date()}
                        placeholderText="Select date"
                        className="input-field pl-9 py-2.5 text-sm w-full"
                      />
                    </div>
                  </div>
                </div>

                {/* Times */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1">
                      <FiClock size={11} className="text-primary" /> Pickup Time
                    </label>
                    <div className="relative">
                      <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={13} />
                      <select
                        value={pickupTime}
                        onChange={(e) => setPickupTime(e.target.value)}
                        className="input-field pl-9 py-2.5 text-sm w-full appearance-none"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1">
                      <FiClock size={11} className="text-primary" /> Return Time
                    </label>
                    <div className="relative">
                      <FiClock className="absolute left-3 top-1/2 -translate-y-1/2 text-primary z-10" size={13} />
                      <select
                        value={returnTime}
                        onChange={(e) => setReturnTime(e.target.value)}
                        className="input-field pl-9 py-2.5 text-sm w-full appearance-none"
                      >
                        <option value="">Select time</option>
                        {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                      </select>
                    </div>
                  </div>
                </div>

                {/* Pickup Location */}
                <div>
                  <label className="text-gray-400 text-xs mb-1.5 flex items-center gap-1">
                    <FiMapPin size={11} className="text-secondary" /> Pickup Location
                  </label>
                  <div className="relative">
                    <FiMapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-secondary z-10" size={13} />
                    <select
                      value={pickupLocation}
                      onChange={(e) => setPickupLocation(e.target.value)}
                      className="input-field pl-9 py-2.5 text-sm w-full appearance-none"
                    >
                      <option value="">Select pickup location</option>
                      {pickupLocations.map(loc => <option key={loc} value={loc}>{loc}</option>)}
                    </select>
                  </div>
                </div>

                {/* Price Summary */}
                {totalDays > 0 && (
                  <div className="bg-dark-hover rounded-xl p-4 space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">₹{bike.pricePerDay} × {totalDays} day{totalDays > 1 ? 's' : ''}</span>
                      <span className="text-white">₹{bike.pricePerDay * totalDays}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Service fee (5%)</span>
                      <span className="text-white">₹{Math.round(totalPrice * 0.05)}</span>
                    </div>
                    <div className="border-t border-dark-border pt-2 flex justify-between font-semibold">
                      <span className="text-white">Total</span>
                      <span className="text-primary text-lg">₹{Math.round(totalPrice * 1.05)}</span>
                    </div>
                  </div>
                )}

                {/* Booking summary preview */}
                {pickupTime && returnTime && pickupLocation && startDate && endDate && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-primary/10 border border-primary/20 rounded-xl p-4 space-y-1.5"
                  >
                    <p className="text-primary text-xs font-semibold uppercase tracking-wider mb-2">Booking Summary</p>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FiCalendar size={12} className="text-primary flex-shrink-0" />
                      <span>{startDate.toLocaleDateString()} → {endDate.toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FiClock size={12} className="text-primary flex-shrink-0" />
                      <span>Pickup: {pickupTime} &nbsp;|&nbsp; Return: {returnTime}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <FiMapPin size={12} className="text-secondary flex-shrink-0" />
                      <span>{pickupLocation}</span>
                    </div>
                  </motion.div>
                )}

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleBookNow}
                  disabled={!bike.available}
                  className={`w-full py-4 rounded-xl font-semibold text-base transition-all ${bike.available ? 'btn-gradient' : 'bg-dark-hover text-gray-500 cursor-not-allowed'}`}
                >
                  {bike.available ? 'Book Now' : 'Not Available'}
                </motion.button>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="mt-12">
            <h2 className="font-display font-bold text-2xl text-white mb-6">
              Reviews <span className="text-gray-500 text-lg font-normal">({reviews.length})</span>
            </h2>
            {reviews.length === 0 ? (
              <div className="card text-center py-10">
                <p className="text-gray-500">No reviews yet. Be the first to review!</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-4">
                {reviews.map((review) => (
                  <div key={review._id} className="card">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center text-primary font-bold flex-shrink-0">
                        {review.user?.name?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-medium text-sm">{review.user?.name || 'Anonymous'}</p>
                        <div className="flex gap-1 mt-0.5">
                          {[...Array(5)].map((_, i) => (
                            <FiStar key={i} size={12} className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-600'} />
                          ))}
                        </div>
                      </div>
                      <span className="text-gray-500 text-xs">{new Date(review.createdAt).toLocaleDateString()}</span>
                    </div>
                    <p className="text-gray-400 text-sm">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

const mockBike = {
  _id: '1',
  name: 'Royal Enfield Classic 350',
  brand: 'Royal Enfield',
  category: 'Cruiser',
  pricePerDay: 599,
  rating: 4.8,
  totalReviews: 124,
  location: 'Hyderabad, Telangana',
  available: true,
  description: 'The Royal Enfield Classic 350 is an iconic motorcycle that blends timeless design with modern performance. Perfect for city rides and highway cruising across Hyderabad.',
  features: ['ABS Brakes', 'Dual Channel ABS', 'LED Headlight', 'USB Charging', 'Tripper Navigation', 'Halogen Tail Lamp'],
  specs: { engine: '349cc', fuelType: 'Petrol', mileage: '35 kmpl', maxSpeed: '120 km/h', transmission: 'Manual' },
  year: 2023,
  images: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
    'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80',
    'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80',
    'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80',
    'https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800&q=80',
  ],
}
