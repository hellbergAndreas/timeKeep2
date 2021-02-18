import React, { useEffect, useRef, useState } from "react"
import ListObject from "../../components/ListObject/ListObject"
import { useAuth } from "../../context/AuthContext"

import { useSession } from "../../context/SessionContext"
import { useUser } from "../../context/UserContext"
import UserKit from "../../data/UserKit"
import styles from "./ListContainer.module.scss"
import cx from "classnames"

// listContainer is rendered twice on the dashboard
// one time for Categories, and one time for Activities.

const CategoryContainer = ({ type, list }) => {
  const sliders = useRef(null)
  const {
    category,
    setCategory,
    activity,
    setActivity,
    timeGoes,
  } = useSession()

  const slideLeft = () => {
    // console.log(sliders.current.scrollLeft)
    sliders.current.scrollLeft -= 150
    // let scrollAmount = 0
    // sliders.scrollTo({
    //   top: 0,
    //   left: (scrollAmount -= 100),
    //   behavior: "smooth",
    // })

    // if (scrollAmount > 0) {
    //   scrollAmount = 0
    // }
  }

  const slideRight = () => {
    console.log(sliders.current.scrollLeft)
    sliders.current.scrollLeft += 150
    // let scrollAmount = 0
    // sliders.scrollTo({
    //   top: 0,
    //   left: (scrollAmount -= 100),
    //   behavior: "smooth",
    // })

    // if (scrollAmount > 0) {
    //   scrollAmount = 0
    // }
  }

  const handleClick = (id, name) => {
    if (type === "categories") {
      setCategory({ id, name })
      category.id === id && setCategory({ id: null })
      setActivity({ id: null })
    }
    if (type === "activities") {
      setActivity({
        id,
        name,
      })
      activity.id && activity.id === id && setActivity({ id: null })
    }
  }

  const renderCategories = () => {
    if (list.length > 0) {
      return list.map((item) => {
        return (
          <ListObject
            key={item.id}
            id={item.id}
            category={category}
            activity={activity}
            timeGoes={timeGoes}
            canBeDeactivated={true}
            name={item.name}
            onClick={handleClick}
          >
            {item.name}
          </ListObject>
        )
      })
    }
  }
  return (
    <section className={styles.carousel}>
      <div ref={sliders} className={styles.carouselBox}>
        {list && renderCategories()}
        <div
          onClick={slideLeft}
          className={cx(styles.switchLeft, styles.sliderButton)}
        >
          {"<"}
        </div>
        <div
          onClick={slideRight}
          className={cx(styles.switchRight, styles.sliderButton)}
        >
          {">"}
        </div>
      </div>
    </section>
  )
}

export default CategoryContainer
