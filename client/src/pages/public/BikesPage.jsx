import { useState, useEffect, useCallback } from 'react'
import { useSearchParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FiFilter, FiSearch, FiGrid, FiList, FiX, FiSliders } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { bikeAPI } from '../../services/api'
import BikeCard from '../../components/bikes/BikeCard'
import BikeFilters from '../../components/bikes/BikeFilters'
import BikeSkeleton from '../../components/bikes/BikeSkeleton'

export default function BikesPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [bikes, setBikes] = useState([])
  const [loading, setLoading] = useState(true)
  const [totalPages, setTotalPages] = useState(1)
  const [currentPage, setCurrentPage] = useState(1)
  const [viewMode, setViewMode] = useState('grid')
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [totalBikes, setTotalBikes] = useState(0)

  const [filters, setFilters] = useState({
    search: searchParams.get('search') || '',
    category: searchParams.get('category') || '',
    brand: searchParams.get('brand') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    available: searchParams.get('available') || '',
    sortBy: searchParams.get('sortBy') || 'createdAt',
    sortOrder: searchParams.get('sortOrder') || 'desc',
    location: searchParams.get('location') || '',
  })

  const fetchBikes = useCallback(async () => {
    setLoading(true)
    try {
      const params = { ...filters, page: currentPage, limit: 9 }
      Object.keys(params).forEach(k => !params[k] && delete params[k])
      const { data } = await bikeAPI.getAll(params)
      setBikes(data.bikes || [])
      setTotalPages(data.totalPages || 1)
      setTotalBikes(data.total || 0)
    } catch {
      setBikes(mockBikes)
      setTotalBikes(mockBikes.length)
    } finally {
      setLoading(false)
    }
  }, [filters, currentPage])

  useEffect(() => { fetchBikes() }, [fetchBikes])

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
    setCurrentPage(1)
  }

  const clearFilters = () => {
    setFilters({ search: '', category: '', brand: '', minPrice: '', maxPrice: '', available: '', sortBy: 'createdAt', sortOrder: 'desc', location: '' })
    setCurrentPage(1)
  }

  const activeFiltersCount = Object.entries(filters).filter(([k, v]) => v && k !== 'sortBy' && k !== 'sortOrder').length

  return (
    <>
      <Helmet>
        <title>Browse Bikes - BikeRent</title>
      </Helmet>

      <div className="min-h-screen bg-dark-bg pt-20">
        {/* Header */}
        <div className="bg-dark-card/50 border-b border-dark-border py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <h1 className="font-display font-bold text-3xl text-white mb-2">
                Browse <span className="gradient-text">Bikes</span>
              </h1>
              <p className="text-gray-400">{totalBikes} bikes available across India</p>
            </motion.div>

            {/* Search Bar */}
            <div className="mt-6 flex gap-3">
              <div className="relative flex-1 max-w-lg">
                <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
                <input
                  type="text"
                  placeholder="Search bikes, brands..."
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  className="input-field pl-11 w-full"
                />
                {filters.search && (
                  <button onClick={() => handleFilterChange('search', '')} className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white">
                    <FiX size={16} />
                  </button>
                )}
              </div>

              <button
                onClick={() => setFiltersOpen(!filtersOpen)}
                className={`flex items-center gap-2 px-4 py-3 rounded-xl border transition-all ${
                  filtersOpen || activeFiltersCount > 0
                    ? 'bg-primary/10 border-primary text-primary'
                    : 'border-dark-border text-gray-400 hover:border-primary/30 hover:text-white'
                }`}
              >
                <FiSliders size={16} />
                <span className="hidden sm:block text-sm font-medium">Filters</span>
                {activeFiltersCount > 0 && (
                  <span className="w-5 h-5 bg-primary rounded-full text-white text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </button>

              <div className="flex border border-dark-border rounded-xl overflow-hidden">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-3 transition-colors ${viewMode === 'grid' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <FiGrid size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-3 transition-colors ${viewMode === 'list' ? 'bg-primary text-white' : 'text-gray-400 hover:text-white'}`}
                >
                  <FiList size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex gap-8">
            {/* Filters Sidebar */}
            {filtersOpen && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="hidden lg:block w-64 flex-shrink-0"
              >
                <BikeFilters
                  filters={filters}
                  onChange={handleFilterChange}
                  onClear={clearFilters}
                />
              </motion.div>
            )}

            {/* Bikes Grid */}
            <div className="flex-1">
              {/* Sort Bar */}
              <div className="flex items-center justify-between mb-6">
                <p className="text-gray-400 text-sm">
                  Showing <span className="text-white font-medium">{bikes.length}</span> of <span className="text-white font-medium">{totalBikes}</span> bikes
                </p>
                <select
                  value={`${filters.sortBy}-${filters.sortOrder}`}
                  onChange={(e) => {
                    const [sortBy, sortOrder] = e.target.value.split('-')
                    handleFilterChange('sortBy', sortBy)
                    handleFilterChange('sortOrder', sortOrder)
                  }}
                  className="input-field py-2 text-sm w-auto"
                >
                  <option value="createdAt-desc">Newest First</option>
                  <option value="pricePerDay-asc">Price: Low to High</option>
                  <option value="pricePerDay-desc">Price: High to Low</option>
                  <option value="rating-desc">Highest Rated</option>
                  <option value="name-asc">Name A-Z</option>
                </select>
              </div>

              {loading ? (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {[...Array(9)].map((_, i) => <BikeSkeleton key={i} />)}
                </div>
              ) : bikes.length === 0 ? (
                <div className="text-center py-20">
                  <div className="text-6xl mb-4">🏍️</div>
                  <h3 className="text-white font-bold text-xl mb-2">No bikes found</h3>
                  <p className="text-gray-400 mb-6">Try adjusting your filters or search terms</p>
                  <button onClick={clearFilters} className="btn-primary">Clear Filters</button>
                </div>
              ) : (
                <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>
                  {bikes.map((bike, i) => (
                    <BikeCard key={bike._id} bike={bike} index={i} viewMode={viewMode} />
                  ))}
                </div>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-10">
                  {[...Array(totalPages)].map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentPage(i + 1)}
                      className={`w-10 h-10 rounded-xl text-sm font-medium transition-all ${
                        currentPage === i + 1
                          ? 'bg-primary text-white shadow-glow-blue'
                          : 'glass text-gray-400 hover:text-white border border-dark-border'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

const mockBikes = [
  { _id: '1', name: 'Royal Enfield Classic 350', brand: 'Royal Enfield', category: 'Cruiser', pricePerDay: 599, rating: 4.8, totalReviews: 124, location: 'Hyderabad', available: true, images: ['https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80'] },
  { _id: '2', name: 'Yamaha MT-15', brand: 'Yamaha', category: 'Sports', pricePerDay: 799, rating: 4.9, totalReviews: 89, location: 'Hyderabad', available: true, images: ['https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=600&q=80'] },
  { _id: '3', name: 'KTM Duke 390', brand: 'KTM', category: 'Sports', pricePerDay: 999, rating: 4.7, totalReviews: 67, location: 'Hyderabad', available: true, images: ['https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=600&q=80'] },
  { _id: '4', name: 'Honda CB500F', brand: 'Honda', category: 'Adventure', pricePerDay: 1199, rating: 4.6, totalReviews: 45, location: 'Hyderabad', available: false, images: ['https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=600&q=80'] },
  { _id: '5', name: 'Bajaj Pulsar NS200', brand: 'Bajaj', category: 'Sports', pricePerDay: 499, rating: 4.5, totalReviews: 156, location: 'Hyderabad', available: true, images: ['https://images.unsplash.com/photo-1591637333184-19aa84b3e01f?w=600&q=80'] },
  { _id: '6', name: 'TVS Apache RR310', brand: 'TVS', category: 'Sports', pricePerDay: 899, rating: 4.8, totalReviews: 78, location: 'Hyderabad', available: true, images: ['https://images.unsplash.com/photo-1622185135505-2d795003994a?w=600&q=80'] },
]
