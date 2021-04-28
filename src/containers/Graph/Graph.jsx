import React, { useEffect } from "react"
import BarChart from "../../components/BarChart/BarChart"

const Graph = ({ timeSpan, type }) => {
  return (
    <div>
      <BarChart timeSpan={timeSpan} />
    </div>
  )
}

export default Graph
