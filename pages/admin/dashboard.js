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
    setIsMobile(window.innerWidth < 768)
    if (window.innerWidth >= 768) {
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
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 bg-gray-800/95 backdrop-blur-md z-50 px-4 py-3 flex justify-between items-center border-b border-gray-700">
        <div className="flex items-center gap-2">
          <span className="text-2xl">👑</span>
          <span className="text-white font-bold">ShoeStore Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="text-white text-2xl"
        >
          {sidebarOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full bg-gray-800/95 backdrop-blur-md border-r border-gray-700 z-50
        transition-all duration-300 transform
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
        md:translate-x-0
        w-72 md:w-64
      `}>
        {/* Desktop Logo */}
        <div className="hidden md:block p-6 border-b border-gray-700">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-3xl">👑</span>
            <h1 className="text-2xl font-bold text-white">ShoeStore</h1>
          </div>
          <p className="text-gray-400 text-sm">Admin Panel</p>
        </div>

        {/* Mobile Logo */}
        <div className="md:hidden p-6 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-2xl">👑</span>
                <h1 className="text-xl font-bold text-white">ShoeStore</h1>
              </div>
              <p className="text-gray-400 text-xs">Admin Panel</p>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 text-xl"
            >
              ✕
            </button>
          </div>
        </div>
        
        {/* Navigation */}
        <nav className="mt-6 px-3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id)
                setSidebarOpen(false)
              }}
              className={`
                w-full text-left px-4 py-3 rounded-xl transition-all duration-200 mb-1
                flex items-center gap-3
                ${activeTab === tab.id
                  ? `bg-gradient-to-r from-${tab.color}-600 to-${tab.color}-700 text-white shadow-lg`
                  : 'text-gray-300 hover:bg-gray-700'
                }
              `}
            >
              <span className="text-xl">{tab.icon}</span>
              <span className="font-medium">{tab.name}</span>
              {activeTab === tab.id && (
                <span className="ml-auto text-xs">✓</span>
              )}
            </button>
          ))}
          
          <div className="border-t border-gray-700 my-4"></div>
          
          <button
            onClick={handleLogout}
            className="w-full text-left px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-all duration-200 flex items-center gap-3"
          >
            <span className="text-xl">🚪</span>
            <span className="font-medium">Logout</span>
          </button>
        </nav>

        {/* User Info Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 flex items-center justify-center">
              <span className="text-white font-bold">
                {adminName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-white text-sm font-medium">{adminName}</p>
              <p className="text-gray-400 text-xs">Administrator</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="md:ml-64 min-h-screen">
        {/* Desktop Header */}
        <div className="hidden md:block bg-gray-800/50 backdrop-blur-sm border-b border-gray-700 px-8 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">
                {tabs.find(t => t.id === activeTab)?.name}
              </h2>
              <p className="text-gray-400 text-sm mt-1">
                Welcome back, {adminName}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 bg-gray-700/50 rounded-full px-4 py-2">
                <span className="text-purple-400">👑</span>
                <span className="text-white text-sm">Admin</span>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header Spacer */}
        <div className="h-16 md:hidden"></div>

        {/* Content */}
        <div className="p-4 md:p-8">
          {activeTab === 'products' && <ProductsPanel />}
          {activeTab === 'orders' && <OrdersPanel />}
          {activeTab === 'users' && <UsersPanel />}
          {activeTab === 'reports' && <ReportsPanel />}
        </div>
      </div>
    </div>
  )
}