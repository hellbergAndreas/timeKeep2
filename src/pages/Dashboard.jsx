import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../buttons/Button"
import { useAuth } from "../context/AuthContext"

const Dashboard = () => {
  const { currentUser, logout, loading } = useAuth()
  const [error, setError] = useState("")
  const history = useHistory()

  const handleLogOut = async () => {
    try {
      await logout()
    } catch {
      setError("failed to log out")
    }
  }

  useEffect(() => {
    !currentUser && history.push("/login")
  }, [currentUser])

  return (
    <div>
      I am dashboard, user: {currentUser && currentUser.email}
      <Button onClick={handleLogOut}>Log out</Button>
    </div>
  )
}
export default Dashboard
