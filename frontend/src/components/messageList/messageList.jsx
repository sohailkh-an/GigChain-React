/* eslint-disable react/prop-types */
import { useAuth } from "../../contexts/AuthContext";
import styles from "./styles/messageList.module.scss";

function MessageList({ messages }) {
  const { currentUser } = useAuth();
  // console.log("Message Content in Messagelist Component: ", messages[0].content);
  return (
    <div className={styles.message_list}>
      {messages.map((message) => (
        <div
          key={message._id}
          className={`${styles.message_list} ${
            message.sender === currentUser._id ? styles.sent : styles.received
          }`}
        >
          <p>{message.content}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
