import React, { useEffect, useState } from "react"
import styles from "./FilterButton.module.scss"
import cx from "classnames"

const FilterButton = ({ children, onClick, name, filter }) => {
  const [active, setActive] = useState()
  const handleClick = () => {
    setActive(!active)
  }

  const renderButton = () => {
    if (!filter.includes(name)) {
      return (
        <div onClick={() => onClick(name)} className={cx(styles.button)}>
          {children}
        </div>
      )
    } else {
      return (
        <div
          onClick={() => onClick(name)}
          className={cx(styles.button, styles.active)}
        >
          {children}
        </div>
      )
    }
  }
  useEffect(() => {
    renderButton()
  }, [filter])
  return <div onClick={handleClick}>{renderButton()}</div>
}

export default FilterButton
