import { useEffect, useState, useContext } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import LoadingSkeleton from "./viewServiceDetailsSkeloton/viewServiceDetailsSkeleton";
import styles from "./styles/viewServiceDetails.module.scss";

import { useAuth } from "../../../contexts/AuthContext";
import { ChatContext } from "../../../contexts/ChatContext";

import pImage1 from "../../../assets/pImage1.jpg";
import pImage2 from "../../../assets/pImage2.jpg";
import pImage3 from "../../../assets/pImage3.jpg";
import pImage4 from "../../../assets/pImage4.jpg";

const ViewServiceDetails = () => {
  const { currentUser } = useAuth();
  const { gigId } = useParams();
  const navigate = useNavigate();

  // console.log("chat context in newGigDetails", ChatContext);

  const {
    activeConversation,
    setActiveConversation,
    handleSendProposalMessage,
    checkConversationExists,
    handleUserSelect,
  } = useContext(ChatContext);

  // console.log("chat context's currentUser", currentUser);

  const [gigDetails, setGigDetails] = useState(null);
  const [message, setMessage] = useState("");
  const [providerDetails, setProviderDetails] = useState(null);
  const [budget, setBudget] = useState();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    const fetchGigDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/gig/${gigId}`
        );
        setGigDetails(response.data.gig);
        setProviderDetails(response.data.provider);
        setBudget(response.data.gig.price);
        // console.log("Provider details:", response.data.provider);
      } catch (error) {
        console.error("Error fetching gig details:", error);
      }
    };
    fetchGigDetails();
  }, [gigId]);

  const handleEdit = () => {
    navigate(`/gig/${gigId}/edit`);
  };

  const handleMessageInput = (e) => {
    setMessage(e.target.value);
  };

  const handleBudgetInput = (e) => {
    setBudget(e.target.value);
  };

  const handleDelete = async () => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/api/gig/${gigId}`);
      navigate("/gigs");
    } catch (error) {
      console.error("Error deleting gig:", error);
    }
  };

  // console.log("Gig Details in New Gig Details: ", gigDetails);

  // const handleSendProposal = async () => {
  //   const conversationId = await handleConversationCreation();
  //   handleSendMessageToConversation(conversationId);
  // };

  useEffect(() => {
    console.log("Active conversation in newGigDetails: ", activeConversation);
  }, [activeConversation]);

  const handleSendProposal = async () => {
    try {
      console.log("Sending request to create a new proposal");

      //check if a conversation between these two users already exists
      let conversationId;
      const conversationExists = await checkConversationExists(
        gigDetails.user,
        currentUser.id
      );

      console.log("Conversation exists: ", conversationExists);

      if (conversationExists) {
        conversationId = conversationExists;
      } else {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/conversations`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({
              participant: gigDetails.user,
            }),
          }
        );
        const data = await response.json();
        console.log("Response from creating a new conversation: ", data);
        await new Promise((resolve) => {
          setActiveConversation(data._id);
          resolve();
        });
        conversationId = data._id;
      }

      await handleSendProposalMessage(message, conversationId)
        .then(() => {
          console.log("Message sent successfully");
        })
        .catch((err) => {
          console.error("Error in send proposal", err);
        });
    } catch (err) {
      console.error("Error in send proposal", err);
    }
  };

  // const handleSendMessageToConversation = (conversationId) => {
  //   console.log("Sending message to conversation: ", conversationId);
  //   // setActiveConversation((currentActiveConversation) => {
  //     // if (currentActiveConversation) {
  //       await handleSendProposalMessage(message, conversationId);
  //     // } else {
  //       // console.error("Active conversation not set");
  //     // }
  //     // return currentActiveConversation;
  //   // }
  // // );
  // };

  if (!gigDetails) {
    return <LoadingSkeleton />;
  }

  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              Category → {gigDetails.category}
            </div>

            <div className={styles.headerMainContainer}>
              <h1 className={styles.title}>{gigDetails.title}</h1>

              <div className={styles.ratingAndPriceContainer}>
                <div className={styles.ratingContainer}>
                  <span className={styles.star}>⭐</span> {gigDetails.rating} (
                  {gigDetails.numReviews})
                </div>
                <div className={styles.priceContainer}>
                  <h3>${gigDetails.price}</h3>
                </div>
              </div>
            </div>
          </div>
          <div className={styles.portfolio}>
            <div className={styles.portfolioItem}>
              <img
                src={gigDetails.images[0]}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            <div className={styles.portfolioItem}>
              <img
                src={gigDetails.images[1]}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            <div className={styles.portfolioItem}>
              <img
                src={gigDetails.images[2]}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
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
          <div className={styles.freelancerProfile}>
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
                  <h2 className={styles.designerName}>
                    {providerDetails.name}
                  </h2>
                  <span className={styles.ratingScore}>4.8 ⭐⭐⭐⭐ (427)</span>
                </div>
              </div>
              <div className={styles.miscInfoContainer}>
                <span className={styles.time}>11:55 AM PST</span>
                <p className={styles.location}>Islamabad, Pakistan</p>
                <p className={styles.joinDate}>Joined: March 2018</p>
              </div>
            </div>
          </div>
          <div className={styles.messageForm}>
            <h3>Send a private message</h3>
            <textarea
              className={styles.messageInput}
              onChange={handleMessageInput}
              placeholder={`Hi! ${providerDetails.name} i noticed your profile and would like to offer you my project`}
            ></textarea>
            <div className={styles.budgetSection}>
              <label htmlFor="budget">
                My Budget (Minimum ${gigDetails.price})
              </label>
              <div className={styles.budgetInput}>
                <span className={styles.currency}>$</span>
                <input
                  type="text"
                  id="budget"
                  defaultValue={gigDetails.price}
                  min={gigDetails.price}
                  onChange={handleBudgetInput}
                />
              </div>
            </div>
            <button className={styles.sendButton} onClick={handleSendProposal}>
              Send
            </button>
          </div>
        </div>
      </div>
      <div className={styles.reviewsContainer}>
        <h2>Recent Reviews</h2>
        {/* {reviews.map((review) => (
          <Review key={review.reviewer} {...review} />
        ))} */}
      </div>
    </>
  );
};

export default ViewServiceDetails;

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
