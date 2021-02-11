import React from "react"
import Session from "../../components/Session/Session"
import styles from "./SessionContainer.module.scss"
const SessionContainer = ({ list, handleClick }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        {list &&
          list.map((session) => {
            return (
              <div onClick={() => handleClick(session)} key={session.start}>
                <Session session={session} />
              </div>
            )
          })}
      </div>
    </div>
  )
}
export default SessionContainer
