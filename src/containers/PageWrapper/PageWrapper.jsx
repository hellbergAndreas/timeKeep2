import React, { useEffect } from "react"

import { useAuth } from "../../context/AuthContext"
import styles from "./PageWrapper.module.scss"

import { Link, useHistory } from "react-router-dom"
import UserKit from "../../data/UserKit"
import { useUser } from "../../context/UserContext"
import MainSection from "../../pages/MainSection/MainSection"
import SideMenu from "../../components/SideMenu/SideMenu"

const PageWrapper = ({ content }) => {
  const { logout, currentUser } = useAuth()
  const { setUserSessions, userSessions } = useUser()
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
  // all sessions are collected from the db to calculate total
  // time
  useEffect(() => {
    !currentUser && history.push("/login")

    if (currentUser && !userSessions) {
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
    }
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
