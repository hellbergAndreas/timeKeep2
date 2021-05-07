import React, { useEffect, useState } from "react"
import styles from "./HeatMap.module.scss"
import cx from "classnames"
import { calculateTotalTime } from "../../utils/calculateTotalTime"

const HeatMap = ({ data }) => {
  const [minutes, setMinutes] = useState()
  const [days, setDays] = useState()

  useEffect(() => {}, [days])

  useEffect(() => {
    data && minutes && sortDataByDays()
  }, [data, minutes])

  const sortDataByDays = () => {
    const names = {
      0: "sun",
      1: "mon",
      2: "tue",
      3: "wed",
      4: "thu",
      5: "fri",
      6: "sat",
    }
    let sortedDays = {
      mon: [],
      tue: [],
      wed: [],
      thu: [],
      fri: [],
      sat: [],
      sun: [],
    }
    Object.keys(data).forEach(span => {
      data[span].forEach(session => {
        sortedDays[names[session.start.getDay()]].push(session)
      })
    })
    Object.keys(sortedDays).forEach(day => {
      calculateSpan(day, sortedDays[day])
    })
  }

  const calculateSpan = (weekDay, sessions) => {
    const calculateMinutesFromMidnight = session => {
      return session.getHours() * 60 + session.getMinutes()
    }

    let sessionsArray = []
    sessions.forEach(session => {
      let modifiedSession = session
      modifiedSession.from = calculateMinutesFromMidnight(session.start)
      modifiedSession.to = calculateMinutesFromMidnight(new Date(session.stop))
      sessionsArray.push(modifiedSession)
    })

    addSessions(weekDay, sessionsArray)
  }

  const addSessions = (weekDay, sessions) => {
    let dayMap = []

    const day = 1440
    for (let i = 0; i < day; i++) {
      dayMap.push({ i, busy: 0 })
    }

    sessions.forEach(session => {
      for (let i = session.from; i <= session.to; i++) {
        dayMap[i].busy++
      }
    })

    setDays(prevState => {
      return {
        ...prevState,
        [weekDay]: dayMap,
      }
    })
  }
  useEffect(() => {
    console.log(minutes)
  }, [minutes])

  useEffect(() => {
    let minuteMap = []
    const minutes = 1440
    for (let i = 0; i < minutes; i++) {
      minuteMap.push({ i, busy: 0 })
    }
    setMinutes(minuteMap)
  }, [])

  return (
    <div className={styles.heat}>
      {days &&
        Object.keys(days).map(day => {
          return (
            <div className={styles.day}>
              {day}
              {days[day].map((minute, i) => {
                return (
                  <div
                    style={{
                      backgroundColor: "blue",
                      opacity: `0.${minute.busy}`,
                    }}
                    className={styles[i]}></div>
                )
              })}
            </div>
          )
        })}
    </div>
  )
}

export default HeatMap

// days.map(day => {
//   return (
//     <div className={cx(styles.day, styles[day])}>
//       <div>{day}</div>
//       {minutes &&
//         minutes.map((minute, i) => {
//           return (
//             <div
//               style={{
//                 backgroundColor: "blue",
//                 opacity: `0.${minute.busy}`,
//               }}
//               className={styles[i]}></div>
//           )
//         })}
//     </div>
//   )
// })
