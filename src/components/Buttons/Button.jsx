import React from "react"
import styles from "./Button.module.scss"

const Button = ({ name, onClick, children, variant, disabled }) => {
  return (
    <button className={styles.button} variant={variant} onClick={onClick}>
      {children}
    </button>
  )
}

export default Button
