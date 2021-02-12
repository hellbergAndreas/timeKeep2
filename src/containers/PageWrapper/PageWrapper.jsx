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

  const {
    setUserSessions,
    userSessions,
    setUserCategories,
    setUserActivities,
    setUserSessionsArray,
    userSessionsArray,
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
  // fetching all categorys
  // fetch all sessions, puts them into array and changes the datestamp to valid javascript date
  useEffect(() => {
    // turns object into array
    if (userSessions) {
      let array = []
      Object.keys(userSessions).map((session) => {
        array.push(userSessions[session])
      })

      let sessions = []
      array.forEach((session) => {
        let sesh = {
          ...session,
          start: new Date(Date.parse(session.start)),
        }
        sessions.push(sesh)
      })

      setUserSessionsArray(sessions)
    }
  }, [userSessions])

  useEffect(() => {
    !currentUser && history.push("/login")

    currentUser
      .getIdToken()
      .then((token) => {
        sessionStorage.setItem("sessionToken", token)
      })
      .then(() => {
        userKit
          .getSessions(currentUser.uid)
          .then((res) => res.json())
          .then((data) => setUserSessions(data))
      })
      .then(() => {
        userKit
          .getActivities(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setUserActivities(data)
          })
      })
      .then(() => {
        userKit
          .getCategories(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setUserCategories(data)
          })
      })
  }, [currentUser])
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
