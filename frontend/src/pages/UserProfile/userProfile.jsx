import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import axios from "redaxios";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import styles from "./styles/page.module.scss";

const UserProfile = () => {
  const { currentUser } = useAuth();

  const { userId } = useParams();
  console.log(userId);
  console.log(useParams());

  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/users/user/${userId}`
        );

        if (!response.data.user) {
          console.log("User not found");
          return;
        }
        console.log(response.data.user);
        setUserDetails(response.data.user);
      } catch (error) {
        console.error("Error fetching user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);

  if (!currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Navigation />
      {userDetails ? (
      <>
        <div className={styles.coverPictureContainer}>
          <img
            src={userDetails.coverPictureUrl}
            alt="Cover Picture"
            className={styles.coverPicture}
          />
        </div>

        <div className={styles.mainProfileWrapper}>
          <div className={styles.mainProfileContainer}>
            <div className={styles.profilePictureContainer}>
              <img
                src={userDetails.profilePictureUrl}
                alt="Profile Picture"
                className={styles.profilePicture}
              />
            </div>

            <h2>{userDetails.name}</h2>
            <p>Email: {userDetails.email}</p>
            <p>User ID: {userDetails._id}</p>
          </div>
        </div>
      </>
      ) : (<div>Loading user profile...</div>
      )}
      <Footer />
    </div>
  );
};

export default UserProfile;
