import React, { useState } from "react";
import axios from "axios";
import NavBar from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import styles from "./styles/styles.module.scss";
import FeaturedServicesSection from "../../components/featuredServicesSection/featuredServicesSection";
import ServiceCard from "../../components/searchResultGigCard/searchResultGigCard";

function HomePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);


  const handleSearch = async (query) => {
    if (query.trim() === "") {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/gig/search?query=${query}`
      );
      console.log(response.data[0]);
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching gigs:", error);
    }
  };

  const handleInputChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    handleSearch(query);
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
                onChange={handleInputChange}
              />
              {/* <button className={styles.hero_searchButton}>Search</button> */}
            </form>
          </div>
        </div>

        {searchQuery ? (
          <div className={styles.searchResultsParentContainer}>
            <h2>Search Results for &quot;{searchQuery}&quot;</h2>
            <div className={styles.searchResultsMainContainer}>
              {searchResults.map((gig) => (
                <ServiceCard key={gig._id} gig={gig} />
              ))}
            </div>
          </div>
        ) : (
          <div className={styles.featuredServicesContainer}>
            <FeaturedServicesSection serviceType={"Development"} />
            <FeaturedServicesSection serviceType={"Web Development"} />
            <FeaturedServicesSection serviceType={"Graphic Design"} />
          </div>
        )}
      </div>
      <Footer />
    </React.Fragment>
  );
}

export default HomePage;
