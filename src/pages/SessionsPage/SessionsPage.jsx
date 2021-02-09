import React, { useEffect, useState } from "react"
import Input from "../../components/Input/Input"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import { useUser } from "../../context/UserContext"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  const { userSessions } = useUser()
  const [filteredList, setFilteredList] = useState([])

  useEffect(() => {
    // looping through the sessions, converting the timestamps back to javascript date-object...........................
    let sessions = []
    if (userSessions) {
      userSessions.forEach((session) => {
        let sesh = {
          ...session,
          start: new Date(Date.parse(session.start)),
        }
        sessions.push(sesh)
      })

      const sortedSessions = sessions.sort((a, b) => a.start - b.start)

      console.log(sortedSessions)
      setFilteredList(sortedSessions)
    }
  }, [userSessions])

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
          <SessionContainer list={filteredList}></SessionContainer>
        </div>
      </div>
    </section>
  )
}

export default SessionsPage
