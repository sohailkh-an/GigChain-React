import PropTypes from 'prop-types';

function ProposalItem({ proposal, onAccept, onReject }) {
  const { _id, gigId, clientId, message, projectIntroduction, budget, status, createdAt } = proposal;

  return (
    <div className="proposal-item">
      <h3>Proposal for: {gigId.title}</h3>
      <p>From: {clientId.name}</p>
      <p>Message: {message}</p>
      <p>Project Introduction: {projectIntroduction}</p>
      <p>Budget: ${budget}</p>
      <p>Status: {status}</p>
      <p>Received: {new Date(createdAt).toLocaleDateString()}</p>
      
      {status === 'pending' && (
        <div className="proposal-actions">
          <button onClick={() => onAccept(_id)} className="accept-btn">Accept</button>
          <button onClick={() => onReject(_id)} className="reject-btn">Reject</button>
        </div>
      )}
    </div>
  );
}

ProposalItem.propTypes = {
  proposal: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    gigId: PropTypes.shape({
      title: PropTypes.string.isRequired,
    }).isRequired,
    clientId: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    message: PropTypes.string.isRequired,
    projectIntroduction: PropTypes.string.isRequired,
    budget: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    createdAt: PropTypes.string.isRequired,
  }).isRequired,
  onAccept: PropTypes.func.isRequired,
  onReject: PropTypes.func.isRequired,
};

export default ProposalItem;
