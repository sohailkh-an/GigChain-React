import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import styles from "./styles/page.module.scss";

const CreateGigPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    thumbnailUrl: null,
  });

  const handleChange = (e) => {
    if (e.target.name === "thumbnailImage") {
      setFormData({ ...formData, thumbnailImage: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("thumbnailImage", formData.thumbnailImage);
      formDataToSend.append("user", currentUser._id);
      formDataToSend.append("serviceProvider", currentUser._id);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        "https://gigchain-backend.vercel.app/api/gig/create",
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "Authorization": `Bearer ${token}`,
          },
        }
      );

      console.log("Gig created successfully:", response.data);
      navigate("/profile");
    } catch (error) {
      console.error("Error creating gig:", error);
    }
  };

  return (
    <div className={styles.parentWrapper}>
      <h2>Create Gig</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="thumbnailImage">Thumbnail Image:</label>
          <input
            type="file"
            id="thumbnailImage"
            name="thumbnailImage"
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Create Gig</button>
      </form>
    </div>
  );
};

export default CreateGigPage;
