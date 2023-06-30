import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';

function VoteCasting() {
  const { user } = useContext(Context);
  const [positions, setPositions] = useState([]);
  const [positionCandidates, setPositionCandidates] = useState({});
  const [selectedCandidates, setSelectedCandidates] = useState({});

  useEffect(() => {
    fetchPositions();
  });

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/positions`, {
        headers: { Authorization: user.token },
      });
      const positionsData = response.data;
      setPositions(positionsData);

      const candidatesPromises = positionsData.map((position) =>
        axios.get(`${apiDomain}/admin/candidates?positionName=${position.PositionName}`, {
          headers: { Authorization: user.token },
        })
      );
      const candidatesResponses = await Promise.all(candidatesPromises);
      const candidatesData = candidatesResponses.map((response) => response.data);

      const positionCandidatesData = positionsData.reduce((acc, position, index) => {
        acc[position.PositionName] = candidatesData[index];
        return acc;
      }, {});
      setPositionCandidates(positionCandidatesData);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch positions and candidates');
    }
  };

  const handleCandidateChange = (e, positionName) => {
    const selectedCandidateId = e.target.value;
    setSelectedCandidates((prevSelectedCandidates) => ({
      ...prevSelectedCandidates,
      [positionName]: selectedCandidateId,
    }));
  };

  const castVote = async () => {
    try {
      // Check if the voter has already voted
      const response = await axios.get(`${apiDomain}/voter/has-voted?VoterID=${user.VoterID}`, {
        headers: { Authorization: user.token },
      });
      const hasVoted = response.data.hasVoted;
      if (hasVoted) {
        toast.error('You have already cast your vote');
        return;
      }
  
      for (const positionName in selectedCandidates) {
        const selectedCandidateId = selectedCandidates[positionName];
        await axios.post(
          `${apiDomain}/voter/vote?VoterID=${user.VoterID}`,
          { PositionName: positionName, CandidateID: parseInt(selectedCandidateId) },
          { headers: { Authorization: user.token } }
        );
      }
      toast.success('Votes casted successfully');
      setSelectedCandidates({});
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error('Failed to cast votes');
      }
    }
  };
  

  return (
    <div className="vote-casting-container">
      <h3>Best Kenyan President</h3>
      {positions.map((position) => (
        <div key={position.PositionID}>
          <h3>{position.PositionName}</h3>
          <div style={{ display: 'flex', flexDirection: 'row',gap:'10px'}}>
            {positionCandidates[position.PositionName]?.map((candidate) => (
              <div className="candidate-card" key={candidate.CandidateID}>
                <input
                  type="checkbox"
                  name={position.PositionName}
                  value={candidate.CandidateID}
                  checked={selectedCandidates[position.PositionName] === candidate.CandidateID}
                  onChange={(e) => handleCandidateChange(e, position.PositionName)}
                />
                <div className="candidate-details">
                  <label>President Name</label>
                  <p>{`${candidate.FirstName} ${candidate.SecondName}`}</p>
                </div>
                <div className="candidate-details">
                  <label>Party</label>
                  <p>{candidate.Party}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
  
      <button style={{ marginTop: '25px' }} onClick={castVote} disabled={Object.keys(selectedCandidates).length !== positions.length}>
        Cast Vote
      </button>
  
      <ToastContainer />
    </div>
  );
  
}

export default VoteCasting;
