import React, { useState } from "react"
import styles from "./FormCard.module.scss"
import FormInput from "../../components/FormInput/FormInput"
import Button from "../../components/Buttons/Button"
import UserKit from "../../data/UserKit"
import { useAuth } from "../../context/AuthContext"
import { useCategory } from "../../context/CategoryContext"
import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
export default ({ hidden, setHidden, type }) => {
  const [inputValues, setInputValues] = useState({ body: "" })
  const { currentUser } = useAuth()
  const { category } = useSession()
  const {
    setUserCategories,
    setUserActivities,
    setActivitiesObject,
    setCategoriesObject,
  } = useUser()

  const userKit = new UserKit()

  const handleClick = () => {
    let inputs = {
      ...inputValues,
      email: currentUser.email,
      userId: currentUser.uid,
    }
    if (type === "categories") {
      userKit
        .addCategory(inputs)
        .then(res => {
          if (res.status <= 200) {
            return res.json()
          }
        })
        .then(res => {
          let category = {
            description: inputs.description,
            name: inputs.category,
            userId: currentUser.uid,
            id: res.id,
          }
          setCategoriesObject(prevState => {
            return {
              ...prevState,
              [res.id]: category,
            }
          })
          setUserCategories(prevState => {
            return [...prevState, category]
          })
        })
    } else {
      inputs = {
        ...inputs,
        parent: category.id,
      }
      // first send to db
      userKit
        .addActivity(inputs)
        .then(res => {
          if (res.status <= 200) {
            return res.json()
          }
        })
        //then update local state to match db
        .then(res => {
          let activity = {
            description: inputs.description,
            name: inputs.activity,
            parent: category.id,
            userId: currentUser.uid,
            id: res.id,
          }
          setActivitiesObject(prevState => {
            return {
              ...prevState,
              [res.id]: activity,
            }
          })
          setUserActivities(prevState => {
            return [...prevState, activity]
          })
        })
    }
    setHidden(!hidden)
  }
  const handleChange = (name, value) => {
    setInputValues(prevState => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  return (
    <div className={styles.background}>
      <div className={styles.shape}></div>
      <div className={styles.formWrapper}>
        <button className={styles.btn} onClick={() => setHidden(!hidden)}>
          X
        </button>
        <FormInput
          required
          label={type === "categories" ? "Category name" : "Activity name"}
          handleChange={handleChange}></FormInput>
        <FormInput
          required
          handleChange={handleChange}
          label="Description"></FormInput>
        <div className={styles.submit}>
          <Button onClick={handleClick}>Add</Button>
        </div>
      </div>
    </div>
  )
}
