"use client";
import React from "react";
import NavBar from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import styles from "./styles/styles.module.scss";
import FeaturedServicesSection from "../../components/featuredServicesSection/featuredServicesSection";
// import UserInfo from "@/components/userInfo/userInfo";
// import withAuth from "../api/withAuth";

function HomePage() {
  return (
    <React.Fragment>
      <div className={styles.home_wrapper}>
        <NavBar />
        <div className={styles.hero_container}>
          <div className={styles.headings_container}>
            {/* <UserInfo /> */}
            <h1>
              Pick top talent at <br />
              your fingertips
            </h1>
          </div>

          <div className={styles.searchBar_container}>
            <input
              placeholder={"Start typing to search services..."}
              className={styles.hero_searchBar}
            />
            <button className={styles.hero_searchButton}>Search</button>
          </div>
        </div>

        <div className={styles.featuredServicesContainer}>
          <FeaturedServicesSection serviceType={"Development"} />
          <FeaturedServicesSection serviceType={"Web Development"} />
          <FeaturedServicesSection serviceType={"Graphic Design"} />
        </div>
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default HomePage;
