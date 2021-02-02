import React, { useState } from "react"
import Input from "../../components/Input/Input"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  const [list, setList] = useState()

  const handleChange = () => {}
  return (
    <section className={styles.section}>
      <div>
        <div className={styles.section__input}>
          <Input
            handleChange={handleChange}
            name="Search"
            required={true}
            label={"Search"}
          ></Input>
        </div>
        <div className={styles.section__list}>
          <SessionContainer></SessionContainer>
        </div>
      </div>
    </section>
  )
}

export default SessionsPage
