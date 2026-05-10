import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FiSearch, FiToggleLeft, FiToggleRight, FiTrash2 } from 'react-icons/fi'
import { Helmet } from 'react-helmet-async'
import { adminAPI } from '../../services/api'
import toast from 'react-hot-toast'

export default function AdminUsers() {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    adminAPI.getUsers().then(({ data }) => setUsers(data.users || mockUsers)).catch(() => setUsers(mockUsers)).finally(() => setLoading(false))
  }, [])

  const toggleStatus = async (id, current) => {
    try {
      await adminAPI.toggleUserStatus(id)
      setUsers(prev => prev.map(u => u._id === id ? { ...u, isActive: !current } : u))
      toast.success(`User ${!current ? 'activated' : 'deactivated'}`)
    } catch { toast.error('Failed to update user status') }
  }

  const filtered = users.filter(u => u.name?.toLowerCase().includes(search.toLowerCase()) || u.email?.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <Helmet><title>Manage Users - Admin</title></Helmet>
      <div className="space-y-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h2 className="font-display font-bold text-2xl text-white">Manage Users</h2>
          <p className="text-gray-400 mt-1">{users.length} registered users</p>
        </motion.div>

        <div className="relative max-w-sm">
          <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
          <input type="text" placeholder="Search users..." value={search} onChange={(e) => setSearch(e.target.value)} className="input-field pl-11" />
        </div>

        <div className="card overflow-hidden">
          <div className="table-responsive">
            <table className="w-full">
              <thead>
                <tr className="border-b border-dark-border">
                  {['User', 'Email', 'Role', 'Joined', 'Status', 'Actions'].map(h => (
                    <th key={h} className="text-left text-gray-400 text-xs font-medium py-3 px-4">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  [...Array(5)].map((_, i) => (
                    <tr key={i}><td colSpan={6} className="py-3 px-4"><div className="h-10 skeleton rounded-lg" /></td></tr>
                  ))
                ) : filtered.map((user, i) => (
                  <motion.tr key={user._id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.04 }} className="border-b border-dark-border/50 hover:bg-dark-hover transition-colors">
                    <td className="py-4 px-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center text-primary font-bold text-sm overflow-hidden flex-shrink-0">
                          {user.avatar ? <img src={user.avatar} alt="" className="w-full h-full object-cover" /> : user.name?.charAt(0)}
                        </div>
                        <span className="text-white text-sm font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{user.email}</td>
                    <td className="py-4 px-4">
                      <span className={`badge text-xs capitalize ${user.role === 'admin' ? 'bg-accent/20 text-accent' : user.role === 'owner' ? 'bg-secondary/20 text-secondary' : 'bg-primary/20 text-primary'}`}>{user.role}</span>
                    </td>
                    <td className="py-4 px-4 text-gray-400 text-sm">{new Date(user.createdAt).toLocaleDateString()}</td>
                    <td className="py-4 px-4">
                      <span className={`badge text-xs ${user.isActive !== false ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                        {user.isActive !== false ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="py-4 px-4">
                      <button onClick={() => toggleStatus(user._id, user.isActive !== false)} className="text-gray-400 hover:text-primary transition-colors">
                        {user.isActive !== false ? <FiToggleRight size={20} className="text-green-400" /> : <FiToggleLeft size={20} />}
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

const mockUsers = [
  { _id: 'u1', name: 'Arjun Sharma', email: 'arjun@example.com', role: 'customer', createdAt: '2024-01-15', isActive: true },
  { _id: 'u2', name: 'Priya Patel', email: 'priya@example.com', role: 'owner', createdAt: '2024-01-20', isActive: true },
  { _id: 'u3', name: 'Rahul Verma', email: 'rahul@example.com', role: 'customer', createdAt: '2024-02-01', isActive: false },
  { _id: 'u4', name: 'Sneha Reddy', email: 'sneha@example.com', role: 'owner', createdAt: '2024-02-10', isActive: true },
]
