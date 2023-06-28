
import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';

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
    <div>
      <h2>Active Elections</h2>
      {activeElections.length > 0 ? (
        <ul>
          {activeElections.map((election) => (
            <li key={election.ElectionID}>
              Title: {election.Title}, Start Date: {election.StartDate}, End Date: {election.EndDate}
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


