const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const User = require('./models/User')
const Bike = require('./models/Bike')

const seed = async () => {
  await mongoose.connect(process.env.MONGODB_URI)
  console.log('✅ MongoDB Connected')

  // Create owner user
  let owner = await User.findOne({ email: 'vignesh@bikerent.com' })
  if (!owner) {
    const hashed = await bcrypt.hash('vignesh123', 12)
    owner = await User.create({
      name: 'Vignesh Konda',
      email: 'vignesh@bikerent.com',
      password: hashed,
      phone: '+91 98765 43210',
      role: 'owner',
      isVerified: true,
      isActive: true,
    })
    console.log('✅ Owner created: vignesh@bikerent.com / vignesh123')
  } else {
    console.log('ℹ️  Owner already exists')
  }

  // Create admin user
  let admin = await User.findOne({ email: 'admin@bikerent.com' })
  if (!admin) {
    const hashed = await bcrypt.hash('admin123', 12)
    admin = await User.create({
      name: 'Admin',
      email: 'admin@bikerent.com',
      password: hashed,
      role: 'admin',
      isVerified: true,
      isActive: true,
    })
    console.log('✅ Admin created: admin@bikerent.com / admin123')
  }

  // Delete existing bikes
  await Bike.deleteMany({ owner: owner._id })

  // Add 6 bikes
  const bikes = await Bike.insertMany([
    {
      name: 'Royal Enfield Classic 350',
      brand: 'Royal Enfield',
      category: 'Classic',
      pricePerDay: 599,
      location: 'Banjara Hills, Hyderabad',
      description: 'The iconic Royal Enfield Classic 350 - perfect for city rides and highway cruising. Well maintained and ready for your adventure.',
      images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
      available: true,
      status: 'approved',
      owner: owner._id,
      year: 2023,
      rating: 4.8,
      totalReviews: 124,
      isFeatured: true,
      specs: { engine: '349cc', fuelType: 'Petrol', mileage: '35 kmpl', maxSpeed: '120 km/h', transmission: 'Manual' },
      features: ['ABS Brakes', 'LED Headlight', 'USB Charging', 'Tripper Navigation'],
    },
    {
      name: 'Yamaha MT-15',
      brand: 'Yamaha',
      category: 'Sports',
      pricePerDay: 799,
      location: 'Hitech City, Hyderabad',
      description: 'The Yamaha MT-15 is a naked street fighter with aggressive styling and powerful performance. Perfect for thrill seekers.',
      images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80'],
      available: true,
      status: 'approved',
      owner: owner._id,
      year: 2023,
      rating: 4.9,
      totalReviews: 89,
      isFeatured: true,
      specs: { engine: '155cc', fuelType: 'Petrol', mileage: '45 kmpl', maxSpeed: '130 km/h', transmission: 'Manual' },
      features: ['Variable Valve Actuation', 'LED Lighting', 'Assist & Slipper Clutch', 'Traction Control'],
    },
    {
      name: 'KTM Duke 390',
      brand: 'KTM',
      category: 'Sports',
      pricePerDay: 999,
      location: 'Gachibowli, Hyderabad',
      description: 'The KTM Duke 390 is a high-performance naked bike with cutting-edge technology. For riders who demand the best.',
      images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
      available: true,
      status: 'approved',
      owner: owner._id,
      year: 2023,
      rating: 4.7,
      totalReviews: 67,
      isFeatured: true,
      specs: { engine: '373cc', fuelType: 'Petrol', mileage: '30 kmpl', maxSpeed: '167 km/h', transmission: 'Manual' },
      features: ['TFT Display', 'Cornering ABS', 'Traction Control', 'Quickshifter'],
    },
    {
      name: 'Bajaj Pulsar NS200',
      brand: 'Bajaj',
      category: 'Sports',
      pricePerDay: 499,
      location: 'Kukatpally, Hyderabad',
      description: 'The Bajaj Pulsar NS200 offers sporty performance at an affordable price. Great for daily commutes and weekend rides.',
      images: ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800&q=80'],
      available: true,
      status: 'approved',
      owner: owner._id,
      year: 2022,
      rating: 4.5,
      totalReviews: 156,
      isFeatured: false,
      specs: { engine: '199.5cc', fuelType: 'Petrol', mileage: '40 kmpl', maxSpeed: '136 km/h', transmission: 'Manual' },
      features: ['Perimeter Frame', 'Nitrox Suspension', 'Petal Disc Brakes', 'LED DRL'],
    },
    {
      name: 'Honda CB500F',
      brand: 'Honda',
      category: 'Adventure',
      pricePerDay: 1199,
      location: 'Jubilee Hills, Hyderabad',
      description: 'The Honda CB500F is a versatile middleweight motorcycle perfect for both city riding and long-distance touring.',
      images: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80'],
      available: true,
      status: 'approved',
      owner: owner._id,
      year: 2023,
      rating: 4.6,
      totalReviews: 45,
      isFeatured: true,
      specs: { engine: '471cc', fuelType: 'Petrol', mileage: '25 kmpl', maxSpeed: '180 km/h', transmission: 'Manual' },
      features: ['Dual Channel ABS', 'Assist Slipper Clutch', 'LED Headlight', 'USB Charger'],
    },
    {
      name: 'TVS Apache RR310',
      brand: 'TVS',
      category: 'Sports',
      pricePerDay: 899,
      location: 'Madhapur, Hyderabad',
      description: 'The TVS Apache RR310 is a fully-faired supersport motorcycle with race-inspired performance and premium features.',
      images: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80'],
      available: true,
      status: 'approved',
      owner: owner._id,
      year: 2023,
      rating: 4.8,
      totalReviews: 78,
      isFeatured: true,
      specs: { engine: '312.2cc', fuelType: 'Petrol', mileage: '28 kmpl', maxSpeed: '160 km/h', transmission: 'Manual' },
      features: ['Full TFT Display', 'Ride Modes', 'Cornering ABS', 'Race Tuned Suspension'],
    },
  ])

  console.log(`✅ ${bikes.length} bikes added successfully!`)
  console.log('\n🎉 Seed completed! You can now:')
  console.log('   - Login as Owner: vignesh@bikerent.com / vignesh123')
  console.log('   - Login as Admin: admin@bikerent.com / admin123')
  console.log('   - Browse bikes at http://localhost:3001/bikes\n')

  mongoose.disconnect()
}

seed().catch(err => {
  console.error('❌ Seed error:', err.message)
  mongoose.disconnect()
})
