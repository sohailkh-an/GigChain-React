import styles from "./styles/serviceCard.module.scss";
import { Link } from "react-router-dom";

function ServiceCard(service) {
  return (
    <Link to={`/service/${service.serviceId}`}>
      <div className={styles.service_card}>
        <img
          className={styles.thumbnailImage}
          width={400}
          height={200}
          src={service.images[0] || service.thumbnailUrl}
          alt={service.category}
        />
        <div className={styles.cardDetails}>
          <h3 className={styles.serviceTitle}>{service.title}</h3>
          <p>
            ⭐ {service.rating} ({service.reviews})
          </p>
          {/* <p className={styles.serviceDescription}>{service.description} </p> */}
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
