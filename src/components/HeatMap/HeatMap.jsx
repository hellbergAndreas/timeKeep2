import React, { useEffect, useState } from "react"
import styles from "./HeatMap.module.scss"

const HeatMap = ({ data }) => {
  const [minutes, setMinutes] = useState()
  const [days, setDays] = useState()

  useEffect(() => {}, [days])

  useEffect(() => {
    setDays({})
    if (data && minutes) {
      sortDataByDays()
    }
  }, [minutes, data])

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
        session.stop = new Date(session.stop)
        if (session.start.getDate() != session.stop.getDate()) {
          let afterMidnight = JSON.parse(JSON.stringify(session))
          afterMidnight.start = new Date(afterMidnight.stop)
          afterMidnight.start.setHours(0, 0, 0)
          afterMidnight.stop = new Date(afterMidnight.stop)
          let beforeMidnight = JSON.parse(JSON.stringify(session))
          beforeMidnight.stop = new Date(beforeMidnight.start)
          beforeMidnight.start = new Date(session.start)
          beforeMidnight.stop.setHours(23, 59, 59)
          sortedDays[names[afterMidnight.start.getDay()]].push(afterMidnight)
          sortedDays[names[beforeMidnight.start.getDay()]].push(beforeMidnight)
        } else {
          sortedDays[names[session.start.getDay()]].push(session)
        }
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
    let dayMap = JSON.parse(JSON.stringify(minutes))

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
    let minuteMap = []
    const minutes = 1440
    for (let i = 0; i < minutes; i++) {
      minuteMap.push({ i, busy: 0 })
    }
    console.log(minuteMap)
    setMinutes(minuteMap)
  }, [])

  return (
    <div className={styles.heat}>
      <div className={styles.hours}>
        <div>00</div>
        <div>01</div>
        <div>02</div>
        <div>03</div>
        <div>04</div>
        <div>05</div>
        <div>06</div>
        <div>07</div>
        <div>08</div>
        <div>09</div>
        <div>10</div>
        <div>11</div>
        <div>12</div>
        <div>13</div>
        <div>14</div>
        <div>15</div>
        <div>16</div>
        <div>17</div>
        <div>18</div>
        <div>19</div>
        <div>20</div>
        <div>21</div>
        <div>22</div>
        <div>23</div>
        <div>00</div>
      </div>
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
                    className={styles.minute}></div>
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
