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
  const [userSessionsArray, setUserSessionsArray] = useState([])
  const [activitiesObject, setActivitiesObject] = useState()
  const [categoriesObject, setCategoriesObject] = useState()
  const value = {
    userCategories,
    setUserCategories,
    userActivities,
    setUserActivities,
    userSessions,
    setUserSessions,
    userSessionsArray,
    setUserSessionsArray,
    activitiesObject,
    setActivitiesObject,
    categoriesObject,
    setCategoriesObject,
  }
  return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}
