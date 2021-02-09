import React, { useEffect, useState } from "react"
import Input from "../../components/Input/Input"
import CategoryFilter from "../../containers/CategoryFilter/CategoryFilter"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import { useUser } from "../../context/UserContext"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  const { userSessions, userActivities, userCategories } = useUser()
  const [filteredList, setFilteredList] = useState([])
  const [filteredActivities, setFilteredActivities] = useState()
  const [categoryFilter, setCategoryFilter] = useState([])
  const [activityFilter, setactivityFilter] = useState()
  const [keyFilter, setkeyFilter] = useState()

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

      setFilteredList(sortedSessions)
    }
  }, [userSessions])

  useEffect(() => {
    console.log(categoryFilter)
  }, [categoryFilter])
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
        <div className={styles.section__filters}>
          <CategoryFilter
            name={"categories"}
            setFilter={setCategoryFilter}
            filter={categoryFilter}
            display={userCategories}
          ></CategoryFilter>
          {/* <CategoryFilter
            name={"activities"}
            filter={filter}
            setFilter={setFilter}
            display={userActivities}
          ></CategoryFilter> */}
        </div>
        <div className={styles.section__list}>
          <SessionContainer list={filteredList}></SessionContainer>
        </div>
      </div>
    </section>
  )
}

export default SessionsPage
