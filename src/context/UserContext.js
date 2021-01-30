import React, { useContext, useState } from "react"

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}
export const UserProvider = ({ children }) => {
  const [userCategories, setUserCategories] = useState(null)
  const [userActivities, setUserActivities] = useState(null)
  const [userSessions, setUserSessions] = useState(null)
  const [userTotal, setUserTotal] = useState(0)
  const value = {
    userCategories,
    setUserCategories,
    userActivities,
    setUserActivities,
    userSessions,
    setUserSessions,
    userTotal,
    setUserTotal,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
