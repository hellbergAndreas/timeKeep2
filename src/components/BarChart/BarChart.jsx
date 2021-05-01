import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import styles from "./BarChart.module.scss"

const BarChart = ({ type, timeSpan, position }) => {
  const { userActivities, userCategories } = useUser()
  const [bars, setBars] = useState([])
  const [sorted, setSorted] = useState(null)
  const [totals, setTotals] = useState(null)
  const [done, setDone] = useState(false)
  const [isCategory, setIsCategory] = useState(true)
  const [isYear, setIsYear] = useState(true)

  useEffect(() => {
    if (type === "categories" && timeSpan) {
      setCategory()
    } else if (type === "time" && timeSpan) {
      setYears()
    }
  }, [type, timeSpan])

  const setYears = () => {
    let newBars = []
    if (isYear) {
      Object.keys(timeSpan).forEach(key => {
        newBars = [...newBars, { name: timeSpan[key][0].start.getFullYear() }]
      })
      setBars(newBars)
    }
  }
  const setCategory = cat => {
    setDone(false)
    let newBars = []
    if (isCategory) {
      userCategories.forEach(cat => {
        newBars = [...newBars, { name: cat.name, id: cat.id }]
      })
    } else {
      newBars = userActivities.filter(act => {
        return act.parent === cat.id
      })
    }
    setBars(newBars)

    // let bars = [
    //   "jan",
    //   "feb",
    //   "mar",
    //   "apr",
    //   "may",
    //   "jun",
    //   "jul",
    //   "aug",
    //   "sep",
    //   "oct",
    //   "nov",
    //   "dec",
    // ]
  }
  useEffect(() => {
    if (position === 0 && bars.length > 0) {
      sorter(timeSpan, bars)
    } else if (bars.length > 0 && position > 0) {
      sorter(timeSpan[position], bars)
    }
  }, [bars])

  // useEffect(() => {
  //   if (userCategories.length > 0 && timeSpan && type === "categories") {
  //     sorter(timeSpan[1], userCategories)
  //   } else if (timeSpan && type === "time") {
  //   Object.keys(timeSpan).forEach(year => {
  //     setBarYears(prevState => {
  //       return [...prevState, timeSpan[year][0].start.getFullYear()]
  //     })
  //   })
  //   }
  // }, [timeSpan, position])

  const sorter = (list, bars) => {
    let sorted = {}

    if (type === "categories") {
      bars.forEach((bar, i) => {
        const filtered = list.filter(session => {
          return session.category === bar.id || session.activity === bar.id
        })
        sorted[bar.name] = [...filtered]
      })
      setSorted(sorted)
    } else if (type === "time") {
      bars.forEach((bar, i) => {
        sorted[bar.name] = list[i + 1]
      })

      setSorted(sorted)
    }
  }

  useEffect(() => {
    if (sorted) {
      let grandTotal = 0
      let totals = {}

      Object.keys(sorted).forEach(key => {
        grandTotal += calculateTotalTime(sorted[key])

        totals = {
          ...totals,
          [key]: { time: calculateTotalTime(sorted[key]) },
        }
      })

      Object.keys(totals).forEach(key => {
        totals[key].percentage =
          Math.round((totals[key].time / grandTotal) * 100 * 10) / 10
      })

      setTotals(totals)
      setDone(true)
    }
  }, [sorted])

  const renderBars = bars => {
    const render = bars.map((bar, i) => {
      return (
        <div key={bar.name} className={styles.bar__container}>
          <div>{bar.name}</div>
          <div
            onClick={() => {
              setIsCategory(!isCategory)
              setCategory(bar)
            }}
            style={{
              height: `${totals[bar.name].percentage}%`,
            }}
            className={styles.bar}>
            {totals[bar.name].percentage}
          </div>
        </div>
      )
    })
    return render
  }

  return (
    <div className={styles.chart}>
      <div className={styles.y}>y</div>
      {totals && done && renderBars(bars)}

      <div
        style={{ gridColumn: `2 / span ${userCategories.length}` }}
        className={styles.x}>
        x
      </div>
    </div>
  )
}

export default BarChart
