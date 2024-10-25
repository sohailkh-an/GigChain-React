import { useState, useEffect, useContext } from "react";
import axios from "axios";

import styles from "./styles/inbox.module.scss";
import UserSearch from "../../components/userSearch/userSearch";
import Sidebar from "../../components/inboxSidebar/inboxSidebar";
import MessageList from "../../components/messageList/messageList";
import MessageInput from "../../components/messageInput/messageInput";
import { ChatContext } from "../../contexts/ChatContext";

function Inbox() {
  const {
    conversations,
    activeConversation,
    messages,
    currentUser,
    handleSelectConversation,
    handleSendMessage,
    handleProposalChanges,
    handleUserSelect,
  } = useContext(ChatContext);

  console.log("Currently active conversation: ", activeConversation);

  return (
    <div className="app">
      <div className={styles.inboxParentContainer}>
        <div className={styles.sidebarParentContainer}>
          <UserSearch onUserSelect={handleUserSelect} />
          <Sidebar
            currentUser={currentUser}
            messages={messages}
            conversations={conversations}
            activeConversation={activeConversation}
            onSelectConversation={handleSelectConversation}
          />
        </div>

        {activeConversation && (
          <>
            <div className={styles.messageParentContainer}>
              <MessageList
                currentUser={currentUser}
                conversations={conversations}
                activeConversation={activeConversation}
                messages={messages}
              />
              <MessageInput onSendMessage={handleSendMessage} />
            </div>
            <div className={styles.aboutUserContainer}>
              <ProjectInfoSidebar
                conversationId={activeConversation}
                handleProposalChanges={handleProposalChanges}
              />
            </div>
          </>
        )}
      </div>
      {/* </>
      ) : (
        <div className={styles.loadingWrapper}>
          <div className={styles.loader}></div>
          <p className={styles.loadingText}>Loading...</p>{" "}
        </div>
      )} */}
    </div>
  );
}
export default Inbox;

const ProjectInfoSidebar = ({ conversationId, handleProposalChanges }) => {
  const [projectInfo, setProjectInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [budget, setBudget] = useState();
  const [deadline, setDeadline] = useState();
  const [proposalDetails, setProposalDetails] = useState(null);

  useEffect(() => {
    const fetchProjectInfo = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/conversations/${conversationId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setProjectInfo(response.data);
        fetchProposalDetails();
        console.log(
          "Proposal details in project info sidebar: ",
          proposalDetails
        );
        console.log("Project info in project info sidebar: ", response.data);
        setLoading(false);
      } catch (err) {
        setError("Failed to load project information");
        setLoading(false);
      }
    };

    fetchProjectInfo();
  }, [conversationId, proposalDetails]);

  const fetchProposalDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(
      `${
        import.meta.env.VITE_API_URL
      }/api/conversations/${conversationId}/proposal`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    setProposalDetails(response.data);
  };

  const handleBudgetChange = (e) => {
    setBudget(e.target.value);
  };

  const handleDeadlineChange = (e) => {
    setDeadline(e.target.value);
  };

  const handleSubmitChanges = async () => {
    try {
      await handleProposalChanges(budget, deadline, conversationId);
      fetchProposalDetails();
    } catch (error) {
      console.error("Error updating proposal:", error);
    }
  };

  // if (loading) return <div>Loading project information...</div>;
  // if (error) return <div>{error}</div>;
  // if (!projectInfo) return <div>No project information available</div>;

  return (
    <div className="project-info-sidebar">
      <h2>{projectInfo?.serviceId?.title}</h2>
      <div className="project-status">Status: {projectInfo?.status}</div>
      <div className="project-budget">
        Current Budget: ${proposalDetails?.budget}
      </div>
      <input
        type="number"
        value={budget}
        onChange={handleBudgetChange}
        placeholder="Enter new budget"
      />

      <div className="project-deadline">
        Current Deadline:{" "}
        {new Date(proposalDetails?.deadline).toLocaleDateString()}
      </div>
      <input type="date" value={deadline} onChange={handleDeadlineChange} />

      <button onClick={handleSubmitChanges}>Update Proposal</button>
      <div className="project-actions">
        {projectInfo?.status === "proposal" && (
          <>
            <button>Accept Project</button>
            <button>Reject Project</button>
          </>
        )}
        {projectInfo?.status === "accepted" && (
          <button>Submit Deliverable</button>
        )}
      </div>
      <div className="project-deliverables">
        {/* <h3>Deliverables</h3> */}
        {/* {projectInfo.deliverables.map((deliverable, index) => (
          <div key={index} className="deliverable">
            <p>{deliverable.description}</p>
            <p>Status: {deliverable.status}</p>
          </div>
        ))} */}
      </div>
    </div>
  );
};
