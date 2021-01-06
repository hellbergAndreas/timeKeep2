import React, { useEffect, useState } from "react"
import Button from "../../buttons/Button"

import FormInput from "../../components/formInput/FormInput"
import { useAuth } from "../../context/AuthContext"
import UserKit from "../../data/UserKit"
import styles from "./LoginSignUpForm.module.scss"

const LoginSignUpForm = () => {
  const userKit = new UserKit()
  const [inputValues, setInputValues] = useState()
  const { signup, currentUser } = useAuth()
  const handleChange = (name, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    signup(inputValues.email, inputValues.password)
  }

  return (
    <div className={styles.form}>
      <div className={styles.formWrapper}>
        {currentUser && JSON.stringify(currentUser)}
        <form>
          <FormInput handleChange={handleChange} label="email"></FormInput>
          <FormInput handleChange={handleChange} label="password"></FormInput>
          <Button onClick={(e) => handleSubmit(e)} name="Submit"></Button>
        </form>
      </div>
    </div>
  )
}

export default LoginSignUpForm
