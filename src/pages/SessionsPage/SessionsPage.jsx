import React, { useState } from "react"
import Input from "../../components/Input/Input"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import { useUser } from "../../context/UserContext"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  const { userSessions } = useUser()
  const [filteredList, setFilteredList] = useState([])

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
          <SessionContainer list={userSessions}></SessionContainer>
        </div>
      </div>
    </section>
  )
}

export default SessionsPage
