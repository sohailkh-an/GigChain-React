import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";
import axios from "redaxios";
import styles from "./styles/createNewService.module.scss";
// import { ethers } from "ethers";

// import ServiceFactoryArtifact from "../../contracts/ServiceFactory.json";

const CreateServicePage = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startingPrice: "",
    category: "",
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [field, subfield] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [field]: { ...prev[field], [subfield]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert("You can only upload a maximum of 5 images.");
      return;
    }
    setFormData({
      ...formData,
      images: [...formData.images, ...files].slice(0, 5),
    });
  };

  const removeImage = (index) => {
    setFormData({
      ...formData,
      images: formData.images.filter((_, i) => i !== index),
    });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     //   if (!window.ethereum) {
  //     //     alert("Please install MetaMask to use this feature");
  //     //     return;
  //     //   }

  //     //   await window.ethereum.request({ method: "eth_requestAccounts" });
  //     //   const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     //   const signer = await provider.getSigner();

  //     //   const ServiceFactoryAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
  //     //   const ServiceFactoryContract = new ethers.Contract(
  //     //     ServiceFactoryAddress,
  //     //     ServiceFactoryArtifact.abi,
  //     //     signer
  //     //   );

  //     //   const tx = await ServiceFactoryContract.createService(
  //     //     formData.title,
  //     //     formData.description,
  //     //     ethers.utils.parseEther(formData.price.toString()),
  //     //     formData.category
  //     //   );

  //     //   console.log("Transaction hash:", tx.hash);

  //     //   const receipt = await tx.wait();
  //     //   console.log("Transaction was mined in block:", receipt.blockNumber);

  //     //   const ServiceCreatedEvent = receipt.events.find(
  //     //     (event) => event.event === "ServiceCreated"
  //     //   );

  //     //   if (!ServiceCreatedEvent) {
  //     //     throw new Error("ServiceCreated event not found in transaction logs");
  //     //   }

  //     //   const ServiceAddress = ServiceCreatedEvent.args.ServiceAddress;
  //     //   console.log("New Service Address:", ServiceAddress);

  //     const formDataToSend = new FormData();
  //     formDataToSend.append("title", formData.title);
  //     formDataToSend.append("description", formData.description);
  //     formDataToSend.append("price", formData.price);
  //     formDataToSend.append("category", formData.category);
  //     formData.images.forEach((image) => {
  //       formDataToSend.append(`images`, image);
  //     });
  //     formDataToSend.append("user", currentUser._id);
  //     formDataToSend.append("serviceProvider", currentUser.name);
  //     formDataToSend.append(
  //       "providerProfilePicture",
  //       currentUser.profilePictureUrl
  //     );
  //     // formDataToSend.append("ServiceAddress", ServiceAddress);

  //     const token = localStorage.getItem("token");

  //     const response = await axios.post(
  //       `${import.meta.env.VITE_API_URL}/api/services/create`,
  //       formDataToSend,
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     console.log("Service created successfully:", response.data);
  //     navigate("/services");
  //   } catch (error) {
  //     console.error("Error creating service:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("startingPrice", formData.startingPrice);

      formDataToSend.append("category", formData.category);
      formData.images.forEach((image) => {
        formDataToSend.append(`images`, image);
      });
      formDataToSend.append("user", currentUser._id);
      formDataToSend.append("serviceProvider", currentUser.name);
      formDataToSend.append(
        "providerProfilePicture",
        currentUser.profilePictureUrl
      );

      const token = localStorage.getItem("token");

      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/service/create`,
        formDataToSend,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Service created successfully:", response.data);
      navigate("/services");
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <>
      <div className={styles.parentWrapper}>
        <form onSubmit={handleSubmit} className={styles.formWrapper}>
          <h1 className={styles.formHeading}>Create Service</h1>
          <div className={styles.progressBar}>
            <div
              className={styles.progress}
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          {step === 1 && (
            <div className={styles.formStep}>
              <h2>Basic Information</h2>
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
              <button
                type="button"
                onClick={nextStep}
                className={styles.nextButton}
              >
                Next
              </button>
            </div>
          )}

          {step === 2 && (
            <div className={styles.formStep}>
              <h2>Description</h2>
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
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={prevStep}
                  className={styles.prevButton}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className={styles.nextButton}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className={styles.formStep}>
              <h2>Pricing</h2>
              <div className={styles.formGroup}>
                <label htmlFor="startingPrice">Starting Price:</label>
                <input
                  type="number"
                  id="startingPrice"
                  name="startingPrice"
                  value={formData.startingPrice}
                  onChange={handleChange}
                  className={styles.inputField}
                  required
                />
              </div>

              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={prevStep}
                  className={styles.prevButton}
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className={styles.nextButton}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className={styles.formStep}>
              <h2>Images</h2>
              <div className={styles.formGroup}>
                <label htmlFor="images">Upload Images (Max 5):</label>
                <input
                  type="file"
                  id="images"
                  name="images"
                  onChange={handleImageUpload}
                  className={styles.inputField}
                  multiple
                  accept="image/*"
                />
              </div>
              <div className={styles.imagePreview}>
                {formData.images.map((image, index) => (
                  <div key={index} className={styles.imageContainer}>
                    <img
                      src={URL.createObjectURL(image)}
                      alt={`Preview ${index + 1}`}
                    />
                    <button
                      type="button"
                      onClick={() => removeImage(index)}
                      className={styles.removeImageButton}
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
              <div className={styles.buttonGroup}>
                <button
                  type="button"
                  onClick={prevStep}
                  className={styles.prevButton}
                >
                  Previous
                </button>
                <button type="submit" className={styles.submitButton}>
                  Create Service
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </>
  );
};

export default CreateServicePage;
