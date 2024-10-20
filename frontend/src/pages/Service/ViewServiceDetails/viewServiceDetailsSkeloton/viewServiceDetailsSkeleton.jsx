// GigDetailsSkeleton.js
import styles from "./viewServiceDetailsSkeleton.module.scss";

const ViewServiceDetailsSkeleton = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.leftColumn}>
          <div className={styles.header}>
            <div className={styles.breadcrumb}></div>
            <div className={styles.headerMainContainer}>
              <div className={styles.titleSkeleton}></div>
              <div className={styles.ratingAndPriceContainer}>
                <div className={styles.ratingContainer}></div>
                <div className={styles.priceContainer}></div>
              </div>
            </div>
          </div>
          <div className={styles.portfolio}>
            {[1, 2, 3].map((i) => (
              <div key={i} className={styles.portfolioItem}></div>
            ))}
          </div>
          <div className={styles.serviceDetails}>
            <div className={styles.descriptionSkeleton}></div>
            <div className={styles.descriptionSkeleton}></div>
            <div className={styles.descriptionSkeleton}></div>
          </div>
        </div>
        <div className={styles.rightColumn}>
          <div className={styles.freelancerProfile}>
            <div className={styles.profileTopContainer}>
              <div className={styles.profilePicAndRatingContainer}>
                <div className={styles.profilePicContainer}></div>
                <div className={styles.ratingAndNameContainer}>
                  <div className={styles.designerNameSkeleton}></div>
                  <div className={styles.ratingSkeleton}></div>
                </div>
              </div>
              <div className={styles.miscInfoContainer}>
                <div className={styles.infoSkeleton}></div>
                <div className={styles.infoSkeleton}></div>
                <div className={styles.infoSkeleton}></div>
              </div>
            </div>
          </div>
          <div className={styles.messageForm}>
            <div className={styles.formTitleSkeleton}></div>
            <div className={styles.messageInputSkeleton}></div>
            <div className={styles.budgetSection}>
              <div className={styles.budgetLabelSkeleton}></div>
              <div className={styles.budgetInputSkeleton}></div>
            </div>
            <div className={styles.sendButtonSkeleton}></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewServiceDetailsSkeleton;
