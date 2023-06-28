import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import { Link } from 'react-router-dom';
import { CiEdit } from 'react-icons/ci' ;
import { RiDeleteBinLine } from 'react-icons/ri' ;
import { GiCancel } from 'react-icons/gi' ;
import './admin.css'
import  '../../index.css'

function ElectionManagement() {
  const { user } = useContext(Context);
  const [elections, setElections] = useState([]);
  const [electionData, setElectionData] = useState({
    Title: '',
    StartDate: '',
    EndDate: '',
    ElectionStatus: ''
  });
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [electionIdToUpdate, setElectionIdToUpdate] = useState(null);

  useEffect(() => {
    fetchElections();
  });

  const fetchElections = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/election`, {
        headers: { Authorization: `${user.token}` },
      });
      setElections(response.data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching elections');
    }
  };

  const createElection = async () => {
    try {
      await axios.post(
        `${apiDomain}/admin/election`,
        electionData,
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      setElectionData({
        Title: '',
        StartDate: '',
        EndDate: '',
        ElectionStatus: ''
      });
      toast.success('Election created successfully');
      fetchElections(); // Refresh the list of elections
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const deleteElection = async (id) => {
    try {
      await axios.delete(`${apiDomain}/admin/election/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      toast.success('Election deleted successfully');
      fetchElections(); // Refresh the list of elections
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const openUpdateForm = (electionId) => {
    setUpdateFormOpen(true);
    setElectionIdToUpdate(electionId);
    // Fetch the election's details if needed
    const election = elections.find((e) => e.ElectionID === electionId);
    if (election) {
      setElectionData({
        Title: election.Title,
        StartDate: election.StartDate,
        EndDate: election.EndDate,
        ElectionStatus: election.ElectionStatus
      });
    }
  };

  const closeUpdateForm = () => {
    setUpdateFormOpen(false);
    setElectionIdToUpdate(null);
    setElectionData({
      Title: '',
      StartDate: '',
      EndDate: '',
      ElectionStatus: ''
    });
  };

  const updateElection = async () => {
    try {
      await axios.put(
        `${apiDomain}/admin/election/${electionIdToUpdate}`,
        electionData,
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      toast.success('Election updated successfully');
      fetchElections();
      closeUpdateForm();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating election');
    }
  };

  const handleInputChange = (e) => {
    setElectionData({ ...electionData, [e.target.name]: e.target.value });
  };

  return (
    <div className='admin-container'>
      <div className='admin-container-header'>
        <div className='create-input'>
        <h3>Create Election</h3>
        <div>
        <input
          type="text"
          className='input-field'
          name="Title"
          value={electionData.Title}
          onChange={handleInputChange}
          placeholder="Election Title"
        />
        <input
          type="datetime-local"
          className='input-field'
          name="StartDate"
          value={electionData.StartDate}
          onChange={handleInputChange}
          placeholder="Start Date"
        />
        <input
          type="datetime-local"
          className='input-field'
          name="EndDate"
          value={electionData.EndDate}
          onChange={handleInputChange}
          placeholder="End Date"
        />
        <input
          type="text"
          className='input-field'
          name="ElectionStatus"
          value={electionData.ElectionStatus}
          onChange={handleInputChange}
          placeholder="Election Status"
        />
        <button className='create-button'onClick={createElection}>Create</button>  
        </div>
        </div>      
      </div>
  
      {updateFormOpen && (
        <div className='admin-container-header'>
          <div className='create-input'>
          <h3 style={{textAlign: 'center'}}>Update Election</h3>
          <div>
          <input
            type="text"
            className='input-field'
            name="Title"
            value={electionData.Title}
            onChange={handleInputChange}
            placeholder="Election Title"
          />
          <input
            type="datetime-local"
            className='input-field'
            name="StartDate"
            value={electionData.StartDate}
            onChange={handleInputChange}
            placeholder="Start Date"
          />
          <input
            type="datetime-local"
            className='input-field'
            name="EndDate"
            value={electionData.EndDate}
            onChange={handleInputChange}
            placeholder="End Date"
          />
          <input
            type="text"
            className='input-field'
            name="ElectionStatus"
            value={electionData.ElectionStatus}
            onChange={handleInputChange}
            placeholder="Election Status"
          />
          <button className='save-button'onClick={updateElection}>Save</button>
          <Link className='cancel-button'onClick={closeUpdateForm}><GiCancel/></Link>
          </div>
          </div>
        </div>
      )}

      {/* List of elections */}
      <div className='admin-container-list'>
        <h3 style={{textAlign: 'center'}}>Elections</h3>
        <ul className='admin-list'>
          {elections.map((election) => (
            <li className='admin-list-item'key={election.ElectionID}>
              <label className='admin-list-label'>
                Election-Title
                <p>{election.Title}</p>
              </label>
              <label className='admin-list-label'>
                Start-Date
                <p>{election.StartDate}</p>
              </label>
              <label className='admin-list-label'>
                End-Date
                <p>{election.EndDate}</p>
              </label>
              <label className='admin-list-label'>
                Election-Status
                <p>{election.ElectionStatus}</p>
              </label>
              <div>
                <Link className='link-button' onClick={() => deleteElection(election.ElectionID)}><RiDeleteBinLine/></Link>
                <Link className='link-button' onClick={() => openUpdateForm(election.ElectionID)}><CiEdit/></Link>             
              </div>
            </li>
          ))}          
        </ul>

      </div>
      <ToastContainer />
    </div>
  );
}

export default ElectionManagement;


