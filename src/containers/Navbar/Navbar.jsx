import React from "react"
import styles from "./Navbar.module.scss"

const Header = ({ children }) => {
  return <section className={styles.section}>{children}</section>
}

export default Header
