import React from "react"
import styles from "./FormCard.module.scss"
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Buttons/Button"
export default ({ hidden, setHidden }) => {
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <button onClick={() => setHidden(!hidden)}>X</button>
        <FormInput></FormInput>
        <FormInput></FormInput>
        <Button>Add</Button>
      </div>
    </div>
  )
}
