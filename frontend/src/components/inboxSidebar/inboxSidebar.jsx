/* eslint-disable react/prop-types */
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles/sidebar.module.scss";

function Sidebar({ conversations, activeConversation, onSelectConversation }) {
  const { currentUser } = useAuth();
  console.log("Active Conversation in Sidebar Component: ", activeConversation);

  return (
    <div className={styles.sidebar}>
      {conversations.map((convo) => (
        <div
          className={`${styles.message_list} ${
            activeConversation === convo._id ? styles.active : styles.inActive
          }`}
          key={convo._id}
          onClick={() => onSelectConversation(convo._id)}
        >
          <img
            className={styles.avatarImg}
            src={convo.participants[1].profilePictureUrl}
            alt="avatar"
          />

          <div className={styles.converationsDetailsContainer}>
            {currentUser.name == convo.participants[1].name ? (
              <h3
                className={`${styles.reciept} ${
                  activeConversation === convo._id
                    ? styles.activeReciept
                    : styles.inActiveReciept
                }`}
              >
                {convo.participants[0].name}
              </h3>
            ) : (
              <h3
                className={`${styles.reciept} ${
                  activeConversation === convo._id
                    ? styles.activeReciept
                    : styles.inActiveReciept
                }`}
              >
                {convo.participants[1].name}
              </h3>
            )}
            <p
              className={`${styles.conversationDate} ${
                activeConversation === convo._id
                  ? styles.activeDate
                  : styles.inActiveDate
              }`}
            >
              {new Date(convo.createdAt).toLocaleDateString()}
            </p>
            <p
              className={`${styles.lastMessage} ${
                activeConversation === convo._id
                  ? styles.activeMessage
                  : styles.inActiveMessage
              }`}
            >
              An example last message...
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Sidebar;
