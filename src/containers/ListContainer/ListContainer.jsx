import React, { useEffect, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import styles from "./ListContainer.module.scss"

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
      return <ListObject>{item.name}</ListObject>
    })
  }
  return <section className={styles.section}>{renderCategorys()}</section>
}

export default CategoryContainer
