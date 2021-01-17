import React, { useContext, useEffect, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import { useAuth } from "../../context/AuthContext"
import { useCategory } from "../../context/CategoryContext"
import UserKit from "../../data/UserKit"
import styles from "./ListContainer.module.scss"

const CategoryContainer = ({ listFetch }) => {
  const [list, setList] = useState([])
  const { currentUser } = useAuth()
  const { category, setCategory, activity, setActivity } = useCategory()
  console.log(listFetch)
  const userKit = new UserKit()

  const handleClick = (name) => {
    if (listFetch === "category") {
      console.log(name)
    }
  }
  useEffect(() => {
    console.log(category)
  }, [category])
  useEffect(() => {
    // fetching all categorys
    if (listFetch === "category") {
      userKit
        .getCategory(currentUser.email)
        .then((res) => res.json())
        .then((data) => {
          setList(data)
        })
    }
    if (listFetch === "activity") {
      // fetching all activities
    }
  }, [])
  const renderCategorys = () => {
    return list.map((item) => {
      return (
        <ListObject name={item.category} onClick={handleClick}>
          {item.category}
        </ListObject>
      )
    })
  }
  return <section className={styles.section}>{renderCategorys()}</section>
}

export default CategoryContainer
