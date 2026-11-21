import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'

import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import UploadDocument from './pages/UploadDocument'
import DocumentAnalysis from './pages/DocumentAnalysis'
import ActionItems from './pages/ActionItems'
import ChatWithDocument from './pages/ChatWithDocument'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/upload" element={<UploadDocument/>}/>
          <Route path="/analysis" element={<DocumentAnalysis/>}/>
          <Route path="/actions" element={<ActionItems/>}/>
          <Route path="/chat" element={<ChatWithDocument/>}/>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App
