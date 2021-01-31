import React, { useEffect, useState } from "react"
import { useSession } from "../../context/SessionContext"

import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import { msConverter } from "../../utils/msConverter"
import styles from "./TimeDisplay.module.scss"

// timeDisplay receives all user Sessions to calculate the total time of all the sessions.
// on the Dashboard timeDisplay is rendered three times
// one for showing the total of all sessions,
// one for showing the total of a choosen category,
// and one for showing the total of a choosen activity
const TimeDisplay = ({ filter, all, name }) => {
  const { userSessions } = useUser()
  const { category, activity } = useSession()
  const [sessions, setSessions] = useState()
  const [total, setTotal] = useState()
  const [time, setTime] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    if (filter === "categories" && userSessions) {
      const filteredSessions = userSessions.filter(
        (session) => session.category === category
      )
      setSessions(filteredSessions)
    }
    if (filter === "activities" && userSessions) {
      const filteredSessions = userSessions.filter(
        (session) => session.activity === activity
      )
      setSessions(filteredSessions)
    }
    if (all) {
      setSessions(userSessions)
    }
  }, [category, activity])

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
  return <div>{` ${time.hours}: ${time.minutes}: ${time.seconds}`}</div>
}

export default TimeDisplay
