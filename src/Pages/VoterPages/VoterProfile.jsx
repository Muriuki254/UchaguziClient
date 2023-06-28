import "../../index.css"
import { useContext } from 'react';
import { Context } from '../../context/userContext/Context';
import { VscAccount } from "react-icons/vsc";

function VoterProfile() {
  const { user } = useContext(Context);

  return (
    <div className="profile-card">
      <div>
        <VscAccount className='profile-card-icon' />
      </div>
      <div>
      <label className='profile-card-label'>
          VoterID
          <p>{user.VoterID}</p>
        </label> 
        <label className="profile-card-label">
          Name
          <p>{`${user.FirstName}  ${user.SecondName}`}</p>
        </label> 
        <label className='profile-card-label'>
          Email
          <p>{user.Email}</p>
        </label>
        <label className='profile-card-label'>
          Number
          <p>{user.PhoneNumber}</p>
        </label>        
      </div>

    </div>
  );
}


export default VoterProfile;