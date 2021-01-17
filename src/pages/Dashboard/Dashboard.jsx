import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../components/Buttons/Button"
import ListContainer from "../../containers/ListContainer/ListContainer"
import Navbar from "../../containers/Navbar/Navbar"
import Header from "../../components/Header/Header"
import { useAuth } from "../../context/AuthContext"
import styles from "./Dashboard.module.scss"
import ListHeaderContainer from "../../containers/ListHeaderContainer/ListHeaderContainer"
const Dashboard = () => {
  const { currentUser } = useAuth()
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

  const handleClick = () => {}
  return (
    <div>
      <Navbar></Navbar>
      <section className={styles.mainSection}>
        <ListHeaderContainer type="Categorys"></ListHeaderContainer>
        <ListContainer listFetch="Category"></ListContainer>
        <Header>Activities</Header>
        <ListHeaderContainer type="Activities"></ListHeaderContainer>
        <ListContainer listFetch="Activity"></ListContainer>
      </section>
    </div>
  )
}
export default Dashboard
