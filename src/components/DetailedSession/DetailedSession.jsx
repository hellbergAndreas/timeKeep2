import React, { useEffect, useState } from "react"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import Input from "../Input/Input"
import styles from "./DetailedSession.module.scss"

const DetailedSession = ({ session }) => {
  const [date, setDate] = useState("")
  const [dateStop, setDateStop] = useState("")
  const { userSessions } = useUser()

  const [inputValue, setInputValue] = useState({ key: "" })
  const userKit = new UserKit()

  const handleChange = (name, value) => {
    setInputValue({
      [name]: value,
    })
  }

  useEffect(() => {
    console.log(inputValue)
  }, [inputValue])

  const submit = (e) => {
    if (e.code === "Enter" && inputValue.key.length > 0) {
      // userKit
      //   .updateSession(session)
      //   .then((res) => res.json())
      //   .then(console.log(data))

      userSessions[session.id].keys.push(inputValue.key)
      setInputValue({ key: "" })
    }
  }

  useEffect(() => {}, [session])
  const renderCard = () => {
    if (session) {
      console.log(session)
      return (
        <div className={styles.card__content}>
          {session && session.start.getFullYear()}

          <p>category {session.category && session.category}</p>
          <p>{session.parent && `category ${session.parent}`}</p>
          <p>{session.activity && `activity ${session.activity}`}</p>
          <p>{!session.image && "upload image"}</p>
          <div className={styles.card__content__keys}>
            <p>Keys</p>
            <div className={styles.card__content__keys__content}>
              {session.keys.map((key) => {
                return (
                  <div
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
                onKeyUp={submit}
                required
                label={"add keys"}
              ></Input>
            </div>
          </div>
        </div>
      )
    }
  }
  return <div className={styles.card}>i show detal{renderCard()}</div>
}

export default DetailedSession
