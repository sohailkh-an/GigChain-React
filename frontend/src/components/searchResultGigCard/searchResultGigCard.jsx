/* eslint-disable react/prop-types */
import styles from "./styles/serviceCard.module.scss";
import { Link } from "react-router-dom";

function ServiceCard({gig}) {
  // console.log("description: ", props.service.description);
  const Id = gig._id;
  return (
    <Link to={`/gig/${Id}`}>
      <div className={styles.service_card}>
        <img
          className={styles.thumbnailImage}
          width={400}
          height={200}
          src={gig.thumbnailUrl}
          alt={gig.category}
        />
        <div className={styles.cardDetails}>
          <h3>{gig.title}</h3>
          {/* <h3>{props.service.serviceProvider}</h3> */}
          {/* <h3>{gigId}</h3> */}
          <p>
            ⭐ {gig.rating} ({gig.numReviews})
          </p>
          <p className={styles.serviceDescription}>
            {gig.description}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
