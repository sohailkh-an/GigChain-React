import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "redaxios";
import ServiceCard from "../../../components/serviceCard/serviceCard";
import styles from "./styles/listServices.module.scss";
import { useParams } from "react-router-dom";

const ListServices = () => {
  const { serviceId } = useParams();
  const { currentUser } = useAuth();
  const [userServices, setUserServices] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchUserServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/service/user`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserServices(response.data.services);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching user services:", error);
        setIsLoading(false);
      }
    };

    fetchUserServices();
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
        {userServices.length === 0 ? (
          <>
            <p>
              No services found.
              <br />
              Begin by creating your first service.
            </p>
            <Link to="/create_service">
              <button>Create Service</button>
            </Link>
          </>
        ) : (
          <>
            <div className={styles.gigsActionsWrapper}>
              <h2>Your Gigs</h2>
              <Link to="/create_service">
                <button className={styles.createGigBtn}>Create Service</button>
              </Link>
            </div>

            <div className={styles.gigsWrapper}>
              {userServices.map((service) => (
                <ServiceCard
                  key={service._id}
                  serviceId={service._id}
                  title={service.title}
                  price={service.startingPrice}
                  images={service.images}
                  category={service.category}
                  serviceProvider={service.serviceProvider}
                  rating={service.rating}
                  reviews={service.numReviews}
                  // description={service.description}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ListServices;
