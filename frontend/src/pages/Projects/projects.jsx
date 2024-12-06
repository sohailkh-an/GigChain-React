import { useState, useEffect } from "react";
import styles from "./styles/projects.module.scss";
import { Link } from "react-router-dom";
import { format } from "date-fns";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";

const Projects = () => {
  const { currentUser } = useAuth();
  const [projects, setProjects] = useState([
    {
      _id: "1",
      serviceId: { title: "Website Design" },
      status: "in_progress",
      clientId: { name: "Alice Johnson" },
      budget: 1500,
      deadline: "2024-06-15",
      clientReview: { rating: 4.8 },
    },
    {
      _id: "2",
      serviceId: { title: "Mobile App Development" },
      status: "pending",
      clientId: { name: "Bob Smith" },
      budget: 3000,
      deadline: "2024-07-01",
    },
    {
      _id: "3",
      serviceId: { title: "SEO Optimization" },
      status: "completed",
      clientId: { name: "Charlie Davis" },
      budget: 800,
      deadline: "2024-05-20",
      clientReview: { rating: 5.0 },
    },
    {
      _id: "4",
      serviceId: { title: "Graphic Design" },
      status: "in_progress",
      clientId: { name: "Dana Lee" },
      budget: 1200,
      deadline: "2024-06-30",
    },
    {
      _id: "5",
      serviceId: { title: "Content Writing" },
      status: "completed",
      clientId: { name: "Evan Brown" },
      budget: 600,
      deadline: "2024-05-10",
      clientReview: { rating: 4.5 },
    },
  ]);

  const [activeTab, setActiveTab] = useState("ongoing");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/projects/get-projects`,
          //   { userId: currentUser._id },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjects(response.data.projects);
      } catch (error) {
        console.error("Error fetching projects:", error);
      }
    };
    fetchProjects();
  }, []);

  const filteredProjects = projects.filter((project) => {
    if (activeTab === "ongoing") {
      return project.status === "in_progress" || project.status === "pending";
    }
    return project.status === "completed";
  });

  return (
    <div className={styles.projectsContainer}>
      <div className={styles.header}>
        <h1>My Projects</h1>
        <div className={styles.tabs}>
          <button
            className={`${styles.tab} ${activeTab === "ongoing" ? styles.active : ""}`}
            onClick={() => setActiveTab("ongoing")}
          >
            Ongoing Projects
          </button>
          <button
            className={`${styles.tab} ${activeTab === "completed" ? styles.active : ""}`}
            onClick={() => setActiveTab("completed")}
          >
            Completed Projects
          </button>
        </div>
      </div>

      <div className={styles.projectsGrid}>
        {filteredProjects.map((project) => (
          <Link
            to={`/projects/${project._id}`}
            key={project._id}
            className={styles.projectCard}
          >
            <div className={styles.projectHeader}>
              <h3>{project.serviceId.title}</h3>
              <span className={`${styles.status} ${styles[project.status]}`}>
                {project.status.replace("_", " ")}
              </span>
            </div>
            <div className={styles.projectInfo}>
              <div className={styles.infoItem}>
                <span className={styles.label}>Client:</span>
                <span>{project.clientId.name}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Budget:</span>
                <span>${project.budget}</span>
              </div>
              <div className={styles.infoItem}>
                <span className={styles.label}>Deadline:</span>
                <span>
                  {format(new Date(project.deadline), "MMM dd, yyyy")}
                </span>
              </div>
            </div>
            {project.clientReview && (
              <div className={styles.rating}>
                <span>★</span>
                <span>{project.clientReview.rating.toFixed(1)}</span>
              </div>
            )}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Projects;
