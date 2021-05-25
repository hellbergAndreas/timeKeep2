import React, { useEffect, useState } from "react"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import DetailedSession from "../../components/DetailedSession/DetailedSession"
import FullScreenImage from "../../components/FullScreenImage/FullScreenImage"

import CategoryFilter from "../../containers/CategoryFilter/CategoryFilter"
import SessionContainer from "../../containers/SessionContainer/SessionContainer"
import { useAuth } from "../../context/AuthContext"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import styles from "./SessionsPage.module.scss"
import cx from "classnames"
import Button from "../../components/Buttons/Button"

const SessionsPage = () => {
  const { userSessionsArray, userActivities, userCategories, setUserSessions } =
    useUser()
  const { currentUser } = useAuth()

  const [filteredList, setFilteredList] = useState([])
  const [categoryFilter, setCategoryFilter] = useState([])
  const [activityFilter, setActivityFilter] = useState([])
  const [filterByImages, setFilterByImages] = useState(false)
  const [keyFilter, setKeyFilter] = useState([])
  const [keys, setKeys] = useState([])

  const [compare, setCompare] = useState([false, false])
  const [holdOne, setHoldOne] = useState(false)
  const [holdTwo, setHoldTwo] = useState(false)
  const [sessionOne, setSessionOne] = useState(null)
  const [sessionTwo, setSessionTwo] = useState(null)
  const [imageFullScreen, setImageFullScreen] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [deleteId, setDeleteId] = useState(null)

  const userKit = new UserKit()
  // looping through all sessions and collecting all key values for the key filter.
  useEffect(() => {
    let array = []
    userSessionsArray.forEach(session => {
      if (session.keys && session.keys.length > 0) {
        session.keys.forEach(key => {
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
      categoryFilter.forEach(filter => {
        filtered = filtered.filter(session => {
          return session.categoryName === filter
        })
      })
    }
    // by activity
    if (activityFilter.length > 0) {
      activityFilter.forEach(filter => {
        filtered = filtered.filter(session => {
          return session.activityName === filter
        })
      })
    }

    // by keys
    if (keyFilter.length > 0) {
      keyFilter.forEach(filter => {
        filtered = filtered.filter(session => {
          return session.keys.includes(filter)
        })
      })
    }

    // by images
    if (filterByImages === true) {
      filtered = filtered.filter(session => {
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
  const handleDelete = id => {
    setDeleteModal(true)
    setDeleteId(id)
  }
  const confirmDelete = () => {
    userKit
      .deleteSession(currentUser.uid, deleteId)

      .then(() => {
        setUserSessions(prevState => {
          const newState = prevState
          delete newState[deleteId]

          return {
            ...newState,
          }
        })
      })
    setDeleteId(null)
    setDeleteModal(false)
  }
  const cancelDelete = () => {
    setDeleteModal(false)
    setDeleteId(null)
  }
  const setSession = session => {
    if (holdTwo) {
      setSessionOne(session)
    }
    if (holdOne) {
      setSessionTwo(session)
    }
    if (!holdTwo && !holdOne) {
      setSessionTwo(null)
      setSessionOne(session)
    }
  }

  const holdFunction = arg => {
    if (arg === 1) {
      setHoldOne(!holdOne)
      setHoldTwo(false)
    }
    if (arg === 2) {
      setHoldOne(false)
      setHoldTwo(!holdTwo)
    }
  }
  useEffect(() => {
    console.log(holdTwo)
  }, [holdTwo])
  return (
    <section className={styles.section}>
      {deleteModal && (
        <DeleteModal
          cancelDelete={cancelDelete}
          confirmDelete={confirmDelete}></DeleteModal>
      )}

      <div className={styles.section__left}>
        <div className={styles.section__left__filters}>
          <CategoryFilter
            name={"categories"}
            setFilter={setCategoryFilter}
            filter={categoryFilter}
            display={userCategories}></CategoryFilter>
          <CategoryFilter
            name={"activities"}
            filter={activityFilter}
            remove={categoryFilter}
            setFilter={setActivityFilter}
            display={userActivities}></CategoryFilter>
          <CategoryFilter
            name={"keys"}
            filter={keyFilter}
            remove={categoryFilter}
            setFilter={setKeyFilter}
            display={keys}></CategoryFilter>
        </div>

        <button
          className={cx(styles.btn, filterByImages && styles.active)}
          onClick={() => setFilterByImages(!filterByImages)}>
          Only Images
        </button>

        <div className={styles.section__left__list}>
          <SessionContainer
            holdOne={holdOne}
            holdTwo={holdTwo}
            compare={compare}
            handleClick={setSession}
            list={filteredList}
            handleDelete={handleDelete}></SessionContainer>
        </div>
      </div>
      <div className={styles.right}>
        <DetailedSession
          active={holdOne}
          setImageFullScreen={setImageFullScreen}
          hold={() => holdFunction(1)}
          session={sessionOne && sessionOne}
          setCompare={setCompare}></DetailedSession>
        <DetailedSession
          active={holdTwo}
          setImageFullScreen={setImageFullScreen}
          hold={() => holdFunction(2)}
          session={sessionTwo && sessionTwo}></DetailedSession>
      </div>
      {imageFullScreen && (
        <FullScreenImage
          setImageFullScreen={setImageFullScreen}
          images={[
            sessionOne && sessionOne.imageUrl,
            sessionTwo && sessionTwo.imageUrl,
          ]}
        />
      )}
    </section>
  )
}

export default SessionsPage
