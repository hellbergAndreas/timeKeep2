import React from "react"
import LoginSignUpForm from "../../containers/LoginSignUpForm/LoginSignUpForm"
import styles from "./LoginPage.module.scss"

const LoginPage = () => {
  return (
    <section className={styles.section}>
      <LoginSignUpForm></LoginSignUpForm>
    </section>
  )
}
export default LoginPage
