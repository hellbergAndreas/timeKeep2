import React, { useEffect, useState } from "react"
import { msConverter } from "../../utils/msConverter"
import styles from "./TimeDisplay.module.scss"

const TimeDisplay = ({ total }) => {
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
    console.log(time)
  }, [total])
  return (
    <div>
      I show the time : {`${time.hours}:${time.minutes}:${time.seconds}:`}
    </div>
  )
}

export default TimeDisplay
