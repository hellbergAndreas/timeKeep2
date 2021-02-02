import React from "react"
import styles from "./Input.module.scss"
const Input = ({
  label,
  handleChange,
  type,
  required,
  onKeyUp,
  value,
  name,
}) => {
  return (
    <div className={styles.inputWrapper}>
      <input
        required={required}
        autoComplete="off"
        type={type}
        name={name}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        onKeyUp={onKeyUp && onKeyUp}
        className={styles.input}
        value={value}
      ></input>
      <label className={styles.inputWrapper__label}>
        <span className={styles.inputWrapper__label__name}> {label}</span>
      </label>
    </div>
  )
}

export default Input
