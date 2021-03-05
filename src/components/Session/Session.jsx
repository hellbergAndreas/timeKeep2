import React, { useEffect, useState } from "react"

import { useUser } from "../../context/UserContext"
import { lowerThan10 } from "../../utils/convertTimestamp"
import TimeFormat from "../TimeFormat/TimeFormat"
import styles from "./Session.module.scss"

const Session = ({ session }) => {
  const [date, setDate] = useState("")
  const [dateStop, setDateStop] = useState("")
  const [sessionTime, setSessionTime] = useState()
  const { userSessionsArray } = useUser()
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

  return (
    <div className={styles.session}>
      <div className={styles.session__year}>
        {date &&
          `${date.getFullYear()}-${lowerThan10(
            date.getMonth() + 1
          )}-${lowerThan10(date.getDate())} `}
      </div>

      <div className={styles.session__time}>
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
      </p>
    </div>
  )
}
export default Session
