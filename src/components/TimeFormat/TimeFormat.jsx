import React, { useEffect, useState } from "react"
import { lessThan10, msConverter } from "../../utils/msConverter"

// timeDisplay receives all user Sessions to calculate the total time of all the sessions.
// on the Dashboard timeDisplay is rendered three times
// one for showing the total of all sessions,
// one for showing the total of a choosen category,
// and one for showing the total of a choosen activity
const TimeFormat = ({ ms }) => {
  const [time, setTime] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const { seconds, hours, minutes } = msConverter(ms)
    setTime({
      seconds,
      hours,
      minutes,
    })
  }, [ms])
  return (
    <div>{` ${lessThan10(time.hours)}: ${lessThan10(
      time.minutes
    )}: ${lessThan10(time.seconds)}`}</div>
  )
}

export default TimeFormat
