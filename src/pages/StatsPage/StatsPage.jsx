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
  const [months, setMonths] = useState(null)
  const [weeks, setWeeks] = useState(null)

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
    years && sortYears("months")
  }, [years])
  useEffect(() => {
    months && sortWeeks()
  }, [months])

  const sortYears = arg => {
    let groupedSessions = { 1: [] }
    let yearOne
    arg
      ? (yearOne = sortedSessions[0].start.getMonth())
      : (yearOne = sortedSessions[0].start.getFullYear())
    let year = 1

    sortedSessions.forEach(session => {
      if (
        arg
          ? session.start.getMonth() === yearOne
          : session.start.getFullYear() === yearOne
      ) {
      } else {
        year++
        groupedSessions[year] = []
        arg
          ? (yearOne = session.start.getMonth())
          : (yearOne = session.start.getFullYear())
      }
      groupedSessions[year].push(session)
    })
    arg ? setMonths(groupedSessions) : setYears(groupedSessions)
  }

  const sortWeeks = () => {
    let weekObject = { 1: [] }
    let week = 1
    let dayOne = months[1][0].start

    Object.keys(months).forEach(month => {
      months[month].forEach(session => {
        weekObject[week].push(session.start)
        if (dayOne.getDate() === session.start.getDate()) {
        } else if (session.start.getDay() === 1) {
          week++
          weekObject[week] = []
          dayOne = session.start
          weekObject[week].push(session.start)
        }
      })
    })
  }

  return (
    <div className={styles.section}>
      <GraphControllPanel />
      <BarChart timeSpan={years} />
    </div>
  )
}

export default StatsPage
