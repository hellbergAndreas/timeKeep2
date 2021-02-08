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
      {date &&
        `${date.getFullYear()}-${lowerThan10(date.getMonth())}-${lowerThan10(
          date.getDate()
        )} `}
      <p>
        {date.getHours &&
          `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`}
      </p>
      <p>
        {dateStop.getHours &&
          `${dateStop.getHours()}:${dateStop.getMinutes()}:${dateStop.getSeconds()}`}
      </p>
      <p>{(dateStop - date) / 1000}</p>
    </div>
  )
}
export default Session
