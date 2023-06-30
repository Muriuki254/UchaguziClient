import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import Statschart from '../../charts/Statschart';
import './voter.css'

const ElectionResults = () => {
  const { user } = useContext(Context);
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetchResults();
  });

  const fetchResults = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/results`, {
        headers: { Authorization: user.token },
      });
      if (response.status === 200) {
        setResults(response.data);
      } else {
        toast.error('Failed to fetch election results');
      }
    } catch (error) {
      console.error('Failed to fetch election results', error);
      toast.error('Failed to fetch election results');
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div>
        <h2>Election Statistics</h2>
        <Statschart />
      </div>
      <div>
        <h2>Election Results</h2>
        {results.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th style={{ color:"hsl(198, 60%, 50%)"}}>Position Name</th>
                <th style={{ color:"hsl(198, 60%, 50%)"}}>First Name</th>
                <th style={{ color:"hsl(198, 60%, 50%)"}}>Last Name</th>
                <th style={{ color:"hsl(198, 60%, 50%)"}}>Vote Count</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td style={{ color:"hsl(39, 100%, 56%)"}}>{result.PositionName}</td>
                  <td style={{ color:"hsl(39, 100%, 56%)"}}>{result.FirstName}</td>
                  <td style={{ color:"hsl(39, 100%, 56%)"}}>{result.SecondName}</td>
                  <td style={{ color:"hsl(39, 100%, 56%)"}}>{result.VoteCount}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No election results found.</p>
        )}        
      </div>

      <ToastContainer />
    </div>
  );
};

export default ElectionResults;
