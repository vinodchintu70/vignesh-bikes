import { createContext, useContext, useState, useEffect } from 'react'
import { authAPI } from '../services/api'
import toast from 'react-hot-toast'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      authAPI.getMe()
        .then(res => setUser(res.data.user))
        .catch(() => {
          localStorage.removeItem('token')
          setUser(null)
        })
        .finally(() => setLoading(false))
    } else {
      setLoading(false)
    }
  }, [])

  const register = async (data) => {
    const res = await authAPI.register(data)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    toast.success(`Welcome, ${res.data.user.name.split(' ')[0]}! Account created 🎉`)
    return res.data
  }

  const login = async (data) => {
    const res = await authAPI.login(data)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    toast.success('Login successful!')
    return res.data
  }

  const googleLogin = async (token) => {
    const res = await authAPI.googleLogin(token)
    localStorage.setItem('token', res.data.token)
    setUser(res.data.user)
    toast.success('Login successful!')
    return res.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setUser(null)
    toast.success('Logged out successfully')
  }

  const updateUser = async (data) => {
    const res = await authAPI.updateProfile(data)
    setUser(res.data.user)
    toast.success('Profile updated successfully')
    return res.data
  }

  const isAuthenticated = !!user
  const isAdmin = user?.role === 'admin'
  const isOwner = user?.role === 'owner' || user?.role === 'admin'
  const isCustomer = user?.role === 'customer'

  return (
    <AuthContext.Provider value={{
      user, loading,
      isAuthenticated, isAdmin, isOwner, isCustomer,
      register, login, googleLogin, logout, updateUser,
    }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
