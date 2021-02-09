import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import styles from "./CategoryFilter.module.scss"

const CategoryFilter = ({ name, display, setFilter, filter }) => {
  const handleClick = (name) => {
    if (filter.includes(name)) {
      let newFilter = filter.filter((cat) => {
        return cat != name
      })
      setFilter((prevState) => {
        return newFilter
      })
    } else {
      setFilter((prevState) => {
        return [...prevState, name]
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
