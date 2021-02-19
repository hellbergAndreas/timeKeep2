import React, { useEffect, useState } from "react"

import { useUser } from "../../context/UserContext"
import { getSessions } from "../../utils/getSessions"
import Header, { HeaderSize } from "../Header/Header"
import TimeDisplay from "../TimeDisplay/TimeDisplay"
import styles from "./DetailedCategoryCard.module.scss"
import cx from "classnames"
import { useSession } from "../../context/SessionContext"
const DetailedCategoryCard = ({ category, filter }) => {
  const [sessions, setSessions] = useState([])
  const { activity } = useSession()
  const { userSessionsArray } = useUser()

  useEffect(() => {
    setSessions(getSessions(category.id, filter, userSessionsArray))
  }, [category, userSessionsArray])
  return (
    <div
      className={cx(
        styles.card,
        filter === "activity" && styles.activity,
        activity.id && filter === "category" ? styles.opacity : ""
      )}
    >
      <div
        className={
          activity.id && filter === "category" ? styles.faded : styles.hidden
        }
      ></div>
      <div className={styles.card__header}>
        <Header size={HeaderSize.HEADER_LARGE} color={"purple"}>
          {category.name}
        </Header>
      </div>
      <p
        className={cx(
          styles.card__item,
          activity.id && filter === "category" ? styles.hidden : null
        )}
      >
        sessions complete: <div className={styles.data}>{sessions.length}</div>
      </p>
      <p
        className={cx(
          styles.card__item,
          activity.id && filter === "category" ? styles.hidden : null
        )}
      >
        average session length: <div className={styles.data}>?</div>
      </p>
      <p
        className={cx(
          styles.card__item,
          activity.id && filter === "category" ? styles.hidden : null
        )}
      >
        time spent:
        <div className={styles.data}>
          <TimeDisplay name={category.id} filter={filter}></TimeDisplay>
        </div>
      </p>
    </div>
  )
}
export default DetailedCategoryCard
