// LogoDesignService.js
import styles from "./styles/newGigDetails.module.scss";

const LogoDesignService = () => {
  return (
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
          {/* You would replace these with actual images */}
          <div className={styles.portfolioItem}></div>
          <div className={styles.portfolioItem}></div>
          <div className={styles.portfolioItem}></div>
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
        </div>
      </div>
      <div className={styles.rightColumn}>
        <div className={styles.designerProfile}>
          <div className={styles.rating}>
            <span className={styles.ratingScore}>4.8 Rating (1400)</span>
            <span className={styles.time}>11:55 AM PST</span>
          </div>
          <h2 className={styles.designerName}>Sohail Khan</h2>
          <p className={styles.location}>Islamabad, Pakistan</p>
          <p className={styles.joinDate}>Joined: March 2018</p>
          <p className={styles.bio}>
            A graphic designer and art director from Islamabad with focus on
            branding and logo design for startups and SMBs.
          </p>
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
  );
};

export default LogoDesignService;
