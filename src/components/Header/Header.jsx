import React from "react"
import styles from "./Header.module.scss"
import cx from "classnames"

const Header = ({ children, color, border }) => {
  return (
    <div className={border && styles[border]}>
      <div className={cx(styles.header, styles[color])}>{children}</div>
    </div>
  )
}
export default Header
