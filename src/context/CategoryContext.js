import React, { useContext, useState } from "react"

const CategoryContext = React.createContext()
export const useCategory = () => {
  return useContext(CategoryContext)
}
export const CategoryProvider = ({ children }) => {
  const [category, setCategory] = useState("blupp")
  const [activity, setActivity] = useState()

  const value = {
    category,
    activity,
    setCategory,
    setActivity,
  }
  return (
    <CategoryContext.Provider value={value}>
      {children}
    </CategoryContext.Provider>
  )
}
