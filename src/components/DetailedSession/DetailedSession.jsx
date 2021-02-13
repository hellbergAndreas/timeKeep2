import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import Input from "../Input/Input"
import styles from "./DetailedSession.module.scss"

const DetailedSession = ({ session }) => {
  const { userSessions, setUserSessions } = useUser()
  const [updatedSession, setUpdatedSession] = useState(null)

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
      const array = prevState.keys.splice(prevState.keys.indexOf(key))
      console.log(prevState.keys)
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
  useEffect(() => {
    console.log(updatedSession)
  }, [updatedSession])
  const renderCard = () => {
    if (session) {
      return (
        <div className={styles.card__content}>
          {updatedSession && (
            <div>
              {updatedSession.start.getFullYear()}

              <p>category {updatedSession.category}</p>
              <p>
                {updatedSession.parent && `category ${updatedSession.parent}`}
              </p>
              <p>{`activity ${updatedSession.activity}`}</p>
              <p>{!updatedSession.image && "upload image"}</p>
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
  return <div className={styles.card}>i show detal{renderCard()}</div>
}

export default DetailedSession
