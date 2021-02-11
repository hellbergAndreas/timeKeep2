import React, { useState } from "react"
import styles from "./FilterButton.module.scss"
import cx from "classnames"

const FilterButton = ({ children, onClick, name }) => {
  const [active, setActive] = useState()
  const handleClick = () => {
    setActive(!active)
  }
  return (
    <div onClick={handleClick}>
      <div
        onClick={() => onClick(name)}
        className={cx(styles.button, active && styles.active)}
      >
        {children}
      </div>
    </div>
  )
}

export default FilterButton
