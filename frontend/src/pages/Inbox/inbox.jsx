import { useState, useEffect, useRef } from "react";
import styles from "./styles/inbox.module.scss";
import io from "socket.io-client";
import UserSearch from "../../components/userSearch/userSearch";
import Sidebar from "../../components/inboxSidebar/inboxSidebar";
import MessageList from "../../components/messageList/messageList";
import MessageInput from "../../components/messageInput/messageInput";
import Navigation from "../../components/navigation/navigation";
import Footer from "../../components/footer/footer";
import { useAuth } from "../../contexts/AuthContext";

function Inbox() {
  const { currentUser } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [activeConversation, setActiveConversation] = useState(null);
  const [messages, setMessages] = useState([]);

  const [updateKey, setUpdateKey] = useState(0);

  const forceReRender = () => setUpdateKey((prevKey) => prevKey + 1);

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(`${import.meta.env.VITE_API_URL}`);

    socket.current.on("connect", () => {
      console.log("Connected to server");
    });

    socket.current.on("new message", (message) => {
      console.log("Received new message: ", message);
      setConversations((prevConversations) => {
        return prevConversations.map((convo) => {
          if (convo.id === message.conversationId) {
            return { ...convo, messages: [...convo.messages, message] };
          }
          return convo;
        });
      });

      // if (message.conversationId === activeConversation) {
      setMessages((prevMessages) => [...prevMessages, message]);
      // }
    });

    if (activeConversation) {
      socket.current.emit("join conversation", activeConversation);
    }

    fetchConversations();
    if (activeConversation) {
      fetchMessages(activeConversation);
    }

    return () => {
      socket.current.off("connect");
      socket.current.off("new message");
      if (activeConversation) {
        socket.current.emit("leave conversation", activeConversation); // Adjust based on your backend implementation
      }
      socket.current.disconnect("disconnect");
    };
  }, [activeConversation]);

  const fetchConversations = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/conversations`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      const data = await response.json();
      setConversations(data);
      console.log("Conversations fetched: ", data);
    } catch (error) {
      console.error("Error fetching conversations:", error);
    }
  };

  const handleSelectConversation = (id) => {
    console.log("Selected conversation:", id);
    setActiveConversation(id);
  };

  const handleSendMessage = async (text) => {
    console.log("Sending message...", text, currentUser._id, activeConversation);
    if (activeConversation) {
      const message = {
        conversationId: activeConversation,
        sender: currentUser._id,
        text: text,
      };
      socket.current.emit("send-message", message);
    } else {
      console.error("No active conversation found");
    }
  };

  const fetchMessages = async (conversationId) => {
    const response = await fetch(
      `${
        import.meta.env.VITE_API_URL
      }/api/conversations/${conversationId}/messages`,
      {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      }
    );
    const data = await response.json();
    setMessages(data);
    console.log("Messages fetched: ", data);
  };

  const handleUserSelect = async (user) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/api/conversations`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ participant: user._id }),
      }
    );
    const newConversation = await response.json();
    setConversations([...conversations, newConversation]);
    setActiveConversation(newConversation._id);
  };

  console.log("Messages extract from state variable: ", messages);
  console.log("Currently active conversation: ", activeConversation);

  return (
    <div className="app">
      <Navigation />

      <div className={styles.inboxParentContainer}>
        <div className={styles.sidebarParentContainer}>
          <UserSearch onUserSelect={handleUserSelect} />
          <Sidebar
            conversations={conversations}
            activeConversation={activeConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        <div className={styles.messageParentContainer}>
          {activeConversation && (
            <>
              <MessageList conversations={conversations} activeConversation={activeConversation} key={updateKey} messages={messages} />
              <MessageInput  onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
}

export default Inbox;
