import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import styles from "./BarChart.module.scss"
import HeatMap from "../HeatMap/HeatMap"

const BarChart = ({ data, mode, toggleChart }) => {
  const [totals, setTotals] = useState(null)
  const [timeSpan, setTimeSpan] = useState("years")
  const [timeTracker, setTimeTracker] = useState(1)
  const { userActivities, userCategories } = useUser(null)
  const [renderData, setRenderData] = useState()
  const [heatMap, setHeatMap] = useState(true)

  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [week, setWeek] = useState()

  useEffect(() => {
    data && !mode && setRenderData(data[timeSpan])
  }, [data])

  useEffect(() => {
    renderData && countTotals(renderData)
  }, [renderData, mode])

  useEffect(() => {
    mode && totals && getBars(userCategories)
  }, [userCategories, mode, renderData])

  const getBars = bars => {
    let tartar = {}
    Object.keys(bars).forEach(bar => {
      tartar[bars[bar].name] = []
    })

    sortByCategories(tartar)
  }

  const sortByCategories = newBars => {
    let sortedByCategories = newBars
    const spans = renderData
    let name = "categoryName"
    Object.keys(spans).forEach(span => {
      spans[span].forEach(session => {
        sortedByCategories[session[name]].push(session)
      })
    })
    countTotals(sortedByCategories)
  }

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
  const changeTimeSpan = (span, goBack) => {
    let counter = timeTracker
    const tracker = {
      1: "years",
      2: "months",
      3: "weeks",
      4: "days",
    }
    if (goBack) {
      counter === 1 ? (counter = 1) : (counter += goBack)
    }
    if (!goBack) {
      counter === 1 && setYear(span)
      counter === 2 && setMonth(span)
      counter === 3 && setWeek(span)
      if (counter === 4) {
        counter = 1
      } else {
        counter++
      }
    }
    if (counter === 1) {
      setRenderData(data[tracker[counter]])
    }
    if (counter === 2) {
      if (goBack) {
        setRenderData(data[tracker[counter]][year])
      } else {
        setRenderData(data[tracker[counter]][span])
      }
    }
    if (counter === 3) {
      if (goBack) {
        setRenderData(data[tracker[counter]][year][month])
      } else {
        setRenderData(data[tracker[counter]][year][span])
      }
    }
    if (counter === 4) {
      setRenderData(data[tracker[counter]][year][month][span])
    }

    setTimeTracker(counter)
  }

  return (
    <div className={styles.container}>
      <div onClick={() => changeTimeSpan(null, -1)}>Back</div>
      <div className={!heatMap && styles.chart}>
        <div className={styles.y}>y</div>
        {totals &&
          !mode &&
          !heatMap &&
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
        {mode &&
          !heatMap &&
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
        {heatMap && <HeatMap data={renderData} />}
      </div>
      <div
        style={{ cursor: "pointer", height: "50px" }}
        onClick={() => toggleChart(mode)}>
        toggle me
      </div>
      <div
        style={{ cursor: "pointer", height: "50px" }}
        onClick={() => setHeatMap(!heatMap)}>
        Bring the heat
      </div>
    </div>
  )
}
export default BarChart

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
