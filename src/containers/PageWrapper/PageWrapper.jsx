import React, { useEffect, useState } from "react"

import { useAuth } from "../../context/AuthContext"
import styles from "./PageWrapper.module.scss"

import { Link, useHistory } from "react-router-dom"
import UserKit from "../../data/UserKit"
import { useUser } from "../../context/UserContext"
import MainSection from "../../pages/MainSection/MainSection"
import SideMenu from "../../components/SideMenu/SideMenu"
const vilppu = [
  [
    {
      date: {
        seconds: 1607087037,
        nanoseconds: 21000000,
      },
      to: {
        seconds: 1607087860,
        nanoseconds: 666000000,
      },
      time: 823.645,
    },
    {
      date: {
        seconds: 1607089389,
        nanoseconds: 162000000,
      },
      to: {
        seconds: 1607091666,
        nanoseconds: 740000000,
      },
      time: 2277.578,
    },
    {
      time: 85.794,
      date: {
        seconds: 1607096355,
        nanoseconds: 888000000,
      },
      to: {
        seconds: 1607096441,
        nanoseconds: 682000000,
      },
    },
    {
      to: {
        seconds: 1607101768,
        nanoseconds: 20000000,
      },
      time: 203.223,
      date: {
        seconds: 1607101564,
        nanoseconds: 797000000,
      },
    },
    {
      time: 1561.73,
      to: {
        seconds: 1607157939,
        nanoseconds: 335000000,
      },
      date: {
        seconds: 1607156377,
        nanoseconds: 605000000,
      },
    },
    {
      time: 491.292,
      date: {
        seconds: 1607160817,
        nanoseconds: 355000000,
      },
      to: {
        seconds: 1607161308,
        nanoseconds: 647000000,
      },
    },
    {
      to: {
        seconds: 1607165622,
        nanoseconds: 523000000,
      },
      date: {
        seconds: 1607165273,
        nanoseconds: 335000000,
      },
      time: 349.188,
    },
    {
      time: 892.338,
      to: {
        seconds: 1607168254,
        nanoseconds: 242000000,
      },
      date: {
        seconds: 1607167361,
        nanoseconds: 904000000,
      },
    },
    {
      time: 1604.993,
      to: {
        seconds: 1607264057,
        nanoseconds: 798000000,
      },
      date: {
        seconds: 1607262452,
        nanoseconds: 805000000,
      },
    },
    {
      date: {
        seconds: 1607265095,
        nanoseconds: 624000000,
      },
      time: 653.486,
      to: {
        seconds: 1607265749,
        nanoseconds: 110000000,
      },
    },
    {
      date: {
        seconds: 1607279363,
        nanoseconds: 541000000,
      },
      time: 1838.012,
      to: {
        seconds: 1607281201,
        nanoseconds: 553000000,
      },
    },
    {
      date: {
        seconds: 1607283286,
        nanoseconds: 402000000,
      },
      time: 571.63,
      to: {
        seconds: 1607283858,
        nanoseconds: 32000000,
      },
    },
    {
      date: {
        seconds: 1607285046,
        nanoseconds: 63000000,
      },
      time: 582.544,
      to: {
        seconds: 1607285628,
        nanoseconds: 607000000,
      },
    },
    {
      time: 2875.534,
      date: {
        seconds: 1607331622,
        nanoseconds: 288000000,
      },
      to: {
        seconds: 1607334497,
        nanoseconds: 822000000,
      },
    },
    {
      time: 808.202,
      date: {
        seconds: 1607341661,
        nanoseconds: 968000000,
      },
      to: {
        seconds: 1607342470,
        nanoseconds: 170000000,
      },
    },
    {
      time: 481.382,
      to: {
        seconds: 1607356039,
        nanoseconds: 202000000,
      },
      date: {
        seconds: 1607355557,
        nanoseconds: 820000000,
      },
    },
    {
      to: {
        seconds: 1607360879,
        nanoseconds: 457000000,
      },
      date: {
        seconds: 1607360008,
        nanoseconds: 163000000,
      },
      time: 871.294,
    },
    {
      to: {
        seconds: 1607364366,
        nanoseconds: 371000000,
      },
      time: 892.582,
      date: {
        seconds: 1607363473,
        nanoseconds: 789000000,
      },
    },
    {
      time: 1163.453,
      date: {
        seconds: 1607380305,
        nanoseconds: 433000000,
      },
      to: {
        seconds: 1607381468,
        nanoseconds: 886000000,
      },
    },
    {
      time: 1859.82,
      date: {
        seconds: 1607421349,
        nanoseconds: 249000000,
      },
      to: {
        seconds: 1607423209,
        nanoseconds: 69000000,
      },
    },
    {
      to: {
        seconds: 1607438074,
        nanoseconds: 111000000,
      },
      time: 1341.44,
      date: {
        seconds: 1607436732,
        nanoseconds: 671000000,
      },
    },
    {
      time: 479.942,
      date: {
        seconds: 1607508856,
        nanoseconds: 465000000,
      },
      to: {
        seconds: 1607509336,
        nanoseconds: 407000000,
      },
    },
    {
      time: 1459.822,
      date: {
        seconds: 1607512886,
        nanoseconds: 109000000,
      },
      to: {
        seconds: 1607514345,
        nanoseconds: 931000000,
      },
    },
    {
      to: {
        seconds: 1607517533,
        nanoseconds: 940000000,
      },
      time: 106.314,
      date: {
        seconds: 1607517427,
        nanoseconds: 626000000,
      },
    },
    {
      date: {
        seconds: 1607526839,
        nanoseconds: 456000000,
      },
      time: 873.931,
      to: {
        seconds: 1607527713,
        nanoseconds: 387000000,
      },
    },
    {
      date: {
        seconds: 1607531274,
        nanoseconds: 984000000,
      },
      to: {
        seconds: 1607531991,
        nanoseconds: 934000000,
      },
      time: 716.95,
    },
    {
      time: 113.31,
      to: {
        seconds: 1607536877,
        nanoseconds: 366000000,
      },
      date: {
        seconds: 1607536764,
        nanoseconds: 56000000,
      },
    },
    {
      time: 696.171,
      to: {
        seconds: 1607544533,
        nanoseconds: 887000000,
      },
      date: {
        seconds: 1607543837,
        nanoseconds: 716000000,
      },
    },
    {
      to: {
        seconds: 1607548725,
        nanoseconds: 30000000,
      },
      time: 1963.281,
      date: {
        seconds: 1607546761,
        nanoseconds: 749000000,
      },
    },
    {
      to: {
        seconds: 1607596415,
        nanoseconds: 575000000,
      },
      date: {
        seconds: 1607594512,
        nanoseconds: 138000000,
      },
      time: 1903.437,
    },
    {
      time: 514.068,
      to: {
        seconds: 1607602898,
        nanoseconds: 252000000,
      },
      date: {
        seconds: 1607602384,
        nanoseconds: 184000000,
      },
    },
    {
      date: {
        seconds: 1607604174,
        nanoseconds: 953000000,
      },
      time: 313.201,
      to: {
        seconds: 1607604488,
        nanoseconds: 154000000,
      },
    },
    {
      time: 730.467,
      date: {
        seconds: 1607609409,
        nanoseconds: 784000000,
      },
      to: {
        seconds: 1607610140,
        nanoseconds: 251000000,
      },
    },
    {
      date: {
        seconds: 1607612630,
        nanoseconds: 33000000,
      },
      to: {
        seconds: 1607612795,
        nanoseconds: 569000000,
      },
      time: 165.536,
    },
    {
      date: {
        seconds: 1607619420,
        nanoseconds: 133000000,
      },
      to: {
        seconds: 1607619437,
        nanoseconds: 580000000,
      },
      time: 17.447,
    },
    {
      date: {
        seconds: 1607627324,
        nanoseconds: 770000000,
      },
      time: 1416.687,
      to: {
        seconds: 1607628741,
        nanoseconds: 457000000,
      },
    },
    {
      time: 2941.568,
      to: {
        seconds: 1607796640,
        nanoseconds: 251000000,
      },
      date: {
        seconds: 1607793698,
        nanoseconds: 683000000,
      },
    },
    {
      time: 2404.917,
      date: {
        seconds: 1610736600,
        nanoseconds: 101000000,
      },
      to: {
        seconds: 1610739005,
        nanoseconds: 18000000,
      },
    },
    {
      time: 751.898,
      date: {
        seconds: 1611096396,
        nanoseconds: 616000000,
      },
      to: {
        seconds: 1611097148,
        nanoseconds: 514000000,
      },
    },
    {
      time: 1782.722,
      date: {
        seconds: 1611176048,
        nanoseconds: 777000000,
      },
      to: {
        seconds: 1611177831,
        nanoseconds: 499000000,
      },
    },
    {
      to: {
        seconds: 1611349173,
        nanoseconds: 504000000,
      },
      time: 5.648,
      date: {
        seconds: 1611349167,
        nanoseconds: 856000000,
      },
    },
    {
      to: {
        seconds: 1612817339,
        nanoseconds: 821000000,
      },
      date: {
        seconds: 1612817207,
        nanoseconds: 310000000,
      },
      time: 132.511,
    },
    {
      to: {
        seconds: 1612902156,
        nanoseconds: 477000000,
      },
      date: {
        seconds: 1612901173,
        nanoseconds: 313000000,
      },
      time: 983.164,
    },
    {
      date: {
        seconds: 1612902596,
        nanoseconds: 158000000,
      },
      time: 1451.662,
      to: {
        seconds: 1612904047,
        nanoseconds: 820000000,
      },
    },
  ],
]
const PageWrapper = ({ content }) => {
  const { logout, currentUser } = useAuth()
  const [loaded, setLoaded] = useState({
    categoriesLoaded: false,
    activitiesLoaded: false,
    sessionsLoaded: false,
  })

  const {
    setUserSessions,
    userSessions,
    setUserCategories,
    setUserActivities,
    setUserSessionsArray,
    categoriesObject,
    setCategoriesObject,
    activitiesObject,
    setActivitiesObject,
    userSessionsArray,
    userActivities,
    userCategories,
  } = useUser()

  const history = useHistory()
  const userKit = new UserKit()

  const handleTransfer = () => {
    vilppu.forEach((session) => {
      let payload = {
        category: "Drawing Animals",
        activity: "Glenn Vilppu",
        userId: currentUser.uid,
        start: new Date(session.date.seconds * 1000),
        stop: new Date(session.to.seconds * 1000),
        keys: [],
      }

      userKit.transfer(payload)
    })
  }

  const handleLogOut = async () => {
    try {
      await logout()
    } catch {}
  }
  const goHome = () => {
    history.push("/")
  }

  // when fetchinig the sessions from firebase, we receive them in an Object.
  // but for the application to be able to sort the sessions, we need them in an array.
  //firebase also changes the datestamp so when fetching them , we have to
  // convert the firebase-timestamp to a valid javascript date. the new array with
  // the correct timestamp is set to context "userSessionsArray"

  useEffect(() => {
    !currentUser && history.push("/login")

    // fetching categories, activities and sessions from db
    currentUser
      .getIdToken()
      .then((token) => {
        sessionStorage.setItem("sessionToken", token)
      })
      .then(() => {
        userKit
          .getActivities(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            let array = []
            Object.keys(data).forEach((object) => {
              array.push(data[object])
            })
            setActivitiesObject(data)

            setUserActivities(array)
          })
          .then(() => {
            setLoaded((prevState) => {
              return {
                ...prevState,
                activitiesLoaded: true,
              }
            })
          })
      })
      .then(() => {
        userKit
          .getCategories(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            let array = []
            Object.keys(data).forEach((object) => {
              array.push(data[object])
            })
            setCategoriesObject(data)
            setUserCategories(array)
          })
          .then(() => {
            setLoaded((prevState) => {
              return {
                ...prevState,
                categoriesLoaded: true,
              }
            })
          })
      })
      .then(() => {
        userKit
          .getSessions(currentUser.uid)
          .then((res) => res.json())
          .then((data) => {
            setUserSessions(data)
          })
          .then(() => {
            setLoaded((prevState) => {
              return {
                ...prevState,
                sessionsLoaded: true,
              }
            })
          })
      })
  }, [currentUser])

  useEffect(() => {
    if (
      loaded.activitiesLoaded &&
      loaded.categoriesLoaded &&
      loaded.sessionsLoaded
    ) {
      console.log("fixing sessions")
      let array = []
      Object.keys(userSessions).map((session) => {
        array.push(userSessions[session])
      })
      let sessions = []
      array.forEach((session) => {
        let sesh = {
          ...session,
          start: new Date(Date.parse(session.start)),
          activityName: activitiesObject[session.activity].name,
          categoryName: categoriesObject[session.category].name,
        }
        sessions.push(sesh)
      })
      setUserSessionsArray(sessions)
    }
  }, [loaded])

  useEffect(() => {
    console.log(userSessionsArray)
  }, [])

  return (
    <section className={styles.background}>
      <div className={styles.background__circle}></div>
      <div className={styles.background__circle2}></div>
      <div className={styles.background__blur}></div>
      <div className={styles.contentWrapper}>
        <section className={styles.header}>
          <h2 onClick={goHome} className={styles.logo}>
            timeKeep
          </h2>

          <nav className={styles.nav}>
            <ul>
              <li>
                <Link onClick={handleLogOut} to="/">
                  Logout
                </Link>
              </li>
            </ul>
          </nav>
          <button onClick={handleTransfer}>Transfer</button>
        </section>
        <section className={styles.content}>
          <SideMenu></SideMenu>
          {content}
        </section>
      </div>
    </section>
  )
}

export default PageWrapper
