import React, { useState } from "react"
import Button from "../../components/Buttons/Button"
import Header from "../../components/Header/Header"

import FormCard from "../FormCard/FormCard"
import styles from "./ListHeaderContainer.module.scss"

export default ({ type }) => {
  const [hidden, setHidden] = useState(true)

  const handleClick = () => {
    setHidden(!hidden)
  }
  return (
    <div className={styles.header}>
      <Header>{type}</Header>
      {/* <Button onClick={handleClick}>
        Add {type === "categorys" ? "category" : "activity"}
      </Button> */}
      {!hidden && (
        <FormCard type={type} setHidden={setHidden} hidden={hidden}></FormCard>
      )}
    </div>
  )
}
