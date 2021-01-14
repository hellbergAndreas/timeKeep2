import React, { useEffect } from "react"
import Button from "../../components/Buttons/Button"
import { useAuth } from "../../context/AuthContext"
import styles from "./Navbar.module.scss"

const Header = () => {
  const { logout, currentUser } = useAuth()
  const handleLogOut = async () => {
    try {
      await logout()
    } catch {}
  }

  return (
    <section className={styles.section}>
      <div>welcome {currentUser && currentUser.email}</div>
      <Button onClick={handleLogOut}>Log out</Button>
    </section>
  )
}

export default Header
