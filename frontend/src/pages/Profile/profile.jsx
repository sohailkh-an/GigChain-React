import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import styles from "./styles/page.module.scss";



const Profile = () => {

  const { currentUser } = useAuth();


  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />

      <h1>Welcome, {currentUser.name}!</h1>
      <p>Email: {currentUser.email}</p>
      <p>Username: {currentUser.userName}</p>
      <Link to="/create_gig">
        <button>Create Gig</button>
      </Link>

      <Footer />
    </div>
  );
};

export default Profile;
