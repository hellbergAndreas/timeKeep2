// import React, { useContext, useState } from "react"

// const CategoryContext = React.createContext()

// export const useCategory = () => {
//   return useContext(CategoryContext)
// }
// export const CategoryProvider = ({ children }) => {
//   const [category, setCategory] = useState(null)
//   const [activity, setActivity] = useState(null)
//   const [timeGoes, setTimeGoes] = useState(false)
//   const [session, setSession] = useState()
//   const [confirmSessionHidden, setConfirmSessionHidden] = useState()

//   const value = {
//     category,
//     setCategory,
//     activity,
//     setActivity,
//     session,
//     setSession,
//     timeGoes,
//     setTimeGoes,
//     confirmSessionHidden,
//     setConfirmSessionHidden,
//   }
//   return (
//     <CategoryContext.Provider value={value}>
//       {children}
//     </CategoryContext.Provider>
//   )
// }
