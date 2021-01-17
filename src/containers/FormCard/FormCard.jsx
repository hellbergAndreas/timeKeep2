import React, { useState } from "react"
import styles from "./FormCard.module.scss"
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Buttons/Button"
import UserKit from "../../data/UserKit"
import { useAuth } from "../../context/AuthContext"
export default ({ hidden, setHidden, type }) => {
  const [inputValues, setInputValues] = useState({ body: "" })
  const { currentUser } = useAuth()
  const userKit = new UserKit()
  const handleClick = () => {
    const category = {
      ...inputValues,
      email: currentUser.email,
    }

    userKit.addCategory(category)

    // console.log(scream)
  }
  const handleChange = (name, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
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
        <FormInput handleChange={handleChange} label="Description"></FormInput>
        <Button onClick={handleClick}>Add</Button>
      </div>
    </div>
  )
}
