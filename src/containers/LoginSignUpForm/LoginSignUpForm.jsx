import React, { useEffect, useState } from "react"
import Button from "../../buttons/Button"

import FormInput from "../../components/formInput/FormInput"
import { useAuth } from "../../context/AuthContext"
import UserKit from "../../data/UserKit"
import styles from "./LoginSignUpForm.module.scss"
import { useHistory } from "react-router-dom"

const LoginSignUpForm = () => {
  const userKit = new UserKit()
  const [inputValues, setInputValues] = useState()
  const [member, setMember] = useState(true)
  const history = useHistory()
  const { signup, login } = useAuth()
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
    if (!member) {
      console.log("not member")
      signup(inputValues.email, inputValues.password)
    } else {
      console.log("member")
      login(inputValues.email, inputValues.password)
      history.push("/")
    }
  }

  const addMember = () => {
    setMember(!member)
  }

  return (
    <div className={styles.form}>
      <div className={styles.formWrapper}>
        {member ? "Login" : "Register"}
        <form>
          <FormInput handleChange={handleChange} label="email"></FormInput>
          <FormInput handleChange={handleChange} label="password"></FormInput>
          <Button onClick={(e) => handleSubmit(e)}>Submit</Button>
        </form>
        <Button onClick={addMember}>
          {member ? "Not a member?" : "Already a member?"}
        </Button>
      </div>
    </div>
  )
}

export default LoginSignUpForm
