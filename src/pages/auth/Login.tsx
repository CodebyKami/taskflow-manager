import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuthStore()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    
    const success = await login(email, password)
    if (success) {
      navigate('/dashboard')
    } else {
      setError('Invalid email or password')
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-8">
      <h2 className="text-2xl font-bold mb-6">Sign In</h2>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="name@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="••••••••"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Sign In
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-600">
        Don't have an account?{' '}
        <Link to="/register" className="text-blue-600 hover:underline">
          Sign up
        </Link>
      </p>

      <div className="mt-6 p-4 bg-gray-100 rounded-lg">
        <p className="text-xs text-gray-600 mb-2">Demo Credentials:</p>
        <p className="text-xs font-mono">Email: admin@taskflow.com</p>
        <p className="text-xs font-mono">Password: admin123</p>
      </div>
    </div>
  )
}
