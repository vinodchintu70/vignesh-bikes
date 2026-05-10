const https = require('https')

const TOKEN = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhMDAxNzljY2Y3MTBhYmUxN2M2Y2I1NiIsImlhdCI6MTc3ODM5MDk0MywiZXhwIjoxNzc4OTk1NzQzfQ.HUWmeJkoNCrOfew72xoUjk0lpevzl7QvXVfLD0oUKEE'
const BASE_URL = 'vignesh-bikes-api.onrender.com'

const bikes = [
  {
    name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', category: 'Classic',
    pricePerDay: 599, location: 'Banjara Hills, Hyderabad',
    description: 'The iconic Royal Enfield Classic 350 - perfect for city rides and highway cruising.',
    images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80'],
    available: true, status: 'approved', year: 2023, rating: 4.8, totalReviews: 124, isFeatured: true,
    specs: { engine: '349cc', fuelType: 'Petrol', mileage: '35 kmpl', maxSpeed: '120 km/h', transmission: 'Manual' },
    features: ['ABS Brakes', 'LED Headlight', 'USB Charging', 'Tripper Navigation'],
  },
  {
    name: 'Yamaha MT-15', brand: 'Yamaha', category: 'Sports',
    pricePerDay: 799, location: 'Hitech City, Hyderabad',
    description: 'The Yamaha MT-15 is a naked street fighter with aggressive styling and powerful performance.',
    images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&q=80'],
    available: true, status: 'approved', year: 2023, rating: 4.9, totalReviews: 89, isFeatured: true,
    specs: { engine: '155cc', fuelType: 'Petrol', mileage: '45 kmpl', maxSpeed: '130 km/h', transmission: 'Manual' },
    features: ['Variable Valve Actuation', 'LED Lighting', 'Assist Slipper Clutch'],
  },
  {
    name: 'KTM Duke 390', brand: 'KTM', category: 'Sports',
    pricePerDay: 999, location: 'Gachibowli, Hyderabad',
    description: 'The KTM Duke 390 is a high-performance naked bike with cutting-edge technology.',
    images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&q=80'],
    available: true, status: 'approved', year: 2023, rating: 4.7, totalReviews: 67, isFeatured: true,
    specs: { engine: '373cc', fuelType: 'Petrol', mileage: '30 kmpl', maxSpeed: '167 km/h', transmission: 'Manual' },
    features: ['TFT Display', 'Cornering ABS', 'Traction Control', 'Quickshifter'],
  },
  {
    name: 'Bajaj Pulsar NS200', brand: 'Bajaj', category: 'Sports',
    pricePerDay: 499, location: 'Kukatpally, Hyderabad',
    description: 'The Bajaj Pulsar NS200 offers sporty performance at an affordable price.',
    images: ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=800&q=80'],
    available: true, status: 'approved', year: 2022, rating: 4.5, totalReviews: 156, isFeatured: false,
    specs: { engine: '199.5cc', fuelType: 'Petrol', mileage: '40 kmpl', maxSpeed: '136 km/h', transmission: 'Manual' },
    features: ['Perimeter Frame', 'Nitrox Suspension', 'Petal Disc Brakes'],
  },
  {
    name: 'Honda CB500F', brand: 'Honda', category: 'Adventure',
    pricePerDay: 1199, location: 'Jubilee Hills, Hyderabad',
    description: 'The Honda CB500F is a versatile middleweight motorcycle perfect for touring.',
    images: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&q=80'],
    available: true, status: 'approved', year: 2023, rating: 4.6, totalReviews: 45, isFeatured: true,
    specs: { engine: '471cc', fuelType: 'Petrol', mileage: '25 kmpl', maxSpeed: '180 km/h', transmission: 'Manual' },
    features: ['Dual Channel ABS', 'Assist Slipper Clutch', 'LED Headlight'],
  },
  {
    name: 'TVS Apache RR310', brand: 'TVS', category: 'Sports',
    pricePerDay: 899, location: 'Madhapur, Hyderabad',
    description: 'The TVS Apache RR310 is a fully-faired supersport motorcycle with race-inspired performance.',
    images: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=800&q=80'],
    available: true, status: 'approved', year: 2023, rating: 4.8, totalReviews: 78, isFeatured: true,
    specs: { engine: '312.2cc', fuelType: 'Petrol', mileage: '28 kmpl', maxSpeed: '160 km/h', transmission: 'Manual' },
    features: ['Full TFT Display', 'Ride Modes', 'Cornering ABS'],
  },
]

const addBike = (bike) => {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(bike)
    const options = {
      hostname: BASE_URL,
      path: '/api/bikes',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${TOKEN}`,
        'Content-Length': Buffer.byteLength(data),
      },
    }
    const req = https.request(options, (res) => {
      let body = ''
      res.on('data', (chunk) => body += chunk)
      res.on('end', () => {
        const result = JSON.parse(body)
        if (result.bike) {
          console.log(`✅ Added: ${bike.name}`)
          resolve(result)
        } else {
          console.log(`❌ Failed: ${bike.name} - ${result.message}`)
          resolve(result)
        }
      })
    })
    req.on('error', reject)
    req.write(data)
    req.end()
  })
}

const run = async () => {
  console.log('🚀 Adding bikes to production...\n')
  for (const bike of bikes) {
    await addBike(bike)
  }
  console.log('\n🎉 All bikes added to production!')
}

run().catch(console.error)
