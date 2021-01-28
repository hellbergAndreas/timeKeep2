import React, { useContext, useState } from "react"

const SessionContext = React.createContext()

export const useSession = () => {
  return useContext(SessionContext)
}
export const SessionProvider = ({ children }) => {
  const [category, setCategory] = useState(null)
  const [activity, setActivity] = useState(null)
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
