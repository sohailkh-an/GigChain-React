import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import styles from "./styles/page.module.scss";

const CurrentUserProfile = () => {
  const { currentUser } = useAuth();
  const [profilePicture, setProfilePicture] = useState(null);
  const [coverPicture, setCoverPicture] = useState(null);



  useEffect(() => {
    const fetchProfilePicture = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${currentUser._id}/profile-picture`
        );
        setProfilePicture(response.data.profilePictureUrl);
      } catch (error) {
        console.log("Error occured in fetching profile picture: ", error.message);
        console.error("Error fetching profile picture:", error);
      }
    };
    const fetchCoverPicture = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/${currentUser._id}/cover-picture`
        );
        setCoverPicture(response.data.coverPictureUrl);
      } catch (error) {
        console.error("Error fetching cover picture:", error);
      }
    };

    fetchProfilePicture();
    fetchCoverPicture();
  }, [currentUser]);

  const handleProfilePictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("profilePicture", file);

    try {
      await axios.post(
        `${import.meta.env.VITE_API_URL}/api/users/${currentUser._id}/profile-picture`,
        formData
      );
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${currentUser._id}/profile-picture`
      );
      setProfilePicture(response.data.profilePictureUrl);
    } catch (error) {
      console.error("Error uploading profile picture:", error);
    }
  };

  const handleCoverPictureUpload = async (event) => {
    const file = event.target.files[0];
    const formData = new FormData();
    formData.append("coverPicture", file);

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/api/users/${currentUser._id}/cover-picture`, formData);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/users/${currentUser._id}/cover-picture`
      );
      setCoverPicture(response.data.coverPictureUrl);
    } catch (error) {
      console.error("Error uploading cover picture:", error);
    }
  };

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />

      <div className={styles.coverPictureContainer}>
        <img
          src={coverPicture}
          alt="Cover Picture"
          className={styles.coverPicture}
        />
        <label htmlFor="coverPictureInput" className={styles.coverPictureLabel}>
          Change Cover Picture
        </label>
        <input
          id="coverPictureInput"
          type="file"
          accept="image/*"
          onChange={handleCoverPictureUpload}
          style={{ display: "none" }}
        />
      </div>

      <div className={styles.mainProfileWrapper}>
        <div className={styles.mainProfileContainer}>
          <div className={styles.profilePictureContainer}>
            <img
              src={profilePicture}
              alt="Profile Picture"
              className={styles.profilePicture}
            />
            <label
              htmlFor="profilePictureInput"
              className={styles.profilePictureLabel}
            >
              Change
            </label>
            <input
              id="profilePictureInput"
              type="file"
              accept="image/*"
              onChange={handleProfilePictureUpload}
              style={{ display: "none" }}
            />
          </div>

          <h2>{currentUser.name}</h2>
          <p>Email: {currentUser.email}</p>
          <p>User ID: {currentUser._id}</p>
          
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default CurrentUserProfile;
