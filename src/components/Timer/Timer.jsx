import React, { useEffect, useState } from "react"
import { useSession } from "../../context/SessionContext"
import { lessThan10, msConverter } from "../../utils/msConverter"
import styles from "./Timer.module.scss"

const Timer = () => {
  const [timeInterval, setTimeInterval] = useState()
  const { timeGoes } = useSession()

  const [time, setTime] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
  })

  useEffect(() => {
    const { seconds, hours, minutes } = msConverter(timeInterval)
    setTime({
      seconds,
      hours,
      minutes,
    })
  }, [timeInterval])

  useEffect(() => {
    let start = new Date()
    let timer
    if (timeGoes) {
      timer = setInterval(() => {
        let stop = new Date()
        setTimeInterval(stop - start)
      }, 100)
      return () => clearInterval(timer)
    } else {
      clearInterval(timer)
      setTime({ hours: 0, minutes: 0, seconds: 0 })
    }
  }, [timeGoes])

  return (
    <div className={styles.timer}>
      {lessThan10(time.hours)}:{lessThan10(time.minutes)}:
      {lessThan10(time.seconds)}
    </div>
  )
}

export default Timer
