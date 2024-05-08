"use client";
import React, {useState} from "react";
import axios from "axios";
import NavBar from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import styles from "./styles/styles.module.scss";
import FeaturedServicesSection from "../../components/featuredServicesSection/featuredServicesSection";
import ServiceCard from "../../components/featuredGigCard/featuredGigCard";

function HomePage() {

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `https://gigchain-backend.vercel.app/api/gig/search?query=${searchQuery}`
      );
      setSearchResults(response.data.gigs);
    } catch (error) {
      console.error("Error searching gigs:", error);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.home_wrapper}>
        <NavBar />
        <div className={styles.hero_container}>
          <div className={styles.headings_container}>
            <h1>
              Pick top talent at <br />
              your fingertips
            </h1>
          </div>

          <div className={styles.searchBar_container}>
            <form onSubmit={handleSearch}>
              <input
                placeholder={"Start typing to search services..."}
                className={styles.hero_searchBar}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}

              />
              <button className={styles.hero_searchButton}>Search</button>
            </form>
          </div>
        </div>

        <div className={styles.searchResultsContainer}>
          <h2>Search Results for {searchQuery}</h2>
          <div className={styles.searchResults}>
            {searchResults.map((gig) => (
              <ServiceCard key={gig._id} gig={gig} />
              
            ))}
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
