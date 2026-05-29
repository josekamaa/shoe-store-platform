import { useState, useEffect } from 'react'

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const roles = [
    {
      id: 'customer',
      name: 'Customer Portal',
      icon: '🛍️',
      description: 'Shop premium sneakers and track your orders effortlessly.',
      features: [
        'Browse latest sneaker drops',
        'Add to cart & wishlist',
        'Track orders in real-time',
        'Secure checkout experience'
      ],
      gradient: 'from-orange-500 to-red-500',
      href: '/customer/login'
    },
    {
      id: 'attendant',
      name: 'Store Staff',
      icon: '🏪',
      description: 'Manage customer orders and store inventory seamlessly.',
      features: [
        'Update stock instantly',
        'Process customer orders',
        'Dispatch deliveries',
        'Monitor sales performance'
      ],
      gradient: 'from-lime-400 to-green-500',
      href: '/attendant/login'
    },
    {
      id: 'admin',
      name: 'Admin Control',
      icon: '👑',
      description: 'Complete control over products, stores, and analytics.',
      features: [
        'Manage all products',
        'Control users & stores',
        'Track business reports',
        'Monitor inventory levels'
      ],
      gradient: 'from-yellow-400 to-orange-500',
      href: '/admin/login'
    }
  ]

  const featuredShoes = [
    {
      name: 'Air Max Pulse',
      price: '$120',
      image:
        'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Jordan Retro',
      price: '$180',
      image:
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?q=80&w=1200&auto=format&fit=crop'
    },
    {
      name: 'Street Runner X',
      price: '$145',
      image:
        'https://images.unsplash.com/photo-1543508282-6319a3e2621f?q=80&w=1200&auto=format&fit=crop'
    }
  ]

  const categories = [
    { title: 'Men', icon: '👞' },
    { title: 'Women', icon: '👠' },
    { title: 'Sneakers', icon: '👟' },
    { title: 'Sports', icon: '⚽' }
  ]

  if (!mounted) return null

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background */}
      <div
        className="fixed inset-0 z-0"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1515955656352-a1fa3ffcd111?q=80&w=1920&auto=format&fit=crop")',
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/80"></div>
      </div>

      <div className="relative z-10">
        {/* NAVBAR */}
        <nav className="sticky top-0 z-50 bg-black/70 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="flex justify-between items-center h-20">
              {/* Logo */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-orange-500 flex items-center justify-center shadow-2xl">
                  <span className="text-2xl">👟</span>
                </div>

                <div>
                  <h1 className="text-3xl font-black tracking-tight">
                    SOUL<span className="text-orange-500">HUB</span>
                  </h1>
                  <p className="text-xs text-gray-400 uppercase tracking-[0.3em]">
                    Premium Footwear
                  </p>
                </div>
              </div>

              {/* Menu */}
              <div className="hidden md:flex items-center gap-8">
                <a href="#" className="hover:text-orange-400 transition font-medium">
                  New Arrivals
                </a>

                <a href="#" className="hover:text-orange-400 transition font-medium">
                  Men
                </a>

                <a href="#" className="hover:text-orange-400 transition font-medium">
                  Women
                </a>

                <a href="#" className="hover:text-orange-400 transition font-medium">
                  Sneakers
                </a>

                <a href="#" className="hover:text-orange-400 transition font-medium">
                  Sale
                </a>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <button className="hidden md:flex bg-white/10 hover:bg-white/20 transition px-4 py-2 rounded-full">
                  ❤️ Wishlist
                </button>

                <button className="bg-orange-500 hover:bg-orange-600 transition px-5 py-2 rounded-full font-semibold text-black">
                  🛒 Cart
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* HERO */}
        <section className="relative max-w-7xl mx-auto px-6 lg:px-8 pt-20 pb-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center bg-orange-500 text-black px-5 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-8">
                NEW DROP 2026
              </div>

              <h1 className="text-6xl lg:text-8xl font-black leading-none tracking-tight mb-8">
                FIND YOUR
                <span className="block text-orange-500">
                  PERFECT STEP
                </span>
              </h1>

              <p className="text-xl text-gray-300 leading-relaxed max-w-xl mb-10">
                Premium sneakers, streetwear classics, and performance footwear
                crafted for every lifestyle.
              </p>

              <div className="flex flex-wrap gap-5">
                <button className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-full font-bold text-lg transition hover:scale-105">
                  Shop Collection
                </button>

                <button className="border border-white/20 hover:bg-white/10 px-8 py-4 rounded-full font-semibold transition">
                  Explore Sneakers
                </button>
              </div>

              {/* Brands */}
              <div className="mt-16">
                <p className="text-gray-500 uppercase text-sm tracking-[0.3em] mb-5">
                  Trusted Brands
                </p>

                <div className="flex flex-wrap gap-8 text-2xl font-black text-gray-400">
                  <span>Nike</span>
                  <span>Adidas</span>
                  <span>Puma</span>
                  <span>Jordan</span>
                  <span>NB</span>
                </div>
              </div>
            </div>

            {/* Right */}
            <div className="relative flex justify-center">
              <img
                src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1200&auto=format&fit=crop"
                alt="Featured Sneaker"
                className="w-full max-w-2xl rotate-[-18deg] drop-shadow-[0_35px_35px_rgba(0,0,0,0.8)] hover:rotate-[-12deg] transition duration-700"
              />

              {/* Floating Card */}
              <div className="absolute bottom-10 left-0 bg-zinc-900 border border-white/10 rounded-3xl p-5 shadow-2xl">
                <p className="text-sm text-gray-400 mb-1">
                  Best Seller
                </p>

                <h3 className="font-bold text-xl">
                  Air Max Pulse
                </h3>

                <p className="text-orange-400 font-bold mt-2">
                  $120
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CATEGORIES */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-24">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categories.map((cat, i) => (
              <div
                key={i}
                className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-3xl p-8 transition hover:-translate-y-2 cursor-pointer group"
              >
                <div className="text-5xl mb-5 group-hover:scale-110 transition">
                  {cat.icon}
                </div>

                <h3 className="text-2xl font-bold">
                  {cat.title}
                </h3>

                <p className="text-gray-400 mt-2">
                  Explore Collection
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* FEATURED SHOES */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
          <div className="flex justify-between items-end mb-12">
            <div>
              <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-bold mb-3">
                Trending Now
              </p>

              <h2 className="text-5xl font-black">
                Featured Sneakers
              </h2>
            </div>

            <button className="hidden md:block border border-white/20 hover:bg-white/10 px-6 py-3 rounded-full transition">
              View All
            </button>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {featuredShoes.map((shoe, i) => (
              <div
                key={i}
                className="bg-zinc-900 rounded-[2rem] overflow-hidden border border-white/10 hover:-translate-y-3 transition duration-500 group"
              >
                <div className="overflow-hidden">
                  <img
                    src={shoe.image}
                    alt={shoe.name}
                    className="h-80 w-full object-cover group-hover:scale-110 transition duration-700"
                  />
                </div>

                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <h3 className="text-2xl font-bold">
                        {shoe.name}
                      </h3>

                      <p className="text-orange-400 font-bold text-lg">
                        {shoe.price}
                      </p>
                    </div>

                    <button className="w-12 h-12 rounded-full bg-orange-500 hover:bg-orange-600 transition flex items-center justify-center text-black text-xl">
                      +
                    </button>
                  </div>

                  <button className="w-full bg-white text-black py-3 rounded-full font-bold hover:bg-gray-200 transition">
                    Shop Now
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ROLE PORTALS */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
          <div className="text-center mb-14">
            <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-bold mb-3">
              Platform Access
            </p>

            <h2 className="text-5xl font-black">
              Access Your Portal
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {roles.map((role) => (
              <div
                key={role.id}
                onClick={() => (window.location.href = role.href)}
                className="bg-zinc-900 border border-white/10 rounded-[2rem] p-8 hover:-translate-y-2 transition duration-500 cursor-pointer group"
              >
                <div
                  className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${role.gradient} flex items-center justify-center text-3xl mb-6 shadow-xl group-hover:scale-110 transition`}
                >
                  {role.icon}
                </div>

                <h3 className="text-3xl font-black mb-3">
                  {role.name}
                </h3>

                <p className="text-gray-400 mb-6">
                  {role.description}
                </p>

                <div className="space-y-3 mb-8">
                  {role.features.map((feat, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 text-gray-300"
                    >
                      <span className="text-orange-500">✓</span>
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 rounded-full bg-gradient-to-r ${role.gradient} font-bold text-black hover:scale-[1.02] transition`}
                >
                  Access Portal →
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* WHY CHOOSE US */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
          <div className="bg-zinc-900 border border-white/10 rounded-[3rem] p-10 lg:p-16">
            <div className="text-center mb-16">
              <p className="text-orange-500 uppercase tracking-[0.3em] text-sm font-bold mb-3">
                Why SoulHub
              </p>

              <h2 className="text-5xl font-black mb-4">
                Built For Sneaker Lovers
              </h2>

              <p className="text-gray-400 max-w-2xl mx-auto">
                Everything you need to shop, manage inventory, and grow your footwear business.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  title: 'Premium Collections',
                  desc: 'Curated footwear from top global brands.',
                  icon: '🔥'
                },
                {
                  title: 'Fast Delivery',
                  desc: 'Quick and secure shipping nationwide.',
                  icon: '🚚'
                },
                {
                  title: 'Real-Time Inventory',
                  desc: 'Live stock updates across all stores.',
                  icon: '📦'
                },
                {
                  title: 'Secure Payments',
                  desc: 'Protected and trusted checkout process.',
                  icon: '🔒'
                },
                {
                  title: 'Easy Order Tracking',
                  desc: 'Track purchases from checkout to delivery.',
                  icon: '📍'
                },
                {
                  title: 'Modern Store Management',
                  desc: 'Powerful admin tools for your team.',
                  icon: '⚡'
                }
              ].map((feat, i) => (
                <div
                  key={i}
                  className="bg-black rounded-3xl p-8 border border-white/5 hover:border-orange-500/40 transition"
                >
                  <div className="text-5xl mb-6">
                    {feat.icon}
                  </div>

                  <h3 className="text-2xl font-bold mb-3">
                    {feat.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed">
                    {feat.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="max-w-7xl mx-auto px-6 lg:px-8 pb-28">
          <div className="relative overflow-hidden rounded-[3rem] bg-orange-500 p-14 text-center">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_40%)]"></div>

            <div className="relative z-10">
              <p className="uppercase tracking-[0.3em] text-sm font-black text-black/70 mb-5">
                START YOUR JOURNEY
              </p>

              <h2 className="text-5xl lg:text-6xl font-black text-black mb-6">
                Step Into Style
              </h2>

              <p className="text-black/80 text-lg max-w-2xl mx-auto mb-10">
                Discover premium footwear collections and elevate your streetwear game today.
              </p>

              <div className="flex flex-wrap justify-center gap-5">
                <button className="bg-black text-white px-8 py-4 rounded-full font-bold hover:scale-105 transition">
                  Shop Now
                </button>

                <button className="border border-black/20 px-8 py-4 rounded-full font-bold hover:bg-black/10 transition">
                  Explore Collection
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="border-t border-white/10 py-10">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-5">
            <div>
              <h2 className="text-3xl font-black">
                SOUL<span className="text-orange-500">HUB</span>
              </h2>

              <p className="text-gray-500 mt-2">
                Premium footwear & modern retail solutions.
              </p>
            </div>

            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition">
                Privacy
              </a>

              <a href="#" className="hover:text-white transition">
                Terms
              </a>

              <a href="#" className="hover:text-white transition">
                Support
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}