// LogoDesignService.js
import styles from "./styles/newGigDetails.module.scss";
import Navbar from "./../../components/navigation/navigation";
import Footer from "./../../components/footer/footer";
import Review from "../../components/review/review";

import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

import pImage1 from "../../assets/pImage1.jpg";
import pImage2 from "../../assets/pImage2.jpg";
import pImage3 from "../../assets/pImage3.jpg";
import pImage4 from "../../assets/pImage4.jpg";

const LogoDesignService = () => {
  const { currentUser } = useAuth();
  const { gigId } = useParams();
  const navigate = useNavigate();

  const [gigDetails, setGigDetails] = useState(null);
  const [providerDetails, setProviderDetails] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gig/${gigId}`
        );
        setGigDetails(response.data.gig);
        setProviderDetails(response.data.provider);
        console.log("Provider details:", response.data.provider);
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
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              Category → Graphic Design → Logo Design
            </div>
            <h1 className={styles.title}>{gigDetails.title}</h1>
          </div>
          <div className={styles.portfolio}>
            <div className={styles.portfolioItem}>
              <img
                src={gigDetails.thumbnailUrl}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            <div className={styles.portfolioItem}>
              <img
                src={gigDetails.thumbnailUrl}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            <div className={styles.portfolioItem}>
              <img
                src={gigDetails.thumbnailUrl}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            {/* <div className={styles.portfolioItem}></div> */}
          </div>
          <div className={styles.serviceDetails}>
            <p className={styles.description}>
              {gigDetails.description}
              <br />
              <br />
              {gigDetails.description}
              {gigDetails.description}
              <br />
              <br />
              {gigDetails.description}
            </p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.designerProfile}>
            <div className={styles.profileTopContainer}>
              <div className={styles.profilePicAndRatingContainer}>
                <div className={styles.profilePicContainer}>
                  <Link to={`/user/${gigDetails.user}`}>
                    <img
                      src={providerDetails.profilePictureUrl}
                      alt={providerDetails.username}
                      className={styles.profilePic}
                    />
                  </Link>
                </div>
                <div className={styles.ratingAndNameContainer}>
                  <span className={styles.ratingScore}>4.8 Rating (1400)</span>
                  <h2 className={styles.designerName}>
                    {providerDetails.name}
                  </h2>
                </div>
              </div>
              <div className={styles.miscInfoContainer}>
                <span className={styles.time}>11:55 AM PST</span>
                <p className={styles.location}>Islamabad, Pakistan</p>
                <p className={styles.joinDate}>Joined: March 2018</p>
              </div>
            </div>
            <div className={styles.profileBottomContainer}>
              <p className={styles.bio}>{providerDetails.about}</p>
            </div>
          </div>
          <div className={styles.messageForm}>
            <h3>Send a private message</h3>
            <textarea
              className={styles.messageInput}
              placeholder="Hi! Kamran i noticed your profile and would like to offer you my project"
            ></textarea>
            <div className={styles.budgetSection}>
              <label htmlFor="budget">My Budget (Minimum $100)</label>
              <div className={styles.budgetInput}>
                <input type="number" id="budget" defaultValue={200} />
                <span className={styles.currency}>USD</span>
              </div>
            </div>
            <button className={styles.sendButton}>Send</button>
          </div>
        </div>
      </div>
      <div className={styles.reviewsContainer}>
        <h2>Recent Reviews</h2>
        {reviews.map((review) => (
          <Review key={review.reviewer} {...review} />
        ))}
      </div>
      <Footer />
    </>
  );
};

export default LogoDesignService;

const reviews = [
  {
    reviewer: "Kamran Javaid",
    rating: 4.9,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage1,
  },

  {
    reviewer: "Leonardo DiCaprio",
    rating: 4.5,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage2,
  },
  {
    reviewer: "Tom Hanks",
    rating: 3.7,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage3,
  },
  {
    reviewer: "Ben Affleck",
    rating: 4.8,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage4,
  },
];
