import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';

const VotingHistory = () => {
  const { user } = useContext(Context);
  const [votingHistory, setVotingHistory] = useState([]);

  useEffect(() => {
    fetchVotingHistory();
  });

  const fetchVotingHistory = async () => {
    try {
      const response = await axios.get(`${apiDomain}/voter/voting-history?VoterID=${user.VoterID}`, {
        headers: { Authorization: user.token },
      });
  
      if (response.status === 200) {
        setVotingHistory(response.data);
      } else {
        toast.error('Failed to fetch voting history');
      }
    } catch (error) {
      toast.error('Failed to fetch voting history');
    }
  };
  
  

return (
  <div>
    <h2>Voting History</h2>
    {votingHistory.length > 0 ? (
      <div>
        {votingHistory.map((vote) => (
          <div key={vote.VoteID}>
            <p>
              <strong>Voter Name:</strong> {vote.FirstName} {vote.SecondName}
            </p>
            <p>
              <strong>Position Name:</strong> {vote.PositionName}
            </p>
            <p>
              <strong>Candidate Name:</strong> {vote.CandidateFirstName} {vote.CandidateSecondName}
            </p>
            <p>
              <strong>Vote ID:</strong> {vote.VoteID}
            </p>
            <hr />
          </div>
        ))}
      </div>
    ) : (
      <p>No voting history found.</p>
    )}

    <ToastContainer />
  </div>
);  
};

export default VotingHistory;

