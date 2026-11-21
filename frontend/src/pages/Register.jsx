import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FileText, User, Mail, Lock } from 'lucide-react'
import { registerUser } from '../services/authService'

export default function Register() {
  const navigate = useNavigate()

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: ''
  })

  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await registerUser(form)
      navigate('/login')
    } catch (err) {
      setError(
        err.response?.data?.message ||
        err.response?.data ||
        'Registration failed. Please try again.'
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="auth-page">
      <form className="auth-card" onSubmit={handleSubmit}>
        <div className="auth-logo"><FileText size={30}/></div>
        <h2>Create Account</h2>
        <p>Start your document intelligence journey</p>

        {error && <p className="error-message">{error}</p>}

        <label>Full Name</label>
        <div className="input-group">
          <User/>
          <input
            placeholder="Enter your name"
            required
            value={form.name}
            onChange={e => setForm({...form, name: e.target.value})}
          />
        </div>

        <label>Email Address</label>
        <div className="input-group">
          <Mail/>
          <input
            type="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={e => setForm({...form, email: e.target.value})}
          />
        </div>

        <label>Password</label>
        <div className="input-group">
          <Lock/>
          <input
            type="password"
            minLength={8}
            placeholder="Create password"
            required
            value={form.password}
            onChange={e => setForm({...form, password: e.target.value})}
          />
        </div>

        <button
          className="btn btn-primary full-width"
          disabled={loading}
        >
          {loading ? 'Creating account...' : 'Create Account'}
        </button>

        <p className="auth-switch">
          Already registered? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  )
}
