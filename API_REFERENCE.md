# 📡 API Endpoints Reference

Base URL: `http://localhost:5000/api`

---

## 🔐 Authentication Endpoints

### Register
```
POST /auth/register
Body: { name, email, password, phone, role }
Response: { success, message }
```

### Verify OTP
```
POST /auth/verify-otp
Body: { email, otp }
Response: { success, token, user }
```

### Login
```
POST /auth/login
Body: { email, password }
Response: { success, token, user }
```

### Google Login
```
POST /auth/google
Body: { token }
Response: { success, token, user }
```

### Get Current User
```
GET /auth/me
Headers: { Authorization: Bearer <token> }
Response: { success, user }
```

### Update Profile
```
PUT /auth/profile
Headers: { Authorization: Bearer <token> }
Body: { name, phone, address, bio }
Response: { success, user }
```

### Change Password
```
PUT /auth/change-password
Headers: { Authorization: Bearer <token> }
Body: { currentPassword, newPassword }
Response: { success, message }
```

### Forgot Password
```
POST /auth/forgot-password
Body: { email }
Response: { success, message }
```

### Reset Password
```
POST /auth/reset-password/:token
Body: { password }
Response: { success, token, user }
```

---

## 🏍️ Bike Endpoints

### Get All Bikes (Public)
```
GET /bikes
Query: ?search=&category=&brand=&minPrice=&maxPrice=&location=&page=1&limit=9
Response: { success, bikes, total, totalPages, currentPage }
```

### Get Featured Bikes
```
GET /bikes/featured
Response: { success, bikes }
```

### Get Single Bike
```
GET /bikes/:id
Response: { success, bike }
```

### Check Availability
```
POST /bikes/:id/availability
Body: { startDate, endDate }
Response: { success, available }
```

### Get Owner's Bikes (Protected - Owner/Admin)
```
GET /bikes/owner/my-bikes
Headers: { Authorization: Bearer <token> }
Response: { success, bikes }
```

### Create Bike (Protected - Owner/Admin)
```
POST /bikes
Headers: { Authorization: Bearer <token> }
Body: { name, brand, category, pricePerDay, location, description, specs, features }
Response: { success, bike }
```

### Update Bike (Protected - Owner/Admin)
```
PUT /bikes/:id
Headers: { Authorization: Bearer <token> }
Body: { name, brand, category, pricePerDay, ... }
Response: { success, bike }
```

### Delete Bike (Protected - Owner/Admin)
```
DELETE /bikes/:id
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

### Upload Bike Images (Protected - Owner/Admin)
```
POST /bikes/:id/images
Headers: { Authorization: Bearer <token>, Content-Type: multipart/form-data }
Body: FormData with images
Response: { success, images }
```

---

## 📅 Booking Endpoints

### Create Booking (Protected)
```
POST /bookings
Headers: { Authorization: Bearer <token> }
Body: { bike, startDate, endDate, totalAmount }
Response: { success, booking }
```

### Get User's Bookings (Protected)
```
GET /bookings/user/my-bookings
Headers: { Authorization: Bearer <token> }
Response: { success, bookings }
```

### Get Owner's Bookings (Protected - Owner/Admin)
```
GET /bookings/owner/bookings
Headers: { Authorization: Bearer <token> }
Response: { success, bookings }
```

### Get Single Booking (Protected)
```
GET /bookings/:id
Headers: { Authorization: Bearer <token> }
Response: { success, booking }
```

### Cancel Booking (Protected)
```
PUT /bookings/:id/cancel
Headers: { Authorization: Bearer <token> }
Body: { reason }
Response: { success, booking }
```

### Approve Booking (Protected - Owner)
```
PUT /bookings/:id/approve
Headers: { Authorization: Bearer <token> }
Response: { success, booking }
```

### Reject Booking (Protected - Owner)
```
PUT /bookings/:id/reject
Headers: { Authorization: Bearer <token> }
Body: { reason }
Response: { success, booking }
```

### Complete Booking (Protected)
```
PUT /bookings/:id/complete
Headers: { Authorization: Bearer <token> }
Response: { success, booking }
```

---

## ⭐ Review Endpoints

### Create Review (Protected)
```
POST /reviews
Headers: { Authorization: Bearer <token> }
Body: { bike, rating, comment }
Response: { success, review }
```

### Get Bike Reviews
```
GET /reviews/bike/:bikeId
Response: { success, reviews }
```

### Update Review (Protected)
```
PUT /reviews/:id
Headers: { Authorization: Bearer <token> }
Body: { rating, comment }
Response: { success, review }
```

### Delete Review (Protected)
```
DELETE /reviews/:id
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

---

## 👤 User Endpoints

### Get Wishlist (Protected)
```
GET /users/wishlist
Headers: { Authorization: Bearer <token> }
Response: { success, wishlist }
```

### Add to Wishlist (Protected)
```
POST /users/wishlist/:bikeId
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

### Remove from Wishlist (Protected)
```
DELETE /users/wishlist/:bikeId
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

### Upload Avatar (Protected)
```
POST /users/avatar
Headers: { Authorization: Bearer <token>, Content-Type: multipart/form-data }
Body: FormData with avatar image
Response: { success, avatarUrl }
```

---

## 🔔 Notification Endpoints

### Get All Notifications (Protected)
```
GET /notifications
Headers: { Authorization: Bearer <token> }
Response: { success, notifications }
```

### Mark as Read (Protected)
```
PUT /notifications/:id/read
Headers: { Authorization: Bearer <token> }
Response: { success, notification }
```

### Mark All as Read (Protected)
```
PUT /notifications/read-all
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

### Delete Notification (Protected)
```
DELETE /notifications/:id
Headers: { Authorization: Bearer <token> }
Response: { success, message }
```

---

## 👑 Admin Endpoints

### Get Dashboard Stats (Protected - Admin)
```
GET /admin/dashboard
Headers: { Authorization: Bearer <token> }
Response: { success, stats }
```

### Get Analytics (Protected - Admin)
```
GET /admin/analytics?period=week
Headers: { Authorization: Bearer <token> }
Response: { success, analytics }
```

### Get All Users (Protected - Admin)
```
GET /admin/users
Headers: { Authorization: Bearer <token> }
Response: { success, users }
```

### Toggle User Status (Protected - Admin)
```
PUT /admin/users/:id/toggle-status
Headers: { Authorization: Bearer <token> }
Response: { success, user }
```

### Get All Bikes (Protected - Admin)
```
GET /admin/bikes
Headers: { Authorization: Bearer <token> }
Response: { success, bikes }
```

### Approve Bike (Protected - Admin)
```
PUT /admin/bikes/:id/approve
Headers: { Authorization: Bearer <token> }
Response: { success, bike }
```

### Reject Bike (Protected - Admin)
```
PUT /admin/bikes/:id/reject
Headers: { Authorization: Bearer <token> }
Body: { reason }
Response: { success, bike }
```

### Get All Bookings (Protected - Admin)
```
GET /admin/bookings
Headers: { Authorization: Bearer <token> }
Response: { success, bookings }
```

---

## 🏥 Health Check

### Check Server Status
```
GET /health
Response: { status: "OK", timestamp }
```

---

## 📝 Notes

- All protected routes require `Authorization: Bearer <token>` header
- Token is received after successful login/registration
- Store token in localStorage on frontend
- Token expires after 7 days (configurable in .env)
- All dates should be in ISO 8601 format
- File uploads use multipart/form-data
- All other requests use application/json

---

## 🔒 User Roles

- **customer**: Can browse bikes, make bookings, add reviews
- **owner**: All customer permissions + can add/manage bikes, approve bookings
- **admin**: Full access to all features + user management, analytics

---

## ⚠️ Error Responses

All errors follow this format:
```json
{
  "message": "Error description"
}
```

Common HTTP Status Codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `429` - Too Many Requests
- `500` - Server Error
