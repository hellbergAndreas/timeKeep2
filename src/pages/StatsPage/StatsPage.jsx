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
    setYears(sortedYears)
  }

  return (
    <div className={styles.section}>
      <GraphControllPanel />
      <BarChart type={"time"} data={years} position={0} />
    </div>
  )
}

export default StatsPage
