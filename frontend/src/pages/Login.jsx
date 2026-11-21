import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, Mail, Lock } from 'lucide-react'
import { loginUser } from '../services/authService'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()

  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await loginUser(form)
      login()
      navigate('/dashboard')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Login failed. Check your credentials or backend connection.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo"><FileText size={30}/></div>
        <h2>Welcome Back</h2>
        <p>Sign in to continue to DocuMind AI</p>

        {error && <p className="error-message">{error}</p>}

        <label>Email Address</label>
        <div className="input-group">
          <Mail/>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={e => setForm({...form, email:e.target.value})}
          />
        </div>

        <label>Password</label>
        <div className="input-group">
          <Lock/>
          <input
            type="password"
            placeholder="Enter password"
            required
            value={form.password}
            onChange={e => setForm({...form, password:e.target.value})}
          />
        </div>

        <button className="btn btn-primary full-width" disabled={loading}>
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="auth-switch">
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  )
}
