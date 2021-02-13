import React, { useEffect, useState } from "react"
import DetailedSession from "../../components/DetailedSession/DetailedSession"

import CategoryFilter from "../../containers/CategoryFilter/CategoryFilter"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import { useUser } from "../../context/UserContext"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  const { userSessionsArray, userActivities, userCategories } = useUser()
  const [sessionsArray] = useState([])
  const [filteredList, setFilteredList] = useState([])
  const [categoryFilter, setCategoryFilter] = useState([])
  const [activityFilter, setActivityFilter] = useState([])
  const [keyFilter, setKeyFilter] = useState([])
  const [keys, setKeys] = useState([])
  const [session, setSession] = useState(null)

  // looping through all sessions and collecting all key values for the key filter.
  useEffect(() => {
    let array = []

    userSessionsArray.forEach((session) => {
      if (session.keys.length > 0) {
        session.keys.forEach((key) => {
          !array.includes(key) && array.push({ name: key }) && array.push(key)
        })
      }
      setKeys(array)
    })
  }, [userSessionsArray])

  // filtering through the list
  // note, make three utils functions
  useEffect(() => {
    let filtered = userSessionsArray
    // filter by category
    if (categoryFilter.length > 0) {
      categoryFilter.forEach((filter) => {
        filtered = filtered.filter((session) => {
          return session.category === filter
        })
      })
    }

    if (activityFilter.length > 0) {
      activityFilter.forEach((filter) => {
        filtered = filtered.filter((session) => {
          return session.activity === filter
        })
      })
    }
    if (keyFilter.length > 0) {
      keyFilter.forEach((filter) => {
        filtered = filtered.filter((session) => {
          return session.keys.includes(filter)
        })
      })
    }

    setFilteredList(filtered)
  }, [categoryFilter, activityFilter, keyFilter, userSessionsArray])

  return (
    <section className={styles.section}>
      <div className={styles.section__left}>
        <div className={styles.section__left__filters}>
          <CategoryFilter
            name={"categories"}
            setFilter={setCategoryFilter}
            filter={categoryFilter}
            display={userCategories}
          ></CategoryFilter>
          <CategoryFilter
            name={"activities"}
            filter={activityFilter}
            remove={categoryFilter}
            setFilter={setActivityFilter}
            display={userActivities}
          ></CategoryFilter>
          <CategoryFilter
            name={"keys"}
            filter={keyFilter}
            remove={categoryFilter}
            setFilter={setKeyFilter}
            display={keys}
          ></CategoryFilter>
        </div>
        <div className={styles.section__left__list}>
          <SessionContainer
            handleClick={setSession}
            list={filteredList}
          ></SessionContainer>
        </div>
      </div>
      <div className={styles.right}>
        <DetailedSession session={session}></DetailedSession>
      </div>
    </section>
  )
}

export default SessionsPage
