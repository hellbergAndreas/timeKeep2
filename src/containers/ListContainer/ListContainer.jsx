import React, { useEffect, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import { useAuth } from "../../context/AuthContext"

import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import styles from "./ListContainer.module.scss"

// listContainer is rendered twice on the dashboard
// one time for Categories, and one time for Activities.

const CategoryContainer = ({ type, list }) => {
  const {
    category,
    setCategory,
    activity,
    setActivity,
    timeGoes,
  } = useSession()

  const handleClick = (name) => {
    if (type === "categories") {
      setCategory(name)
      category === name && setCategory(null)
      setActivity(null)
    }
    if (type === "activities") {
      setActivity(name)
      activity === name && setActivity(null)
    }
  }

  const renderCategories = () => {
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
  return (
    <section className={styles.container}>{list && renderCategories()}</section>
  )
}

export default CategoryContainer
