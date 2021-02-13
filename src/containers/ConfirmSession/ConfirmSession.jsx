import React, { useEffect, useState } from "react"
import styles from "./ConfirmSession.module.css"
import cx from "classnames"
import { useSession } from "../../context/SessionContext"
import Button, { ButtonShape } from "../../components/Buttons/Button"
import UserKit from "../../data/UserKit"
import Header from "../../components/Header/Header"
import FormInput from "../../components/FormInput/FormInput"
import { useAuth } from "../../context/AuthContext"
import { useUser } from "../../context/UserContext"

const ConfirmSession = () => {
  const userKit = new UserKit()
  const { currentUser } = useAuth()
  const [keys, setKeys] = useState([])
  const [inputValue, setInputValue] = useState("")
  const {
    session,
    confirmSessionHidden,
    setConfirmSessionHidden,
  } = useSession()
  const { setUserSessions, userSessions } = useUser()

  useEffect(() => {
    console.log(confirmSessionHidden)
  }, [session])

  const close = () => {
    setConfirmSessionHidden(!confirmSessionHidden)
    setInputValue("")
  }
  const confirmSession = () => {
    let completeSession = {
      ...session,
      keys,
    }
    userKit
      .addSession(completeSession, currentUser.uid)
      .then((res) => res.json())
      .then((data) => {
        setUserSessions((prevState) => {
          return {
            ...prevState,
            [data.id]: completeSession,
          }
        })
      })

    setKeys([])

    setConfirmSessionHidden(!confirmSessionHidden)
  }
  const handleChange = (name, value) => {
    setInputValue(value)
  }
  const onKeyUp = (e) => {
    if (e.code === "Enter" && !keys.includes(inputValue)) {
      setKeys((prevState) => {
        return [...prevState, inputValue]
      })
      setInputValue("")
    }
  }

  const renderSessionCard = () => {
    return (
      <div className={styles.card}>
        <div className={styles.header}>
          <Header color={"green"}>Session Complete!</Header>
        </div>
        <div className={styles.abortButton}>
          <Button shape={ButtonShape.ROUND_SMALL} onClick={close}>
            X
          </Button>
        </div>
        <p className={styles.totalTime}>
          Total time: {session.stop - session.start}
        </p>
        <div className={styles.keys}>
          {keys.map((key) => {
            return <div>{key}</div>
          })}
        </div>
        <div className={styles.input}>
          <FormInput
            handleChange={handleChange}
            onKeyUp={onKeyUp}
            required={true}
            value={inputValue}
            label={"Add keys"}
          ></FormInput>
        </div>
        <div className={styles.uploadImageButton}>
          <Button>Upload Image</Button>
        </div>
        <div className={styles.confirmButton}>
          <Button onClick={confirmSession}>Confirm</Button>
        </div>
      </div>
    )
  }
  return (
    <div
      className={cx(styles.background, confirmSessionHidden && styles.hidden)}
    >
      {session && renderSessionCard()}
    </div>
  )
}
export default ConfirmSession
