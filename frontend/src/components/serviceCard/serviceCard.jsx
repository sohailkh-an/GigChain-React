import styles from "./styles/serviceCard.module.scss";
import { Link } from "react-router-dom";

function ServiceCard(service) {

  // console.log("description: ", service.description);
  return (
    <Link to={`/gig/${service.gigId}`}>
      <div className={styles.service_card}>
        <img
          className={styles.thumbnailImage}
          width={400}
          height={200}
          src={service.thumbnailUrl}
          alt={service.category}
        />
        <div className={styles.cardDetails}>
          <h3>{service.title}</h3>
          {/* <h3>{gigId}</h3> */}
          <p>
            ⭐ {service.rating} ({service.reviews})
          </p>
          <p className={styles.serviceDescription}>{service.description} </p>
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
