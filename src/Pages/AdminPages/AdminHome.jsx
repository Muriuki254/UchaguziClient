
import { Link, Outlet } from 'react-router-dom';
import { Menu, MenuItem } from 'react-pro-sidebar';
import './admin.css';
import { FaUsers } from 'react-icons/fa';
import { FcComboChart, FcSettings, FcPlanner, FcPortraitMode } from 'react-icons/fc';

const Sidebar = () => {
  return (
    <div className="pro-sidebar">
      <Menu className="pro-menu" iconShape="square">
        <MenuItem className="pro-menu-item" component={<Link to="dashboard" />}>
          <FcComboChart className="pro-menu-item-icon" />
          Dashboard
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="election" />}>
          <FcPlanner className="pro-menu-item-icon" />
          Election
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="positions" />}>
          <FcSettings className="pro-menu-item-icon" />
          Positions
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="candidates" />}>
          <FaUsers className="pro-menu-item-icon" />
          Candidates
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="voters" />}>
          <FaUsers className="pro-menu-item-icon" />
          Voters
        </MenuItem>
        <MenuItem className="pro-menu-item" component={<Link to="profile" />}>
          <FcPortraitMode className="pro-menu-item-icon" />
          Profile
        </MenuItem>
      </Menu>
    </div>
  );
};

function AdminHome() {
  return (
    <div className="admin-home">
      <Sidebar />
      <Outlet />
    </div>
  );
}

export default AdminHome;
