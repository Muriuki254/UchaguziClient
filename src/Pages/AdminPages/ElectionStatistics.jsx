import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import AdminStats from '../../charts/AdminStats';

const ElectionStatistics = () => {
  const { user } = useContext(Context);
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    fetchStatistics();
  });

  const fetchStatistics = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/statistics`, {
        headers: { Authorization: user.token },
      });
      if (response.status === 200) {
        setStatistics(response.data);
      } else {
        toast.error('Failed to fetch election statistics');
      }
    } catch (error) {
      console.error('Failed to fetch election statistics', error);
      toast.error('Failed to fetch election statistics');
    }
  };

  return (
    <div>
      <h2>Election Statistics</h2>
      <div style={{display: 'flex', flexDirection: 'row'}}>
        <AdminStats />
        <ul>
          <p>COUNTS</p>
          <li>Candidates: {statistics.candidateCount}</li>
          <li>Voters   :  {statistics.voterCount}</li>
          <li>Positions: {statistics.positionCount}</li>
          <li>Elections: {statistics.electionCount}</li>
        </ul>        
      </div>
      <ToastContainer />
    </div>
  );
};

export default ElectionStatistics;
