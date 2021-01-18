import React, { useEffect, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import { useAuth } from "../../context/AuthContext"
import { useCategory } from "../../context/CategoryContext"
import UserKit from "../../data/UserKit"
import styles from "./ListContainer.module.scss"

const CategoryContainer = ({ listFetch }) => {
  const [list, setList] = useState([])
  const { currentUser } = useAuth()
  const { category, setCategory, activity, setActivity } = useCategory()

  const userKit = new UserKit()

  const handleClick = (name) => {
    if (listFetch === "category") {
      setCategory(name)
      activity && setActivity(null)
    }
    if (listFetch === "activity") {
      setActivity(name)
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
    console.log("fetching activities")
    if (category && listFetch === "activity") {
      userKit
        .getActivities(currentUser.email, category)
        .then((res) => res.json())
        .then((data) => {
          setList(data)
        })
    }
  }, [category])
  const renderCategorys = () => {
    return list.map((item) => {
      return (
        <ListObject name={item.name} onClick={handleClick}>
          {item.name}
        </ListObject>
      )
    })
  }
  return <section className={styles.section}>{renderCategorys()}</section>
}

export default CategoryContainer
