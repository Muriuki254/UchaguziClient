import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';

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
    <div>
      <h2>Election Results</h2>
      {results.length > 0 ? (
        <div>
          {results.map((result) => (
            <div key={result.ResultID}>
              <p>
                <strong>Position Name:</strong> {result.PositionName}
              </p>
              <p>
                <strong>First Name:</strong> {result.FirstName}
              </p>
              <p>
                <strong>Last Name:</strong> {result.SecondName}
              </p>
              <p>
                <strong>Vote Count:</strong> {result.VoteCount}
              </p>
              <hr />
            </div>
          ))}
        </div>
      ) : (
        <p>No election results found.</p>
      )}
      <ToastContainer />
    </div>
  );  
};

export default ElectionResults;
