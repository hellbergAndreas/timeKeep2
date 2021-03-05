import React, { useEffect, useState } from "react"

import { useAuth } from "../../context/AuthContext"
import styles from "./PageWrapper.module.scss"

import { Link, useHistory } from "react-router-dom"
import UserKit from "../../data/UserKit"
import { useUser } from "../../context/UserContext"
import MainSection from "../../pages/MainSection/MainSection"
import SideMenu from "../../components/SideMenu/SideMenu"

const PageWrapper = ({ content }) => {
  const { logout, currentUser } = useAuth()
  const [loaded, setLoaded] = useState({
    categoriesLoaded: false,
    activitiesLoaded: false,
    sessionsLoaded: false,
  })

  const moveSessions = () => {
    let payload = {
      userId: currentUser.uid,
      sessionsMap: userSessions,
    }

    userKit.moveSessions(payload)
  }

  const {
    setUserSessions,
    userSessions,
    setUserCategories,
    setUserActivities,
    setUserSessionsArray,
    categoriesObject,
    setCategoriesObject,
    activitiesObject,
    setActivitiesObject,
  } = useUser()

  const history = useHistory()
  const userKit = new UserKit()

  const handleLogOut = async () => {
    try {
      await logout()
    } catch {}
  }
  const goHome = () => {
    history.push("/")
  }

  // when fetchinig the sessions from firebase, we receive them in an Object.
  // but for the application to be able to sort the sessions, we need them in an array.
  //firebase also changes the datestamp so when fetching them , we have to
  // convert the firebase-timestamp to a valid javascript date. the new array with
  // the correct timestamp is set to context "userSessionsArray"

  useEffect(() => {
    !currentUser && history.push("/login")

    // fetching categories, activities and sessions from db
    currentUser
      .getIdToken()
      .then((token) => {
        sessionStorage.setItem("sessionToken", token)
      })
      .then(() => {
        userKit
          .getActivities(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            let array = []
            Object.keys(data).forEach((object) => {
              array.push(data[object])
            })
            setActivitiesObject(data)

            setUserActivities(array)
          })
          .then(() => {
            setLoaded((prevState) => {
              return {
                ...prevState,
                activitiesLoaded: true,
              }
            })
          })
      })
      .then(() => {
        userKit
          .getCategories(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            let array = []
            Object.keys(data).forEach((object) => {
              array.push(data[object])
            })
            setCategoriesObject(data)
            setUserCategories(array)
          })
          .then(() => {
            setLoaded((prevState) => {
              return {
                ...prevState,
                categoriesLoaded: true,
              }
            })
          })
      })
      .then(() => {
        userKit
          .getSessions(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setUserSessions(data)
          })
          .then(() => {
            setLoaded((prevState) => {
              return {
                ...prevState,
                sessionsLoaded: true,
              }
            })
          })
      })
  }, [currentUser])

  useEffect(() => {
    if (
      loaded.activitiesLoaded &&
      loaded.categoriesLoaded &&
      loaded.sessionsLoaded
    ) {
      console.log("my turn")
      const map = {
        step1: {
          step2: "hej",
        },
      }
      console.log(map.step1.step2)
      sessionsMapToArray()
    }
  }, [loaded, userSessions])

  const sessionsMapToArray = () => {
    let array = []
    Object.keys(userSessions).map((session) => {
      array.push(userSessions[session])
    })
    let sessions = []
    array.forEach((session) => {
      let sesh = {
        ...session,
        start: new Date(Date.parse(session.start)),
        activityName: activitiesObject[session.activity].name,
        categoryName: categoriesObject[session.category].name,
      }
      sessions.push(sesh)
    })
    setUserSessionsArray(sessions)
  }

  return (
    <section className={styles.background}>
      <div className={styles.background__circle}></div>
      <div className={styles.background__circle2}></div>
      <div className={styles.background__blur}></div>
      <div className={styles.contentWrapper}>
        <section className={styles.header}>
          <h2 onClick={goHome} className={styles.logo}>
            timeKeep
          </h2>

          <nav className={styles.nav}>
            <ul>
              <li>
                <Link onClick={handleLogOut} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>

          <button onClick={moveSessions}>move sessions</button>
        </section>
        <section className={styles.content}>
          <SideMenu></SideMenu>

          {content}
        </section>
      </div>
    </section>
  )
}

export default PageWrapper
// const handleTransfer = () => {
//   let figureDrawing = "HIb3YZQLEENccM14ctO4"
//   let anatomy = "WxDTWrtOxBBjAOAgx1OL"
//   let freestyle = "tnqABc4OBvIn3fRwDndq"

//   let brentEvistonFigureDrawing = "bsU7Mjezu7Eq1mzR3FD2"
//   vilppu.forEach((session) => {
// let payload = {
//   category: "tnqABc4OBvIn3fRwDndq",
//   activity: "R73N7yLXdC3UAogKVDHH",
//   userId: currentUser.uid,
//   start: new Date(session.date.seconds * 1000),
//   stop: new Date(session.to.seconds * 1000),
//   keys: [],
// }

//     userKit.transfer(payload)
//   })
// }
