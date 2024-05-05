import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "axios";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import ServiceCard from "../../components/serviceCard/serviceCard";
import styles from "./styles/page.module.scss";

const Profile = () => {
  const { currentUser } = useAuth();
  const [userGigs, setUserGigs] = useState([]);

  useEffect(() => {
    const fetchUserGigs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/gig/user", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUserGigs(response.data.gigs);
      } catch (error) {
        console.error("Error fetching user gigs:", error);
      }
    };

    fetchUserGigs();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />

      <h1>Welcome, {currentUser.name}!</h1>
      <p>Email: {currentUser.email}</p>
      <Link to="/create_gig">
        <button>Create Gig</button>
      </Link>

      {userGigs.length === 0 ? (
        <p>No gigs found.</p>
      ) : (
        <div className={styles.gigsWrapper}>
          {userGigs.map((gig) => (
            <ServiceCard
              key={gig._id}
              title={gig.title}
              price={gig.price}
              thumbnailUrl={gig.thumbnailUrl}
              category={gig.category}
              serviceProvider={gig.serviceProvider}
              rating={gig.rating}
              reviews={gig.numReviews}
              description={gig.description}
            />
          ))}
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Profile;
