import React, { useEffect, useState } from "react"
import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
import { getSessions } from "../../utils/getSessions"
import Header, { HeaderSize } from "../Header/Header"
import TimeDisplay from "../TimeDisplay/TimeDisplay"
import styles from "./DetailedCategoryCard.module.scss"

const DetailedCategoryCard = ({ name, filter }) => {
  const [sessions, setSessions] = useState([])
  const { userSessions } = useUser()
  useEffect(() => {
    setSessions(getSessions(name, filter, userSessions))
  }, [name, userSessions])
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <Header size={HeaderSize.HEADER_LARGE} color={"black"}>
          {name}
        </Header>
      </div>
      <p>sessions complete: {sessions.length}</p>
      <div>
        time spent: <TimeDisplay name={name} filter={filter}></TimeDisplay>
      </div>
    </div>
  )
}
export default DetailedCategoryCard
