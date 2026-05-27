import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'
import ProductsPanel from '../../components/admin/ProductsPanel'
import OrdersPanel from '../../components/admin/OrdersPanel'
import UsersPanel from '../../components/admin/UsersPanel'
import ReportsPanel from '../../components/admin/ReportsPanel'

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('products')
  const [loading, setLoading] = useState(true)
  const [adminName, setAdminName] = useState('')

  useEffect(() => {
    checkAdmin()
  }, [])

  const checkAdmin = async () => {
    const { data: { user } } = await supabase.auth.getUser()
    
    if (!user) {
      window.location.href = '/admin/login'
      return
    }

    const { data: profile } = await supabase
      .from('user_profiles')
      .select('role, full_name')
      .eq('id', user.id)
      .single()

    if (profile?.role !== 'admin') {
      await supabase.auth.signOut()
      window.location.href = '/admin/login'
      return
    }

    setAdminName(profile.full_name || 'Admin')
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  const tabs = [
    { id: 'products', name: '👟 Products', icon: '👟' },
    { id: 'orders', name: '📦 Orders', icon: '📦' },
    { id: 'users', name: '👥 Users', icon: '👥' },
    { id: 'reports', name: '📊 Reports', icon: '📊' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-white">👑 ShoeStore</h1>
          <p className="text-gray-400 text-sm mt-1">Admin Panel</p>
        </div>
        
        <nav className="mt-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full text-left px-6 py-3 transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-purple-600 text-white border-r-4 border-purple-400'
                  : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="mr-3">{tab.icon}</span>
              {tab.name}
            </button>
          ))}
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-6 py-3 text-red-400 hover:bg-gray-700 transition-all duration-200 mt-8"
          >
            🚪 Logout
          </button>
        </nav>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white">
              {tabs.find(t => t.id === activeTab)?.name}
            </h2>
            <p className="text-gray-400 mt-1">Welcome back, {adminName}</p>
          </div>
        </div>

        {activeTab === 'products' && <ProductsPanel />}
        {activeTab === 'orders' && <OrdersPanel />}
        {activeTab === 'users' && <UsersPanel />}
        {activeTab === 'reports' && <ReportsPanel />}
      </div>
    </div>
  )
}
