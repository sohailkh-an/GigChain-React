import styles from "./styles/serviceCard.module.scss";
import { Link } from "react-router-dom";


function ServiceCard({
  gigId,
  title,
  price,
  thumbnailUrl,
  category,
  serviceProvider,
  rating,
  reviews,
  description,
}) {
  return (
    
    <Link to={`/gig/${gigId}`}>
    <div className={styles.service_card}>
      <img className={styles.thumbnailImage} width={400} height={200} src={thumbnailUrl} alt={category} />
      <div className={styles.cardDetails}>
        <h3>{title}</h3>
        {/* <h3>{gigId}</h3> */}
        <p>
          ⭐ {rating} ({reviews})
        </p>
        <p className={styles.serviceDescription}>
          {description} <em>starting at {price}</em>
        </p>
      </div>
    </div>
    </Link>
  );
}

export default ServiceCard;
