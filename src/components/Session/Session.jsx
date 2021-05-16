import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"

import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import { lowerThan10 } from "../../utils/convertTimestamp"
import DeleteModal from "../DeleteModal/DeleteModal"
import TimeFormat from "../TimeFormat/TimeFormat"
import styles from "./Session.module.scss"

const Session = ({ session, handleDelete }) => {
  const [date, setDate] = useState("")
  const { currentUser } = useAuth()
  const [dateStop, setDateStop] = useState("")
  const [sessionTime, setSessionTime] = useState()
  const { userSessionsArray } = useUser()
  const [hover, setHover] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const userKit = new UserKit()
  useEffect(() => {
    setDate(new Date(Date.parse(session.start)))
    setDateStop(new Date(Date.parse(session.stop)))
  }, [session])

  useEffect(() => {
    let total = 0

    let sortedList = userSessionsArray.sort((a, b) => a.start - b.start)
    const iterations = sortedList.indexOf(session)

    for (let i = 0; i <= iterations; i++) {
      total +=
        new Date(Date.parse(sortedList[i].stop)) -
        new Date(Date.parse(sortedList[i].start))
    }
    setSessionTime(total)
  }, [])

  // const handleDelete = () => {
  //   setDeleteModal(true)
  //   // userKit.deleteSession(currentUser.uid, session.id).then()
  // }
  const handleMouseEnter = () => {
    setHover(true)
  }
  const handleMouseLeave = () => {
    setHover(false)
  }
  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={styles.session}>
      <div className={styles.session__year}>
        {date &&
          `${date.getFullYear()}-${lowerThan10(
            date.getMonth() + 1
          )}-${lowerThan10(date.getDate())} `}
      </div>
      <div className={styles.activity}>
        <p>{session.categoryName}</p>
        <p> {session.activityName}</p>
      </div>
      {/* <div className={styles.session__time}>
        <p className={styles.session__time__timeStart}>
          {date.getHours &&
            `${lowerThan10(date.getHours())}:${lowerThan10(
              date.getMinutes()
            )}:${lowerThan10(date.getSeconds())}`}
        </p>
        -
        <p className={styles.session__time__timeStop}>
          {dateStop.getHours &&
            `${lowerThan10(dateStop.getHours())}:${lowerThan10(
              dateStop.getMinutes()
            )}:${lowerThan10(dateStop.getSeconds())}`}
        </p>
      </div>
      <div>
        <div className={styles.session__keys}>
          {session.keys &&
            session.keys.map((key, index) => {
              return <div key={index}>{key}</div>
            })}
        </div>
      </div>
      <p className={styles.session__totalProgress}>
        <TimeFormat ms={sessionTime}></TimeFormat>
      </p>
      <p className={styles.session__totalTime}>
        <TimeFormat ms={dateStop - date} />
      </p> */}
      {hover && (
        <button
          className={styles.delete}
          onClick={() => handleDelete(session.id)}>
          x
        </button>
      )}
    </div>
  )
}
export default Session
