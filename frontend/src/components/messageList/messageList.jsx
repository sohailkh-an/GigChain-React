import { useAuth } from "../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/messageList.module.scss";

function MessageList({ conversations, activeConversation, messages }) {
  const { currentUser } = useAuth();
  const [receiptName, setReceiptName] = useState("");
  const [receiptId, setReceiptId] = useState("");

  useEffect(() => {
    conversations.map((convo) => {
      if (convo._id == activeConversation) {
        setReceiptName(convo.participants[1].name);
        setReceiptId(convo.participants[1]._id);
      }
    });
  }, [activeConversation, conversations]);

  return (
    <>
      <div className={styles.receiptNameBar}>
        <h2 className={styles.receiptName}>{receiptName}</h2>
        <Link to={`/user/${receiptId}`}>
          <h4>Go to Profile</h4>
        </Link>
      </div>
        <div className={styles.chatContainer}>
      <div className={styles.message_list}>
          {messages.map((message) => {
            const messageDate = new Date(message.timestamp);
            const currentDate = new Date();

            const messageDateOnly = new Date(
              messageDate.getFullYear(),
              messageDate.getMonth(),
              messageDate.getDate()
            );
            const currentDateOnly = new Date(
              currentDate.getFullYear(),
              currentDate.getMonth(),
              currentDate.getDate()
            );

            const isToday =
              messageDateOnly.getTime() === currentDateOnly.getTime();
            const isYesterday =
              messageDateOnly.getTime() ===
              currentDateOnly.getTime() - 24 * 60 * 60 * 1000;

            const timeString = messageDate.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });

            let displayDateTime;
            if (isToday) {
              displayDateTime = timeString;
            } else if (isYesterday) {
              displayDateTime = `Yesterday ${timeString}`;
            } else {
              const dateString = messageDate.toLocaleDateString();
              displayDateTime = `${dateString} ${timeString}`;
            }

            return (
              <div className={styles.main_cont_msg} key={message._id}>
                <div
                  className={` ${styles.chatBubble} ${
                    message.sender === currentUser._id
                      ? styles.sent
                      : styles.received
                  }`}
                >
                  {message.content}
                </div>
                <p
                  className={`${
                    message.sender === currentUser._id
                      ? styles.sentTimestamp
                      : styles.receivedTimestamp
                  }`}
                >
                  {displayDateTime}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default MessageList;
