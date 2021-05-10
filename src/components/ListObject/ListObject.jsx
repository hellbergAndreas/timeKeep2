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
  delay,
}) => {
  return (
    <div class={styles.wrapper}>
      <button
        onClick={() => onClick(id, name)}
        disabled={timeGoes && canBeDeactivated}
        style={{
          animationDelay: `0.${delay}s`,
        }}
        className={cx(
          styles.btn,
          category.id === id && styles.active,
          activity.id === id && styles.active
        )}>
        <div className={styles.text}>{children}</div>
      </button>
    </div>
  )
}

export default CategoryObject
