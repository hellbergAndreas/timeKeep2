import React, { useEffect } from "react"
import styles from "./FormInput.module.scss"
const FormInput = ({ label, handleChange, type, required, onKeyUp, value }) => {
  let name = label.split(" ")[0].toLowerCase()

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
      <label className={styles.labelName}>
        <span className={styles.contentName}> {label}</span>
      </label>
    </div>
  )
}

export default FormInput
