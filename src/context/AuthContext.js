import React, { useContext, useEffect, useState } from "react"

import { auth } from "../firebase"
import { UserProvider } from "./UserContext"
import { SessionProvider } from "./SessionContext"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)

  const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
  }
  const login = (email, password) => {
    console.log("firebase")
    return auth.signInWithEmailAndPassword(email, password)
  }
  const logout = () => {
    return auth.signOut()
  }

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user)
      setLoading(false)
    })
    return unsubscribe
  }, [])

  const value = {
    currentUser,
    signup,
    login,
    logout,
    loading,
  }
  return (
    <AuthContext.Provider value={value}>
      <SessionProvider>
        <UserProvider>{!loading && children}</UserProvider>
      </SessionProvider>
    </AuthContext.Provider>
  )
}
