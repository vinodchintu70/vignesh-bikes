# ⚡ QUICK START GUIDE

## 🚀 Get Your Bike Rental Website Running in 5 Minutes!

---

## Step 1: Install Dependencies (2 minutes)

Open two terminals:

**Terminal 1 - Backend:**
```bash
cd server
npm install
```

**Terminal 2 - Frontend:**
```bash
cd client
npm install
```

---

## Step 2: Setup MongoDB (1 minute)

### Option A: Use Local MongoDB (Easiest)
Already set in `.env` file! Just make sure MongoDB is installed and running.

### Option B: Use MongoDB Atlas (Cloud - Free)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create cluster
4. Get connection string
5. Update `server/.env`:
   ```env
   MONGODB_URI=your_connection_string_here
   ```

---

## Step 3: Set JWT Secret (30 seconds)

Open `server/.env` and change:
```env
JWT_SECRET=my_super_secret_key_12345_change_this
JWT_REFRESH_SECRET=my_refresh_secret_67890_change_this
```

**Important:** Use random strings for production!

---

## Step 4: Start the Application (1 minute)

**Terminal 1 - Start Backend:**
```bash
cd server
npm run dev
```
✅ Backend running on http://localhost:5000

**Terminal 2 - Start Frontend:**
```bash
cd client
npm run dev
```
✅ Frontend running on http://localhost:3000

---

## Step 5: Create Your First User (30 seconds)

1. Open http://localhost:3000
2. Click "Sign Up"
3. Fill in details
4. Check backend console for OTP code
5. Enter OTP to verify
6. Start using the app!

---

## 🎉 That's It! You're Done!

### What You Can Do Now:

**As a Customer:**
- Browse bikes
- Search and filter
- Create bookings
- Add to wishlist
- Leave reviews

**As an Owner:**
- Add your bikes
- Manage bookings
- Approve/reject requests
- Track earnings

**As an Admin:**
- Manage users
- Approve bikes
- View analytics
- Monitor system

---

## 🔑 Create Admin User (Optional)

If you want admin access, connect to MongoDB and run:

```javascript
db.users.insertOne({
  name: "Admin",
  email: "admin@bikerent.com",
  password: "$2a$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMQJqhN8/LewY5GyYIxKbaWZ4e",
  role: "admin",
  isVerified: true,
  isActive: true,
  createdAt: new Date()
})
```

Login with:
- Email: admin@bikerent.com
- Password: admin123

---

## 🐛 Quick Troubleshooting

### Backend won't start?
```bash
# Check if MongoDB is running
mongod --version

# If not installed, install MongoDB
# Windows: https://www.mongodb.com/try/download/community
# Mac: brew install mongodb-community
# Linux: sudo apt install mongodb
```

### Frontend won't start?
```bash
# Clear node_modules and reinstall
cd client
rm -rf node_modules package-lock.json
npm install
```

### Can't login?
```bash
# Clear browser data
# Chrome: Ctrl+Shift+Delete
# Or open DevTools > Application > Clear Storage
```

---

## 📁 Important Files

- `SETUP_GUIDE.md` - Detailed setup instructions
- `API_REFERENCE.md` - Complete API documentation
- `CHANGES_SUMMARY.md` - All changes made to the project
- `server/.env` - Backend configuration
- `client/.env` - Frontend configuration

---

## 🎯 Default URLs

| Service | URL |
|---------|-----|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:5000/api |
| Health Check | http://localhost:5000/api/health |

---

## ⚙️ Optional Features (Can Skip for Now)

### Google OAuth Login
- Get credentials from Google Cloud Console
- Add to both `.env` files

### Image Uploads
- Create Cloudinary account
- Add credentials to `server/.env`

### Email Notifications
- Use Gmail App Password
- Add to `server/.env`

**Note:** App works fine without these! Add them later if needed.

---

## 💡 Pro Tips

1. **Use MongoDB Compass** - Visual tool to view your database
2. **Use Postman** - Test API endpoints easily
3. **Check Console Logs** - Both frontend and backend show helpful errors
4. **Read API_REFERENCE.md** - Understand all available endpoints

---

## 🎊 You're All Set!

Your bike rental platform is now running! 

**Next Steps:**
1. Create some test users
2. Add some bikes (as owner)
3. Make test bookings
4. Explore all features

**Need Help?**
- Check `SETUP_GUIDE.md` for detailed instructions
- Check `API_REFERENCE.md` for API docs
- Check console logs for errors

---

## 📊 System Status Checklist

Before you start, verify:
- ✅ Node.js installed (v16+)
- ✅ MongoDB installed/configured
- ✅ Dependencies installed (npm install)
- ✅ .env files configured
- ✅ Both servers running
- ✅ No errors in console

If all checked, you're good to go! 🚀

---

**Happy Building! 🏍️**
