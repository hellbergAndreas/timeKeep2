import React from "react"
import Session from "../../components/Session/Session"
import styles from "./SessionContainer.module.scss"
const SessionContainer = ({ list }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        {list &&
          list.map((session) => {
            return <Session session={session} />
          })}
      </div>
    </div>
  )
}
export default SessionContainer
