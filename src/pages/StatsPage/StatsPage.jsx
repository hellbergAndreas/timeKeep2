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
    sortedSessions && sortData()
  }, [sortedSessions])

  // const dummy = {
  //   years: {
  //     2020: [],
  //   },
  //   months: {
  //     2020: {
  //       jan: [],
  //       feb: [],
  //     },
  //   },
  //   weeks: {
  //     2020: {
  //       jan: {
  //         1: [],
  //         2: [],
  //       },
  //     },
  //   },
  //   days: {
  //     2020: {
  //       jan: {
  //         1: {
  //           mon: [],
  //           tue: [],
  //         },
  //       },
  //     },
  //   },
  // }
  const sortData = () => {
    let sorted = {
      years: [],
      months: {},
      weeks: {},
      days: {},
    }
    sorted.years = sortYears()
    Object.keys(sorted.years).forEach(year => {
      sorted.months[year] = {}
      sorted.weeks[year] = {}
      sorted.days[year] = {}
    })
    Object.keys(sorted.months).forEach(year => {
      sorted.months[year] = sortMonths(sorted.years[year])
    })
    console.log(sorted.months)
  }

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
    return sortedYears
  }
  const sortMonths = data => {
    const monthNames = {
      0: "jan",
      1: "feb",
      2: "mar",
      3: "apr",
      4: "may",
      5: "jun",
      6: "jul",
      7: "aug",
      8: "sep",
      9: "oct",
      10: "nov",
      11: "dec",
    }
    let sortedMonths = {
      jan: [],
      feb: [],
      mar: [],
      apr: [],
      may: [],
      jun: [],
      jul: [],
      aug: [],
      sep: [],
      oct: [],
      nov: [],
      dec: [],
    }
    data.forEach(session => {
      sortedMonths[monthNames[session.start.getMonth()]].push(session)
    })
    return sortedMonths
  }

  return (
    <div className={styles.section}>
      <GraphControllPanel />
      <BarChart type={"time"} data={years} position={0} />
    </div>
  )
}

export default StatsPage
