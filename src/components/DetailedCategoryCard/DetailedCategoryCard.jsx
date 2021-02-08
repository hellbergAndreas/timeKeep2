import React, { useEffect, useState } from "react"

import { useUser } from "../../context/UserContext"
import { getSessions } from "../../utils/getSessions"
import Header, { HeaderSize } from "../Header/Header"
import TimeDisplay from "../TimeDisplay/TimeDisplay"
import styles from "./DetailedCategoryCard.module.scss"
import cx from "classnames"
import { useSession } from "../../context/SessionContext"
const DetailedCategoryCard = ({ name, filter }) => {
  const [sessions, setSessions] = useState([])
  const { activity } = useSession()
  const { userSessions } = useUser()
  useEffect(() => {
    setSessions(getSessions(name, filter, userSessions))
  }, [name, userSessions])
  return (
    <div
      className={cx(
        styles.card,
        filter === "activity" && styles.activity,
        activity && filter === "category" ? styles.opacity : ""
      )}
    >
      <div
        className={
          activity && filter === "category" ? styles.faded : styles.hidden
        }
      ></div>
      <div className={styles.card__header}>
        <Header size={HeaderSize.HEADER_LARGE} color={"purple"}>
          {name}
        </Header>
      </div>
      <p
        className={cx(
          styles.card__item,
          activity && filter === "category" ? styles.hidden : null
        )}
      >
        sessions complete: <div className={styles.data}>{sessions.length}</div>
      </p>
      <p
        className={cx(
          styles.card__item,
          activity && filter === "category" ? styles.hidden : null
        )}
      >
        average session length: <div className={styles.data}>?</div>
      </p>
      <p
        className={cx(
          styles.card__item,
          activity && filter === "category" ? styles.hidden : null
        )}
      >
        time spent:{" "}
        <div className={styles.data}>
          <TimeDisplay name={name} filter={filter}></TimeDisplay>
        </div>
      </p>
    </div>
  )
}
export default DetailedCategoryCard
