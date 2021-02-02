import React from "react"
import { Link } from "react-router-dom"
import styles from "./SideMenu.module.scss"

const SideMenu = () => {
  return (
    <div className={styles.menu}>
      <div className={styles.menu__user}>IamUser</div>
      <ul className={styles.menu__navbar}>
        <Link to="/">Start</Link>
        <Link to="/sessions">Sessions</Link>
        <Link to="/stats">Stats</Link>
      </ul>
    </div>
  )
}

export default SideMenu
