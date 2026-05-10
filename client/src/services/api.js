import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  timeout: 15000,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) config.headers.Authorization = `Bearer ${token}`
    return config
  },
  (error) => Promise.reject(error)
)

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message = error.response?.data?.message || 'Something went wrong'
    if (error.response?.status === 401) {
      localStorage.removeItem('token')
      if (window.location.pathname !== '/login') {
        window.location.href = '/login'
      }
    } else if (error.response?.status === 403) {
      toast.error('Access denied')
    } else if (error.response?.status === 429) {
      toast.error('Too many requests. Please slow down.')
    } else if (error.response?.status >= 500) {
      toast.error('Server error. Please try again later.')
    }
    return Promise.reject(error)
  }
)

export default api

export const authAPI = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  googleLogin: (token) => api.post('/auth/google', { token }),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, password) => api.post(`/auth/reset-password/${token}`, { password }),
  verifyOTP: (data) => api.post('/auth/verify-otp', data),
  resendOTP: (email) => api.post('/auth/resend-otp', { email }),
  getMe: () => api.get('/auth/me'),
  updateProfile: (data) => api.put('/auth/profile', data),
  changePassword: (data) => api.put('/auth/change-password', data),
}

export const bikeAPI = {
  getAll: (params) => api.get('/bikes', { params }),
  getById: (id) => api.get(`/bikes/${id}`),
  create: (data) => api.post('/bikes', data),
  update: (id, data) => api.put(`/bikes/${id}`, data),
  delete: (id) => api.delete(`/bikes/${id}`),
  uploadImages: (id, formData) => api.post(`/bikes/${id}/images`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
  getFeatured: () => api.get('/bikes/featured'),
  getOwnerBikes: () => api.get('/bikes/owner/my-bikes'),
  checkAvailability: (id, data) => api.post(`/bikes/${id}/availability`, data),
}

export const bookingAPI = {
  create: (data) => api.post('/bookings', data),
  getAll: (params) => api.get('/bookings', { params }),
  getById: (id) => api.get(`/bookings/${id}`),
  getUserBookings: () => api.get('/bookings/user/my-bookings'),
  getOwnerBookings: () => api.get('/bookings/owner/bookings'),
  cancel: (id) => api.put(`/bookings/${id}/cancel`),
  approve: (id) => api.put(`/bookings/${id}/approve`),
  reject: (id, reason) => api.put(`/bookings/${id}/reject`, { reason }),
  complete: (id) => api.put(`/bookings/${id}/complete`),
}

export const reviewAPI = {
  create: (data) => api.post('/reviews', data),
  getBikeReviews: (bikeId) => api.get(`/reviews/bike/${bikeId}`),
  update: (id, data) => api.put(`/reviews/${id}`, data),
  delete: (id) => api.delete(`/reviews/${id}`),
}

export const userAPI = {
  getAll: (params) => api.get('/users', { params }),
  getById: (id) => api.get(`/users/${id}`),
  update: (id, data) => api.put(`/users/${id}`, data),
  delete: (id) => api.delete(`/users/${id}`),
  getWishlist: () => api.get('/users/wishlist'),
  addToWishlist: (bikeId) => api.post(`/users/wishlist/${bikeId}`),
  removeFromWishlist: (bikeId) => api.delete(`/users/wishlist/${bikeId}`),
  uploadAvatar: (formData) => api.post('/users/avatar', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  }),
}

export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getAnalytics: (period) => api.get(`/admin/analytics?period=${period}`),
  getUsers: (params) => api.get('/admin/users', { params }),
  getBikes: (params) => api.get('/admin/bikes', { params }),
  getBookings: (params) => api.get('/admin/bookings', { params }),
  toggleUserStatus: (id) => api.put(`/admin/users/${id}/toggle-status`),
  approveBike: (id) => api.put(`/admin/bikes/${id}/approve`),
  rejectBike: (id, reason) => api.put(`/admin/bikes/${id}/reject`, { reason }),
}

export const notificationAPI = {
  getAll: () => api.get('/notifications'),
  markRead: (id) => api.put(`/notifications/${id}/read`),
  markAllRead: () => api.put('/notifications/read-all'),
  delete: (id) => api.delete(`/notifications/${id}`),
}
