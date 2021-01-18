import React from "react"
import styles from "./ListObject.module.scss"
import cx from "classnames"

const CategoryObject = ({
  children,
  name,
  onClick,
  timeGoes,
  canBeDeactivated,
  category,
  activity,
}) => {
  return (
    <button
      onClick={() => onClick(name)}
      className={cx(
        styles.btn,
        category && category === name ? styles.active : "",
        activity && activity === name ? styles.active : ""
      )}
    >
      {children}
    </button>
  )
}

export default CategoryObject
