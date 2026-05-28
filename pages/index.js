import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const roles = [
    {
      id: 'customer',
      name: 'Customer',
      icon: '👟',
      description: 'Browse shoes, shop, and track orders',
      features: ['Browse shoes by size, color & price', 'Add to cart & wishlist', 'Place orders & track status', 'View order history'],
      color: 'from-blue-500 to-blue-600',
      bgHover: 'hover:border-blue-400',
      href: '/customer/login'
    },
    {
      id: 'attendant',
      name: 'Shop Attendant',
      icon: '🏪',
      description: 'Manage orders and update inventory',
      features: ['Process incoming orders', 'Update stock levels', 'Mark orders as dispatched', 'View sales summary'],
      color: 'from-green-500 to-green-600',
      bgHover: 'hover:border-green-400',
      href: '/attendant/login'
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: '👑',
      description: 'Full control over products, stores, and reports',
      features: ['Add/edit/remove products', 'Manage attendants & stores', 'View sales reports', 'Track overall inventory'],
      color: 'from-purple-500 to-purple-600',
      bgHover: 'hover:border-purple-400',
      href: '/admin/login'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 bg-black/30 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <span className="text-2xl">👟</span>
              <span className="text-white font-bold text-xl">ShoeStore</span>
            </div>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition">Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition">About</a>
              <a href="#" className="text-gray-300 hover:text-white transition">Contact</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
            <span className="text-yellow-400">⚡</span>
            <span className="text-white text-sm">Complete Shoe Management Platform</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Step Into
            <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              {" "}Style & Comfort
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12">
            Your all-in-one solution for browsing, selling, and managing footwear inventory. 
            Choose your role and get started.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-white">500+</div>
              <div className="text-sm text-gray-400">Shoe Styles</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">50+</div>
              <div className="text-sm text-gray-400">Brands</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">10k+</div>
              <div className="text-sm text-gray-400">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-white">24/7</div>
              <div className="text-sm text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-4">
          Choose Your Portal
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-2xl mx-auto">
          Select the portal that matches your role and access the relevant features
        </p>
        
        <div className="grid md:grid-cols-3 gap-8">
          {roles.map((role) => (
            <div
              key={role.id}
              className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl p-6 hover:bg-white/15 transition-all duration-300 cursor-pointer border border-white/10 ${role.bgHover} hover:scale-105 hover:shadow-2xl`}
              onClick={() => window.location.href = role.href}
            >
              {/* Icon */}
              <div className={`w-16 h-16 bg-gradient-to-r ${role.color} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:rotate-6 transition-transform duration-300`}>
                {role.icon}
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-2">
                {role.name}
              </h3>
              
              <p className="text-gray-300 mb-4 text-sm">
                {role.description}
              </p>
              
              {/* Features list */}
              <div className="space-y-2 mb-6">
                {role.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-gray-400 text-sm">
                    <span className="text-green-400">✓</span>
                    <span>{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={`w-full bg-gradient-to-r ${role.color} text-white py-3 rounded-xl font-semibold hover:opacity-90 transition-all duration-300 shadow-lg group-hover:shadow-xl`}>
                Access {role.name} Portal →
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-black/30 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Powerful Features
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto">
              Everything you need to manage your shoe store efficiently
            </p>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-white font-semibold mb-2">Smart Filters</h3>
              <p className="text-gray-400 text-sm">Search by size, color, price & gender</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition">
              <div className="text-5xl mb-4">🛒</div>
              <h3 className="text-white font-semibold mb-2">Easy Checkout</h3>
              <p className="text-gray-400 text-sm">Quick order placement & tracking</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition">
              <div className="text-5xl mb-4">📊</div>
              <h3 className="text-white font-semibold mb-2">Analytics</h3>
              <p className="text-gray-400 text-sm">Sales reports & inventory insights</p>
            </div>
            <div className="text-center p-6 bg-white/5 rounded-xl hover:bg-white/10 transition">
              <div className="text-5xl mb-4">🔒</div>
              <h3 className="text-white font-semibold mb-2">Secure Access</h3>
              <p className="text-gray-400 text-sm">Role-based permission system</p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <div className="bg-gradient-to-r from-purple-600/20 to-blue-600/20 rounded-3xl p-8 backdrop-blur-sm border border-white/10">
            <h2 className="text-3xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-gray-300 mb-6">
              Join hundreds of store owners managing their inventory efficiently
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <button 
                onClick={() => window.location.href = '/customer/login'}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Shop Now →
              </button>
              <button 
                onClick={() => window.location.href = '/admin/login'}
                className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition"
              >
                Admin Login →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-8 border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-gray-400 text-sm">© 2024 ShoeStore Platform. All rights reserved.</p>
          <div className="flex justify-center gap-6 mt-3">
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Privacy Policy</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Terms of Service</a>
            <a href="#" className="text-gray-500 hover:text-gray-300 text-sm">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  )
}