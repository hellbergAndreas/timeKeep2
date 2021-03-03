import React, { useEffect, useState } from "react"
import styles from "./ConfirmSession.module.scss"
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
  const [image, setImage] = useState()
  const { currentUser } = useAuth()
  const [imageUrl, setImageUrl] = useState(null)
  const [keys, setKeys] = useState([])
  const [inputValue, setInputValue] = useState("")

  const {
    session,
    confirmSessionHidden,
    setConfirmSessionHidden,
  } = useSession()
  const {
    setUserSessions,
    setUserSessionsArray,
    activitiesObject,
    categoriesObject,
  } = useUser()

  useEffect(() => {
    console.log(activitiesObject)
  }, [activitiesObject])

  const close = () => {
    setConfirmSessionHidden(!confirmSessionHidden)
    setInputValue("")
  }
  const confirmSession = () => {
    let completeSession = {
      ...session,
      activity: session.activity.id,
      category: session.category.id,
      keys,
    }
    if (imageUrl) {
      completeSession = {
        ...completeSession,
        imageUrl: imageUrl,
      }
    }
    userKit
      .addSession(completeSession, currentUser.uid)
      .then((res) => res.json())
      .then(() => {
        completeSession = {
          ...completeSession,
          activityName: activitiesObject[session.activity.id].name,
          categoryName: categoriesObject[session.category.id].name,
        }

        setUserSessionsArray((prevState) => {
          return [...prevState, completeSession]
        })
      })

    setKeys([])

    setConfirmSessionHidden(!confirmSessionHidden)
  }
  const handleChange = (name, value) => {
    setInputValue(value)
  }

  const handleChooseFile = (e) => {
    let img = e.target.files[0]
    setImage(img)
  }
  const handleUpload = () => {
    const fd = new FormData()
    let imageUrl
    fd.append("image", image, image.name)
    userKit
      .uploadImage(fd)
      .then((res) => res.json())
      .then((data) => setImageUrl(data.message))
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
        <input type="file" onChange={(e) => handleChooseFile(e)}></input>
        {image && <button onClick={handleUpload}>Upload</button>}
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
