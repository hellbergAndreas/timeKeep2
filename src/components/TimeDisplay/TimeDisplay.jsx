import React, { useEffect, useState } from "react"
import { useSession } from "../../context/SessionContext"

import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import { getSessions } from "../../utils/getSessions"
import { lessThan10, msConverter } from "../../utils/msConverter"
import styles from "./TimeDisplay.module.scss"

// timeDisplay receives all user Sessions to calculate the total time of all the sessions.
// on the Dashboard timeDisplay is rendered three times
// one for showing the total of all sessions,
// one for showing the total of a choosen category,
// and one for showing the total of a choosen activity
const TimeDisplay = ({ filter, name }) => {
  const { userSessionsArray } = useUser()
  const { category, activity } = useSession()
  const [sessions, setSessions] = useState()
  const [total, setTotal] = useState()
  const [time, setTime] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    if (filter === "total") {
      setSessions(userSessionsArray)
    } else {
      setSessions(getSessions(name, filter, userSessionsArray))
    }
  }, [category, activity, userSessionsArray])

  useEffect(() => {
    setTotal(calculateTotalTime(sessions))
  }, [sessions])

  useEffect(() => {
    const { seconds, hours, minutes } = msConverter(total)
    setTime({
      seconds,
      hours,
      minutes,
    })
  }, [total])
  return (
    <div>{` ${lessThan10(time.hours)}: ${lessThan10(
      time.minutes
    )}: ${lessThan10(time.seconds)}`}</div>
  )
}

export default TimeDisplay
