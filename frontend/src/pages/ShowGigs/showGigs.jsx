import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import ServiceCard from "../../components/serviceCard/serviceCard";
import styles from "./styles/page.module.scss";
import { useParams } from "react-router-dom";

const ViewGigs = () => {
  const { gigId } = useParams();
  console.log(gigId);
  const { currentUser } = useAuth();
  const [userGigs, setUserGigs] = useState([]);

  useEffect(() => {
    const fetchUserGigs = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://gigchain-backend.vercel.app/api/gig/user", {
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

      <div className={styles.gigsParentWrapper}>
        {userGigs.length === 0 ? (
          <>
            <p>
              Now gigs found.
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
            <h2 >Your Gigs</h2>
            <Link to="/create_gig">
              <button>Create Gig</button>
            </Link>
            </div>

            <div className={styles.gigsWrapper}>
              {userGigs.map((gig) => (
                <ServiceCard
                  key={gig._id}
                  gigId={gig._id}
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
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default ViewGigs;
