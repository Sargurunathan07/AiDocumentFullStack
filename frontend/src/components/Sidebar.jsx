import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard, Upload, FileText,
  ListTodo, MessageCircle, Settings
} from 'lucide-react'

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <p className="sidebar-label">WORKSPACE</p>

      <NavLink to="/dashboard"><LayoutDashboard/> Dashboard</NavLink>
      <NavLink to="/upload"><Upload/> Upload Document</NavLink>
      <NavLink to="/analysis"><FileText/> Analysis</NavLink>
      <NavLink to="/actions"><ListTodo/> Action Items</NavLink>
      <NavLink to="/chat"><MessageCircle/> AI Chat</NavLink>

      <div className="sidebar-bottom">
        <NavLink to="/dashboard"><Settings/> Settings</NavLink>
      </div>
    </aside>
  )
}
