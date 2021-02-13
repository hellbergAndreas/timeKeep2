import React, { useEffect, useState } from "react"
import Session from "../../components/Session/Session"
import styles from "./SessionContainer.module.scss"
const SessionContainer = ({ list, handleClick }) => {
  const [sortedList, setSortedList] = useState([])
  useEffect(() => {
    let sortedSessions = list.sort((a, b) => b.start - a.start)

    setSortedList(sortedSessions)
  }, [list])

  return (
    <div className={styles.wrapper}>
      <div className={styles.wrapper__container}>
        {sortedList.map((session) => {
          console.log(session.id)
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
