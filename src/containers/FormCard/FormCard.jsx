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
    userCategories,
    userActivities,
    setUserCategories,
    setUserActivities,
  } = useUser()

  const userKit = new UserKit()

  const handleClick = () => {
    console.log(currentUser.uid)
    const inputs = {
      ...inputValues,
      email: currentUser.email,
      parent: category,
      userId: currentUser.uid,
    }
    if (type === "categories") {
      console.log(inputs)
      userKit.addCategory(inputs).then((res) => {
        if (res.status <= 200) {
          setUserCategories((prevState) => {
            return [
              ...prevState,
              {
                description: inputs.description,
                name: inputs.category,
                userId: currentUser.uid,
              },
            ]
          })
        }
      })
    } else {
      userKit.addActivity(inputs).then((res) => {
        if (res.status <= 200) {
          setUserActivities((prevState) => {
            return [
              ...prevState,
              {
                description: inputs.description,
                name: inputs.activity,
                parent: category.id,
                userId: currentUser.uid,
              },
            ]
          })
        }
      })
    }
  }
  const handleChange = (name, value) => {
    setInputValues((prevState) => {
      return {
        ...prevState,
        [name]: value,
      }
    })
  }
  return (
    <div className={styles.background}>
      <div className={styles.formWrapper}>
        <button className={styles.button} onClick={() => setHidden(!hidden)}>
          X
        </button>
        <FormInput
          required
          label={type === "categories" ? "Category name" : "Activity name"}
          handleChange={handleChange}
        ></FormInput>
        <FormInput
          required
          handleChange={handleChange}
          label="Description"
        ></FormInput>
        <Button onClick={handleClick}>Add</Button>
      </div>
    </div>
  )
}
