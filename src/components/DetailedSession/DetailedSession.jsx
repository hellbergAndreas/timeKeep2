import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import Input from "../Input/Input"
import styles from "./DetailedSession.module.scss"

const DetailedSession = ({ session, setCompare, slot, compare }) => {
  const { userSessions, setUserSessions } = useUser()
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
      .updateSession(updatedSession)
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
        let payload = {
          id: session.id,
          imageUrl,
        }
        userKit.setSessionImage(payload)
      })
  }
  const renderCard = () => {
    if (session) {
      return (
        <div className={styles.card__content}>
          <button className={compare[slot] && styles.active} onClick={onClick}>
            compare
          </button>
          {updatedSession && (
            <div>
              {updatedSession.start.getFullYear()}

              <p>category {updatedSession.category}</p>
              <p>
                {updatedSession.parent && `category ${updatedSession.parent}`}
              </p>
              <p>{`activity ${updatedSession.activity}`}</p>

              <input type="file" onChange={(e) => handleChooseFile(e)}></input>
              <button onClick={upload}>upload</button>
            </div>
          )}

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
            <div className={styles.card__content__keys__inputWrapper}>
              <Input
                name={"key"}
                value={inputValue.key}
                handleChange={handleChange}
                onKeyUp={addKeys}
                required
                label={"add keys"}
              ></Input>
            </div>
            <button onClick={submit}>submit</button>
          </div>
        </div>
      )
    }
  }
  return <div className={styles.card}>{renderCard()}</div>
}

export default DetailedSession
