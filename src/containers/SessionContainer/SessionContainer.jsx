import React, { useEffect, useState } from "react"
import DeleteModal from "../../components/DeleteModal/DeleteModal"
import Session from "../../components/Session/Session"

import styles from "./SessionContainer.module.scss"
const SessionContainer = ({ list, handleClick, handleDelete }) => {
  const [sortedList, setSortedList] = useState([])
  const [reversed, setReversed] = useState(false)
  const [deleteModal, setDeleteModal] = useState(false)
  const [numberSessions, setNumberSessions] = useState(0)
  useEffect(() => {
    let sortedSessions = list.sort((a, b) => b.start - a.start)
    setSortedList(sortedSessions)
    setReversed(true)
  }, [list])

  const reverseSort = () => {
    let reverseSort
    if (reversed) {
      reverseSort = sortedList.sort((a, b) => a.start - b.start)
      setReversed(false)
    }
    if (!reversed) {
      reverseSort = sortedList.sort((a, b) => b.start - a.start)
      setReversed(true)
    }
    setSortedList(reverseSort)
  }

  useEffect(() => {
    setNumberSessions(sortedList.length)
  }, [sortedList])

  const onClick = session => {
    handleClick(session)
  }

  return (
    <div className={styles.wrapper}>
      {deleteModal && <DeleteModal />}

      <button className={styles.btn} onClick={reverseSort}>
        Reverse
      </button>
      <div className={styles.wrapper__container}>
        <div>{numberSessions} sessions found</div>
        {list.map(session => {
          let failed = []
          if (!session.activity) {
            failed.push(session)
          } else {
            return (
              <div onClick={() => onClick(session)} key={session.start}>
                <Session handleDelete={handleDelete} session={session} />
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
export default SessionContainer
