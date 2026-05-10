import { motion } from 'framer-motion'
import { FiX } from 'react-icons/fi'

const categories = ['Sports', 'Cruiser', 'Adventure', 'Classic', 'Electric', 'Scooter']
const brands = ['Royal Enfield', 'Yamaha', 'Honda', 'KTM', 'Bajaj', 'TVS', 'Suzuki', 'Kawasaki']
const priceRanges = [
  { label: 'Under ₹500', min: '', max: '500' },
  { label: '₹500 - ₹1000', min: '500', max: '1000' },
  { label: '₹1000 - ₹2000', min: '1000', max: '2000' },
  { label: 'Above ₹2000', min: '2000', max: '' },
]

export default function BikeFilters({ filters, onChange, onClear }) {
  return (
    <div className="card sticky top-24 space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-white font-semibold">Filters</h3>
        <button onClick={onClear} className="text-gray-500 hover:text-primary text-xs flex items-center gap-1 transition-colors">
          <FiX size={12} /> Clear All
        </button>
      </div>

      {/* Availability */}
      <div>
        <h4 className="text-gray-400 text-sm font-medium mb-3">Availability</h4>
        <div className="space-y-2">
          {[{ label: 'All Bikes', value: '' }, { label: 'Available Now', value: 'true' }].map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                filters.available === opt.value ? 'bg-primary border-primary' : 'border-dark-border group-hover:border-primary/50'
              }`}>
                {filters.available === opt.value && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input type="radio" className="hidden" checked={filters.available === opt.value} onChange={() => onChange('available', opt.value)} />
              <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Category */}
      <div>
        <h4 className="text-gray-400 text-sm font-medium mb-3">Category</h4>
        <div className="flex flex-wrap gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => onChange('category', filters.category === cat ? '' : cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filters.category === cat
                  ? 'bg-primary text-white'
                  : 'glass border border-dark-border text-gray-400 hover:border-primary/30 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Brand */}
      <div>
        <h4 className="text-gray-400 text-sm font-medium mb-3">Brand</h4>
        <div className="space-y-2 max-h-40 overflow-y-auto">
          {brands.map(brand => (
            <label key={brand} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                filters.brand === brand ? 'bg-primary border-primary' : 'border-dark-border group-hover:border-primary/50'
              }`}>
                {filters.brand === brand && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input type="checkbox" className="hidden" checked={filters.brand === brand} onChange={() => onChange('brand', filters.brand === brand ? '' : brand)} />
              <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{brand}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h4 className="text-gray-400 text-sm font-medium mb-3">Price Range</h4>
        <div className="space-y-2">
          {priceRanges.map(range => (
            <label key={range.label} className="flex items-center gap-2 cursor-pointer group">
              <div className={`w-4 h-4 rounded border-2 flex items-center justify-center transition-all ${
                filters.minPrice === range.min && filters.maxPrice === range.max
                  ? 'bg-primary border-primary'
                  : 'border-dark-border group-hover:border-primary/50'
              }`}>
                {filters.minPrice === range.min && filters.maxPrice === range.max && <div className="w-2 h-2 bg-white rounded-sm" />}
              </div>
              <input
                type="radio"
                className="hidden"
                checked={filters.minPrice === range.min && filters.maxPrice === range.max}
                onChange={() => { onChange('minPrice', range.min); onChange('maxPrice', range.max) }}
              />
              <span className="text-gray-400 text-sm group-hover:text-white transition-colors">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Custom Price */}
      <div>
        <h4 className="text-gray-400 text-sm font-medium mb-3">Custom Price (₹/day)</h4>
        <div className="flex gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => onChange('minPrice', e.target.value)}
            className="input-field py-2 text-sm"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => onChange('maxPrice', e.target.value)}
            className="input-field py-2 text-sm"
          />
        </div>
      </div>
    </div>
  )
}
