import React, { useState } from "react"
import styles from "./FormCard.module.scss"
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Buttons/Button"
import UserKit from "../../data/UserKit"
export default ({ hidden, setHidden, type }) => {
  const [inputValues, setInputValues] = useState({ body: "" })
  const userKit = new UserKit()
  const handleClick = () => {
    // if (type === "category") {
    // }
    userKit.addScream(inputValues)
  }
  const handleChange = (name, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        body: value,
      }
    })
  }
  return (
    <div className={styles.background}>
      <div className={styles.form}>
        <button className={styles.button} onClick={() => setHidden(!hidden)}>
          X
        </button>
        <FormInput
          label={type === "Categorys" ? "Category name" : "Activity name"}
          handleChange={handleChange}
        ></FormInput>
        <FormInput handleChange={handleChange} label="Descrition"></FormInput>
        <Button onClick={handleClick}>Add</Button>
      </div>
    </div>
  )
}
