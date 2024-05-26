import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import styles from "./styles/messageList.module.scss";

function MessageList({ currentUser, conversations, activeConversation, messages }) {
  const [otherUser, setOtherUser] = useState({});
  const messageListRef = useRef(null);

  useEffect(() => {
    conversations.map((convo) => {
      if (convo._id === activeConversation) {
        if (convo.participants[0]._id === currentUser.id) {
          setOtherUser(convo.participants[1]);
        } else if (convo.participants[1]._id === currentUser.id) {
          setOtherUser(convo.participants[0]);
        }
      }
    });
  }, [activeConversation, currentUser, conversations]);

  useEffect(() => {
    // Scroll to the bottom of the message list when new messages are added
    if (messageListRef.current) {
      messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <>
      <div className={styles.receiptNameBar}>
        <h2 className={styles.receiptName}>{otherUser.name}</h2>
        <Link to={`/user/${otherUser._id}`}>
          <h4>Go to Profile</h4>
        </Link>
      </div>
      <div className={styles.chatContainer}>
        <div className={styles.message_list} ref={messageListRef}>
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
                    message.sender === currentUser.id
                      ? styles.sent
                      : styles.received
                  }`}
                >
                  {message.content}
                </div>
                <p
                  className={`${
                    message.sender === currentUser.id
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
