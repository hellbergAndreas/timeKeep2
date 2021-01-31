import React, { useEffect } from "react"
import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
import TimeDisplay from "../TimeDisplay/TimeDisplay"
import styles from "./DetailedCategoryCard.module.scss"

const DetailedCategoryCard = ({ filter }) => {
  const { category, activity } = useSession()

  return (
    <div>
      <p>I am categoryCard for </p>
      <TimeDisplay filter={filter}></TimeDisplay>
    </div>
  )
}
export default DetailedCategoryCard
