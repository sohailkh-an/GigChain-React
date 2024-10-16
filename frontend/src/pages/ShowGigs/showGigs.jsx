import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import ServiceCard from "../../components/serviceCard/serviceCard";
import styles from "./styles/page.module.scss";
import { useParams } from "react-router-dom";

const ViewGigs = () => {
  const { gigId } = useParams();
  const { currentUser } = useAuth();
  const [userGigs, setUserGigs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserGigs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gig/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserGigs(response.data.gigs);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user gigs:", error);
        setIsLoading(false);
      }
    };

    fetchUserGigs();
  }, []);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return (
      <div className={styles.loadingWrapper}>
        <div className={styles.loader}></div>
        <p className={styles.loadingText}>Loading...</p>
      </div>
    );
  }

  return (
    <div>

      <div className={styles.gigsParentWrapper}>
        {userGigs.length === 0 ? (
          <>
            <p>
              No gigs found.
              <br />
              Begin by creating your first gig.
            </p>
            <Link to="/create_gig">
              <button>Create Gig</button>
            </Link>
          </>
        ) : (
          <>
            <div className={styles.gigsActionsWrapper}>
              <h2>Your Gigs</h2>
              <Link to="/create_gig">
                <button className={styles.createGigBtn}>Create Gig</button>
              </Link>
            </div>

            <div className={styles.gigsWrapper}>
              {userGigs.map((gig) => (
                <ServiceCard
                  key={gig._id}
                  gigId={gig._id}
                  title={gig.title}
                  price={gig.price}
                  images={gig.images}
                  category={gig.category}
                  serviceProvider={gig.serviceProvider}
                  rating={gig.rating}
                  reviews={gig.numReviews}
                  // description={gig.description}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewGigs;
