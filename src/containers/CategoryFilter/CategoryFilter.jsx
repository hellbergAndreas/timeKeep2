import React from "react"
import { useUser } from "../../context/UserContext"
import styles from "./CategoryFilter.module.scss"

const CategoryFilter = ({ name, display, setFilter, filter }) => {
  const handleClick = (catName) => {
    if (filter[name].includes(catName)) {
      let newFilter = filter[name].filter((cat) => {
        return cat != catName
      })
      setFilter((prevState) => {
        return {
          ...prevState,
          [name]: [...newFilter],
        }
      })
    } else {
      setFilter((prevState) => {
        return {
          ...prevState,
          [name]: [...prevState[name], catName],
        }
      })
    }
  }
  return (
    <div className={styles.categoryFilter}>
      <h6>{name}</h6>
      {display.map((cat) => {
        return (
          <div
            onClick={() => handleClick(cat.name)}
            className={styles.categoryFilter__category}
          >
            {cat.name}
          </div>
        )
      })}
    </div>
  )
}

export default CategoryFilter
