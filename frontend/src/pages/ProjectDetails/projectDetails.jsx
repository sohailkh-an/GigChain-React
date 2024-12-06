// Start of Selection
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import styles from "./styles/projectDetails.module.scss";

const ProjectDetails = () => {
  const { projectId } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Example project data to mimic API response
    const exampleProject = {
      _id: "proj123",
      serviceId: { title: "Mobile App Development" },
      status: "in_progress",
      clientId: {
        name: "Jane Doe",
        avatar: "/avatars/jane-doe.png",
      },
      budget: 5000,
      deadline: "2024-12-31",
      createdAt: "2024-01-15",
      updatedAt: "2024-06-20",
      deliverables: [
        {
          status: "submitted",
          submittedAt: "2024-07-01",
          description: "Initial wireframes and design mockups.",
        },
        {
          status: "pending",
          description: "Final app development and testing.",
        },
      ],
      clientReview: {
        rating: 4.7,
        comment: "Great progress so far! Excited to see the final product.",
      },
    };

    // Simulate data fetching
    const loadProjectDetails = () => {
      // Mimicking an API call delay
      setTimeout(() => {
        setProject(exampleProject);
        setLoading(false);
      }, 1000);
    };

    loadProjectDetails();
  }, [projectId]);

  if (loading) {
    return (
      <div className={styles.loading}>
        <div className={styles.spinner}></div>
        Loading project details...
      </div>
    );
  }

  if (!project) {
    return <div className={styles.error}>Project not found</div>;
  }

  return (
    <div className={styles.projectDetails}>
      <div className={styles.header}>
        <div className={styles.mainInfo}>
          <h1>{project.serviceId.title}</h1>
          <span className={`${styles.status} ${styles[project.status]}`}>
            {project.status.replace("_", " ")}
          </span>
        </div>
        <div className={styles.metadata}>
          <div className={styles.metaItem}>
            <span className={styles.label}>Created:</span>
            <span>{format(new Date(project.createdAt), "MMM dd, yyyy")}</span>
          </div>
          <div className={styles.metaItem}>
            <span className={styles.label}>Last Updated:</span>
            <span>{format(new Date(project.updatedAt), "MMM dd, yyyy")}</span>
          </div>
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.mainContent}>
          <section className={styles.section}>
            <h2>Project Overview</h2>
            <div className={styles.overviewGrid}>
              <div className={styles.overviewItem}>
                <span className={styles.label}>Budget</span>
                <span className={styles.value}>${project.budget}</span>
              </div>
              <div className={styles.overviewItem}>
                <span className={styles.label}>Deadline</span>
                <span className={styles.value}>
                  {format(new Date(project.deadline), "MMM dd, yyyy")}
                </span>
              </div>
              {project.completedAt && (
                <div className={styles.overviewItem}>
                  <span className={styles.label}>Completed On</span>
                  <span className={styles.value}>
                    {format(new Date(project.completedAt), "MMM dd, yyyy")}
                  </span>
                </div>
              )}
            </div>
          </section>

          <section className={styles.section}>
            <h2>Deliverables</h2>
            <div className={styles.deliverables}>
              {project.deliverables.map((deliverable, index) => (
                <div key={index} className={styles.deliverable}>
                  <div className={styles.deliverableHeader}>
                    <span
                      className={`${styles.deliverableStatus} ${styles[deliverable.status]}`}
                    >
                      {deliverable.status}
                    </span>
                    {deliverable.submittedAt && (
                      <span className={styles.submissionDate}>
                        Submitted:{" "}
                        {format(
                          new Date(deliverable.submittedAt),
                          "MMM dd, yyyy"
                        )}
                      </span>
                    )}
                  </div>
                  <p className={styles.deliverableDescription}>
                    {deliverable.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {project.clientReview && (
            <section className={styles.section}>
              <h2>Client Review</h2>
              <div className={styles.review}>
                <div className={styles.rating}>
                  {[...Array(5)].map((_, index) => (
                    <span
                      key={index}
                      className={
                        index < project.clientReview.rating
                          ? styles.starFilled
                          : styles.star
                      }
                    >
                      ★
                    </span>
                  ))}
                  <span className={styles.ratingValue}>
                    {project.clientReview.rating.toFixed(1)}
                  </span>
                </div>
                <p className={styles.comment}>{project.clientReview.comment}</p>
              </div>
            </section>
          )}
        </div>

        <aside className={styles.sidebar}>
          <div className={styles.clientInfo}>
            <h3>Client Information</h3>
            <div className={styles.clientDetails}>
              <img
                src={project.clientId.avatar || "/default-avatar.png"}
                alt={project.clientId.name}
                className={styles.clientAvatar}
              />
              <div>
                <h4>{project.clientId.name}</h4>
                <button className={styles.messageButton}>Message Client</button>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ProjectDetails;
