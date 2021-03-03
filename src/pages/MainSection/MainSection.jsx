import React, { useEffect, useState } from "react"

import ListContainer from "../../containers/ListContainer/ListContainer"

import { useUser } from "../../context/UserContext"
import styles from "./MainSection.module.scss"
import ListHeaderContainer from "../../containers/ListHeaderContainer/ListHeaderContainer"
import StartButton from "../../components/Buttons/StartButton"
import ConfirmSession from "../../containers/ConfirmSession/ConfirmSession"

import TimeDisplay from "../../components/TimeDisplay/TimeDisplay"
import { useSession } from "../../context/SessionContext"
import cx from "classnames"
import DetailedCategoryCard from "../../components/DetailedCategoryCard/DetailedCategoryCard"
import Timer from "../../components/Timer/Timer"
import FormCard from "../../containers/FormCard/FormCard"
import Button from "../../components/Buttons/Button"

const Dashboard = () => {
  const { category, activity } = useSession()

  const [filteredActivities, setFilteredActivities] = useState([])
  const { userActivities, userCategories } = useUser()
  const [addCategoryHidden, setAddCategoryHidden] = useState(true)
  const [addActivityHidden, setAddActivityHidden] = useState(true)

  // filtering activities based on category
  useEffect(() => {
    if (userActivities) {
      let filtered = userActivities.filter((activity) => {
        return activity.parent === category.id
      })
      setFilteredActivities(filtered)
    }
  }, [category, userActivities])

  useEffect(() => {
    console.log(addCategoryHidden)
  }, [addCategoryHidden])

  const toggle = () => {
    category.id && setAddActivityHidden(false)
  }
  return (
    <div>
      <section className={styles.mainSection}>
        <div className={styles.mainSection__startButton}>
          <Timer></Timer>
          <StartButton></StartButton>
        </div>
        <div className={styles.total}>
          <TimeDisplay name={"total"} filter={"total"}></TimeDisplay>
        </div>
        {!addCategoryHidden && (
          <FormCard
            setHidden={setAddCategoryHidden}
            hidden={addCategoryHidden}
            type={"categories"}
          ></FormCard>
        )}
        {!addActivityHidden && (
          <FormCard
            setHidden={setAddActivityHidden}
            hidden={addActivityHidden}
          ></FormCard>
        )}

        {category.id && (
          <DetailedCategoryCard
            category={category}
            filter="category"
          ></DetailedCategoryCard>
        )}
        {activity.id && (
          <DetailedCategoryCard
            category={activity}
            filter="activity"
          ></DetailedCategoryCard>
        )}
        <div className={cx(styles.listSection, styles.categories)}>
          <ListHeaderContainer type="categories"></ListHeaderContainer>
          <Button onClick={() => setAddCategoryHidden(false)}>
            Add category
          </Button>

          <ListContainer
            type="categories"
            list={userCategories}
          ></ListContainer>
        </div>

        <div className={cx(styles.listSection, styles.activities)}>
          <ListHeaderContainer type="activities"></ListHeaderContainer>
          <Button onClick={toggle}>Add activity</Button>
          <ListContainer
            type="activities"
            list={filteredActivities}
          ></ListContainer>
        </div>
      </section>
      <ConfirmSession></ConfirmSession>
    </div>
  )
}
export default Dashboard
