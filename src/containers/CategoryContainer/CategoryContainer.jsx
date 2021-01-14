import React, { useEffect, useState } from "react"
import CategoryObject from "../../components/CategoryObject/CategoryObject"
import styles from "./CategoryContainer.module.scss"

const categorys = [
  {
    name: "nma",
  },
  {
    name: "skillshare",
  },
]

const activitites = [
  {
    name: "figure drawing",
  },
  {
    name: "head drawing",
  },
]
const CategoryContainer = ({ listFetch }) => {
  const [list, setList] = useState([])
  useEffect(() => {
    console.log(listFetch)
    if (listFetch === "Activity") {
      setList(activitites)
      console.log("fetching activities")
    }
    if (listFetch === "Category") {
      setList(categorys)
    }
    console.log(list)
  }, [list])
  const renderCategorys = () => {
    return list.map((item) => {
      return <CategoryObject>{item.name}</CategoryObject>
    })
  }
  return <section className={styles.section}>{renderCategorys()}</section>
}

export default CategoryContainer
