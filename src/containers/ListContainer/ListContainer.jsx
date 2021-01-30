import React, { useEffect, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import { useAuth } from "../../context/AuthContext"

import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import styles from "./ListContainer.module.scss"

// listContainer is rendered twice on the dashboard
// one time for Categories, and one time for Activities.
// on mount, userCategories and userActivites are fetched from the db
//
const CategoryContainer = ({ listFetch }) => {
  const [list, setList] = useState([])
  const { currentUser } = useAuth()
  const {
    category,
    setCategory,
    activity,
    setActivity,
    timeGoes,
  } = useSession()

  const { setUserActivities, userActivities } = useUser()

  const userKit = new UserKit()

  const handleClick = (name) => {
    if (listFetch === "category") {
      setCategory(name)
      category === name && setCategory(null)
      setActivity(null)
    }
    if (listFetch === "activity") {
      setActivity(name)
      activity === name && setActivity(null)
    }
  }

  useEffect(() => {
    // fetching all categorys
    if (listFetch === "category" && currentUser) {
      userKit
        .getCategories(currentUser.uid)
        .then((res) => res.json())
        .then((data) => {
          setList(data)
        })
    }
  }, [])

  // when user presses a category, we filter through the activites
  // returning the ones matching the active category.
  useEffect(() => {
    let filteredActivities
    if (listFetch === "activity" && userActivities) {
      filteredActivities = userActivities.filter((activity) => {
        return activity.parent === category
      })
      setList(filteredActivities)
    }
  }, [category])

  useEffect(() => {
    //fetching all activities
    if (listFetch === "activity" && currentUser) {
      userKit
        .getActivities(currentUser.uid)
        .then((res) => res.json())
        .then((data) => {
          setUserActivities(data)
        })
    }
  }, [])
  const renderCategorys = () => {
    return list.map((item) => {
      return (
        <ListObject
          key={item.name}
          category={category}
          activity={activity}
          timeGoes={timeGoes}
          canBeDeactivated={true}
          name={item.name}
          onClick={handleClick}
        >
          {item.name}
        </ListObject>
      )
    })
  }
  return <section className={styles.section}>{renderCategorys()}</section>
}

export default CategoryContainer
