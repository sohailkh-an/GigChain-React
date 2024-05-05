import React from "react";
import styles from "./navigation.module.css";
// import InboxIcon from '../../public/chat message.svg';
// import NotificationIcon from '../../public/notification.svg';
// import HelpIcon from '../../public/help.svg';
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

export default function Navigation() {

  const {currentUser, logout} = useAuth();

  return (
    <React.Fragment>
      <div className={styles.navbar}>
        <div className={styles.navbar_container}>
          <h1 className={styles.h1}>GigChain</h1>
          <div className={styles.navbar_links_container}>
            <Link to="#" className={styles.navbar_link}>
              Find Work
            </Link>
            <Link to="#" className={styles.navbar_link}>
              My Jobs
            </Link>
          </div>
          <div className={styles.searchBar_container}>
            <input
              className={styles.searchBar}
              type="text"
              placeholder="Search for jobs"
            />
            {/* <button className={styles.searchButton}>Search</button> */}
          </div>

          <div className={styles.navbar_right}>
              <Link to="/" className={styles.navbar_link}>
                Home
              </Link>
              <Link to="/signIn" className={styles.navbar_link}>
                Sign In
              </Link>
              <Link to="/register" className={styles.navbar_link}>
                Register
              </Link>
              <Link to="/profile" className={styles.navbar_link}>
                Profile
              </Link>
              {currentUser && (<button onClick={logout}>Logout</button>)}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}
