import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import styles from "./styles/page.module.scss";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import { useEffect } from "react";
import { ethers } from "ethers";

import GigFactoryArtifact from "../../contracts/GigFactory.json";

const CreateGigPage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [contract, setContract] = useState(null);
  console.log("Current User Details: ", currentUser);

  useEffect(() => {
    const initializeContract = async () => {
      if (typeof window.ethereum !== "undefined") {
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contractAddress = "YOUR_DEPLOYED_GIGFACTORY_CONTRACT_ADDRESS";
        const gigFactoryContract = new ethers.Contract(
          contractAddress,
          GigFactoryArtifact.abi,
          signer
        );
        setContract(gigFactoryContract);
      }
    };
    initializeContract();
  }, []);

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
      if (!contract) {
        console.error("Contract not initialized");
        return;
      }

      const tx = await contract.createGigOrder();
      const receipt = await tx.wait();
      const event = receipt.events.find(
        (event) => event.event === "GigOrderCreated"
      );
      const [gigOrderAddress] = event.args;
      console.log("GigOrder created at:", gigOrderAddress);

      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("thumbnailImage", formData.thumbnailImage);
      formDataToSend.append("user", currentUser._id);
      formDataToSend.append("serviceProvider", currentUser.name);
      formDataToSend.append(
        "providerProfilePicture",
        currentUser.profilePictureUrl
      );

      formDataToSend.append("gigOrderAddress", gigOrderAddress);

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/gig/create`,
        formDataToSend,
        {
          headers: {
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
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <h1 className={styles.formHeading}>Create Gig</h1>
          <div className={styles.formGroup}>
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className={styles.textareaField}
              required
            ></textarea>
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="price">Price:</label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="category">Category:</label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <div className={styles.formGroup}>
            <label htmlFor="thumbnailImage">Thumbnail Image:</label>
            <input
              type="file"
              id="thumbnailImage"
              name="thumbnailImage"
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>
          <button type="submit" className={styles.submitButton}>
            Create Gig
          </button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default CreateGigPage;
