import React, { useEffect, useState } from "react"
import ConfirmSession from "../../containers/ConfirmSession/ConfirmSession"
import { useAuth } from "../../context/AuthContext"
import { useCategory } from "../../context/CategoryContext"
import { useSession } from "../../context/SessionContext"
import UserKit from "../../data/UserKit"
import Button, { ButtonShape } from "./Button"
import styles from "./StartButton.module.scss"
const StartButton = () => {
  const {
    category,
    activity,
    setSession,
    timeGoes,
    setTimeGoes,
    confirmSessionHidden,
    setConfirmSessionHidden,
  } = useSession()
  const { currentUser } = useAuth()

  const [sessionComplete, setSessionComplete] = useState(false)
  const userKit = new UserKit()

  const checkIfCategoryAndActivityIsSet = () => {
    let sessionDetail = {
      category,
      activity,
    }
    if (activity === null) {
      sessionDetail.activity = "misc"
    }
    if (category === null) {
      sessionDetail.category = "misc"
    }
    return sessionDetail
  }
  const startAndStopTime = () => {
    const date = new Date()
    // const date = Date.parse(unparsed)
    if (!timeGoes) {
      setSession({ start: date })
      setTimeGoes(!timeGoes)
      setSessionComplete(false)
    }
    if (timeGoes) {
      let sessionDetail = checkIfCategoryAndActivityIsSet()
      setConfirmSessionHidden(!confirmSessionHidden)
      setSession((prevState) => {
        return {
          ...prevState,
          stop: date,
          category: sessionDetail.category,
          activity: sessionDetail.activity,
        }
      })
      setTimeGoes(!timeGoes)
      setSessionComplete(true)
    }
  }

  return (
    <div className={styles.startButton}>
      <Button shape={ButtonShape.RECT_LARGE} onClick={startAndStopTime}>
        Go
      </Button>
      {/* <button onClick={startAndStopTime}>Go</button> */}
    </div>
  )
}
export default StartButton
