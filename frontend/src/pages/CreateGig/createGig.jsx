import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import styles from "./styles/page.module.scss";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";

const CreateGigPage = () => {         
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  // console.log(currentUser.name);

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
      formDataToSend.append("serviceProvider", currentUser.name);


      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gig/create`,
        formDataToSend,
        {
          headers: {
            // "Content-Type": "multipart/form-data", BIG MISTAKE RIGHT HERE!!!!
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Gig created successfully:", response.data);
      navigate("/gigs");
    } catch (error) {
      console.error("Error creating gig:", error);
    }
  };

  return (
    <>
    <Navigation />
      <div className={styles.parentWrapper}>
        <h2>Create Gig</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div>
            <label htmlFor="title">Title:</label>
            <br />
            
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
            <br />
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
            <br />
            
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
            <br />
            
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
            <br />
            
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
      <Footer />
    </>
  );
};

export default CreateGigPage;
