import React from "react"
import { useAuth } from "../../context/AuthContext"
import Navbar from "../../containers/Navbar/Navbar"
const UserPage = () => {
  const { currentUser } = useAuth()
  return (
    <div>
      <Navbar></Navbar>I show user information <p>{currentUser.email}</p>
    </div>
  )
}

export default UserPage
