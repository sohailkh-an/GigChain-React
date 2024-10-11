// LogoDesignService.js
import styles from "./styles/newGigDetails.module.scss";
import Navbar from "./../../components/navigation/navigation";
import Footer from "./../../components/footer/footer";
import Review from "../../components/review/review";

import pImage1 from "../../assets/pImage1.jpg";
import pImage2 from "../../assets/pImage2.jpg";
import pImage3 from "../../assets/pImage3.jpg";
import pImage4 from "../../assets/pImage4.jpg";

const LogoDesignService = () => {
  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}>
              Category → Graphic Design → Logo Design
            </div>
            <h1 className={styles.title}>
              Logo Design Services starting at $100,
              <br />
              delivered within 1 week
            </h1>
          </div>
          <div className={styles.portfolio}>
            <div className={styles.portfolioItem}>
              <img
                src={pImage1}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            <div className={styles.portfolioItem}>
              <img
                src={pImage2}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            <div className={styles.portfolioItem}>
              <img
                src={pImage3}
                alt="Portfolio"
                className={styles.portfolioImage}
              />
            </div>
            {/* <div className={styles.portfolioItem}></div> */}
          </div>
          <div className={styles.serviceDetails}>
            <h2>What You Will Get With Our Graphic Design Service:</h2>
            <h3>Custom Design Concepts:</h3>
            <p>
              Receive 2-3 unique design concepts for your project, ensuring a
              tailored approach that aligns with your vision and brand identity.
            </p>
            <h3>Revisions:</h3>
            <p>
              Benefit from up to 3 rounds of revisions on your chosen concept,
              allowing us to fine-tune the design to perfection based on your
              feedback.
            </p>
            <h3>Custom Design Concepts:</h3>
            <p>
              Receive 2-3 unique design concepts for your project, ensuring a
              tailored approach that aligns with your vision and brand identity.
            </p>
            <h3>Revisions:</h3>
            <p>
              Benefit from up to 3 rounds of revisions on your chosen concept,
              allowing us to fine-tune the design to perfection based on your
              feedback.
            </p>
            <h3>Custom Design Concepts:</h3>
            <p>
              Receive 2-3 unique design concepts for your project, ensuring a
              tailored approach that aligns with your vision and brand identity.
            </p>
            <h3>Custom Design Concepts:</h3>
            <p>
              Receive 2-3 unique design concepts for your project, ensuring a
              tailored approach that aligns with your vision and brand identity.
            </p>
            <h3>Revisions:</h3>
            <p>
              Benefit from up to 3 rounds of revisions on your chosen concept,
              allowing us to fine-tune the design to perfection based on your
              feedback.
            </p>
            <h3>Custom Design Concepts:</h3>
            <p>
              Receive 2-3 unique design concepts for your project, ensuring a
              tailored approach that aligns with your vision and brand identity.
            </p>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.designerProfile}>
            <div className={styles.profileTopContainer}>
              <div className={styles.profilePicAndRatingContainer}>
                <div className={styles.profilePicContainer}>
                  <img src="" alt="" className={styles.profilePic} />
                </div>
                <div className={styles.ratingAndNameContainer}>
                  <span className={styles.ratingScore}>4.8 Rating (1400)</span>
                  <h2 className={styles.designerName}>Sohail Khan</h2>
                </div>
              </div>
              <div className={styles.miscInfoContainer}>
                <span className={styles.time}>11:55 AM PST</span>
                <p className={styles.location}>Islamabad, Pakistan</p>
                <p className={styles.joinDate}>Joined: March 2018</p>
              </div>
            </div>
            <div className={styles.profileBottomContainer}>
              <p className={styles.bio}>
                A graphic designer and art director from Islamabad with focus on
                branding and logo design for startups and SMBs.
              </p>
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
    rating: 5,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage1,
  },

  {
    reviewer: "Kamran Javaid",
    rating: 5,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage2,
  },
  {
    reviewer: "Kamran Javaid",
    rating: 5,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage3,
  },
  {
    reviewer: "Kamran Javaid",
    rating: 5,
    comment:
      "Khan brings unmatched creativity and dedication, a true pleasure to work with! He really has a passion for graphic design and that is what is shown in his work he creates. It’s been two years working with Khan and he always delivers the best and extraordinary work on time beyond our expectations. We always recommend him to our network of colleagues in our circle.",
    project: "Create brand identity for a fin-tech startup",
    date: "Sep 18, 2023",
    image: pImage4,
  },
];
