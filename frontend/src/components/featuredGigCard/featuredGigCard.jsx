/* eslint-disable react/prop-types */
import styles from "./styles/serviceCard.module.scss";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

function ServiceCard(props) {
  const Id = props.service._id;

  return (
    <Link to={`/gig/${Id}`}>
      <div className={styles.service_card}>
        <img
          className={styles.thumbnailImage}
          width={400}
          height={200}
          src={props.service.images[0] || props.service.thumbnailUrl}
          alt={props.service.category}
        />
        <div className={styles.cardDetails}>
          <h3>{props.service.title}</h3>
          <p className={styles.rating}>
            <span className={styles.star}>⭐</span> {props.service.rating} (
            {props.service.numReviews})
          </p>
          <div className={styles.serviceProvider}>
            <img
              className={styles.profilePic}
              src={props.service.providerProfilePicture}
              alt={props.service.serviceProvider}
            />
            <h3>{props.service.serviceProvider}</h3>
          </div>

          <div className={styles.priceContainer}>
            <h3>${props.service.price}</h3>
          </div>

          {/* <p className={styles.serviceDescription}>
            {props.service.description}{" "}
          </p> */}
        </div>
      </div>
    </Link>
  );
}

export default ServiceCard;
