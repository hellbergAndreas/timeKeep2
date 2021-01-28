import React, { useEffect } from "react"
import Button, { ButtonShape } from "../../components/Buttons/Button"
import { useAuth } from "../../context/AuthContext"
import styles from "./Navbar.module.scss"
import logoutSvg from "./logout.svg"

const Header = () => {
  const { logout, currentUser } = useAuth()
  const handleLogOut = async () => {
    try {
      await logout()
    } catch {}
  }

  return (
    <section className={styles.header}>
      <h2 className={styles.logo}>timeKeep</h2>

      <nav onClick={handleLogOut} className={styles.nav}>
        <ul>
          <li>
            <a className={styles.active} href="">
              user
            </a>
          </li>
          <li>
            <a href="">stats</a>
          </li>
          <li>
            <a href="">logout</a>
          </li>
        </ul>
      </nav>
      {/* <div>welcome {currentUser && currentUser.email}</div> */}
      {/* <Button shape={ButtonShape.ROUND_SMALL} onClick={handleLogOut}>
        Log out
      </Button> */}
    </section>
  )
}

export default Header
