import { useState } from 'react'
import { supabase } from '../../lib/supabase'

export default function AdminLogin() {
  const [mode, setMode] = useState('login') // 'login' or 'register'
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [fullName, setFullName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // First, sign in
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    if (!data.user) {
      setError('Login failed')
      setLoading(false)
      return
    }

    console.log('Logged in user:', data.user.id)

    // Check if user has admin role
    const { data: profile, error: profileError } = await supabase
      .from('user_profiles')
      .select('role')
      .eq('id', data.user.id)
      .single()

    console.log('Profile data:', profile)
    console.log('Profile error:', profileError)

    if (profile?.role === 'admin') {
      // Redirect to dashboard
      window.location.href = '/admin/dashboard'
    } else {
      setError('Access denied. Admin privileges required.')
      await supabase.auth.signOut()
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    setSuccess('')

    // First, check if user_profiles table is accessible
    console.log('Attempting to register admin:', email)

    // Sign up the user
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

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    if (!data.user) {
      setError('Registration failed')
      setLoading(false)
      return
    }

    console.log('User created:', data.user.id)

    // Manually insert/update the user profile with admin role
    const { error: insertError } = await supabase
      .from('user_profiles')
      .upsert({
        id: data.user.id,
        email: email,
        role: 'admin',
        full_name: fullName,
        created_at: new Date()
      })

    if (insertError) {
      console.error('Profile insert error:', insertError)
      setError('User created but profile update failed. Please contact support.')
      setLoading(false)
      return
    }

    setSuccess('Admin account created successfully! You can now log in.')
    setMode('login')
    setPassword('')
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      <div className="flex items-center justify-center min-h-screen px-4 py-8">
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl">
          {/* Mode Toggle */}
          <div className="flex gap-2 mb-8 bg-white/10 rounded-xl p-1">
            <button
              onClick={() => {
                setMode('login')
                setError('')
                setSuccess('')
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                mode === 'login'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register')
                setError('')
                setSuccess('')
              }}
              className={`flex-1 py-2 rounded-lg font-semibold transition-all ${
                mode === 'register'
                  ? 'bg-purple-600 text-white'
                  : 'text-gray-300 hover:text-white'
              }`}
            >
              Register
            </button>
          </div>

          <div className="text-center mb-8">
            <div className="text-5xl mb-3">{mode === 'login' ? '👑' : '📝'}</div>
            <h1 className="text-3xl font-bold text-white">
              {mode === 'login' ? 'Admin Portal' : 'Create Admin Account'}
            </h1>
            <p className="text-gray-300 mt-2">
              {mode === 'login' 
                ? 'Sign in to manage your store' 
                : 'Register a new administrator account'}
            </p>
          </div>

          {success && (
            <div className="mb-4 bg-green-500/20 border border-green-500 text-green-200 px-4 py-2 rounded-xl text-sm">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 bg-red-500/20 border border-red-500 text-red-200 px-4 py-2 rounded-xl text-sm">
              {error}
            </div>
          )}

          <form onSubmit={mode === 'login' ? handleLogin : handleRegister} className="space-y-5">
            {mode === 'register' && (
              <div>
                <label className="block text-white mb-2">Full Name</label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:border-purple-500 focus:outline-none"
                  placeholder="John Doe"
                  required
                />
              </div>
            )}

            <div>
              <label className="block text-white mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:border-purple-500 focus:outline-none"
                placeholder="admin@shoestore.com"
                required
              />
            </div>

            <div>
              <label className="block text-white mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/20 text-white border border-white/30 focus:border-purple-500 focus:outline-none"
                placeholder={mode === 'login' ? '••••••••' : 'Min. 6 characters'}
                required
                minLength={6}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              {loading 
                ? (mode === 'login' ? 'Signing in...' : 'Creating account...') 
                : (mode === 'login' ? 'Sign In →' : 'Create Admin Account →')}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <a href="/" className="hover:text-white">← Back to Home</a>
          </div>

          {/* Database Status Check */}
          <div className="mt-6 pt-4 border-t border-white/10">
            <button
              onClick={async () => {
                const { data, error } = await supabase
                  .from('user_profiles')
                  .select('count')
                if (error) {
                  alert('Database error: ' + error.message)
                } else {
                  alert('Supabase connected! user_profiles table is accessible.')
                }
              }}
              className="w-full text-xs text-gray-400 hover:text-white transition"
            >
              🔌 Test Database Connection
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}