import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"

const HeatMap = () => {
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
      console.log(weekObject)
    })
  }

  return <div style={{ position: "absolute" }}>I am heat</div>
}

export default HeatMap

// userSessionsArray.forEach(session => {
//   let start = new Date(session.start)

//   //   const oneJan = new Date(start.getFullYear(), 0, 1)

//   //   let firstMonday
//   //   let day = oneJan.getDay()

//   //   let i = 0
//   //   while (day + i <= 8) {
//   //     i++
//   //     firstMonday = new Date(oneJan.setDate(i))
//   //   }

//   //   const numberOfDays = Math.ceil(
//   //     (start - firstMonday) / (24 * 60 * 60 * 1000)
//   //   )
//   //   let result
//   //   if (numberOfDays < 0) {
//   //     result = 53
//   //   } else {
//   //     result = Math.floor(1 + numberOfDays / 7)
//   //   }

//   //   console.log(start, numberOfDays, result)
// })
