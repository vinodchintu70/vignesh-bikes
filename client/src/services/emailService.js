const FORMSPREE_URL = 'https://formspree.io/f/mwvyrwlv'

export const OWNER_EMAIL = 'vinodchintu70@gmail.com'

export const sendBookingRequestEmail = async (bookingData) => {
  const {
    customerName, customerEmail, customerPhone,
    bikeName, bikeCategory, pricePerDay,
    startDate, endDate, totalDays,
    pickupTime, returnTime, pickupLocation,
    totalAmount, bookingId, notes,
  } = bookingData

  const pickupDate = new Date(startDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })
  const returnDate = new Date(endDate).toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' })

  const payload = {
    // Formspree fields
    email:    customerEmail,
    _subject: `🏍️ New Booking - ${bikeName} | ${customerName}`,
    _replyto: customerEmail,

    // Booking details — shown clearly in email
    '--- BOOKING ID':        bookingId || 'N/A',
    '--- CUSTOMER NAME':     customerName,
    '--- CUSTOMER PHONE':    customerPhone || 'Not provided',
    '--- CUSTOMER EMAIL':    customerEmail,
    '--- BIKE':              `${bikeName} (${bikeCategory || ''})`,
    '--- PRICE PER DAY':     `Rs.${pricePerDay}`,
    '--- PICKUP DATE':       pickupDate,
    '--- PICKUP TIME':       pickupTime,
    '--- RETURN DATE':       returnDate,
    '--- RETURN TIME':       returnTime,
    '--- PICKUP LOCATION':   pickupLocation,
    '--- TOTAL DAYS':        `${totalDays} day${totalDays > 1 ? 's' : ''}`,
    '--- TOTAL AMOUNT':      `Rs.${totalAmount}`,
    '--- PAYMENT':           'Cash at Pickup',
    '--- SPECIAL NOTES':     notes || 'None',
    '--- BOOKED AT':         new Date().toLocaleString('en-IN'),
  }

  try {
    const response = await fetch(FORMSPREE_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await response.json()

    if (response.ok) {
      console.log('✅ Email sent successfully')
      return { success: true }
    } else {
      console.error('❌ Formspree error:', result)
      return { success: false, error: result }
    }
  } catch (err) {
    console.error('❌ Network error:', err)
    return { success: false, error: err.message }
  }
}

export const sendBookingConfirmationToCustomer = async () => {
  return { success: true }
}
