import React, { useEffect } from "react"
import styles from "./FormInput.module.scss"
const FormInput = ({ label, handleChange, type }) => {
  let name = label.split(" ")[0].toLowerCase()
  // console.log(name)
  // useEffect(() => {
  //   console.log("hello")
  // })
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.label}>{label}</div>
      <input
        type={type}
        name={name}
        onChange={(e) => handleChange(e.target.name, e.target.value)}
        className={styles.input}
      ></input>
    </div>
  )
}

export default FormInput
