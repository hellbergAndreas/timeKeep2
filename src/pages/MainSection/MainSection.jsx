import React, { useEffect } from "react"
import { useHistory } from "react-router-dom"
import ListContainer from "../../containers/ListContainer/ListContainer"

import { useAuth } from "../../context/AuthContext"
import { useUser } from "../../context/UserContext"
import styles from "./MainSection.module.scss"
import ListHeaderContainer from "../../containers/ListHeaderContainer/ListHeaderContainer"
import StartButton from "../../components/Buttons/StartButton"
import ConfirmSession from "../../containers/ConfirmSession/ConfirmSession"
import UserKit from "../../data/UserKit"
import TimeDisplay from "../../components/TimeDisplay/TimeDisplay"

import { useSession } from "../../context/SessionContext"

const Dashboard = () => {
  const { category, activity } = useSession()

  return (
    <div>
      <section className={styles.mainSection}>
        <StartButton></StartButton>
        <TimeDisplay name={"total"} all={true}></TimeDisplay>
        {category && (
          <TimeDisplay name={category} category={category}></TimeDisplay>
        )}
        {activity && (
          <TimeDisplay name={activity} activity={activity}></TimeDisplay>
        )}
        <div className={styles.categorySection}>
          <ListHeaderContainer type="categories"></ListHeaderContainer>
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
