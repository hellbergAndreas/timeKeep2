import React from "react"
import { Link } from "react-router-dom"
import styles from "./SideMenu.module.scss"

const SideMenu = () => {
  return (
    <div className={styles.menu}>
      <ul className={styles.menu__navbar}>
        <Link to="/">Start</Link>
        <Link to="/stats">Stats</Link>
        <Link to="/sessions">Sessions</Link>
      </ul>
    </div>
  )
}

export default SideMenu