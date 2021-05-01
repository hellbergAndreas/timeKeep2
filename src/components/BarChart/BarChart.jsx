import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import styles from "./BarChart.module.scss"

const BarChart = ({ timeSpan, position }) => {
  const { userActivities, userCategories } = useUser()
  const [sorted, setSorted] = useState(null)
  const [sortedActivities, setSortedActivities] = useState(false)
  const [totals, setTotals] = useState(null)
  const [thing, setThing] = useState(false)

  useEffect(() => {
    if (userCategories.length > 0 && timeSpan) {
      sorter(timeSpan[2], userCategories)
    }
  }, [timeSpan, position])

  const sorter = (list, bars) => {
    let sorted = {}
    bars.forEach((category, i) => {
      const filtered = list.filter(session => {
        return (
          session.category === bars[i].id || session.activity === bars[i].id
        )
      })
      sorted[category.name] = [...filtered]
      setSorted(sorted)
    })
  }
  const setCategory = cat => {
    let activities = userActivities.filter(act => {
      return act.parent === cat.id
    })

    sorter(sorted[cat.name], activities)
    setSortedActivities(activities)
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
      if (sortedActivities) {
        setThing(true)
      }
    }
  }, [sorted])

  const renderBars = categories => {
    console.log(categories)
    const render = categories.map((cat, i) => {
      return (
        <div key={cat.name} className={styles.bar__container}>
          <div>{cat.name}</div>
          <div
            onClick={() => setCategory(cat)}
            style={{
              height: `${totals[cat.name].percentage}%`,
            }}
            className={styles.bar}>
            {totals[cat.name].percentage}
          </div>
        </div>
      )
    })
    return render
  }

  return (
    <div className={styles.chart}>
      <div className={styles.y}>y</div>
      {totals && !thing ? renderBars(userCategories) : null}
      {sortedActivities && thing ? renderBars(sortedActivities) : null}
      <div
        style={{ gridColumn: `2 / span ${userCategories.length}` }}
        className={styles.x}>
        x
      </div>
    </div>
  )
}

export default BarChart
