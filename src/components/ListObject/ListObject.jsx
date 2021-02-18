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
  id,
}) => {
  return (
    <button
      onClick={() => onClick(id, name)}
      disabled={timeGoes && canBeDeactivated}
      className={cx(
        styles.btn,
        category.id === id && styles.active,
        activity.id === id && styles.active
      )}
    >
      {children}
    </button>
  )
}

export default CategoryObject
