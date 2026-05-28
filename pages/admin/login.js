import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [mode, setMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // Clear messages when switching modes
  useEffect(() => {
    setError('')
    setSuccess('')
  }, [mode])

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      // Sign in
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password
      })

      if (signInError) throw signInError

      if (!data.user) throw new Error('Login failed')

      // Check admin role
      const { data: profile, error: profileError } = await supabase
        .from('user_profiles')
        .select('role, full_name')
        .eq('id', data.user.id)
        .single()

      if (profileError) throw new Error('Could not verify admin privileges')

      if (profile?.role === 'admin') {
        window.location.href = '/admin/dashboard'
      } else {
        await supabase.auth.signOut()
        throw new Error('Access denied. Admin privileges required.')
      }
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    try {
      // Sign up
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'admin'
          }
        }
      })

      if (signUpError) throw signUpError

      if (!data.user) throw new Error('Registration failed')

      // Wait for trigger to create profile
      await new Promise(resolve => setTimeout(resolve, 1500))

      // Verify and update profile to admin
      const { error: updateError } = await supabase
        .from('user_profiles')
        .update({ role: 'admin', full_name: fullName })
        .eq('id', data.user.id)

      if (updateError) {
        console.warn('Profile update warning:', updateError)
      }

      setSuccess('Admin account created successfully! Please log in.')
      setMode('login')
      setEmail('')
      setPassword('')
      setFullName('')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-pink-600 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-pulse delay-2000"></div>
      </div>

      {/* Main Container */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-8">
        <div className="w-full max-w-md">
          {/* Logo/Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl shadow-lg mb-4">
              <span className="text-3xl">👑</span>
            </div>
            <h2 className="text-2xl font-bold text-white">ShoeStore Admin</h2>
            <p className="text-gray-400 text-sm mt-1">Manage your footwear empire</p>
          </div>

          {/* Card */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 overflow-hidden">
            {/* Mode Toggle */}
            <div className="flex border-b border-white/10">
              <button
                onClick={() => setMode('login')}
                className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                  mode === 'login'
                    ? 'text-white bg-white/10 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  🔐 Sign In
                </span>
              </button>
              <button
                onClick={() => setMode('register')}
                className={`flex-1 py-4 text-center font-semibold transition-all duration-300 ${
                  mode === 'register'
                    ? 'text-white bg-white/10 border-b-2 border-purple-500'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <span className="inline-flex items-center gap-2">
                  ✨ Register
                </span>
              </button>
            </div>

            {/* Form Content */}
            <div className="p-6">
              {/* Success Message */}
              {success && (
                <div className="mb-4 bg-green-500/20 border border-green-500/50 text-green-200 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <span className="text-green-400">✓</span>
                  <span>{success}</span>
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-4 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm flex items-start gap-2">
                  <span className="text-red-400">⚠</span>
                  <span>{error}</span>
                </div>
              )}

              <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-5">
                {/* Full Name - Register only */}
                {mode === 'register' && (
                  <div className="group">
                    <label className="block text-gray-300 text-sm font-medium mb-2">
                      Full Name
                    </label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                        👤
                      </span>
                      <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                        placeholder="John Doe"
                        required
                      />
                    </div>
                  </div>
                )}

                {/* Email */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      📧
                    </span>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Password */}
                <div className="group">
                  <label className="block text-gray-300 text-sm font-medium mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                      🔒
                    </span>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300"
                      placeholder={mode === 'register' ? 'Min. 6 characters' : '••••••••'}
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition"
                    >
                      {showPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  {mode === 'register' && (
                    <p className="text-xs text-gray-500 mt-1">Password must be at least 6 characters</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 shadow-lg"
                >
                  {loading ? (
                    <span className="inline-flex items-center gap-2">
                      <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      {mode === 'login' ? 'Signing in...' : 'Creating account...'}
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-2">
                      {mode === 'login' ? 'Sign In' : 'Create Account'}
                      <span>→</span>
                    </span>
                  )}
                </button>

                {/* Demo Credentials Hint */}
                {mode === 'login' && (
                  <div className="mt-4 p-3 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-xs text-gray-400 text-center">
                      💡 Demo: Use your registered admin email
                    </p>
                  </div>
                )}
              </form>

              {/* Back to Home */}
              <div className="mt-6 text-center">
                <a href="/" className="text-sm text-gray-400 hover:text-white transition inline-flex items-center gap-1">
                  <span>←</span> Back to Home
                </a>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-6">
            <p className="text-xs text-gray-500">
              Secure admin portal with role-based access
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}