import React, { useEffect, useState } from "react"
import Session from "../../components/Session/Session"
import { useUser } from "../../context/UserContext"
import styles from "./SessionContainer.module.scss"
const SessionContainer = ({ list, handleClick, compare, sessions }) => {
  const [sortedList, setSortedList] = useState([])
  const [reversed, setReversed] = useState(false)
  useEffect(() => {
    let sortedSessions = list.sort((a, b) => b.start - a.start)
    setSortedList(sortedSessions)
    setReversed(true)
  }, [list])

  const reverseSort = () => {
    let reverseSort
    if (reversed) {
      reverseSort = sortedList.sort((a, b) => a.start - b.start)
      setReversed(false)
    }
    if (!reversed) {
      reverseSort = sortedList.sort((a, b) => b.start - a.start)
      setReversed(true)
    }
    setSortedList(reverseSort)
  }

  const onClick = (session) => {
    let newState = []

    if (compare[0] === true) {
      newState = [...sessions]
      newState[1] = session
    }
    if (compare[1] === true) {
      newState = [...sessions]
      newState[0] = session
    }
    if (compare[0] === false && compare[1] === false) {
      newState[0] = session
    }
    handleClick(newState)
    // handleClick([session, null])
  }
  return (
    <div className={styles.wrapper}>
      <button className={styles.reverse} onClick={reverseSort}>
        reverse
      </button>
      <div className={styles.wrapper__container}>
        {list.map((session) => {
          return (
            <div onClick={() => onClick(session)} key={session.start}>
              <Session session={session} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
export default SessionContainer
