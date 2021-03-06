import React, { useEffect, useState } from "react"
import BarChart from "../../components/BarChart/BarChart"
import GraphControllPanel from "../../components/GraphControllPanel/GraphControllPanel"
import Graph from "../../containers/Graph/Graph"
import { useUser } from "../../context/UserContext"

import styles from "./StatsPage.module.scss"
const StatsPage = () => {
  const { userSessionsArray } = useUser()

  const [sortedSessions, setSortedSessions] = useState(null)
  const [sortedData, setSortedData] = useState(null)
  const [mode, setMode] = useState(null)

  useEffect(() => {
    if (userSessionsArray.length !== 0) {
      const sortedList = userSessionsArray.sort((a, b) => a.start - b.start)
      setSortedSessions(sortedList)
    }
  }, [userSessionsArray])

  useEffect(() => {
    sortedSessions && sortData()
  }, [sortedSessions])

  const sortData = () => {
    let years
    let months = {}
    let weeks = {}
    let days = {}

    years = sortYears()

    Object.keys(years).forEach(year => {
      months[year] = {}
      weeks[year] = {}
      days[year] = {}
      months[year] = sortMonths(years[year])
    })

    Object.keys(months).forEach(year => {
      Object.keys(months[year]).forEach(month => {
        days[year][month] = {}
        weeks[year][month] = sortWeeks(months[year][month])
      })
    })

    Object.keys(years).forEach(year => {
      Object.keys(weeks[year]).forEach(month => {
        Object.keys(weeks[year][month]).forEach(week => {
          days[year][month][week] = sortDays(weeks[year][month][week])
        })
      })
    })
    setSortedData({ years, months, weeks, days })
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

  const sortWeeks = data => {
    let sortedWeeks = {
      1: [],
      2: [],
      3: [],
      4: [],
      5: [],
    }
    let week = 1
    let firstDay

    if (data[0] != undefined) {
      firstDay = data[0].start.getDate()
      data.forEach(session => {
        if (session.start.getDate() === firstDay) {
        }
        if (
          session.start.getDate() != firstDay &&
          session.start.getDay() === 1
        ) {
          firstDay = session.start.getDate()
          week++
          sortedWeeks[week] = []
          sortedWeeks[week].push(session)
        }
        if (!sortedWeeks[week].includes(session)) {
          sortedWeeks[week].push(session)
        }
      })
    }
    return sortedWeeks
  }

  const sortDays = data => {
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
    data.forEach(session => {
      sortedDays[names[session.start.getDay()]].push(session)
    })
    return sortedDays
  }

  const toggleChart = current => {
    if (current === "activities") {
      setMode(null)
    }

    if (current === null) {
      setMode("activities")
    }
  }
  useEffect(() => {
    if (sortedData) {
      let theOne = "_fn0xh1rwh_96tb6twjn"
      let ok = []

      userSessionsArray.forEach(session => {
        if (session.start.getHours() < 10) {
          ok.push(session)
        }
      })
    }
  }, [sortedData])
  return (
    <div className={styles.section}>
      <BarChart
        data={sortedData && sortedData}
        mode={mode}
        toggleChart={toggleChart}
      />
    </div>
  )
}

export default StatsPage
