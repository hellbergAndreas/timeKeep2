import React, { useEffect, useState } from "react"
import BarChart from "../../components/BarChart/BarChart"
import GraphControllPanel from "../../components/GraphControllPanel/GraphControllPanel"
import Graph from "../../containers/Graph/Graph"
import { useUser } from "../../context/UserContext"

import styles from "./StatsPage.module.scss"
const StatsPage = () => {
  const { userSessionsArray } = useUser()

  const [sortedSessions, setSortedSessions] = useState(null)
  const [years, setYears] = useState(null)
  const [months, setMonths] = useState({})
  const [weeks, setWeeks] = useState({})
  const [days, setDays] = useState({})
  const proxySorted = {
    years: { 2020: { sessions: [] }, 2021: { session: [] } },
    months: {
      2020: {
        jan: { sessions: [] },
        feb: {},
      },
    },
    weeks: {
      2020: {
        jan: {
          1: { sessions: [] },
          2: {},
        },
      },
    },
    days: {
      2020: {
        jan: {
          1: {
            monday: { sessions: [] },
            tuesday: {},
          },
        },
      },
    },
  }
  useEffect(() => {
    if (userSessionsArray.length !== 0) {
      const sortedList = userSessionsArray.sort((a, b) => a.start - b.start)
      setSortedSessions(sortedList)
    }
  }, [userSessionsArray])

  useEffect(() => {
    sortedSessions && sortYears()
  }, [sortedSessions])

  useEffect(() => {
    years && sortMonths()
  }, [years])

  const sortYears = () => {
    let sortedYears = {}
    let year = sortedSessions[0].start.getFullYear()
    sortedYears[year] = []
    sortedSessions.forEach(session => {
      if (session.start.getFullYear() === year) {
      } else {
        year = session.start.getFullYear()
        sortedYears[year] = []
      }
      sortedYears[year].push(session)
    })
    Object.keys(sortedYears).forEach(year => {
      setMonths(prevState => {
        return {
          ...prevState,
          [year]: {},
        }
      })
      setWeeks(prevState => {
        return {
          ...prevState,
          [year]: {},
        }
      })
      setDays(prevState => {
        return {
          ...prevState,
          [year]: {},
        }
      })
    })

    setYears(sortedYears)
  }
  const sortMonths = () => {
    let sortedMonths = {}
    Object.keys(years).forEach(year => {
      let month = years[year][0].start.getMonth()
      sortedMonths[month] = []

      years[year].forEach(session => {})
    })
  }

  return (
    <div className={styles.section}>
      <GraphControllPanel />
      <BarChart type={"time"} timeSpan={years} position={0} />
    </div>
  )
}

export default StatsPage

// const sortWeeks = () => {
//   let weekObject = { 1: [] }
//   let week = 1
//   let dayOne = months[1][0].start

//   Object.keys(months).forEach(month => {
//     months[month].forEach(session => {
//       weekObject[week].push(session)
//       if (dayOne.getDate() === session.start.getDate()) {
//       } else if (session.start.getDay() === 1) {
//         week++
//         weekObject[week] = []
//         dayOne = session.start
//         weekObject[week].push(session)
//       }
//     })
//   })

//   setWeeks(weekObject)
// }
