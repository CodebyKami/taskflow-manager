import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UserPlus, Mail, Lock, User, CheckCircle } from 'lucide-react'
import './Auth.css'

function Signup({ onSignup }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!name || !email || !password || !confirmPassword) {
      setError('Please fill in all fields')
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      return
    }

    const users = JSON.parse(localStorage.getItem('taskflow_users') || '[]')
    
    if (users.find(u => u.email === email)) {
      setError('Email already registered')
      return
    }

    const newUser = { name, email, password }
    users.push(newUser)
    localStorage.setItem('taskflow_users', JSON.stringify(users))
    
    onSignup({ email, name })
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="logo">
            <CheckCircle size={40} />
          </div>
          <h1>Create Account</h1>
          <p>Start managing your tasks efficiently</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          {error && <div className="error-message">{error}</div>}
          
          <div className="form-group">
            <label>
              <User size={18} />
              Full Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              autoComplete="name"
            />
          </div>

          <div className="form-group">
            <label>
              <Mail size={18} />
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={18} />
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create a password"
              autoComplete="new-password"
            />
          </div>

          <div className="form-group">
            <label>
              <Lock size={18} />
              Confirm Password
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-primary">
            <UserPlus size={18} />
            Create Account
          </button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  )
}

export default Signup
