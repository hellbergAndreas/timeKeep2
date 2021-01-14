import React from "react"
import styles from "./ListObject.module.scss"

const CategoryObject = ({ children }) => {
  return <section className={styles.listObject}>{children}</section>
}

export default CategoryObject
