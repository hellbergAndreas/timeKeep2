import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"

import ListContainer from "../../containers/ListContainer/ListContainer"
import Navbar from "../../containers/Navbar/Navbar"

import { useAuth } from "../../context/AuthContext"
import { useUser } from "../../context/UserContext"
import styles from "./Dashboard.module.scss"
import ListHeaderContainer from "../../containers/ListHeaderContainer/ListHeaderContainer"

import StartButton from "../../components/Buttons/StartButton"
import ConfirmSession from "../../containers/ConfirmSession/ConfirmSession"
import { useSession } from "../../context/SessionContext"
import UserKit from "../../data/UserKit"

const Dashboard = () => {
  const { currentUser } = useAuth()

  const { category, activity } = useSession()
  const userKit = new UserKit()
  const history = useHistory()

  useEffect(() => {
    !currentUser && history.push("/login")

    if (currentUser) {
      //get all user sessions, categories and activities
      userKit
        .getSessions(currentUser.uid)
        .then((res) => res.json())
        .then((data) => console.log(data))
    }
  }, [currentUser])

  return (
    <div>
      <Navbar></Navbar>
      <section className={styles.mainSection}>
        <StartButton></StartButton>
        <div className={styles.categorySection}>
          <ListHeaderContainer type="categorys"></ListHeaderContainer>
          <ListContainer listFetch="category"></ListContainer>
        </div>

        <div className={styles.activitySection}>
          <ListHeaderContainer type="activities"></ListHeaderContainer>
          <ListContainer listFetch="activity"></ListContainer>
        </div>
        <ConfirmSession></ConfirmSession>
      </section>
    </div>
  )
}
export default Dashboard
