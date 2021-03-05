import React, { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import Input from "../Input/Input"
import styles from "./DetailedSession.module.scss"

const DetailedSession = ({
  session,
  setCompare,
  slot,
  compare,
  setImages,
  setImageFullScreen,
}) => {
  const { userSessions, setUserSessions } = useUser()
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

  const handleImages = () => {
    setImageFullScreen(true)
  }

  useEffect(() => {
    if (session) {
      console.log(session)
      if (!compare[0]) {
        setImages((prevState) => {
          let newState = [...prevState]
          newState[0] = session.imageUrl
          return newState
        })
      }
      if (compare[0]) {
        setImages((prevState) => {
          let newState = [...prevState]
          newState[1] = session.imageUrl
          return newState
        })
      }
    }
  }, [session])
  useEffect(() => {
    setUpdatedSession(session)
  }, [session])

  useEffect(() => {}, [updatedSession])

  const addKeys = (e) => {
    if (e.code === "Enter" && inputValue.key.length > 0) {
      if (!updatedSession.keys.includes(inputValue.key)) {
        setUpdatedSession((prevState) => {
          return {
            ...prevState,
            keys: [...prevState.keys, inputValue.key],
          }
        })
        setInputValue({ key: "" })
      }
    }
  }
  const removeKey = (key) => {
    setUpdatedSession((prevState) => {
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
      .then((res) => res.json())
      .then(() =>
        setUserSessions((prevState) => {
          return {
            ...prevState,
            [session.id]: updatedSession,
          }
        })
      )
  }

  const onClick = () => {
    if (slot === 0) {
      let newState = [!compare[0], false]
      setCompare(newState)
    }
    if (slot === 1) {
      let newState = [false, !compare[1]]
      setCompare(newState)
    }
  }

  const handleChooseFile = (e) => {
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
      .then((res) => res.json())
      .then((data) => (imageUrl = data.message))
      .then(() => {
        userKit.updateSession(currentUser.uid, session.id, "imageUrl", imageUrl)
        setUpdatedSession((prevState) => {
          return {
            ...prevState,
            imageUrl,
          }
        })
        setUserSessions((prevState) => {
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
        console.log("we have an image")
        return (
          <img
            className={styles.card__content__imageWrapper__image}
            src={updatedSession.imageUrl}
          ></img>
        )
      }
    }
  }
  const renderCard = () => {
    if (session) {
      return (
        <div className={styles.card__content}>
          <div className={styles.card__content__left}>
            <input type="file" onChange={(e) => handleChooseFile(e)}></input>
            <button onClick={upload}>upload</button>

            <div className={styles.card__content__imageWrapper}>
              {renderImage()}

              <button onClick={handleImages}>fullscreen</button>
            </div>
          </div>
          <div className={styles.card__content_right}>
            <button
              className={compare[slot] && styles.active}
              onClick={onClick}
            >
              compare
            </button>
            <div className={styles.card__content__keys}>
              <p>Keys</p>
              <div className={styles.card__content__keys__content}>
                {updatedSession &&
                  updatedSession.keys.map((key) => {
                    return (
                      <div
                        onClick={() => removeKey(key)}
                        className={styles.card__content__keys__content__key}
                      >{`${key}`}</div>
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
                label={"add keys"}
              ></Input>
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
