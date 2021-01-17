import React from "react"
import styles from "./ListObject.module.scss"

const CategoryObject = ({ children, name, onClick }) => {
  return (
    <section onClick={() => onClick(name)} className={styles.listObject}>
      {children}
    </section>
  )
}

export default CategoryObject
