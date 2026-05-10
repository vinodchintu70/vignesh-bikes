import { Routes, Route } from 'react-router-dom'

import PublicLayout from './layouts/PublicLayout'
import DashboardLayout from './layouts/DashboardLayout'
import OwnerLayout from './layouts/OwnerLayout'
import AdminLayout from './layouts/AdminLayout'

import ProtectedRoute from './components/common/ProtectedRoute'
import RoleRoute from './components/common/RoleRoute'

import HomePage from './pages/public/HomePage'
import AboutPage from './pages/public/AboutPage'
import ContactPage from './pages/public/ContactPage'
import FAQPage from './pages/public/FAQPage'
import TermsPage from './pages/public/TermsPage'
import PrivacyPage from './pages/public/PrivacyPage'
import BikesPage from './pages/public/BikesPage'
import BikeDetailPage from './pages/public/BikeDetailPage'

import LoginPage from './pages/auth/LoginPage'
import SignupPage from './pages/auth/SignupPage'
import ForgotPasswordPage from './pages/auth/ForgotPasswordPage'
import ResetPasswordPage from './pages/auth/ResetPasswordPage'

import UserDashboard from './pages/user/UserDashboard'
import UserProfile from './pages/user/UserProfile'
import UserBookings from './pages/user/UserBookings'
import UserWishlist from './pages/user/UserWishlist'
import UserSettings from './pages/user/UserSettings'
import ActiveRentals from './pages/user/ActiveRentals'

import CheckoutPage from './pages/booking/CheckoutPage'
import BookingConfirmation from './pages/booking/BookingConfirmation'

import OwnerDashboard from './pages/owner/OwnerDashboard'
import OwnerBikes from './pages/owner/OwnerBikes'
import AddBike from './pages/owner/AddBike'
import EditBike from './pages/owner/EditBike'
import OwnerBookings from './pages/owner/OwnerBookings'
import OwnerEarnings from './pages/owner/OwnerEarnings'

import AdminDashboard from './pages/admin/AdminDashboard'
import AdminUsers from './pages/admin/AdminUsers'
import AdminBikes from './pages/admin/AdminBikes'
import AdminBookings from './pages/admin/AdminBookings'
import AdminAnalytics from './pages/admin/AdminAnalytics'

import NotFoundPage from './pages/public/NotFoundPage'

export default function App() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route path="/terms" element={<TermsPage />} />
        <Route path="/privacy" element={<PrivacyPage />} />
        <Route path="/bikes" element={<BikesPage />} />
        <Route path="/bikes/:id" element={<BikeDetailPage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password/:token" element={<ResetPasswordPage />} />

      <Route element={<ProtectedRoute />}>
        <Route path="/checkout/:bikeId" element={<CheckoutPage />} />
        <Route path="/booking-confirmation/:bookingId" element={<BookingConfirmation />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<UserDashboard />} />
          <Route path="/dashboard/profile" element={<UserProfile />} />
          <Route path="/dashboard/bookings" element={<UserBookings />} />
          <Route path="/dashboard/active-rentals" element={<ActiveRentals />} />
          <Route path="/dashboard/wishlist" element={<UserWishlist />} />
          <Route path="/dashboard/settings" element={<UserSettings />} />
        </Route>
      </Route>

      <Route element={<RoleRoute roles={['owner', 'admin']} />}>
        <Route element={<OwnerLayout />}>
          <Route path="/owner/dashboard" element={<OwnerDashboard />} />
          <Route path="/owner/bikes" element={<OwnerBikes />} />
          <Route path="/owner/bikes/add" element={<AddBike />} />
          <Route path="/owner/bikes/edit/:id" element={<EditBike />} />
          <Route path="/owner/bookings" element={<OwnerBookings />} />
          <Route path="/owner/earnings" element={<OwnerEarnings />} />
        </Route>
      </Route>

      <Route element={<RoleRoute roles={['admin']} />}>
        <Route element={<AdminLayout />}>
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/bikes" element={<AdminBikes />} />
          <Route path="/admin/bookings" element={<AdminBookings />} />
          <Route path="/admin/analytics" element={<AdminAnalytics />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  )
}
