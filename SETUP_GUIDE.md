# 🚀 Vignesh Konda Bike Rentals - Setup Guide

## ✅ Changes Made

### 1. **Removed Payment Integration**
- ❌ Removed Razorpay payment gateway
- ❌ Removed all payment-related routes and controllers
- ❌ Removed payment pages (PaymentSuccess, PaymentFailed, UserPayments)
- ✅ Bookings now work without payment processing
- ✅ Owner can directly approve/reject bookings

### 2. **Fixed Authentication**
- ✅ Connected frontend AuthContext to backend APIs
- ✅ Fixed token storage (now uses consistent 'token' key)
- ✅ Removed mock localStorage authentication
- ✅ Real JWT authentication now working

### 3. **Cleaned Environment Variables**
- ✅ Removed payment-related config
- ✅ Added clear instructions for required vs optional variables
- ✅ Set MongoDB to local by default

---

## 📋 Prerequisites

Before running the application, install:
- **Node.js** (v16 or higher) - [Download](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local: [Download MongoDB Community](https://www.mongodb.com/try/download/community)
  - Cloud: [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) (Free tier available)

---

## 🛠️ Installation Steps

### Step 1: Install Dependencies

#### Backend
```bash
cd server
npm install
```

#### Frontend
```bash
cd client
npm install
```

---

### Step 2: Configure Environment Variables

#### Backend (.env file in `server` folder)

**REQUIRED - Must configure:**
```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/bikerent
# OR for MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/bikerent

# JWT Secrets (Change these to random strings!)
JWT_SECRET=change_this_to_a_very_long_random_string_12345
JWT_REFRESH_SECRET=change_this_to_another_random_string_67890
```

**OPTIONAL - Can leave empty:**
```env
# Google OAuth (for Google login)
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=

# Cloudinary (for image uploads)
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=

# Email (for sending emails)
EMAIL_USER=
EMAIL_PASS=
```

#### Frontend (.env file in `client` folder)

```env
VITE_API_URL=http://localhost:5000/api
VITE_GOOGLE_CLIENT_ID=
VITE_CLOUDINARY_CLOUD_NAME=
```

---

### Step 3: Start MongoDB

#### Option A: Local MongoDB
```bash
# Windows
mongod

# Mac/Linux
sudo systemctl start mongod
```

#### Option B: MongoDB Atlas
1. Create free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Update `MONGODB_URI` in server/.env

---

### Step 4: Run the Application

#### Terminal 1 - Start Backend
```bash
cd server
npm run dev
```
Server will run on: http://localhost:5000

#### Terminal 2 - Start Frontend
```bash
cd client
npm run dev
```
Frontend will run on: http://localhost:3000

---

## 👤 Creating Test Users

### Method 1: Through the Website
1. Go to http://localhost:3000/signup
2. Register as Customer or Owner
3. Verify email with OTP (check console logs if email not configured)

### Method 2: Create Admin User (MongoDB)
```javascript
// Connect to MongoDB and run:
db.users.insertOne({
  name: "Admin User",
  email: "admin@bikerent.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKbaWZ4e", // password: admin123
  role: "admin",
  isVerified: true,
  isActive: true,
  createdAt: new Date()
})
```

---

## 🎯 How the System Works (Without Payment)

### For Customers:
1. ✅ Browse bikes
2. ✅ Select dates and book
3. ✅ Wait for owner approval
4. ✅ Once approved, rental is confirmed
5. ✅ Pick up bike on start date

### For Owners:
1. ✅ Add bikes to the platform
2. ✅ Receive booking requests
3. ✅ Approve or reject bookings
4. ✅ Track active rentals
5. ✅ View earnings

### For Admins:
1. ✅ Manage all users
2. ✅ Approve/reject bike listings
3. ✅ View all bookings
4. ✅ Access analytics

---

## 🔧 Optional Features Setup

### Google OAuth Login
1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Create a project
3. Enable Google+ API
4. Create OAuth 2.0 credentials
5. Add to both client and server .env files

### Image Uploads (Cloudinary)
1. Create account at [Cloudinary](https://cloudinary.com)
2. Get Cloud Name, API Key, API Secret
3. Add to server .env file

### Email Notifications
1. Use Gmail with App Password
2. Enable 2FA on Gmail
3. Generate App Password
4. Add to server .env:
```env
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your_app_password
```

---

## 🐛 Troubleshooting

### Backend won't start
- ✅ Check if MongoDB is running
- ✅ Verify MONGODB_URI in .env
- ✅ Run `npm install` in server folder

### Frontend won't start
- ✅ Run `npm install` in client folder
- ✅ Check if port 3000 is available
- ✅ Verify VITE_API_URL in .env

### Can't login
- ✅ Check backend console for errors
- ✅ Verify JWT_SECRET is set
- ✅ Clear browser localStorage
- ✅ Check MongoDB connection

### Images not uploading
- ✅ Configure Cloudinary credentials
- ✅ Or use direct URLs for now

---

## 📁 Project Structure

```
web_site/
├── client/                 # React Frontend
│   ├── src/
│   │   ├── components/    # Reusable components
│   │   ├── pages/         # Page components
│   │   ├── context/       # Auth & Theme context
│   │   ├── services/      # API calls
│   │   └── App.jsx        # Main app component
│   └── .env               # Frontend environment variables
│
└── server/                # Node.js Backend
    ├── controllers/       # Business logic
    ├── models/           # MongoDB schemas
    ├── routes/           # API routes
    ├── middleware/       # Auth middleware
    ├── utils/            # Helper functions
    ├── server.js         # Entry point
    └── .env              # Backend environment variables
```

---

## 🎉 You're All Set!

Your bike rental platform is now ready to use without payment integration. Users can book bikes, owners can approve bookings, and everything works smoothly!

### Default URLs:
- **Frontend:** http://localhost:3000
- **Backend API:** http://localhost:5000/api
- **Health Check:** http://localhost:5000/api/health

---

## 📞 Need Help?

If you encounter any issues:
1. Check the console logs (both frontend and backend)
2. Verify all environment variables are set correctly
3. Make sure MongoDB is running
4. Clear browser cache and localStorage

Happy Renting! 🏍️
