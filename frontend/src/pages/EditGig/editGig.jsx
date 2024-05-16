import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "./styles/editGig.module.scss";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../contexts/AuthContext";

const GigEdit = () => {
  const { currentUser } = useAuth();
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [gigDetails, setGigDetails] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    thumbnailUrl: ""
  });

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setGigDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${import.meta.env.VITE_API_URL}/api/gig/${gigId}`,
        gigDetails
      );
      navigate(`/gig/${gigId}`);
    } catch (error) {
      console.error("Error updating gig:", error);
    }
  };

  return (
    <>
      <Navigation />
      <div className={styles.parentWrapper}>
        <form className={styles.formWrapper} onSubmit={handleSubmit}>
          <h1 className={styles.formHeading}>Edit Gig</h1>
          <div className={styles.formGroup}>
            <label>Title:</label>
            <input
              type="text"
              name="title"
              value={gigDetails.title}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Description:</label>
            <textarea
              name="description"
              value={gigDetails.description}
              onChange={handleChange}
              className={styles.textareaField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Category:</label>
            <input
              type="text"
              name="category"
              value={gigDetails.category}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Price:</label>
            <input
              type="number"
              name="price"
              value={gigDetails.price}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <div className={styles.formGroup}>
            <label>Thumbnail URL:</label>
            <input
              type="text"
              name="thumbnailUrl"
              value={gigDetails.thumbnailUrl}
              onChange={handleChange}
              className={styles.inputField}
            />
          </div>
          <button type="submit" className={styles.submitButton}>Save Changes</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default GigEdit;
