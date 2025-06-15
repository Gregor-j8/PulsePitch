import { createContext, useContext, useEffect, useState } from "react"
import { tryGetLoggedInUser } from "../managers/authManagers"
const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [loggedInUser, setLoggedInUser] = useState({})

  useEffect(() => {
    tryGetLoggedInUser().then(user => setLoggedInUser(user))
  }, [])

  return (
    <AuthContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)