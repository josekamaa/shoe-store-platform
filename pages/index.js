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
      color: 'from-sky-500 to-blue-600',
      bgHover: 'hover:border-sky-400',
      href: '/customer/login'
    },
    {
      id: 'attendant',
      name: 'Shop Attendant',
      icon: '🏪',
      description: 'Manage orders and update inventory',
      features: ['Process incoming orders', 'Update stock levels', 'Mark orders as dispatched', 'View sales summary'],
      color: 'from-emerald-500 to-teal-600',
      bgHover: 'hover:border-emerald-400',
      href: '/attendant/login'
    },
    {
      id: 'admin',
      name: 'Administrator',
      icon: '👑',
      description: 'Full control over products, stores, and reports',
      features: ['Add/edit/remove products', 'Manage attendants & stores', 'View sales reports', 'Track overall inventory'],
      color: 'from-violet-500 to-purple-600',
      bgHover: 'hover:border-violet-400',
      href: '/admin/login'
    }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-gradient-to-r from-sky-600/20 to-blue-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-gradient-to-r from-violet-600/20 to-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl animate-pulse delay-1000"></div>
        
        {/* Floating shoe icons background */}
        <div className="absolute top-1/4 left-1/4 text-7xl opacity-5 animate-float">👟</div>
        <div className="absolute bottom-1/4 right-1/4 text-8xl opacity-5 animate-float-delayed">👞</div>
        <div className="absolute top-1/2 right-1/3 text-6xl opacity-5 animate-float-slow">👠</div>
      </div>

      {/* Navigation Bar */}
      <nav className="relative z-10 bg-black/40 backdrop-blur-xl border-b border-white/10 sticky top-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3 group cursor-pointer">
              <div className="relative">
                <span className="text-3xl filter drop-shadow-glow transition-transform group-hover:scale-110 inline-block">👟</span>
                <span className="absolute -top-1 -right-2 text-xs animate-ping-slow">✨</span>
              </div>
              <div>
                <span className="text-white font-black text-2xl tracking-tight">
                  soul<span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">hub</span>
                </span>
                <span className="text-[10px] text-gray-400 block -mt-1">step into expression</span>
              </div>
            </div>
            <div className="hidden md:flex space-x-6">
              {['Home', 'Collection', 'Stores', 'Community', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-gray-300 hover:text-white transition-all duration-300 text-sm font-medium hover:scale-105">
                  {item}
                </a>
              ))}
            </div>
            <button className="md:hidden text-white p-2 rounded-lg bg-white/10">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-5 py-2 mb-8 animate-in slide-in-from-top-5 fade-in duration-700">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            <span className="text-white text-sm font-medium">Live Inventory System • 24/7 Access</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white mb-6 leading-tight animate-in slide-in-from-bottom-5 fade-in duration-700">
            Find Your
            <span className="bg-gradient-to-r from-sky-400 via-violet-400 to-pink-400 bg-clip-text text-transparent relative">
              {" "}Perfect Stride
              <svg className="absolute -bottom-3 left-0 w-full h-2" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 4 Q25 8 50 4 T100 4 T150 4 T200 4" stroke="url(#gradient)" fill="none" strokeWidth="2"/>
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#38bdf8"/>
                    <stop offset="100%" stopColor="#f472b6"/>
                  </linearGradient>
                </defs>
              </svg>
            </span>
          </h1>
          
          <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-12 animate-in slide-in-from-bottom-5 fade-in delay-200 duration-700">
            SoulHub brings together premium footwear, seamless management, and authentic style.
            Choose your portal and step into a smarter way to shop or sell.
          </p>
          
          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-20 animate-in slide-in-from-bottom-5 fade-in delay-300 duration-700">
            {[
              { value: "800+", label: "Shoe Styles", icon: "👟" },
              { value: "60+", label: "Premium Brands", icon: "🏷️" },
              { value: "25k+", label: "Happy Customers", icon: "😊" },
              { value: "Same Day", label: "Shipping", icon: "🚚" }
            ].map((stat, idx) => (
              <div key={idx} className="text-center group">
                <div className="text-4xl mb-2 opacity-70 group-hover:opacity-100 transition-all group-hover:scale-110">
                  {stat.icon}
                </div>
                <div className="text-4xl font-black text-white bg-gradient-to-br from-white to-gray-300 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Role Selection Cards */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Choose Your <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Portal</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Tailored experiences for every role in the soulhub ecosystem
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 perspective-1000">
          {roles.map((role, idx) => (
            <div
              key={role.id}
              className={`group relative bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl rounded-2xl p-7 transition-all duration-500 cursor-pointer border border-white/10 ${role.bgHover} hover:scale-105 hover:-translate-y-2 hover:shadow-2xl hover:shadow-${role.color.split(' ')[1]}/20 animate-in fade-in slide-in-from-bottom-5 duration-700`}
              style={{ animationDelay: `${idx * 100}ms` }}
              onClick={() => window.location.href = role.href}
            >
              {/* Glow effect on hover */}
              <div className={`absolute inset-0 bg-gradient-to-r ${role.color} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-500 blur-xl`}></div>
              
              {/* Icon with animated background */}
              <div className={`relative w-20 h-20 bg-gradient-to-r ${role.color} rounded-2xl flex items-center justify-center text-4xl mb-6 shadow-lg group-hover:rotate-6 group-hover:scale-110 transition-all duration-500`}>
                {role.icon}
                <div className="absolute inset-0 rounded-2xl bg-white/20 animate-pulse-slow"></div>
              </div>
              
              <h3 className="text-2xl font-black text-white mb-2">
                {role.name}
              </h3>
              
              <p className="text-gray-300 mb-5 text-sm leading-relaxed">
                {role.description}
              </p>
              
              {/* Features list */}
              <div className="space-y-2.5 mb-7">
                {role.features.map((feature, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2.5 text-gray-300 text-sm group/feature">
                    <div className={`w-5 h-5 rounded-full bg-gradient-to-r ${role.color} flex items-center justify-center text-white text-xs font-bold`}>
                      ✓
                    </div>
                    <span className="group-hover/feature:text-white transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
              
              <button className={`w-full bg-gradient-to-r ${role.color} text-white py-3.5 rounded-xl font-bold transition-all duration-300 shadow-lg group-hover:shadow-xl hover:scale-[1.02] active:scale-95`}>
                Access {role.name} Portal
                <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div className="relative z-10 bg-gradient-to-b from-black/40 via-black/20 to-transparent py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Powered for <span className="bg-gradient-to-r from-sky-400 to-emerald-400 bg-clip-text text-transparent">Performance</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Everything you need to manage, sell, and discover footwear like never before
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎯", title: "Smart Discovery", desc: "AI-powered size & style matching", color: "from-sky-500 to-blue-500" },
              { icon: "🛍️", title: "Seamless Checkout", desc: "One-click orders with live tracking", color: "from-emerald-500 to-teal-500" },
              { icon: "📈", title: "Live Analytics", desc: "Real-time sales & inventory insights", color: "from-violet-500 to-purple-500" },
              { icon: "🛡️", title: "Bank-Grade Security", desc: "Role-based encrypted access", color: "from-rose-500 to-pink-500" }
            ].map((feature, idx) => (
              <div key={idx} className="group text-center p-7 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:bg-white/10 transition-all duration-500 hover:-translate-y-1 animate-in fade-in slide-in-from-bottom-5">
                <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center text-3xl mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-black text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="relative z-10 py-20">
        <div className="max-w-5xl mx-auto px-4">
          <div className="relative bg-gradient-to-r from-sky-600/20 via-violet-600/20 to-purple-600/20 rounded-3xl p-10 backdrop-blur-xl border border-white/20 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute top-0 right-0 text-9xl opacity-5 animate-float">👟</div>
            <div className="absolute bottom-0 left-0 text-8xl opacity-5 animate-float-delayed">👞</div>
            
            <div className="relative text-center">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Ready to <span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">Elevate</span> Your Experience?
              </h2>
              <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
                Join thousands of souls who've found their perfect stride with SoulHub
              </p>
              <div className="flex flex-wrap gap-5 justify-center">
                <button 
                  onClick={() => window.location.href = '/customer/login'}
                  className="group bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-600 hover:to-blue-700 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 active:scale-95"
                >
                  Start Shopping
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                </button>
                <button 
                  onClick={() => window.location.href = '/admin/login'}
                  className="group bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Admin Dashboard
                  <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">⚡</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 text-center py-12 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-2xl">👟</span>
              <span className="text-white font-black text-xl">soul<span className="bg-gradient-to-r from-sky-400 to-violet-400 bg-clip-text text-transparent">hub</span></span>
            </div>
            <div className="flex gap-8">
              {['About', 'Careers', 'Press', 'Sustainability'].map((item) => (
                <a key={item} href="#" className="text-gray-400 hover:text-white text-sm transition-colors">
                  {item}
                </a>
              ))}
            </div>
            <div className="flex gap-4">
              {['𝕏', '📘', '📸', '🎵'].map((social, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-white text-xl transition-all hover:scale-110">
                  {social}
                </a>
              ))}
            </div>
          </div>
          <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center gap-6 text-xs text-gray-500">
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Service</a>
            <a href="#" className="hover:text-gray-300">Cookie Policy</a>
            <span>© 2024 SoulHub. All rights reserved.</span>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(15px) rotate(-3deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(4deg); }
        }
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        .animate-float-delayed {
          animation: float-delayed 10s ease-in-out infinite;
        }
        .animate-float-slow {
          animation: float-slow 12s ease-in-out infinite;
        }
        .animate-ping-slow {
          animation: ping 2s cubic-bezier(0, 0, 0.2, 1) infinite;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </div>
  )
}