import React, { useEffect, useState } from "react"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import styles from "./BarChart.module.scss"

const BarChart = ({ data }) => {
  const [totals, setTotals] = useState(null)
  const [timeSpan, setTimeSpan] = useState("years")
  const [timeTracker, setTimeTracker] = useState(1)
  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [week, setWeek] = useState()
  useEffect(() => {
    data && countTotals(data[timeSpan])
  }, [data])

  const countTotals = sessions => {
    let grandTotal = 0
    let totals = {}
    Object.keys(sessions).forEach(key => {
      grandTotal += calculateTotalTime(sessions[key])

      totals = {
        ...totals,
        [key]: { time: calculateTotalTime(sessions[key]) },
      }
    })

    Object.keys(totals).forEach(key => {
      totals[key].percentage =
        Math.round((totals[key].time / grandTotal) * 100 * 10) / 10
    })
    setTotals(totals)
  }
  const changeTimeSpan = bar => {
    let counter = timeTracker
    counter === 1 && setYear(bar)
    counter === 2 && setMonth(bar)
    counter === 3 && setWeek(bar)

    const tracker = {
      1: "years",
      2: "months",
      3: "weeks",
      4: "days",
    }
    if (counter === 4) {
      counter = 1
    } else {
      counter++
    }
    if (counter === 1) {
      countTotals(data[tracker[counter]])
    }
    if (counter === 2) {
      countTotals(data[tracker[counter]][bar])
    }
    if (counter === 3) {
      countTotals(data[tracker[counter]][year][bar])
    }
    if (counter === 4) {
      countTotals(data[tracker[counter]][year][month][bar])
    }
    // counter === 3 && console.log(data[tracker[counter]][year][bar])
    setTimeTracker(counter)
  }
  // useEffect(() => {
  //   console.log(year, month, week)
  // }, [year, month, week])
  return (
    <div className={styles.container}>
      <div>Back</div>
      <div className={styles.chart}>
        <div className={styles.y}>y</div>
        {totals &&
          Object.keys(totals).map(bar => {
            return (
              <div key={bar} className={styles.bar__container}>
                <div>{bar}</div>
                <div
                  style={{
                    height: `${totals[bar] && totals[bar].percentage}%`,
                  }}
                  className={styles.bar}
                  onClick={() => changeTimeSpan(bar)}></div>
              </div>
            )
          })}
      </div>
      <div>Next</div>
    </div>
  )
}
export default BarChart
// const BarChart = ({ data }) => {
//   const [months, setMonths] = useState(null)
//   const [activeInterval, setActiveInterval] = useState(null)
//   const [weeks, setWeeks] = useState(null)
//   const [days, setDays] = useState(null)
//   const [totals, setTotals] = useState(null)
//   const [timeSpan, setTimeSpan] = useState(null)
//   const [spanTracker, setSpanTracker] = useState(0)
//   const sortMonths = year => {
//     const names = {
//       0: "jan",
//       1: "feb",
//       2: "mar",
//       3: "apr",
//       4: "may",
//       5: "jun",
//       6: "jul",
//       7: "aug",
//       8: "sep",
//       9: "oct",
//       10: "nov",
//       11: "dec",
//     }
//     let sortedMonths = {
//       jan: [],
//       feb: [],
//       mar: [],
//       apr: [],
//       may: [],
//       jun: [],
//       jul: [],
//       aug: [],
//       sep: [],
//       oct: [],
//       nov: [],
//       dec: [],
//     }
//     data[year].forEach(session => {
//       sortedMonths[names[session.start.getMonth()]].push(session)
//     })
//     setActiveInterval(year)
//     setTimeSpan(sortedMonths)
//     setMonths(sortedMonths)
//   }

//   const sortWeeks = month => {
//     let sortedWeeks = {
//       1: [],
//       2: [],
//       3: [],
//       4: [],
//       5: [],
//     }
//     let week = 1
//     let firstDay = months[month][0].start.getDate()
//     months[month].forEach(session => {
//       if (session.start.getDate() === firstDay) {
//       }
//       if (session.start.getDate() != firstDay && session.start.getDay() === 1) {
//         firstDay = session.start.getDate()
//         week++
//         sortedWeeks[week] = []
//         sortedWeeks[week].push(session)
//       }
//       sortedWeeks[week].push(session)
//     })
//     setActiveInterval(month)
//     setTimeSpan(sortedWeeks)
//     setWeeks(sortedWeeks)
//   }

//   const sortDays = week => {
//     const names = {
//       0: "sun",
//       1: "mon",
//       2: "tue",
//       3: "wed",
//       4: "thu",
//       5: "fri",
//       6: "sat",
//     }
//     let sortedDays = {
//       mon: [],
//       tue: [],
//       wed: [],
//       thu: [],
//       fri: [],
//       sat: [],
//       sun: [],
//     }

//     weeks[week].forEach(session => {
//       sortedDays[names[session.start.getDay()]].push(session)
//     })
//     setActiveInterval(week)
//     setTimeSpan(sortedDays)
//     setDays(sortedDays)
//   }

//   const countTotals = sessions => {
//     let grandTotal = 0
//     let totals = {}
//     Object.keys(sessions).forEach(key => {
//       grandTotal += calculateTotalTime(sessions[key])

//       totals = {
//         ...totals,
//         [key]: { time: calculateTotalTime(sessions[key]) },
//       }
//     })

//     Object.keys(totals).forEach(key => {
//       totals[key].percentage =
//         Math.round((totals[key].time / grandTotal) * 100 * 10) / 10
//     })
//     setTotals(totals)
//   }
//   useEffect(() => {
//     data && setTimeSpan(data)
//   }, [data])
//   useEffect(() => {
//     timeSpan && countTotals(timeSpan)
//   }, [timeSpan])

//   const renderNext = bar => {
//     let tracker = spanTracker
//     if (spanTracker === 0) {
//       sortMonths(bar)
//     }
//     if (spanTracker === 1) {
//       sortWeeks(bar)
//     }
//     if (spanTracker === 2) {
//       sortDays(bar)
//     }
//     if (spanTracker <= 2) {
//       tracker++
//     } else {
//       setTimeSpan(data)
//       tracker = 0
//     }

//     setSpanTracker(tracker)
//   }

//   const renderChart = data => {
//     let render = Object.keys(data).map(bar => {
//       return (
//         <div key={bar} className={styles.bar__container}>
//           <div>{bar}</div>
//           <div
//             onClick={e => renderNext(bar)}
//             style={{
//               height: `${totals[bar] && totals[bar].percentage}%`,
//             }}
//             className={styles.bar}></div>
//         </div>
//       )
//     })
//     return render
//   }

//   const nextChart = action => {
//     const previous = {
//       1: {
//         data: data,
//         method: i => {
//           setTimeSpan(data)
//           sortMonths(i)
//         },
//       },
//       2: {
//         data: months,
//         method: i => {
//           sortWeeks(i)
//         },
//       },
//       3: {
//         data: weeks,
//         method: i => {
//           sortDays(i)
//         },
//       },
//     }
//     let array = Object.keys(previous[spanTracker].data)
//     let i = array.indexOf(activeInterval) + action
//     previous[spanTracker].method(array[i])
//   }

//   return (
//     <div className={styles.container}>
//       <div onClick={() => nextChart(-1)}>Back</div>
//       <div className={styles.chart}>
//         <div className={styles.y}>y</div>
//         {timeSpan && totals && renderChart(timeSpan)}
//       </div>
//       <div onClick={() => nextChart(1)}>Next</div>
//     </div>
//   )
// }

// export default BarChart
