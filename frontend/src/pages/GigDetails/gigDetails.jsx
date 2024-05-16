import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/gigDetails.module.scss";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../contexts/AuthContext";

const GigDetails = () => {
  const { currentUser } = useAuth();
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [gigDetails, setGigDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  console.log("Gig Details: ", gigDetails);

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

  const handleOrder = () => {};
  const handleSave = () => {};

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/gig/${gigId}`);
      navigate("/gigs");
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

          <div className={styles.providerInfoContainer}>
          <img src={gigDetails.providerProfilePicture} alt={gigDetails.serviceProvider} className={styles.providerProfilePicture} />
          <Link className={styles.gigProviderLink} to={`/user/${gigDetails.user}`}>
            <p className={styles.gigProvider}>
              {gigDetails.serviceProvider}
            </p>
          </Link>
          </div>          

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
            {currentUser._id === gigDetails.user ? (
              <>
                <button className={styles.orderButton} onClick={handleEdit}>
                  Edit
                </button>
                <button
                  className={styles.saveButton}
                  onClick={() => {
                    setShowDeleteModal(true);
                  }}
                >
                  Delete
                </button>
              </>
            ) : (
              <>
                <button className={styles.orderButton} onClick={handleOrder}>
                  Order
                </button>
                <button className={styles.saveButton} onClick={handleSave}>
                  Save
                </button>
              </>
            )}
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
