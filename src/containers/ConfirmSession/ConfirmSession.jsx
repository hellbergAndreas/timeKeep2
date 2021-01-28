import React, { useEffect } from "react"
import styles from "./ConfirmSession.module.css"
import cx from "classnames"
import { useSession } from "../../context/SessionContext"
import Button from "../../components/Buttons/Button"
import UserKit from "../../data/UserKit"
import Header from "../../components/Header/Header"
const ConfirmSession = () => {
  const userKit = new UserKit()
  const {
    session,
    confirmSessionHidden,
    setConfirmSessionHidden,
  } = useSession()
  useEffect(() => {
    console.log(session)
    console.log(confirmSessionHidden)
  }, [session])

  const close = () => {
    setConfirmSessionHidden(!confirmSessionHidden)
  }
  const confirmSession = () => {
    // userKit.addSession(session, currentUser.uid)
    // alert()
    // setConfirmSessionHidden(!confirmSessionHidden)
    console.log(session)
  }
  return (
    <div
      className={cx(styles.background, confirmSessionHidden && styles.hidden)}
    >
      <div className={styles.card}>
        <Header color={"green"}>Session Complete!</Header>
        <Button onClick={close}>Abort</Button>
        <Button onClick={confirmSession}>Confirm</Button>
      </div>
    </div>
  )
}
export default ConfirmSession
