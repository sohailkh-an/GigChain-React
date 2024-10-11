import PropTypes from "prop-types";
import styles from "./styles/review.module.scss";

const Review = ({ reviewer, rating, comment, project, date, image }) => {
  return (
    <div className={styles.reviewContainer}>
      <div className={styles.reviewerInfo}>
        <div>
          <h3 className={styles.reviewerName}>{reviewer}</h3>
          <div className={styles.rating}>
            {"★".repeat(rating)}
            {"☆".repeat(5 - rating)}
            <span className={styles.ratingScore}>{rating.toFixed(1)}</span>
          </div>
          <p className={styles.comment}>&quot;{comment}&quot;</p>
        </div>
        <div className={styles.projectInfo}>
          <span>Project: {project}</span>
          <span className={styles.date}>{date}</span>
        </div>
      </div>
      <div className={styles.imageContainer}>
        <img src={image} alt="Review" className={styles.reviewImage} />
      </div>
    </div>
  );
};

export default Review;

Review.propTypes = {
  reviewer: PropTypes.string.isRequired,
  rating: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
  project: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
