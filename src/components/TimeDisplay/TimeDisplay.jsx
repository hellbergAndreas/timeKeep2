import React, { useEffect, useState } from "react"
import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import { msConverter } from "../../utils/msConverter"
import styles from "./TimeDisplay.module.scss"

const TimeDisplay = ({ category, activity, all, name }) => {
  const { userSessions } = useUser()
  const [sessions, setSessions] = useState()
  const [total, setTotal] = useState()

  useEffect(() => {
    if (category && userSessions) {
      const filteredSessions = userSessions.filter(
        (session) => session.category === category
      )
      setSessions(filteredSessions)
    }
    if (activity && userSessions) {
      console.log(activity)
      const filteredSessions = userSessions.filter(
        (session) => session.activity === activity
      )
      setSessions(filteredSessions)
    }
    if (all) {
      setSessions(userSessions)
    }
  }, [userSessions, name])

  useEffect(() => {
    setTotal(calculateTotalTime(sessions))
    console.log(sessions)
  }, [sessions])

  const [time, setTime] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const { seconds, hours, minutes } = msConverter(total)
    setTime({
      seconds,
      hours,
      minutes,
    })
  }, [total])
  return <div>{`${name} ${time.hours}: ${time.minutes}: ${time.seconds}`}</div>
}

export default TimeDisplay
