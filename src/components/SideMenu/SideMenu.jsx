import React from "react"
import { Link } from "react-router-dom"
import styles from "./SideMenu.module.scss"

const SideMenu = ({ handleLogOut }) => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__user}>IamUser</div>
      <ul className={styles.menu__navbar}>
        <Link to="/">Start</Link>
        <Link to="/sessions">Sessions</Link>
        <Link to="/stats">Stats</Link>
        <Link onClick={handleLogOut} to="/">
          Logout
        </Link>
      </ul>
    </div>
  )
}

export default SideMenu
