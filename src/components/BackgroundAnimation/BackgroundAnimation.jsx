import React, { useEffect, useState } from "react"
import styles from "./BackgroundAnimation.module.scss"

const BackgroundAnimation = ({ objects }) => {
  const [animationObjects, setAnimationObjects] = useState()
  useEffect(() => {
    objects && renderObjects()
  }, [objects])
  const renderObjects = () => {
    let rows = []
    console.log(objects)
    for (let i = 0; i < objects; i++) {
      rows.push(i)
    }
    setAnimationObjects(rows)
  }
  const randomer = () => {
    let randomer = {}
    randomer.position = Math.round(Math.random() * 100)
    randomer.size = 50 + Math.round(Math.random() * 250)
    randomer.delay = Math.round(Math.random() * 30)
    return randomer
  }
  const handleClick = e => {
    const colors = [
      "rgba(244, 94, 252, 0.228)",
      "rgba(150, 115, 198, 0.111)",
      "rgba(108, 247, 95, 0.193)",
      "rgba(95, 143, 247, 0.235)",
      "rgba(228, 130, 255, 0.221)",
      "rgba(210, 7, 169, 0.132)",
      "rgba(31, 224, 245, 0.235)",
    ]
    const newColor = () => {
      let rando = Math.floor(Math.random() * colors.length)
      return colors[rando]
    }
    const newSize = randomer()
    e.target.style.height = `${newSize.size}px`
    e.target.style.width = `${newSize.size}px`
    e.target.style.backgroundColor = newColor()
  }
  return (
    <div className={styles.animationBox}>
      <div className={styles.animationWrapper}>
        {animationObjects &&
          animationObjects.map(object => {
            let rando = randomer()
            return (
              <div
                onClick={e => handleClick(e)}
                style={{
                  left: `${rando.position}%`,
                  height: `${rando.size}px`,
                  width: `${rando.size}px`,
                  animationDelay: `${rando.delay}s`,
                }}
                className={styles.object}></div>
            )
          })}
      </div>
    </div>
  )
}

export default BackgroundAnimation
