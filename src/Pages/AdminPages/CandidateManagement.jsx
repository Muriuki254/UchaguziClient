import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { apiDomain } from '../../utils/utils';
import { Context } from '../../context/userContext/Context';
import { CiEdit } from 'react-icons/ci' ;
import { RiDeleteBinLine } from 'react-icons/ri' ;
import { GiCancel } from 'react-icons/gi' ;
import './admin.css'
import  '../../index.css'

function CandidateManagement() {
  const { user } = useContext(Context);
  const [candidates, setCandidates] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [firstName, setFirstName] = useState('');
  const [secondName, setSecondName] = useState('');
  const [party, setParty] = useState('');
  const [positionName, setPositionName] = useState('');
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [candidateIdToUpdate, setCandidateIdToUpdate] = useState(null);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/candidates`, {
        headers: { Authorization: `${user.token}` },
        params: { searchQuery }
      });
      setCandidates(response.data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch candidates');
    }
  };

  const createCandidate = async () => {
    try {
      const response = await axios.post(
        `${apiDomain}/admin/candidates`,
        {
          FirstName: firstName,
          SecondName: secondName,
          Party: party,
          PositionName: positionName,
        },
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      toast.success(response.data.message);
      fetchCandidates();
      setFirstName('');
      setSecondName('');
      setParty('');
      setPositionName('');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create candidate');
    }
  };

  const deleteCandidate = async (id) => {
    try {
      const response = await axios.delete(`${apiDomain}/admin/candidates/${id}`, {
        headers: { Authorization: `${user.token}` },
      });
      toast.success(response.data.message);
      fetchCandidates();
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete candidate');
    }
  };

  const openUpdateForm = (candidateId) => {
    setUpdateFormOpen(true);
    setCandidateIdToUpdate(candidateId);
    const candidate = candidates.find((c) => c.CandidateID === candidateId);
    if (candidate) {
      setFirstName(candidate.FirstName);
      setSecondName(candidate.SecondName);
      setParty(candidate.Party);
      setPositionName(candidate.PositionName);
    }
  };

  const closeUpdateForm = () => {
    setUpdateFormOpen(false);
    setCandidateIdToUpdate(null);
    setFirstName('');
    setSecondName('');
    setParty('');
    setPositionName('');
  };

  const updateCandidate = async () => {
    try {
      const response = await axios.put(
        `${apiDomain}/admin/candidates/${candidateIdToUpdate}`,
        {
          FirstName: firstName,
          SecondName: secondName,
          Party: party,
          PositionName: positionName,
        },
        {
          headers: { Authorization: `${user.token}` },
        }
      );
      toast.success(response.data.message);
      fetchCandidates();
      closeUpdateForm();
    } catch (error) {
      console.error(error);
      toast.error('Failed to update candidate');
    }
  };

  useEffect(() => {
    fetchCandidates();
  });

  return (
    <div className='admin-container'>
      {user && (
        <div className="admin-container-header">
          <div className='create-input'>
          <h3>Create Candidate</h3>
          <div>
          <input
            className="input-field"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Second Name"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Position Name"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
          <button className="create-button" onClick={createCandidate}>Create</button>
          </div>
          </div>
          <div className='search-field'>
            <input
            className="search-input"
            type="text"
            placeholder="Search Candidates"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      )}
  
      {updateFormOpen && (
        <div className="admin-container-header">
          <div className='create-input'>
          <h3 style={{textAlign: 'center'}}>Update Candidate</h3>
          <div>
          <input
            className="input-field"
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Second Name"
            value={secondName}
            onChange={(e) => setSecondName(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Party"
            value={party}
            onChange={(e) => setParty(e.target.value)}
          />
          <input
            className="input-field"
            type="text"
            placeholder="Position Name"
            value={positionName}
            onChange={(e) => setPositionName(e.target.value)}
          />
          <button className="save-button" onClick={updateCandidate}>Save</button> 
          <Link className="cancel-button" onClick={closeUpdateForm}><GiCancel/></Link>
          </div>
          </div>
        </div>
      )}
      <div className='admin-container-list'>
       <h3 style={{textAlign: 'center'}}>Candidates</h3>
       <ul className="admin-list">
         {candidates.map((candidate) => (
           <li key={candidate.CandidateID} className="admin-list-item">
            <label  className="admin-list-label">
              First-Name
              <p>{candidate.FirstName}</p> 
            </label>
            <label  className="admin-list-label">
              Second-Name
              <p>{candidate.SecondName}</p>
            </label>
            <label  className="admin-list-label">
              Party
              <p>{candidate.Party}</p>
            </label>
            <label  className="admin-list-label">
              Position-Name
              <p>{candidate.PositionName}</p>
            </label>
             
             {user && (
               <div>
                 <Link className="link-button" onClick={() => deleteCandidate(candidate.CandidateID)}><RiDeleteBinLine/> </Link>
                 <Link className="link-button" onClick={() => openUpdateForm(candidate.CandidateID)}><CiEdit /></Link>
               </div>
             )}
           </li>
         ))}
       </ul>
      </div>
  
      <ToastContainer />
    </div>
  );
  
}

export default CandidateManagement;
