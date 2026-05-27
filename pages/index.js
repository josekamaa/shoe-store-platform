import { useState } from 'react'

export default function Home() {
  const [selectedRole, setSelectedRole] = useState(null)

  const roles = [
    {
      id: 'customer',
      name: '👟 Customer',
      description: 'Browse shoes, shop, and track orders',
      color: 'bg-blue-500',
      href: '/customer/login'
    },
    {
      id: 'attendant',
      name: '🏪 Shop Attendant',
      description: 'Manage orders and update inventory',
      color: 'bg-green-500',
      href: '/attendant/login'
    },
    {
      id: 'admin',
      name: '👑 Admin',
      description: 'Full control over products, stores, and reports',
      color: 'bg-purple-500',
      href: '/admin/login'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 to-purple-600/20 blur-3xl"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
            Step Into
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {" "}Style
            </span>
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Your complete shoe store management platform. Browse, sell, and manage inventory all in one place.
          </p>
          
          {/* Stats */}
          <div className="flex justify-center gap-8 mb-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Shoe Styles</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-white">10k+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          Choose Your Portal
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className="group relative bg-white/10 backdrop-blur-lg rounded-2xl p-8 hover:bg-white/20 transition-all duration-300 cursor-pointer border border-white/20 hover:scale-105"
              onClick={() => window.location.href = role.href}
            >
              {/* Role Icon */}
              <div className={`w-20 h-20 ${role.color} rounded-2xl flex items-center justify-center text-3xl mb-6 mx-auto shadow-lg`}>
                {role.name.split(' ')[0]}
              </div>
              
              <h3 className="text-2xl font-bold text-white text-center mb-3">
                {role.name}
              </h3>
              
              <p className="text-gray-300 text-center mb-6">
                {role.description}
              </p>
              
              <button className={`w-full ${role.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300`}>
                Access Portal →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-black/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            Everything You Need
          </h2>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-4xl mb-3">🔍</div>
              <h3 className="text-white font-semibold mb-2">Smart Filters</h3>
              <p className="text-gray-400 text-sm">Search by size, color, price & gender</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🛒</div>
              <h3 className="text-white font-semibold mb-2">Easy Checkout</h3>
              <p className="text-gray-400 text-sm">Quick order placement & tracking</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">📊</div>
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">Sales reports & inventory insights</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-3">🔒</div>
              <h3 className="text-white font-semibold mb-2">Secure</h3>
              <p className="text-gray-400 text-sm">Role-based access control</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center py-8 text-gray-400 text-sm">
        <p>© 2024 Shoe Store Platform. All rights reserved.</p>
      </footer>
    </div>
  )
}