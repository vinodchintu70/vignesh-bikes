// Keep Render server awake by pinging every 14 minutes
const BACKEND_URL = 'https://vignesh-bikes-api.onrender.com/api/health'

const keepAlive = () => {
  fetch(BACKEND_URL)
    .then(() => console.log('Server is awake'))
    .catch(() => console.log('Ping failed'))
}

// Ping every 14 minutes
setInterval(keepAlive, 14 * 60 * 1000)

export default keepAlive
