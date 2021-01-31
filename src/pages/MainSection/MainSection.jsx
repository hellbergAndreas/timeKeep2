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
import cx from "classnames"
import DetailedCategoryCard from "../../components/DetailedCategoryCard/DetailedCategoryCard"

const Dashboard = () => {
  const { category, activity } = useSession()

  return (
    <div>
      <section className={styles.mainSection}>
        <div className={styles.mainSection__startButton}>
          <StartButton></StartButton>
        </div>
        <div className={styles.total}>
          <TimeDisplay name={"total"} filter={"total"}></TimeDisplay>
        </div>
        {category && (
          <DetailedCategoryCard
            name={category}
            filter="category"
          ></DetailedCategoryCard>
        )}
        {activity && (
          <DetailedCategoryCard
            name={activity}
            filter="activity"
          ></DetailedCategoryCard>
        )}
        <div className={cx(styles.listSection, styles.categories)}>
          <ListHeaderContainer type="categories"></ListHeaderContainer>
          <ListContainer listFetch="category"></ListContainer>
        </div>

        <div className={cx(styles.listSection, styles.activities)}>
          <ListHeaderContainer type="activities"></ListHeaderContainer>
          <ListContainer listFetch="activity"></ListContainer>
        </div>
        <ConfirmSession></ConfirmSession>
      </section>
    </div>
  )
}
export default Dashboard
