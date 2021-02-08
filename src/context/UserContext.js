import React, { useContext, useState } from "react"

const UserContext = React.createContext()

export const useUser = () => {
  return useContext(UserContext)
}

// when app is initiated, all user Sessions categories and activities are fetched
// from the database.

export const UserProvider = ({ children }) => {
  const [userCategories, setUserCategories] = useState([])
  const [userActivities, setUserActivities] = useState([])
  const [userSessions, setUserSessions] = useState(null)

  const value = {
    userCategories,
    setUserCategories,
    userActivities,
    setUserActivities,
    userSessions,
    setUserSessions,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
