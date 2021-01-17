import React, { useEffect, useState } from "react"
import Button from "../../components/Buttons/Button"

import FormInput from "../../components/FormInput/FormInput"
import { useAuth } from "../../context/AuthContext"

import styles from "./LoginSignUpForm.module.scss"
import { useHistory } from "react-router-dom"
import UserKit from "../../data/UserKit"

const LoginSignUpForm = () => {
  const [inputValues, setInputValues] = useState()
  const userKit = new UserKit()
  const [member, setMember] = useState(true)
  const history = useHistory()
  const { signup, login, currentUser, loading } = useAuth()
  const handleChange = (name, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  useEffect(() => {
    currentUser && history.push("/")
    if (currentUser && !member) {
      const user = {
        email: currentUser.email,
        user: currentUser.uid,
      }
      userKit.addUser(user)
    }
  }, [currentUser])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!member) {
      signup(inputValues.email, inputValues.password)
    } else {
      try {
        await login(inputValues.email, inputValues.password)
        history.push("/")
      } catch {}
    }
  }

  const addMember = () => {
    setMember(!member)
  }

  return (
    <div className={styles.form}>
      <div className={styles.formWrapper}>
        <div className={styles.header}>{member ? "Login" : "Register"}</div>
        <form>
          <FormInput handleChange={handleChange} label="Email"></FormInput>
          <FormInput handleChange={handleChange} label="Password"></FormInput>
          <Button onClick={(e) => handleSubmit(e)}>
            {member ? "Login" : "Register"}
          </Button>
        </form>

        <div className={styles.memberLink} onClick={addMember}>
          {member ? "Not a member?" : "Already a member?"}
        </div>
      </div>
    </div>
  )
}

export default LoginSignUpForm
