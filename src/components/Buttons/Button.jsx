import React from "react"
import cx from "classnames"
import styles from "./Button.module.scss"

export const ButtonShape = {
  ROUND_SMALL: "roundSmall",
  ROUND_SMALLER: "roundSmaller",
  ROUND_LARGE: "roundLarge",
  RECT_SMALL: "rectSmall",
  RECT_LARGE: "rectLarge",
}
const Button = ({
  name,
  onClick,
  children,
  variant,
  disabled,
  shape,
  color,
}) => {
  return (
    <button
      color={color}
      className={cx(styles.btn, styles[shape], styles[color])}
      variant={variant}
      onClick={onClick}
    >
      {children}
    </button>
  )
}

export default Button
