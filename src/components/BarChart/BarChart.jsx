import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import styles from "./BarChart.module.scss"
import HeatMap from "../HeatMap/HeatMap"
import Yaxis from "../Yaxis/Yaxis"
import ChartTotalPopup from "../ChartTotalPopup/ChartTotalPopup"
import { msConverter } from "../../utils/msConverter"

const BarChart = ({ data, mode, toggleChart }) => {
  const [totals, setTotals] = useState(null)
  const [timeSpan, setTimeSpan] = useState("years")
  const [timeTracker, setTimeTracker] = useState(1)
  const { userActivities, userCategories } = useUser(null)
  const [renderData, setRenderData] = useState()
  const [heatMap, setHeatMap] = useState(false)
  const [grandTotal, setGrandTotal] = useState()
  const [popup, setPopup] = useState()

  const [year, setYear] = useState()
  const [month, setMonth] = useState()
  const [week, setWeek] = useState()

  const [yearDisplay, setYearDisplay] = useState(null)

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
    setGrandTotal(grandTotal)
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

  useEffect(() => {
    let styleSheet = document.styleSheets[0]
    console.log(styleSheet)
  }, [popup])

  const getRandomNubmer = () => {
    return Math.floor(Math.random() * 3 + 1)
  }

  return (
    <div className={styles.container}>
      <div className={styles.panel}>
        <div></div>
        <div className={styles.buttons}>
          {!heatMap && (
            <div
              className={styles.btn}
              onClick={() => changeTimeSpan(null, -1)}>
              Back
            </div>
          )}

          {!heatMap && (
            <div className={styles.btn} onClick={() => toggleChart(mode)}>
              Toggle Chart
            </div>
          )}
          <div className={styles.btn} onClick={() => setHeatMap(!heatMap)}>
            {!heatMap ? "Bring the Heat" : "Turn of the Heat"}
          </div>
        </div>
      </div>
      <div className={styles.chart__container}>
        <div className={!heatMap && styles.chart}>
          {!heatMap && <Yaxis value={grandTotal} />}
          {totals &&
            !heatMap &&
            Object.keys(totals).map(bar => {
              const { hours } = msConverter(totals[bar].time)
              return (
                <div key={bar} className={styles.bar__container}>
                  <div className={styles.x}>{bar}</div>
                  <div
                    className={styles.barWrapper}
                    style={{
                      height: `${totals[bar] && totals[bar].percentage}%`,
                      display: "flex",
                      flexDirection: "column-reverse",
                      position: "relative",
                    }}>
                    <div className={styles.total}>{hours} h</div>
                    <div
                      style={{
                        animationDuration: `${getRandomNubmer()}s`,
                      }}
                      className={styles.bar}
                      onClick={() => !mode && changeTimeSpan(bar)}></div>
                  </div>
                </div>
              )
            })}
          {heatMap && <HeatMap data={renderData} />}
        </div>
      </div>
    </div>
  )
}
export default BarChart
