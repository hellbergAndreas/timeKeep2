import React, { useContext, useState } from "react"

const SessionContext = React.createContext()

export const useSession = () => {
  return useContext(SessionContext)
}
// when a user creates a session, the database wants to know what category and activity
// the session relates to.
export const SessionProvider = ({ children }) => {
  const [category, setCategory] = useState({ id: null, name: null })
  const [activity, setActivity] = useState({ id: null, name: null })
  const [timeGoes, setTimeGoes] = useState(false)
  const [session, setSession] = useState()
  const [confirmSessionHidden, setConfirmSessionHidden] = useState(true)

  const value = {
    category,
    setCategory,
    activity,
    setActivity,
    session,
    setSession,
    timeGoes,
    setTimeGoes,
    confirmSessionHidden,
    setConfirmSessionHidden,
  }
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  )
}
