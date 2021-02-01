import React, { useState } from "react"
import Button from "../../components/Buttons/Button"
import Header from "../../components/Header/Header"

import FormCard from "../FormCard/FormCard"
import styles from "./ListHeaderContainer.module.scss"

export default ({ type }) => {
  const [hidden, setHidden] = useState(true)

  const handleClick = (e) => {
    // setHidden(!hidden)
    console.log(e.innerHTML)
  }
  return (
    <div className={styles.header}>
      <Header>{type}</Header>
      <Button onClick={(e) => handleClick(e)}>
        Add {type === "categories" ? "category" : "activity"}
      </Button>
      {!hidden && (
        <FormCard type={type} setHidden={setHidden} hidden={hidden}></FormCard>
      )}
    </div>
  )
}
