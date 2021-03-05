import React from "react"
import Button, { ButtonShape } from "../Buttons/Button"
import styles from "./DeleteModal.module.scss"

const DeleteModal = ({ confirmDelete, cancelDelete }) => {
  return (
    <div className={styles.section}>
      <div className={styles.section__card}>
        <h1 className={styles.section__card__header}>
          Do you want to delete this session?
        </h1>
        <div className={styles.section__card__buttons}>
          <Button onClick={confirmDelete} shape={ButtonShape.RECT_LARGE}>
            Yes
          </Button>
          <Button onClick={cancelDelete} shape={ButtonShape.RECT_LARGE}>
            No
          </Button>
        </div>
      </div>
    </div>
  )
}

export default DeleteModal
