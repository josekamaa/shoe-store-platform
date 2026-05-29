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
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    checkAdmin()
    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const handleResize = () => {
    const mobile = window.innerWidth < 768
    setIsMobile(mobile)
    if (!mobile) {
      setSidebarOpen(false)
    }
  }

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

    setAdminName(profile.full_name?.split(' ')[0] || 'Admin')
    setLoading(false)
  }

  const handleLogout = async () => {
    await supabase.auth.signOut()
    window.location.href = '/admin/login'
  }

  const tabs = [
    { id: 'products', name: 'Products', icon: '👟', color: 'purple' },
    { id: 'orders', name: 'Orders', icon: '📦', color: 'blue' },
    { id: 'users', name: 'Users', icon: '👥', color: 'green' },
    { id: 'reports', name: 'Reports', icon: '📊', color: 'orange' }
  ]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-3 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
          <p className="text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-900/95 backdrop-blur-md z-50 px-4 py-3 flex justify-between items-center border-b border-gray-800">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
            <span className="text-white text-sm">👑</span>
          </div>
          <span className="text-white font-semibold">ShoeStore</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl w-8 h-8 flex items-center justify-center rounded-lg bg-gray-800"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-900 border-r border-gray-800 z-50
        transition-all duration-300 ease-in-out transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        w-64
      `}>
        {/* Logo Section */}
        <div className="p-5 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
              <span className="text-white text-xl">👑</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-white">ShoeStore</h1>
              <p className="text-gray-500 text-xs">Admin Panel</p>
            </div>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-4 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full text-left px-3 py-2.5 rounded-lg transition-all duration-200 mb-1
                flex items-center gap-3
                ${activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600/20 to-${tab.color}-700/20 text-${tab.color}-400 border-r-2 border-${tab.color}-500`
                  : 'text-gray-400 hover:text-white hover:bg-gray-800'
                }
              `}
            >
              <span className="text-lg">{tab.icon}</span>
              <span className="text-sm font-medium">{tab.name}</span>
              {activeTab === tab.id && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </button>
          ))}
          
          <div className="border-t border-gray-800 my-3"></div>
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-3 py-2.5 rounded-lg text-red-400 hover:bg-red-500/10 transition-all duration-200 flex items-center gap-3"
          >
            <span className="text-lg">🚪</span>
            <span className="text-sm font-medium">Logout</span>
          </button>
        </nav>

        {/* User Info Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800 bg-gray-900/95">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
              <span className="text-white text-sm font-bold">
                {adminName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-sm font-medium truncate">{adminName}</p>
              <p className="text-gray-500 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen">
        {/* Desktop Header */}
        <div className="hidden md:block bg-gray-900/50 backdrop-blur-sm border-b border-gray-800 px-6 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-xl font-bold text-white">
                {tabs.find(t => t.id === activeTab)?.name}
              </h2>
              <p className="text-gray-500 text-sm mt-0.5">
                Welcome back, {adminName}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-2 bg-gray-800 rounded-full px-3 py-1.5">
                <span className="text-purple-400 text-sm">👑</span>
                <span className="text-gray-300 text-xs">Admin Access</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header Spacer */}
        <div className="h-14 md:hidden"></div>

        {/* Content Area - Optimized padding */}
        <div className="p-3 md:p-5 lg:p-6">
          {activeTab === 'products' && <ProductsPanel />}
          {activeTab === 'orders' && <OrdersPanel />}
          {activeTab === 'users' && <UsersPanel />}
          {activeTab === 'reports' && <ReportsPanel />}
        </div>
      </div>
    </div>
  )
}