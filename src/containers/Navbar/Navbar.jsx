import React from "react"

import { useAuth } from "../../context/AuthContext"
import styles from "./Navbar.module.scss"

import { Link, useHistory } from "react-router-dom"

const Header = () => {
  const { logout } = useAuth()
  const history = useHistory()

  const handleLogOut = async () => {
    try {
      await logout()
    } catch {}
  }
  const goHome = () => {
    history.push("/")
  }
  return (
    <section className={styles.header}>
      <h2 onClick={goHome} className={styles.logo}>
        timeKeep
      </h2>

      <nav className={styles.nav}>
        <ul>
          <li>
            <Link to="/user">User</Link>
          </li>
          <li>
            <Link to="/stats">stats</Link>
          </li>
          <li>
            <Link onClick={handleLogOut} to="/">
              Logout
            </Link>
          </li>
        </ul>
      </nav>
    </section>
  )
}

export default Header
