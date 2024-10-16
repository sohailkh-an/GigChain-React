import { useState, useEffect, useContext } from "react";
import axios from "axios";
import styles from "./styles/proposalDetailPage.module.scss";
import MessageList from "../../components/messageList/messageList";
import MessageInput from "../../components/messageInput/messageInput";
import { ChatContext } from "../../contexts/ChatContext";

function ProposalDetailPage({ proposal, onClose, onProjectStart }) {
  //   const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [budget, setBudget] = useState(proposal.budget);
  const [deadline, setDeadline] = useState("");

  const {
    proposals,
    activeProposalConvo,
    messages,
    currentUser,
    handleSendMessage,
    handleProposalSelect,
  } = useContext(ChatContext);

  useEffect(() => {
    fetchMessages();
  }, [proposal._id]);

  const fetchMessages = async () => {
    // Implement API call to fetch messages for this proposal
  };

  const sendMessage = async () => {
    // Implement sending a new message
  };

  const updateProposal = async () => {
    // Implement updating the proposal with new budget and deadline
  };

  const initiateProject = async () => {
    onProjectStart({ ...proposal, budget, deadline });
  };

  return (
    <div className={styles.proposalDetailView}>
      <h2>Proposal Details</h2>
      <button className={styles.closeButton} onClick={onClose}>
        ×
      </button>
      <div className={styles.proposalInfo}>
        <p>
          <strong>Gig:</strong> {proposal.gigId.title}
        </p>
        <p>
          <strong>Client:</strong> {proposal.clientId.name}
        </p>
        <p>
          <strong>Initial Message:</strong> {proposal.message}
        </p>
        <p>
          <strong>Project Introduction:</strong> {proposal.projectIntroduction}
        </p>
      </div>

      <div className={styles.negotiationSection}>
        <input
          type="number"
          value={proposal.gigId.budget}
          onChange={(e) => setBudget(e.target.value)}
          placeholder="Budget"
        />
        <input
          type="date"
          value={deadline}
          onChange={(e) => setDeadline(e.target.value)}
          placeholder="Deadline"
        />
        <button onClick={updateProposal}>Update Proposal</button>
      </div>

      <div className={styles.chatSection}>
        <MessageList
          currentUser={currentUser}
          proposal={proposals}
          activeProposalConvo={activeProposalConvo}
          messages={messages}
        />
        <MessageInput />

        {/* {messages.map((message) => (
          <div key={message._id} className={styles.message}>
            {message.content}
          </div>
        ))}
        <textarea
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={sendMessage}>Send</button> */}
      </div>

      <button className={styles.startProjectButton} onClick={initiateProject}>
        Start Project
      </button>
    </div>
  );
}

export default ProposalDetailPage;
