import React from "react"
import styles from "./Header.module.scss"
import cx from "classnames"

const Header = ({ children, color }) => {
  return <div className={cx(styles.header, styles[color])}>{children}</div>
}
export default Header
