import React from "react"
import Input from "../../components/Input/Input"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  return (
    <section className={styles.sessionsSection}>
      <Input name="Search" required={true} label={"Search"}></Input>
    </section>
  )
}

export default SessionsPage
