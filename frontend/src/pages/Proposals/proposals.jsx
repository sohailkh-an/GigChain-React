import { useState, useEffect } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import ProposalDetailPage from "../ProposalDetailPage/proposalDetailPage";
import styles from "./styles/proposals.module.scss";

function ProposalsSection() {
  const [proposals, setProposals] = useState([]);
  const [selectedProposal, setSelectedProposal] = useState(null);
  const { currentUser } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    fetchProposals();
  }, []);

  const fetchProposals = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/api/proposals/freelancer-proposals/${
          currentUser._id
        }`
      );
      setProposals(response.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch proposals. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return <div className={styles.loading}>Loading proposals...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.proposalsSection}>
      <div className={styles.proposalsList}>
        <h2>Proposals</h2>
        {proposals.map((proposal) => (
          <div
            key={proposal._id}
            className={styles.proposalItem}
            onClick={() => setSelectedProposal(proposal)}
          >
            <h3>{proposal.gigId.title}</h3>
            <p>From: {proposal.clientId.name}</p>
            <p>Received: {new Date(proposal.createdAt).toLocaleDateString()}</p>
          </div>
        ))}
      </div>
      {selectedProposal && (
        <div className={styles.proposalDetailSidebar}>
          <ProposalDetailPage
            proposal={selectedProposal}
            onClose={() => setSelectedProposal(null)}
            onProjectStart={(updatedProposal) => {
              // Handle project initiation
            }}
          />
        </div>
      )}
    </div>
  );
}

export default ProposalsSection;
