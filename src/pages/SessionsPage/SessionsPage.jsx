import React, { useEffect, useState } from "react"
import DetailedSession from "../../components/DetailedSession/DetailedSession"
import FullScreenImage from "../../components/FullScreenImage/FullScreenImage"

import CategoryFilter from "../../containers/CategoryFilter/CategoryFilter"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import { useUser } from "../../context/UserContext"
import styles from "./SessionsPage.module.scss"

const SessionsPage = () => {
  const { userSessionsArray, userActivities, userCategories } = useUser()

  const [filteredList, setFilteredList] = useState([])
  const [categoryFilter, setCategoryFilter] = useState([])
  const [activityFilter, setActivityFilter] = useState([])
  const [filterByImages, setFilterByImages] = useState(false)
  const [keyFilter, setKeyFilter] = useState([])
  const [keys, setKeys] = useState([])
  const [session, setSession] = useState([])
  const [compare, setCompare] = useState([false, false])
  const [images, setImages] = useState([false, false])
  const [imageFullScreen, setImageFullScreen] = useState(false)

  // looping through all sessions and collecting all key values for the key filter.
  useEffect(() => {
    let array = []
    userSessionsArray.forEach((session) => {
      if (session.keys && session.keys.length > 0) {
        session.keys.forEach((key) => {
          !array.includes(key) && array.push({ name: key }) && array.push(key)
        })
      }
      setKeys(array)
    })
  }, [userSessionsArray])

  useEffect(() => {}, [images])
  // filtering through the list
  // note, make three utils functions
  useEffect(() => {
    let filtered = userSessionsArray
    // filter by category
    if (categoryFilter.length > 0) {
      categoryFilter.forEach((filter) => {
        filtered = filtered.filter((session) => {
          return session.categoryName === filter
        })
      })
    }
    // by activity
    if (activityFilter.length > 0) {
      activityFilter.forEach((filter) => {
        filtered = filtered.filter((session) => {
          return session.activityName === filter
        })
      })
    }

    // by keys
    if (keyFilter.length > 0) {
      keyFilter.forEach((filter) => {
        filtered = filtered.filter((session) => {
          return session.keys.includes(filter)
        })
      })
    }

    // by images
    if (filterByImages === true) {
      filtered = filtered.filter((session) => {
        return session.imageUrl
      })
    }

    setFilteredList(filtered)
  }, [
    categoryFilter,
    activityFilter,
    keyFilter,
    userSessionsArray,
    filterByImages,
  ])

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
        <button onClick={() => setFilterByImages(!filterByImages)}>
          filter by images
        </button>
        <div className={styles.section__left__list}>
          <SessionContainer
            compare={compare}
            sessions={session}
            handleClick={setSession}
            list={filteredList}
          ></SessionContainer>
        </div>
      </div>
      <div className={styles.right}>
        <DetailedSession
          slot={0}
          compare={compare}
          setImages={setImages}
          setCompare={setCompare}
          session={session[0] && session[0]}
          setImageFullScreen={setImageFullScreen}
        ></DetailedSession>
        <DetailedSession
          slot={1}
          compare={compare}
          setCompare={setCompare}
          setImages={setImages}
          setImageFullScreen={setImageFullScreen}
          session={session[1] && session[1]}
        ></DetailedSession>
      </div>
      {imageFullScreen && (
        <FullScreenImage
          images={images}
          setImageFullScreen={setImageFullScreen}
        />
      )}
    </section>
  )
}

export default SessionsPage
