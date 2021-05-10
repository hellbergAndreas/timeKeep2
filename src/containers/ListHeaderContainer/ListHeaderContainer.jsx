import React, { useState } from "react"
import Button from "../../components/Buttons/Button"
import Header from "../../components/Header/Header"
import { useSession } from "../../context/SessionContext"

import FormCard from "../FormCard/FormCard"
import styles from "./ListHeaderContainer.module.scss"

export default ({ type }) => {
  const [hidden, setHidden] = useState(true)
  const { category } = useSession()

  const handleClick = e => {
    if (type === "categories") {
      setHidden(!hidden)
    }
    if (type === "activities" && category.id) {
      setHidden(!hidden)
    }
  }
  return (
    <div className={styles.header}>
      <Header>{type}</Header>
    </div>
  )
}
