import React from "react"
import styles from "./FormInput.module.scss"
const FormInput = ({ label, handleChange, type }) => {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.label}>{label}</div>
      <input
        type={type}
        name={label}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className={styles.input}
      ></input>
    </div>
  )
}

export default FormInput
