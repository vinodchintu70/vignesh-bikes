# 🏍️ Vignesh Konda Bike Rentals

A full-stack bike rental platform built with React, Node.js, Express, and MongoDB.

![Status](https://img.shields.io/badge/status-active-success.svg)
![License](https://img.shields.io/badge/license-MIT-blue.svg)

---

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Documentation](#documentation)
- [Project Structure](#project-structure)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

---

## ✨ Features

### For Customers
- 🔍 Browse and search bikes with advanced filters
- 📅 Book bikes for specific dates
- ⭐ Rate and review bikes
- ❤️ Add bikes to wishlist
- 📱 Responsive design for all devices
- 🔔 Real-time notifications

### For Bike Owners
- ➕ Add and manage bike listings
- ✅ Approve or reject booking requests
- 💰 Track earnings and bookings
- 📊 View booking analytics
- 📸 Upload multiple bike images

### For Admins
- 👥 Manage users and roles
- 🏍️ Approve/reject bike listings
- 📈 View platform analytics
- 🔧 System monitoring and control

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - UI library
- **React Router v6** - Routing
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications
- **Vite** - Build tool

### Backend
- **Node.js** - Runtime
- **Express** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM
- **JWT** - Authentication
- **Bcrypt** - Password hashing
- **Nodemailer** - Email service
- **Cloudinary** - Image storage

---

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd web_site
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd server
   npm install

   # Frontend
   cd ../client
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy and edit .env files
   # server/.env - Configure MongoDB and JWT
   # client/.env - Configure API URL
   ```

4. **Start the application**
   ```bash
   # Terminal 1 - Backend
   cd server
   npm run dev

   # Terminal 2 - Frontend
   cd client
   npm run dev
   ```

5. **Access the application**
   - Frontend: http://localhost:3000
   - Backend: http://localhost:5000

For detailed setup instructions, see [QUICK_START.md](QUICK_START.md)

---

## 📚 Documentation

- **[QUICK_START.md](QUICK_START.md)** - Get started in 5 minutes
- **[SETUP_GUIDE.md](SETUP_GUIDE.md)** - Detailed setup instructions
- **[API_REFERENCE.md](API_REFERENCE.md)** - Complete API documentation
- **[CHANGES_SUMMARY.md](CHANGES_SUMMARY.md)** - Recent changes and updates

---

## 📁 Project Structure

```
web_site/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # React Context (Auth, Theme)
│   │   ├── services/      # API service layer
│   │   ├── layouts/       # Layout components
│   │   ├── hooks/         # Custom React hooks
│   │   ├── utils/         # Utility functions
│   │   ├── App.jsx        # Main app component
│   │   └── main.jsx       # Entry point
│   ├── public/            # Static assets
│   ├── .env               # Environment variables
│   └── package.json       # Dependencies
│
├── server/                # Node.js Backend
│   ├── controllers/       # Route controllers
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── config/           # Configuration files
│   ├── utils/            # Helper functions
│   ├── server.js         # Entry point
│   ├── .env              # Environment variables
│   └── package.json      # Dependencies
│
├── QUICK_START.md        # Quick setup guide
├── SETUP_GUIDE.md        # Detailed setup guide
├── API_REFERENCE.md      # API documentation
├── CHANGES_SUMMARY.md    # Change log
└── README.md             # This file
```

---

## 🎯 Key Features Explained

### Authentication System
- JWT-based authentication
- Email verification with OTP
- Google OAuth integration
- Password reset functionality
- Role-based access control (Customer, Owner, Admin)

### Booking System
- Date-based availability checking
- Conflict detection
- Owner approval workflow
- Booking status tracking
- Cancellation support

### Bike Management
- Multi-image upload
- Advanced search and filters
- Category and brand organization
- Availability management
- Featured bikes section

### Admin Panel
- User management
- Bike approval system
- Booking oversight
- Analytics dashboard
- System monitoring

---

## 🔐 Security Features

- ✅ JWT token authentication
- ✅ Password hashing with bcrypt
- ✅ Rate limiting on API endpoints
- ✅ CORS configuration
- ✅ Helmet.js security headers
- ✅ Input validation and sanitization
- ✅ Protected routes and role-based access

---

## 🌟 Highlights

- **No Payment Integration** - Simple booking approval system
- **Real-time Notifications** - Stay updated on bookings
- **Responsive Design** - Works on all devices
- **Dark Theme** - Easy on the eyes
- **Fast Performance** - Optimized with Vite
- **Clean Code** - Well-structured and documented

---

## 🔧 Configuration

### Required Environment Variables

**Backend (server/.env):**
```env
MONGODB_URI=mongodb://localhost:27017/bikerent
JWT_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
```

**Frontend (client/.env):**
```env
VITE_API_URL=http://localhost:5000/api
```

### Optional Environment Variables

**Backend:**
- `GOOGLE_CLIENT_ID` - For Google OAuth
- `CLOUDINARY_*` - For image uploads
- `EMAIL_*` - For email notifications

See [SETUP_GUIDE.md](SETUP_GUIDE.md) for complete configuration details.

---

## 🧪 Testing

### Create Test Users

**Customer:**
- Register through the website
- Verify email with OTP

**Owner:**
- Register with role "owner"
- Add bikes to the platform

**Admin:**
- Use MongoDB to create admin user
- See [QUICK_START.md](QUICK_START.md) for instructions

---

## 📱 API Endpoints

### Public Endpoints
- `GET /api/bikes` - Get all bikes
- `GET /api/bikes/:id` - Get bike details
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user

### Protected Endpoints
- `GET /api/auth/me` - Get current user
- `POST /api/bookings` - Create booking
- `GET /api/bookings/user/my-bookings` - Get user bookings
- `POST /api/bikes` - Create bike (Owner)
- `GET /api/admin/dashboard` - Admin dashboard (Admin)

See [API_REFERENCE.md](API_REFERENCE.md) for complete API documentation.

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

---

## 👨‍💻 Author

**Vignesh Konda**

---

## 🙏 Acknowledgments

- React team for the amazing library
- MongoDB for the database
- All open-source contributors

---

## 📞 Support

For support and questions:
- Check the documentation files
- Review console logs for errors
- Verify environment configuration
- Ensure MongoDB is running

---

## 🎉 Status

✅ **Ready for Development**
✅ **Ready for Testing**
✅ **Ready for Deployment**

---

**Built with ❤️ for bike enthusiasts**
