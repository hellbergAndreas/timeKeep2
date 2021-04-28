import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import { calculateTotalTime } from "../../utils/calculateTotalTime"
import styles from "./BarChart.module.scss"

const BarChart = ({ timeSpan }) => {
  const { userActivities, userCategories } = useUser()
  const [sorted, setSorted] = useState(null)
  const [totals, setTotals] = useState(null)
  useEffect(() => {
    if (userCategories.length > 0 && timeSpan) {
      let sorted = {}

      userCategories.forEach((category, i) => {
        Object.keys(timeSpan).forEach(key => {
          const filtered = timeSpan[key].filter(session => {
            return session.category === userCategories[i].id
          })
          sorted[category.name] = [...filtered]
        })
      })
      setSorted(sorted)
    }
  }, [timeSpan])

  useEffect(() => {
    let totals = []
    sorted &&
      Object.keys(sorted).forEach(key => {
        let total = calculateTotalTime(sorted[key])
        totals.push(total)
      })
    setTotals(totals)
  }, [sorted])

  useEffect(() => {
    console.log(totals)
  })

  return (
    <div className={styles.chart}>
      {userCategories.map((cat, i) => {
        return (
          <div key={cat.name}>
            {cat.name}
            {totals[i]}
          </div>
        )
      })}
    </div>
  )
}

export default BarChart
