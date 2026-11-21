import { Link, useNavigate } from 'react-router-dom'
import { FileText, LogOut, User } from 'lucide-react'

export default function Navbar() {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <div className="brand-icon"><FileText size={23} /></div>
        <span>DocuMind<span className="brand-highlight"> AI</span></span>
      </Link>

      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/dashboard">Dashboard</Link>
        <Link to="/upload">Upload</Link>
      </div>

      <div className="nav-actions">
        <Link to="/login" className="nav-login"><User size={17}/> Login</Link>
        <button className="btn btn-outline" onClick={logout}>
          <LogOut size={16}/> Logout
        </button>
      </div>
    </nav>
  )
}
