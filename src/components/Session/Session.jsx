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
            `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
        </p>
        -
        <p className={styles.session__time__timeStop}>
          {dateStop.getHours &&
            `${dateStop.getHours()}:${dateStop.getMinutes()}:${dateStop.getSeconds()}`}
        </p>
      </div>
      <p className={styles.session__totalTime}>{(dateStop - date) / 1000}</p>
    </div>
  )
}
export default Session
