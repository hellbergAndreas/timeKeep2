import React, { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../components/Buttons/Button"
import ListContainer from "../../containers/ListContainer/ListContainer"
import Navbar from "../../containers/Navbar/Navbar"

import { useAuth } from "../../context/AuthContext"
import styles from "./Dashboard.module.scss"
import ListHeaderContainer from "../../containers/ListHeaderContainer/ListHeaderContainer"
import { useCategory } from "../../context/CategoryContext"

import StartButton from "../../components/Buttons/StartButton"
const Dashboard = () => {
  const { currentUser } = useAuth()
  const { category, activity } = useCategory()

  const history = useHistory()

  useEffect(() => {
    !currentUser && history.push("/login")
    //getting idToken from user
    if (currentUser) {
      return currentUser.getIdToken().then((token) => {
        sessionStorage.setItem("sessionToken", token)
        // return console.log({ token })
      })
    }
  }, [currentUser])

  return (
    <div>
      <Navbar></Navbar>
      <section className={styles.mainSection}>
        <div className={styles.categorySection}>
          <ListHeaderContainer type="categorys"></ListHeaderContainer>
          <ListContainer listFetch="category"></ListContainer>
        </div>

        <div className={styles.activitySection}>
          <ListHeaderContainer type="activities"></ListHeaderContainer>
          <ListContainer listFetch="activity"></ListContainer>
        </div>
        {category && activity ? <StartButton></StartButton> : null}
      </section>
    </div>
  )
}
export default Dashboard
