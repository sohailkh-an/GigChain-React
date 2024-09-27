import React, { useState, useRef, useEffect } from "react";
import styles from "./navigation.module.scss";
import axios from "axios";
// import InboxIcon from '../../public/chat message.svg';
// import NotificationIcon from '../../public/notification.svg';
// import HelpIcon from '../../public/help.svg';
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import DropdownMenu from "../dropdownMenu/dropdownMenu";

export default function Navigation() {
  const { currentUser, logout } = useAuth();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const searchBarRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        searchBarRef.current &&
        !searchBarRef.current.contains(event.target)
      ) {
        setSearchSuggestions([]);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const handleSuggestionClick = (suggestion) => {
    setSearchQuery(suggestion.title);
    setSearchSuggestions([]);
  };

  const handleSearchChange = async (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (query.trim() !== "") {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gig/search?query=${query}`
        );
        setSearchSuggestions(response.data);
      } catch (error) {
        console.error("Error fetching search suggestions:", error);
      }
    } else {
      setSearchSuggestions([]);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <div className={styles.navbar_container}>
          <h1 className={styles.h1}>GigChain</h1>
          {/* <div className={styles.navbar_links_container}>
            <Link to="#" className={styles.navbar_link}>
              Find Work
            </Link>
            <Link to="#" className={styles.navbar_link}>
              My Jobs
            </Link>
          </div> */}

          <div className={styles.searchBar_container}>
            <DropdownMenu />
            <div className={styles.input_wrapper} ref={searchBarRef}>
              {" "}
              <input
                className={styles.searchBar}
                type="text"
                placeholder="Search for jobs"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              {searchSuggestions.length > 0 && (
                <ul className={styles.suggestionsList}>
                  {searchSuggestions.map((suggestion) => (
                    <li
                      key={suggestion._id}
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      {suggestion.title}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <button className={styles.searchButton}>Search</button>
          </div>

          <div className={styles.navbar_right}>
            <Link to="/" className={styles.navbar_link}>
              Home
            </Link>
            {!currentUser && (
              <>
                <Link to="/signIn" className={styles.navbar_link}>
                  Sign In
                </Link>

                <Link to="/register" className={styles.navbar_link}>
                  Register
                </Link>
              </>
            )}

            {currentUser && (
              <>
                <Link to="/inbox" className={styles.navbar_link}>
                  Inbox
                </Link>
                <Link to="/gigs" className={styles.navbar_link}>
                  Gigs
                </Link>
                <Link to="/profile" className={styles.navbar_link}>
                  Profile
                </Link>
                <button className={styles.btn_logout} onClick={logout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
