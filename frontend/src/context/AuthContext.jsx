import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(
    () => sessionStorage.getItem('authenticated') === 'true'
  )

  const login = () => {
    sessionStorage.setItem('authenticated', 'true')
    setIsAuthenticated(true)
  }

  const logout = () => {
    sessionStorage.removeItem('authenticated')
    setIsAuthenticated(false)
  }

  return (
    <AuthContext.Provider
      value={{ login, logout, isAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
