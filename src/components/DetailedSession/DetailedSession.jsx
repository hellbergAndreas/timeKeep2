import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import Input from "../Input/Input"
import styles from "./DetailedSession.module.scss"
import cx from "classnames"
const DetailedSession = ({ session, hold, setImageFullScreen, active }) => {
  console.log(active)
  const { setUserSessions } = useUser()
  const { currentUser } = useAuth()
  const [updatedSession, setUpdatedSession] = useState(null)
  const [image, setImage] = useState(null)

  const [inputValue, setInputValue] = useState({ key: "" })
  const userKit = new UserKit()

  const handleChange = (name, value) => {
    setInputValue({
      [name]: value,
    })
  }

  useEffect(() => {
    setUpdatedSession(session)
  }, [session])

  useEffect(() => {}, [updatedSession])

  const addKeys = e => {
    if (e.code === "Enter" && inputValue.key.length > 0) {
      if (!updatedSession.keys.includes(inputValue.key)) {
        setUpdatedSession(prevState => {
          return {
            ...prevState,
            keys: [...prevState.keys, inputValue.key],
          }
        })
        setInputValue({ key: "" })
      }
    }
  }
  const removeKey = key => {
    setUpdatedSession(prevState => {
      const array = prevState.keys.slice()
      array.splice(prevState.keys.indexOf(key), 1)
      return {
        ...prevState,
        keys: array,
      }
    })
  }
  const submit = () => {
    userKit
      .updateSession(currentUser.uid, session.id, "keys", updatedSession.keys)
      .then(res => res.json())
      .then(() =>
        setUserSessions(prevState => {
          return {
            ...prevState,
            [session.id]: updatedSession,
          }
        })
      )
  }

  const handleChooseFile = e => {
    let img = e.target.files[0]
    setImage(img)
  }
  const upload = () => {
    const fd = new FormData()
    let imageUrl
    fd.append("image", image, image.name)
    fd.append("session", session.id)
    userKit
      .uploadImage(fd)
      .then(res => res.json())
      .then(data => (imageUrl = data.message))
      .then(() => {
        userKit.updateSession(currentUser.uid, session.id, "imageUrl", imageUrl)
        setUpdatedSession(prevState => {
          return {
            ...prevState,
            imageUrl,
          }
        })
        setUserSessions(prevState => {
          return {
            ...prevState,
            [session.id]: { ...updatedSession, imageUrl },
          }
        })
      })
  }

  const renderImage = () => {
    if (updatedSession) {
      if ("imageUrl" in updatedSession) {
        return (
          <div className={styles.card__content__imageWrapper}>
            <img
              className={styles.card__content__imageWrapper__image}
              src={updatedSession.imageUrl}></img>
          </div>
        )
      }
    }
  }
  const renderCard = () => {
    if (session) {
      return (
        <div className={styles.card__content}>
          <div className={styles.card__content__left}>
            <input type="file" onChange={e => handleChooseFile(e)}></input>
            <button className={styles.btn} onClick={upload}>
              upload
            </button>

            {renderImage()}
            <button
              className={styles.btn}
              onClick={() => setImageFullScreen(true)}>
              fullscreen
            </button>
          </div>
          <div className={styles.card__content_right}>
            <button
              onClick={hold}
              class={cx(styles.btn, active && styles.active)}>
              hold
            </button>
            <div className={styles.card__content__keys}>
              <p>Keys</p>
              <div className={styles.card__content__keys__content}>
                {updatedSession &&
                  updatedSession.keys.map(key => {
                    return (
                      <div
                        onClick={() => removeKey(key)}
                        className={
                          styles.card__content__keys__content__key
                        }>{`${key}`}</div>
                    )
                  })}
              </div>
            </div>
            <div className={styles.card__content__keys__inputWrapper}>
              <Input
                name={"key"}
                value={inputValue.key}
                handleChange={handleChange}
                onKeyUp={addKeys}
                required
                label={"add keys"}></Input>
              <button onClick={submit}>Update</button>
            </div>
          </div>
        </div>
      )
    }
  }
  return <div className={styles.card}>{renderCard()}</div>
}

export default DetailedSession
