import { useContext, useEffect } from "react";
import styles from "./styles/inbox.module.scss";
import UserSearch from "../../components/userSearch/userSearch";
import Sidebar from "../../components/inboxSidebar/inboxSidebar";
import MessageList from "../../components/messageList/messageList";
import MessageInput from "../../components/messageInput/messageInput";
import Navigation from "../../components/navigation/navigation";
import { useAuth } from "../../contexts/AuthContext";
import { ChatContext } from "../../contexts/ChatContext";

function Inbox() {
  const { currentUser } = useAuth();
  const {
    conversations,
    activeConversation,
    messages,
    userDetails,
    fetchUserDetails,
    handleSelectConversation,
    handleSendMessage,
    handleUserSelect,
  } = useContext(ChatContext);

  console.log("Current user in inbox component: ", currentUser);
  console.log("User Details: ", userDetails);

  useEffect(() => {
    fetchUserDetails(currentUser._id);
  }, [currentUser._id]);

  console.log("Messages extract from state variable: ", messages);
  console.log("Currently active conversation: ", activeConversation);

  return (
    <div className="app">
      <Navigation />
      {/* {userDetails ? ( */}
      <div className={styles.inboxParentContainer}>
        <div className={styles.sidebarParentContainer}>
          <UserSearch onUserSelect={handleUserSelect} />
          <Sidebar
            messages={messages}
            conversations={conversations}
            activeConversation={activeConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        <div className={styles.messageParentContainer}>
          {activeConversation && (
            <>
              <MessageList
                conversations={conversations}
                activeConversation={activeConversation}
                messages={messages}
              />
              <MessageInput onSendMessage={handleSendMessage} />
            </>
          )}
        </div>
      </div>
      {/* </>
      ) : (
        <div className={styles.loadingWrapper}>
          <div className={styles.loader}></div>
          <p className={styles.loadingText}>Loading...</p>{" "}
        </div>
      )} */}
      {/* <Footer /> */}
    </div>
  );
}
export default Inbox;
