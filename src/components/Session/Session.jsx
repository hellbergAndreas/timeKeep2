import React, { useEffect, useState } from "react"
import { lowerThan10 } from "../../utils/convertTimestamp"
import styles from "./Session.module.scss"

const Session = ({ session }) => {
  const [date, setDate] = useState("")
  const [dateStop, setDateStop] = useState("")

  useEffect(() => {
    setDate(new Date(Date.parse(session.start)))
    setDateStop(new Date(Date.parse(session.stop)))
  }, [session])

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
        <p> {session.category}</p>
        <p>{session.activity}</p>
        <p>
          {session.keys.map((key, index) => {
            return <div key={index}>{key}</div>
          })}
        </p>
      </div>
      <p className={styles.session__totalTime}>{(dateStop - date) / 1000}</p>
    </div>
  )
}
export default Session
