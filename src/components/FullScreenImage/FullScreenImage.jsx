import React, { useEffect } from "react"
import styles from "./FullScreenImage.module.scss"

const FullScreenImage = ({ images, setImageFullScreen }) => {
  useEffect(() => {
    console.log(images)
  }, [images])
  return (
    <div className={styles.section}>
      <button
        className={styles.section__button}
        onClick={() => setImageFullScreen(false)}
      >
        X
      </button>
      {images &&
        images.map((image) => {
          if (image) {
            return (
              <div className={styles.section__imageWrapper}>
                <img
                  className={styles.section__imageWrapper__image}
                  src={image}
                ></img>
              </div>
            )
          }
        })}
    </div>
  )
}

export default FullScreenImage
