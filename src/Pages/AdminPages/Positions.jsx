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

function Positions() {
  const { user } = useContext(Context);
  const [positions, setPositions] = useState([]);
  const [positionData, setPositionData] = useState({
    PositionName: ''
  });
  const [updateFormOpen, setUpdateFormOpen] = useState(false);
  const [positionIdToUpdate, setPositionIdToUpdate] = useState(null);

  useEffect(() => {
    fetchPositions();
  });

  const fetchPositions = async () => {
    try {
      const response = await axios.get(`${apiDomain}/admin/positions`, {
        headers: { Authorization: `${user.token}` }
      });
      setPositions(response.data);
    } catch (error) {
      console.error(error);
      toast.error('An error occurred while fetching positions');
    }
  };

  const createPosition = async () => {
    try {
      await axios.post(`${apiDomain}/admin/positions`, positionData, {
        headers: { Authorization: `${user.token}` }
      });
      setPositionData({ PositionName: '' });
      toast.success('Position created successfully');
      fetchPositions(); // Refresh the list of positions
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const deletePosition = async (id) => {
    try {
      await axios.delete(`${apiDomain}/admin/positions/${id}`, {
        headers: { Authorization: `${user.token}` }
      });
      toast.success('Position deleted successfully');
      fetchPositions(); // Refresh the list of positions
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const openUpdateForm = (positionId) => {
    setUpdateFormOpen(true);
    setPositionIdToUpdate(positionId);
    // Fetch the position's details if needed
    const position = positions.find((p) => p.PositionID === positionId);
    if (position) {
      setPositionData({ PositionName: position.PositionName });
    }
  };

  const closeUpdateForm = () => {
    setUpdateFormOpen(false);
    setPositionIdToUpdate(null);
    setPositionData({ PositionName: '' });
  };

  const updatePosition = async () => {
    try {
      await axios.put(
        `${apiDomain}/admin/positions/${positionIdToUpdate}`,
        positionData,
        {
          headers: { Authorization: `${user.token}` }
        }
      );
      toast.success('Position updated successfully');
      fetchPositions(); // Refresh the list of positions
      closeUpdateForm();
    } catch (error) {
      console.error(error);
      toast.error('An error occurred');
    }
  };

  const handleInputChange = (e) => {
    setPositionData({ ...positionData, [e.target.name]: e.target.value });
  };

  return (
    <div className='admin-container'>
      <div className='admin-container-header'>
        <div className='create-input'>
          <h3>Create Position</h3>
          <div>
          <input
            type="text"
            className='input-field'
            name="PositionName"
            value={positionData.PositionName}
            onChange={handleInputChange}
            placeholder="Position Name"
          />
          <button onClick={createPosition}>Create</button>
          </div>
        </div>
      </div>
      {/* Update Position Form */}
      {updateFormOpen && (
        <div className='admin-container-header'>
          <div className='create-input'>
          <h3 style={{textAlign:'center'}}>Update Position</h3>
          <div>
          <input
            type="text"
            name="PositionName"
            className='input-field'
            value={positionData.PositionName}
            onChange={handleInputChange}
            placeholder="Position Name"
          />
          <button className='save-button' onClick={updatePosition}>Save</button>
          <Link className='cancel-button' onClick={closeUpdateForm}><GiCancel/></Link>
          </div>
          </div>
        </div>
      )}
      {/* List of positions */}
      <div className='admin-container-list'>
        <h3 style={{textAlign:'center'}}>Positions</h3>
        <ul className='admin-list'>
          {positions.map((position) => (
            <li className='admin-list-item' key={position.PositionID}>
              <label className="admin-list-label">
                Position-Name
                <p>{position.PositionName}</p>
              </label>
              <div>
              <Link className="link-button" onClick={() => deletePosition(position.PositionID)}><RiDeleteBinLine/></Link>
              <Link className="link-button"onClick={() => openUpdateForm(position.PositionID)}><CiEdit/></Link>
              </div>
            </li>
          ))}          
        </ul>
      </div>
     <ToastContainer />
    </div>
  );
}

export default Positions;

