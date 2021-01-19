import React, { useEffect } from "react"
import styles from "./FormInput.module.scss"
const FormInput = ({ label, handleChange, type, required }) => {
  let name = label.split(" ")[0].toLowerCase()
  // console.log(name)
  // useEffect(() => {
  //   console.log("hello")
  // })
  return (
    <div className={styles.inputWrapper}>
      <input
        required={required}
        type={type}
        name={name}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className={styles.input}
      ></input>
      <label className={styles.labelName}>
        <span className={styles.contentName}> {label}</span>
      </label>
    </div>
  )
}

export default FormInput
