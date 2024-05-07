/* eslint-disable react/prop-types */
import styles from "./styles/serviceCard.module.scss";
import { Link } from "react-router-dom";

function ServiceCard(props) {
  console.log("description: ", props.service.description);
  const Id = props.service._id;
  return (
    <Link to={`/gig/${Id}`}>
      <div className={styles.service_card}>
        <img
          className={styles.thumbnailImage}
          width={400}
          height={200}
          src={props.service.thumbnailUrl}
          alt={props.service.category}
        />
        <div className={styles.cardDetails}>
          <h3>{props.service.title}</h3>
          {/* <h3>{props.service.serviceProvider}</h3> */}
          {/* <h3>{gigId}</h3> */}
          <p>
            ⭐ {props.service.rating} ({props.service.numReviews})
          </p>
          <p className={styles.serviceDescription}>
            {props.service.description}{" "}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
