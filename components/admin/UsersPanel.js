import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function UsersPanel() {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    const { data } = await supabase
      .from('user_profiles')
      .select('*')
      .order('created_at', { ascending: false })
    
    setUsers(data || [])
  }

  const updateRole = async (userId, newRole) => {
    await supabase.from('user_profiles').update({ role: newRole }).eq('id', userId)
    fetchUsers()
  }

  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h3 className="text-xl font-bold text-white mb-4">User Management</h3>
      <div className="space-y-3">
        {users.map((user) => (
          <div key={user.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
            <div>
              <p className="text-white font-semibold">{user.email}</p>
              <p className="text-gray-400 text-sm">Role: {user.role}</p>
            </div>
            <select
              value={user.role}
              onChange={(e) => updateRole(user.id, e.target.value)}
              className="bg-gray-600 text-white px-3 py-1 rounded"
            >
              <option value="customer">Customer</option>
              <option value="attendant">Attendant</option>
              <option value="admin">Admin</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  )
}
