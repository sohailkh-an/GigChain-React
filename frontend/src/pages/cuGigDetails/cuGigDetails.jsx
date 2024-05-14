import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/cuGigDetails.module.scss";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../contexts/AuthContext";

const GigDetails = () => {
  const { currentUser } = useAuth();
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [gigDetails, setGigDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

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

  const handleEdit = () => {
    navigate(`/gig/${gigId}/edit`);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/gig/${gigId}`);
      navigate("/gigs"); // Redirect to the gigs list after deletion
    } catch (error) {
      console.error("Error deleting gig:", error);
    }
  };

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
            <button className={styles.orderButton} onClick={handleEdit}>Edit</button>
            <button className={styles.saveButton} onClick={() => setShowDeleteModal(true)}>Delete</button>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <p>Are you sure you want to delete this gig?</p>
            <button onClick={handleDelete}>Yes</button>
            <button onClick={() => setShowDeleteModal(false)}>No</button>
          </div>
        </div>
      )}
      
      <Footer />
    </>
  );
};

export default GigDetails;
