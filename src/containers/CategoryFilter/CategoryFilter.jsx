import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import styles from "./CategoryFilter.module.scss"
import cx from "classnames"
import FilterButton from "../../components/FilterButton/FilterButton"
// import FilterButton from "../../components/FilterButton/FilterButton"

const CategoryFilter = ({ name, display, setFilter, filter, remove }) => {
  const [filteredDisplay, setFilteredDisplay] = useState([])

  const handleClick = name => {
    if (filter.includes(name)) {
      let newFilter = filter.filter(cat => {
        return cat != name
      })
      setFilter(() => {
        return newFilter
      })
    } else {
      setFilter(prevState => {
        return [...prevState, name]
      })
    }
  }

  useEffect(() => {
    let noDuplicates = []
    display.forEach(el => {
      if (!noDuplicates.includes(el.name)) {
        noDuplicates.push(el.name)
      }
    })
    setFilteredDisplay(noDuplicates)
  }, [display])

  return (
    <div className={styles.categoryFilter}>
      <h6>{name}</h6>
      <div className={styles.container}>
        {filteredDisplay.map((cat, index) => {
          return (
            <FilterButton
              key={index}
              filter={filter}
              onClick={handleClick}
              name={cat}>
              {cat}
            </FilterButton>
          )
        })}
      </div>
    </div>
  )
}

export default CategoryFilter
