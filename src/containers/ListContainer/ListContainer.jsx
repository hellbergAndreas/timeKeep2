import React, { useEffect, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import { useAuth } from "../../context/AuthContext"
import { useCategory } from "../../context/CategoryContext"
import UserKit from "../../data/UserKit"
import styles from "./ListContainer.module.scss"

const CategoryContainer = ({ listFetch }) => {
  const [list, setList] = useState([])
  const { currentUser } = useAuth()
  const {
    category,
    setCategory,
    activity,
    setActivity,
    timeGoes,
  } = useCategory()

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
    console.log("fetching categorys")
    if (listFetch === "category") {
      userKit
        .getCategory(currentUser.email)
        .then((res) => res.json())
        .then((data) => {
          setList(data)
        })
    }
  }, [])
  useEffect(() => {
    if (category && listFetch === "activity") {
      userKit
        .getActivities(currentUser.email, category)
        .then((res) => res.json())
        .then((data) => {
          setList(data)
        })
    }
    if (!category && listFetch === "activity") {
      setList([])
    }
  }, [category])
  const renderCategorys = () => {
    return list.map((item) => {
      return (
        <ListObject
          category={category}
          activity={activity}
          isRunning={timeGoes}
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
