import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import styles from "./CategoryFilter.module.scss"
import cx from "classnames"
import FilterButton from "../../components/FilterButton/FilterButton"
// import FilterButton from "../../components/FilterButton/FilterButton"

const CategoryFilter = ({ name, display, setFilter, filter, remove }) => {
  const [filteredDisplay, setFilteredDisplay] = useState([])

  const handleClick = (name) => {
    if (filter.includes(name)) {
      let newFilter = filter.filter((cat) => {
        return cat != name
      })
      setFilter(() => {
        return newFilter
      })
    } else {
      setFilter((prevState) => {
        return [...prevState, name]
      })
    }
  }

  useEffect(() => {
    setFilteredDisplay(display)
  }, [display])

  return (
    <div className={styles.categoryFilter}>
      <h6>{name}</h6>
      {filteredDisplay.map((cat, index) => {
        return (
          <FilterButton key={index} onClick={handleClick} name={cat.name}>
            {cat.name}
          </FilterButton>
        )
      })}
    </div>
  )
}

export default CategoryFilter
