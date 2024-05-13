import { useEffect, useState } from "react";
import {Link, useParams } from "react-router-dom";
import axios from "axios";
import styles from "./styles/gigDetails.module.scss";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../contexts/AuthContext";


const GigDetails = () => {
  const { currentUser } = useAuth();
  const { gigId } = useParams();
  console.log(gigId);

  const [gigDetails, setGigDetails] = useState(null);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gig/${gigId}`
        );
        setGigDetails(response.data.gig);
      } catch (error) {
        console.error("Error fetching gig details:", error);
      }
    };

    fetchGigDetails();
  }, [gigId]);

  if (!gigDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Navigation />
      <div className={styles.parentWrapper}>
        <div className={styles.gigDetailsParentWrapper}>
          <h1>{gigDetails.title}</h1>

          <Link to={`/user/${gigDetails.user}`}>
            <p className={styles.gigProvider}>
              {" "}
              Service Provider: {gigDetails.serviceProvider}
            </p>
          </Link>
          <img
            src={gigDetails.thumbnailUrl}
            width={"500px"}
            alt={gigDetails.title}
            className={styles.thumbnailImg}
          />

          <div className={styles.gigDetailsWrapper}>
            <p className={styles.gigRating}>
              Rating: {gigDetails.rating} ({gigDetails.numReviews} reviews)
            </p>
            <p className={styles.gigDescription}>{gigDetails.description}</p>
            <p className={styles.gigCategory}>
              Category: {gigDetails.category}
            </p>
            <p className={styles.gigPrice}>Starting at: ${gigDetails.price}</p>
          </div>

          <div className={styles.actionsParentWrapper}>
            <button className={styles.orderButton}>Order</button>
            <button className={styles.saveButton}>Save</button>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default GigDetails;
