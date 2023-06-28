import { Link, Outlet } from 'react-router-dom';
import { Menu, MenuItem } from 'react-pro-sidebar';
import './voter.css';
import  '../../index.css'
import { FaVoteYea } from 'react-icons/fa';
import { FcComboChart, FcViewDetails, FcPortraitMode, FcInfo } from 'react-icons/fc';

const Sidebar = () => {
  return (
    <div className="pro-sidebar">
      <Menu className="pro-menu" iconShape="square">
        <MenuItem className="pro-menu-item" component={<Link to="dashboard" />}>
          <FcComboChart className="pro-menu-item-icon" />
          Dashboard
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="active-election" />}>
          <FcInfo className="pro-menu-item-icon" />
          Election Details
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="vote-casting" />}>
          <FaVoteYea className="pro-menu-item-icon" />
          Vote Casting
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="voting-history" />}>
          <FcViewDetails className="pro-menu-item-icon" />
          Voting History
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="profile" />}>
          <FcPortraitMode className="pro-menu-item-icon" />
          Profile
        </MenuItem>
      </Menu>
    </div>
  );
};


function VoterHome() {
  return (
    <div className='voter-home'>
      <Sidebar />
      <Outlet />
    </div>
  )
}

export default VoterHome