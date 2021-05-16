import React, { useEffect, useState } from "react"
import { Link, useHistory } from "react-router-dom"
import styles from "./SideMenu.module.scss"

const SideMenu = ({ handleLogOut }) => {
  const [path, setPath] = useState(useHistory(useHistory))

  return (
    <div className={styles.menu}>
      <div className={styles.menu__user}>IamUser</div>
      <ul className={styles.menu__navbar}>
        <div
          className={
            path && path.location.pathname.length === 1 && styles.active
          }>
          <Link to="/">Start</Link>
        </div>
        <div
          className={
            path && path.location.pathname.includes("sessions") && styles.active
          }>
          <Link to="/sessions">Sessions</Link>
        </div>
        <div
          className={
            path && path.location.pathname.includes("stats") && styles.active
          }>
          <Link to="/stats">Stats</Link>
        </div>
        <div>
          <Link onClick={handleLogOut} to="/">
            Logout
          </Link>
        </div>
      </ul>
    </div>
  )
}

export default SideMenu
