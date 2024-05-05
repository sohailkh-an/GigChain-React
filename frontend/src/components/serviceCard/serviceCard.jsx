import styles from "./styles/serviceCard.module.scss";

function ServiceCard({
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
    <div className={styles.service_card}>
      <img className={styles.thumbnailImage} width={400} height={200} src={thumbnailUrl} alt={category} />
      <div className={styles.cardDetails}>
        <h3>{title}</h3>
        <p>
          ⭐ {rating} ({reviews})
        </p>
        <p className={styles.serviceDescription}>
          {description} <em>starting at {price}</em>
        </p>
      </div>
    </div>
  );
}

export default ServiceCard;
