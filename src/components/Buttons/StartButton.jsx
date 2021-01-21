import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useCategory } from "../../context/CategoryContext"
import UserKit from "../../data/UserKit"
import Button, { ButtonShape } from "./Button"

const StartButton = () => {
  const {
    category,
    activity,
    session,
    setSession,
    timeGoes,
    setTimeGoes,
  } = useCategory()
  const { currentUser } = useAuth()
  const [sessionComplete, setSessionComplete] = useState(false)
  const userKit = new UserKit()

  const handleClick = () => {
    const date = new Date()
    if (!timeGoes) {
      console.log("start time")
      setSession({ start: date })
      setTimeGoes(!timeGoes)
      setSessionComplete(false)
    }
    if (timeGoes) {
      console.log("stop time")
      setSession((prevState) => {
        return {
          ...prevState,
          stop: date,
          category,
          activity,
        }
      })
      setTimeGoes(!timeGoes)
      setSessionComplete(true)
    }
  }
  useEffect(() => {
    if (sessionComplete) {
      userKit.addSession(session, currentUser.uid)
    }
  }, [sessionComplete])

  return (
    <Button
      color={"green"}
      shape={ButtonShape.ROUND_LARGE}
      onClick={handleClick}
    >
      Go
    </Button>
  )
}
export default StartButton

// setSession((prevState) => {
//   return {
//     start: !timeGoes ? date : prevState.start,
//     stop: timeGoes && date,
//     category,
//     activity,
//     time: timeGoes && date - prevState.start,
//   }
// })
// setTimeGoes(!timeGoes)
// if (timeGoes) {
//   setSesssionComplete(false)
// }
