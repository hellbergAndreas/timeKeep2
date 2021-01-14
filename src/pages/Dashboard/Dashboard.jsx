import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../components/Buttons/Button"
import CategoryContainer from "../../containers/CategoryContainer/CategoryContainer"
import Navbar from "../../containers/Navbar/Navbar"
import Header from "../../components/Header/Header"
import { useAuth } from "../../context/AuthContext"
import styles from "./Dashboard.module.scss"
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
      <Navbar>
        {currentUser && currentUser.email}
        <Button onClick={handleLogOut}>Log out</Button>
      </Navbar>
      <section className={styles.mainSection}>
        <Header>Categorys</Header>
        <CategoryContainer listFetch="Category"></CategoryContainer>
        <Header>Activities</Header>

        <CategoryContainer listFetch="Activity"></CategoryContainer>
      </section>
    </div>
  )
}
export default Dashboard
