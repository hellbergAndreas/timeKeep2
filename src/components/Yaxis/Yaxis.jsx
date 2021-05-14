import React, { useEffect, useState } from "react"
import { msConverter } from "../../utils/msConverter"
import styles from "./Yaxis.module.scss"

const Yaxis = ({ value }) => {
  const [values, setValues] = useState()
  useEffect(() => {
    let values = [0]
    if (value) {
      console.log(value)
      let percentage = 0

      for (let i = 0; i < 5; i++) {
        const { hours } = msConverter((percentage += value * 0.2))
        values.push(hours)
      }
      setValues(values)
    }
    const { hours } = msConverter(491313357)
    console.log(hours)
  }, [value])
  return (
    <div className={styles.y}>
      {values &&
        values.map(value => {
          return <div className={styles.value}>{value}</div>
        })}
    </div>
  )
}

export default Yaxis
