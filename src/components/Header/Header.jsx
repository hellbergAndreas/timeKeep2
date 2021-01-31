import React from "react"
import styles from "./Header.module.scss"
import cx from "classnames"

export const HeaderSize = {
  HEADER_SMALL: "headerSmall",
  HEADER_SMALLER: "headerSmaller",
  HEADER_LARGE: "headerLarge",
  HEADER_LARGER: "headerLarger",
}
const Header = ({ children, color, border, size }) => {
  return (
    <div className={border && styles[border]}>
      <div className={cx(styles.header, styles[color], styles[size])}>
        {children}
      </div>
    </div>
  )
}
export default Header
