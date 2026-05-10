const nodemailer = require('nodemailer')

const createTransporter = () => {
  if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) return null
  return nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 30000,
    greetingTimeout: 30000,
    socketTimeout: 30000,
  })
}

const sendEmail = async ({ to, subject, html }) => {
  const transporter = createTransporter()
  if (!transporter) {
    console.log(`\n📧 EMAIL NOT CONFIGURED - Would send to: ${to}\n   Subject: ${subject}\n`)
    return
  }
  try {
    await transporter.sendMail({ from: process.env.EMAIL_FROM || process.env.EMAIL_USER, to, subject, html })
    console.log(`✅ Email sent to ${to}`)
  } catch (err) {
    console.error('❌ Email error:', err.message)
  }
}

// ── Send booking request to OWNER ──────────────────────────────────────────
exports.sendBookingRequestToOwner = async (data) => {
  const {
    ownerEmail, ownerName, customerName, customerEmail, customerPhone,
    bikeName, bikeCategory, pricePerDay,
    startDate, endDate, totalDays, totalAmount,
    pickupLocation, pickupTime, dropTime, notes, bookingId,
  } = data

  const pickup = new Date(startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  const drop   = new Date(endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  await sendEmail({
    to: ownerEmail,
    subject: `🏍️ New Booking Request - ${bikeName} from ${customerName}`,
    html: `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0F1115;color:#fff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#3B82F6,#06B6D4);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:28px;">🏍️ New Booking Request</h1>
        <p style="margin:8px 0 0;opacity:0.9;">Vignesh Konda Bike Rentals</p>
      </div>
      <div style="padding:32px;">
        <p style="color:#9CA3AF;margin-bottom:24px;">Hi <strong style="color:#fff;">${ownerName}</strong>, you have a new booking request!</p>

        <div style="background:#1A1D24;border:1px solid #2A2D35;border-radius:12px;padding:24px;margin-bottom:20px;">
          <h3 style="color:#3B82F6;margin:0 0 16px;">🏍️ Bike Details</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#9CA3AF;padding:6px 0;">Bike Name</td><td style="color:#fff;font-weight:600;">${bikeName}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Category</td><td style="color:#fff;">${bikeCategory}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Price/Day</td><td style="color:#3B82F6;font-weight:600;">₹${pricePerDay}</td></tr>
          </table>
        </div>

        <div style="background:#1A1D24;border:1px solid #2A2D35;border-radius:12px;padding:24px;margin-bottom:20px;">
          <h3 style="color:#06B6D4;margin:0 0 16px;">👤 Customer Details</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#9CA3AF;padding:6px 0;">Name</td><td style="color:#fff;font-weight:600;">${customerName}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Email</td><td style="color:#fff;">${customerEmail}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Phone</td><td style="color:#fff;">${customerPhone}</td></tr>
          </table>
        </div>

        <div style="background:#1A1D24;border:1px solid #2A2D35;border-radius:12px;padding:24px;margin-bottom:20px;">
          <h3 style="color:#F97316;margin:0 0 16px;">📅 Booking Details</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#9CA3AF;padding:6px 0;">Pickup Date</td><td style="color:#fff;font-weight:600;">${pickup}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Drop Date</td><td style="color:#fff;font-weight:600;">${drop}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Pickup Time</td><td style="color:#fff;">${pickupTime}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Drop Time</td><td style="color:#fff;">${dropTime}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Pickup Location</td><td style="color:#fff;">${pickupLocation}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Total Days</td><td style="color:#fff;">${totalDays} day${totalDays > 1 ? 's' : ''}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Total Amount</td><td style="color:#3B82F6;font-weight:700;font-size:18px;">₹${totalAmount}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Payment</td><td style="color:#F97316;font-weight:600;">💵 Cash at Pickup</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Notes</td><td style="color:#fff;">${notes}</td></tr>
          </table>
        </div>

        <div style="background:#1A1D24;border:1px solid #3B82F6;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:12px;">Booking ID</p>
          <p style="color:#3B82F6;font-weight:700;font-size:18px;font-family:monospace;margin:0;">#${bookingId.toString().slice(-8).toUpperCase()}</p>
        </div>

        <p style="color:#9CA3AF;font-size:14px;text-align:center;">Please login to your owner dashboard to approve or reject this booking.</p>
      </div>
      <div style="background:#1A1D24;padding:16px;text-align:center;border-top:1px solid #2A2D35;">
        <p style="color:#6B7280;font-size:12px;margin:0;">© Vignesh Konda Bike Rentals, Hyderabad</p>
      </div>
    </div>`,
  })
}

// ── Send booking confirmation to CUSTOMER ──────────────────────────────────
exports.sendBookingConfirmation = async (email, booking) => {
  const pickup = new Date(booking.startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  const drop   = new Date(booking.endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  await sendEmail({
    to: email,
    subject: `✅ Booking Confirmed - ${booking.bike?.name} | #${booking._id.toString().slice(-6).toUpperCase()}`,
    html: `
    <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#0F1115;color:#fff;border-radius:16px;overflow:hidden;">
      <div style="background:linear-gradient(135deg,#22c55e,#16a34a);padding:32px;text-align:center;">
        <h1 style="margin:0;font-size:28px;">✅ Booking Confirmed!</h1>
        <p style="margin:8px 0 0;opacity:0.9;">Vignesh Konda Bike Rentals</p>
      </div>
      <div style="padding:32px;">
        <p style="color:#9CA3AF;margin-bottom:24px;">Your booking has been <strong style="color:#22c55e;">confirmed</strong> by the owner!</p>

        <div style="background:#1A1D24;border:1px solid #2A2D35;border-radius:12px;padding:24px;margin-bottom:20px;">
          <h3 style="color:#3B82F6;margin:0 0 16px;">🏍️ Booking Summary</h3>
          <table style="width:100%;border-collapse:collapse;">
            <tr><td style="color:#9CA3AF;padding:6px 0;">Bike</td><td style="color:#fff;font-weight:600;">${booking.bike?.name}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Pickup Date</td><td style="color:#fff;">${pickup}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Drop Date</td><td style="color:#fff;">${drop}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Pickup Time</td><td style="color:#fff;">${booking.pickupTime || 'As agreed'}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Drop Time</td><td style="color:#fff;">${booking.dropTime || 'As agreed'}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Pickup Location</td><td style="color:#fff;">${booking.pickupLocation || 'As agreed'}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Total Days</td><td style="color:#fff;">${booking.totalDays} day${booking.totalDays > 1 ? 's' : ''}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Total Amount</td><td style="color:#3B82F6;font-weight:700;font-size:18px;">₹${booking.totalAmount}</td></tr>
            <tr><td style="color:#9CA3AF;padding:6px 0;">Payment</td><td style="color:#F97316;font-weight:600;">💵 Pay Cash at Pickup</td></tr>
          </table>
        </div>

        <div style="background:#1A1D24;border:1px solid #22c55e;border-radius:12px;padding:16px;margin-bottom:24px;text-align:center;">
          <p style="color:#9CA3AF;margin:0 0 4px;font-size:12px;">Booking ID</p>
          <p style="color:#22c55e;font-weight:700;font-size:18px;font-family:monospace;margin:0;">#${booking._id.toString().slice(-6).toUpperCase()}</p>
        </div>

        <div style="background:#1A1D24;border-radius:12px;padding:16px;margin-bottom:24px;">
          <p style="color:#F97316;font-weight:600;margin:0 0 8px;">📞 Owner Contact</p>
          <p style="color:#9CA3AF;margin:0;font-size:14px;">Vignesh Konda Bike Rentals<br>📧 vinodchintu70@gmail.com</p>
        </div>
      </div>
      <div style="background:#1A1D24;padding:16px;text-align:center;border-top:1px solid #2A2D35;">
        <p style="color:#6B7280;font-size:12px;margin:0;">© Vignesh Konda Bike Rentals, Hyderabad</p>
      </div>
    </div>`,
  })
}

// ── Password Reset Email ────────────────────────────────────────────────────
exports.sendPasswordResetEmail = async (email, resetUrl) => {
  await sendEmail({
    to: email,
    subject: 'Vignesh Konda Bike Rentals - Password Reset',
    html: `
    <div style="font-family:Inter,Arial,sans-serif;max-width:500px;margin:0 auto;background:#0F1115;color:#fff;padding:40px;border-radius:16px;">
      <h2 style="color:#3B82F6;">Vignesh Konda Bike Rentals</h2>
      <h3>Reset Your Password</h3>
      <p style="color:#9CA3AF;margin-bottom:24px;">Click the button below to reset your password. This link expires in 1 hour.</p>
      <a href="${resetUrl}" style="display:inline-block;background:linear-gradient(135deg,#3B82F6,#06B6D4);color:#fff;padding:14px 32px;border-radius:12px;text-decoration:none;font-weight:600;">Reset Password</a>
      <p style="color:#6B7280;font-size:12px;margin-top:24px;">If you didn't request this, please ignore this email.</p>
    </div>`,
  })
}
