import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import { CiEdit } from 'react-icons/ci' ;
import { RiDeleteBinLine } from 'react-icons/ri' ;
import { GiCancel } from 'react-icons/gi' ;
import { Link } from 'react-router-dom';
import './admin.css'
import  '../../index.css'

function VoterManagement() {
  const [voters, setVoters] = useState([]);
  const { user } = useContext(Context);
  const [voterData, setVoterData] = useState({
    FirstName: '',
    SecondName: '',
    Email: '',
    PhoneNumber: '',
    Password: '',
  });
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [voterIdToUpdate, setVoterIdToUpdate] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchVoters();
  },);

  const fetchVoters = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/voters`, {
        headers: { Authorization: `${user.token}` },
        params: { searchQuery },
      });
      setVoters(response.data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching voters');
    }
  };

  const createVoter = async () => {
    try {
      await axios.post(
        `${apiDomain}/admin/voters`,
        voterData,
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      setVoterData({
        FirstName: '',
        SecondName: '',
        Email: '',
        PhoneNumber: '',
        Password: '',
      });
      toast.success('Voter created successfully');
      fetchVoters(); // Refresh the list of voters
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const deleteVoter = async (id) => {
    try {
      await axios.delete(`${apiDomain}/admin/voters/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      toast.success('Voter deleted successfully');
      fetchVoters(); // Refresh the list of voters
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const openUpdateForm = (voterId) => {
    setUpdateFormOpen(true);
    setVoterIdToUpdate(voterId);
    // Fetch the voter's details if needed
    const voter = voters.find((v) => v.VoterID === voterId);
    if (voter) {
      setVoterData({
        FirstName: voter.FirstName,
        SecondName: voter.SecondName,
        Email: voter.Email,
        PhoneNumber: voter.PhoneNumber,
        Password: '',
      });
    }
  };

  const closeUpdateForm = () => {
    setUpdateFormOpen(false);
    setVoterIdToUpdate(null);
    setVoterData({
      FirstName: '',
      SecondName: '',
      Email: '',
      PhoneNumber: '',
      Password: '',
    });
  };

  const updateVoter = async () => {
    try {
      await axios.put(
        `${apiDomain}/admin/voters/${voterIdToUpdate}`,
        voterData,
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      toast.success('Voter updated successfully');
      fetchVoters();
      closeUpdateForm();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while updating voter');
    }
  };

  const handleInputChange = (e) => {
    setVoterData({ ...voterData, [e.target.name]: e.target.value });
  };



  return (
    <div className='admin-container'>
      <div className='admin-container-header'>
        <div className='create-input'>
        <h3>Create Voter</h3>
        <div>
        <input
          type="text"
          className='input-field'
          name="FirstName"
          value={voterData.FirstName}
          onChange={handleInputChange}
          placeholder="First Name"
        />
        <input
          type="text"
          className='input-field'
          name="SecondName"
          value={voterData.SecondName}
          onChange={handleInputChange}
          placeholder="Second Name"
        />
        <input
          type="email"
          className='input-field'
          name="Email"
          value={voterData.Email}
          onChange={handleInputChange}
          placeholder="Email"
        />
        <input
          type="tel"
          className='input-field'
          name="PhoneNumber"
          value={voterData.PhoneNumber}
          onChange={handleInputChange}
          placeholder="Phone Number"
        />
        <input
          className='input-field'
          type="password"
          name="Password"
          value={voterData.Password}
          onChange={handleInputChange}
          placeholder="Password"
        />
        <button className='create-button'onClick={createVoter}>Create</button>
        </div>
        </div>
        <div className="search-field">
        <input
          className="search-input"
          type="text"
          name="searchQuery"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search Voters"
        /> 
        </div>
       
      </div> 
      {/* Update Voter Form */}
      {updateFormOpen && (
        <div className='admin-container-header'>
          <div className='create-input'>
          <h3 style={{textAlign: 'center'}}>Update Voter</h3>
          <div>
          <input
            type="text"
            className='input-field'
            name="FirstName"
            value={voterData.FirstName}
            onChange={handleInputChange}
            placeholder="First Name"
          />
          <input
            type="text"
            className='input-field'
            name="SecondName"
            value={voterData.SecondName}
            onChange={handleInputChange}
            placeholder="Second Name"
          />
          <input
            type="email"
            className='input-field'
            name="Email"
            value={voterData.Email}
            onChange={handleInputChange}
            placeholder="Email"
          />
          <input
            type="tel"
            className='input-field'
            name="PhoneNumber"
            value={voterData.PhoneNumber}
            onChange={handleInputChange}
            placeholder="Phone Number"
          />
          <input
            type="password"
            className='input-field'
            name="Password"
            value={voterData.Password}
            onChange={handleInputChange}
            placeholder="Password"
          />
          <button className='save-button'onClick={updateVoter}>Save</button>
          <Link className="cancel-button"onClick={closeUpdateForm}><GiCancel/></Link>
          </div>
          </div>
        </div>
      )}
      {/* List of voters */}
      <div className='admin-container-list'>
        <h3 style={{textAlign: 'center'}}>Voters</h3>
        <ul className='admin-list'>
          {voters.map((voter) => (
          <li className='admin-list-item' key={voter.VoterID}>
            <label className="admin-list-label">
              First-Name
              <p>{voter.FirstName}</p>
            </label>
            <label className="admin-list-label">
              Second-Name
              <p>{voter.SecondName}</p>
            </label>
            <label className="admin-list-label">
              Email
              <p>{voter.Email}</p>
            </label>
            <label className="admin-list-label">
              Phone Number
              <p>{voter.PhoneNumber}</p>
            </label>
            <div>
            <Link className="link-button" onClick={() => deleteVoter(voter.VoterID)}><RiDeleteBinLine/> </Link>
            <Link className="link-button" onClick={() => openUpdateForm(voter.VoterID)}><CiEdit/> </Link>
            </div>
          </li>
         ))}
        </ul>

      </div>

      <ToastContainer />
    </div>
  );
}

export default VoterManagement;
