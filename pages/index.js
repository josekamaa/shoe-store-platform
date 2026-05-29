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
      color: 'blue',
      gradient: 'from-blue-500 to-cyan-500',
      bgHover: 'hover:border-blue-400',
      href: '/customer/login'
    },
    {
      id: 'attendant',
      name: 'Shop Attendant',
      icon: '🏪',
      description: 'Manage orders and update inventory',
      features: ['Process incoming orders', 'Update stock levels', 'Mark orders as dispatched', 'View sales summary'],
      color: 'green',
      gradient: 'from-emerald-500 to-teal-500',
      bgHover: 'hover:border-emerald-400',
      href: '/attendant/login'
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: '👑',
      description: 'Full control over products, stores, and reports',
      features: ['Add/edit/remove products', 'Manage attendants & stores', 'View sales reports', 'Track overall inventory'],
      color: 'purple',
      gradient: 'from-violet-500 to-purple-600',
      bgHover: 'hover:border-purple-400',
      href: '/admin/login'
    }
  ]

  if (!mounted) return null

  return (
    <div className="relative min-h-screen bg-gray-950">
      {/* Professional Background Image with Overlay */}
      <div 
        className="fixed inset-0 z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950/90 via-gray-900/80 to-gray-950/90 backdrop-blur-sm"></div>
      </div>

      {/* App Container */}
      <div className="relative z-10 min-h-screen">
        {/* Top Navigation - App Style */}
        <nav className="bg-black/50 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-2xl">👟</span>
                </div>
                <div>
                  <span className="text-white font-bold text-2xl tracking-tight">soul<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">hub</span></span>
                  <span className="hidden md:inline text-xs text-gray-400 ml-2">v2.0</span>
                </div>
              </div>
              <div className="hidden md:flex items-center space-x-8">
                <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition">Dashboard</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition">Analytics</a>
                <a href="#" className="text-gray-300 hover:text-white text-sm font-medium transition">Support</a>
                <button className="bg-white/10 hover:bg-white/20 px-4 py-2 rounded-lg text-sm font-medium transition">Contact Sales</button>
              </div>
              <button className="md:hidden text-white p-2 rounded-lg bg-white/10">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>

        {/* Hero Section - Clean & Professional */}
        <main className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-1.5 mb-6 border border-white/20">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-xs font-medium text-white">Enterprise Platform</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
              Step Into the Future of
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">Footwear Management</span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed">
              SoulHub combines powerful inventory tools, seamless shopping, and real-time analytics in one elegant platform. Trusted by leading shoe retailers worldwide.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mt-8">
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold transition shadow-lg hover:shadow-xl">
                Request Demo
              </button>
              <button className="bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-6 py-3 rounded-xl font-semibold transition">
                Watch Tour
              </button>
            </div>
          </div>

          {/* Stats Cards - App Dashboard Style */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {[
              { label: 'Active Stores', value: '156', trend: '+12%', icon: '🏬', color: 'blue' },
              { label: 'Monthly Orders', value: '12.4K', trend: '+8%', icon: '📦', color: 'green' },
              { label: 'Inventory Items', value: '48.2K', trend: '+3%', icon: '👟', color: 'purple' },
              { label: 'Revenue (MTD)', value: '$284K', trend: '+22%', icon: '💰', color: 'pink' }
            ].map((stat, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-5 hover:bg-white/10 transition">
                <div className="flex justify-between items-start mb-3">
                  <span className="text-3xl">{stat.icon}</span>
                  <span className="text-xs font-semibold text-green-400 bg-green-400/10 px-2 py-0.5 rounded-full">{stat.trend}</span>
                </div>
                <div className="text-3xl font-bold text-white">{stat.value}</div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Role Selection Cards - Core Feature */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-white">Choose Your Portal</h2>
              <p className="text-gray-400 mt-2">Secure access tailored to your role</p>
            </div>
            <div className="grid md:grid-cols-3 gap-8">
              {roles.map((role) => (
                <div
                  key={role.id}
                  className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-lg rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl cursor-pointer overflow-hidden"
                  onClick={() => window.location.href = role.href}
                >
                  <div className="p-6">
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-r ${role.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition`}>
                      {role.icon}
                    </div>
                    <h3 className="text-xl font-bold text-white mb-2">{role.name}</h3>
                    <p className="text-gray-400 text-sm mb-4">{role.description}</p>
                    <div className="space-y-2 mb-6">
                      {role.features.slice(0, 3).map((feat, idx) => (
                        <div key={idx} className="flex items-center gap-2 text-sm text-gray-300">
                          <span className="text-green-400">✓</span>
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                    <button className={`w-full py-2.5 rounded-lg font-medium text-white bg-gradient-to-r ${role.gradient} opacity-90 hover:opacity-100 transition`}>
                      Access Portal →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Feature Grid - Detailed & Professional */}
          <div className="bg-white/5 backdrop-blur-md rounded-3xl border border-white/10 p-8 mb-16">
            <div className="text-center mb-10">
              <h2 className="text-2xl font-bold text-white">Everything you need to scale</h2>
              <p className="text-gray-400 mt-2">Powerful features built for modern shoe retailers</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: 'Multi-store Inventory', desc: 'Sync stock across all locations in real-time', icon: '🏪' },
                { title: 'Smart Analytics', desc: 'Sales trends, customer insights, and forecasts', icon: '📊' },
                { title: 'Role-based Access', desc: 'Customer, attendant, admin – each with tailored views', icon: '🔐' },
                { title: 'Order Fulfillment', desc: 'Automated tracking and status updates', icon: '🚚' },
                { title: 'Wishlist & Cart', desc: 'Seamless shopping experience', icon: '❤️' },
                { title: 'API First', desc: 'Integrate with your existing tools', icon: '⚙️' }
              ].map((feat, i) => (
                <div key={i} className="flex gap-4 p-4 rounded-xl hover:bg-white/10 transition">
                  <div className="text-3xl">{feat.icon}</div>
                  <div>
                    <h3 className="text-white font-semibold">{feat.title}</h3>
                    <p className="text-gray-400 text-sm">{feat.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA - Final Push */}
          <div className="bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-3xl p-10 text-center border border-white/20">
            <h2 className="text-3xl font-bold text-white mb-3">Ready to transform your shoe business?</h2>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">Join hundreds of retailers using SoulHub to manage orders, inventory, and growth.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <button className="bg-white text-gray-900 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transition">Get Started Free</button>
              <button className="bg-white/10 backdrop-blur border border-white/20 text-white px-6 py-3 rounded-xl font-semibold hover:bg-white/20 transition">Contact Sales</button>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-white/10 mt-16 py-8 text-center text-gray-500 text-sm">
          <div className="max-w-7xl mx-auto px-6">
            <p>© 2025 SoulHub, Inc. All rights reserved. Designed for modern footwear enterprises.</p>
            <div className="flex justify-center gap-6 mt-3">
              <a href="#" className="hover:text-white transition">Privacy</a>
              <a href="#" className="hover:text-white transition">Terms</a>
              <a href="#" className="hover:text-white transition">Security</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}