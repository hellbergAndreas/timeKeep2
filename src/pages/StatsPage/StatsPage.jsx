import React from "react"
import SideMenu from "../../components/SideMenu/SideMenu"
import Navbar from "../../containers/Navbar/Navbar"
import styles from "./StatsPage.module.scss"
const StatsPage = () => {
  return (
    <div>
      <Navbar></Navbar>
      <section className={styles.section}>
        <SideMenu></SideMenu>
      </section>
    </div>
  )
}

export default StatsPage
