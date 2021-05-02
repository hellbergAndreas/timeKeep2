import React, { useState } from "react"

const BarChart = ({ timeSpan }) => {
  const [months, setMonths] = useState(null)
  const sortMonths = year => {
    let sortedMonths = {}
    let month = timeSpan[year][0].start.getMonth()
    sortedMonths[month] = []
    timeSpan[year].forEach(session => {
      if (session.start.getMonth() === month) {
      } else {
        month = session.start.getMonth()
        sortedMonths[month] = []
      }
      sortedMonths[month].push(session)
    })
    setMonths(sortedMonths)
  }

  const sortWeeks = month => {
    let sortedWeeks = {
      1: [],
    }

    let week = 1
    let firstDay = months[month][0].start.getDate()

    months[month].forEach(session => {
      if (session.start.getDate() === firstDay) {
      }
      if (session.start.getDate() != firstDay && session.start.getDay() === 1) {
        firstDay = session.start.getDate()
        week++
        sortedWeeks[week] = []
        sortedWeeks[week].push(session.start)
      }
      sortedWeeks[week].push(session.start)
    })
    console.log(sortedWeeks)
    // Object.keys(months).forEach(month => {
    //   months[month].forEach(session => {
    //     sortedWeeks[week].push(session)
    //     if (dayOne.getDate() === session.start.getDate()) {
    //     } else if (session.start.getDay() === 1) {
    //       week++
    //       sortedWeeks[week] = []
    //       dayOne = session.start
    //       sortedWeeks[week].push(session)
    //     }
    //   })
    // })
  }

  return (
    <div>
      {timeSpan &&
        Object.keys(timeSpan).map(year => {
          return <div onClick={() => sortMonths(year)}>{year}</div>
        })}
      {months &&
        Object.keys(months).map(month => {
          return <div onClick={() => sortWeeks(month)}>{month}</div>
        })}
    </div>
  )
}

export default BarChart

// import React, { useEffect, useState } from "react"
// import { useUser } from "../../context/UserContext"
// import { calculateTotalTime } from "../../utils/calculateTotalTime"
// import { msConverter } from "../../utils/msConverter"
// import styles from "./BarChart.module.scss"

// const BarChart = ({ type, timeSpan, position }) => {
//   const { userActivities, userCategories } = useUser()
//   const [bars, setBars] = useState([])
//   const [sorted, setSorted] = useState(null)
//   const [totals, setTotals] = useState(null)
//   const [done, setDone] = useState(false)
//   const [isCategory, setIsCategory] = useState(true)
//   const [isMonth, setIsMonth] = useState(false)

//   const months = [
//     { name: 1 },
//     { name: 2 },
//     { name: 3 },
//     { name: 4 },
//     { name: 5 },
//     { name: 6 },
//     { name: 7 },
//     { name: 8 },
//     { name: 9 },
//     { name: 10 },
//     { name: 11 },
//     { name: 12 },
//   ]
//   const weeks = [
//     { name: 1 },
//     { name: 2 },
//     { name: 3 },
//     { name: 4 },
//     { name: 5 },
//   ]

//   useEffect(() => {
//     if (type === "categories" && timeSpan) {
//       sortCategory()
//     } else if (type === "time" && timeSpan) {
//       sortYears()
//     }
//   }, [type, timeSpan])

//   const sortYears = () => {
//     setDone(false)
//     let newBars = []

//     Object.keys(timeSpan).forEach(key => {
//       newBars = [...newBars, { name: timeSpan[key][0].start.getFullYear() }]
//     })

//     setBars(newBars)
//   }
//   const sortCategory = cat => {
//     setDone(false)
//     let newBars = []
//     if (isCategory) {
//       userCategories.forEach(cat => {
//         newBars = [...newBars, { name: cat.name, id: cat.id }]
//       })
//     } else {
//       newBars = userActivities.filter(act => {
//         return act.parent === cat.id
//       })
//     }
//     setBars(newBars)
//   }
//   useEffect(() => {
//     if (position === 0 && bars.length > 0 && !isMonth) {
//       sorter(timeSpan, bars)
//     }
//     if (bars.length > 0 && position > 0) {
//       sorter(timeSpan[position], bars)
//     }
//   }, [bars])

//   const sorter = (list, bars) => {
//     let sorted = {}
//     if (type === "categories") {
//       bars.forEach((bar, i) => {
//         const filtered = list.filter(session => {
//           return session.category === bar.id || session.activity === bar.id
//         })
//         sorted[bar.name] = [...filtered]
//       })
//     }
//     if (type === "time") {
//       bars.forEach((bar, i) => {
//         sorted[bar.name] = list[i + 1]
//       })
//     }
//     console.log(sorted)
//     setSorted(sorted)
//   }

//   useEffect(() => {
//     if (sorted) {
//       let grandTotal = 0
//       let totals = {}

//       Object.keys(sorted).forEach(key => {
//         grandTotal += calculateTotalTime(sorted[key])

//         totals = {
//           ...totals,
//           [key]: { time: calculateTotalTime(sorted[key]) },
//         }
//       })

//       Object.keys(totals).forEach(key => {
//         totals[key].percentage =
//           Math.round((totals[key].time / grandTotal) * 100 * 10) / 10
//       })

//       setTotals(totals)
//       setDone(true)
//     }
//   }, [sorted])

//   const sortMonths = year => {
//     setDone(false)
//     let sortedMonths = {}

//     year.forEach(session => {
//       sortedMonths[session.start.getMonth() + 1] = []
//     })
//     year.forEach(session => {
//       sortedMonths[session.start.getMonth() + 1].push(session)
//     })

//     setIsMonth(!isMonth)
//     setBars(months)
//     setSorted(sortedMonths)
//   }
//   const displayTime = time => {
//     const { hours } = msConverter(time)
//     return hours
//   }
//   const renderBars = () => {
//     const render = bars.map((bar, i) => {
//       return (
//         <div key={bar.name} className={styles.bar__container}>
//           <div>{bar.name}</div>
//           <div
//             onClick={() => {
//               if (type === "categories") {
//                 setIsCategory(!isCategory)
//                 sortCategory(bar)
//               }
//               if (type === "time") {
//                 sortMonths(sorted[bar.name])
//               }
//             }}
//             style={{
//               height: `${totals[bar.name] && totals[bar.name].percentage}%`,
//             }}
//             className={styles.bar}>
//             {totals[bar.name] && displayTime(totals[bar.name].time)}
//           </div>
//         </div>
//       )
//     })
//     return render
//   }

//   return (
//     <div className={styles.chart}>
//       <div className={styles.y}>y</div>
//       {totals && done && renderBars()}
//     </div>
//   )
// }

// export default BarChart
