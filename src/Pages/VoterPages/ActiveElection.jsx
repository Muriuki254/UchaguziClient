
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import './voter.css'

const ActiveElection = () => {
  const { user } = useContext(Context);
  const [activeElections, setActiveElections] = useState([]);

  useEffect(() => {
    fetchActiveElections();
  });

  const fetchActiveElections = async () => {
    try {
      const response = await axios.get(`${apiDomain}/voter/active-election`, {
        headers: { Authorization: user.token },
      });
      if (response.status === 200) {
        setActiveElections(response.data);
      } else {
        toast.error('Failed to fetch active elections');
      }
    } catch (error) {
      console.error('Failed to fetch active elections', error);
      toast.error('Failed to fetch active elections');
    }
  };

  return (
    <div style={{ marginLeft: '3rem' }}>
      <h2>Active Elections</h2>
      {activeElections.length > 0 ? (
        <ul style={{ listStyleType: 'none' }}>
          {activeElections.map((election) => (
            <li key={election.ElectionID}>
              <p>Title: <span style={{ fontWeight: 'bold', color:"hsl(71, 68%, 64%)" }}>{election.Title}</span></p>
              <p>Start Date: <span style={{ fontWeight: 'bold', color:"hsl(71, 68%, 64%)" }}>{election.StartDate}</span></p>
              <p>End Date: <span style={{ fontWeight: 'bold', color:"hsl(71, 68%, 64%)" }}>{election.EndDate}</span></p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No active elections found.</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default ActiveElection;


