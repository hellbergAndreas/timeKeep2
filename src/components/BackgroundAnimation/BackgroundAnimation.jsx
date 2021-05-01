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
    randomer.size = Math.round(Math.random() * 300)
    randomer.delay = Math.round(Math.random() * 30)
    return randomer
  }
  const handleClick = e => {
    const colors = [
      "rgba(244, 94, 252, 0.509)",
      "rgba(150, 115, 198, 0.543)",
      "rgba(95, 143, 247, 0.406)",
      "rgba(95, 143, 247, 0.406)",
      "rgba(228, 130, 255, 0.474)",
      "rgba(210, 7, 169, 0.406)",
      "rgba(31, 224, 245, 0.543)",
    ]
    const newColor = () => {
      let rando = Math.floor(Math.random() * colors.length)
      return colors[rando]
    }
    const newSize = randomer()
    console.log(newSize.size)

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
