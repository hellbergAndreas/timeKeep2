import React, { useContext, useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import { auth } from "../firebase"

const AuthContext = React.createContext()

export const useAuth = () => {
  return useContext(AuthContext)
}

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState()
  const [loading, setLoading] = useState(true)
  const history = useHistory()

  const signup = (email, password) => {
    auth.createUserWithEmailAndPassword(email, password)
  }
  const login = (email, password) => {
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
  useEffect(() => {
    !currentUser && history.push("/login")
  }, [currentUser])

  const value = {
    currentUser: currentUser,
    signup,
    login,
    logout,
  }
  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
