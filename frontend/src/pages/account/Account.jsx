import React from 'react';
import './Account.css';
import {MdDashboard} from 'react-icons/md';
import {IoMdLogOut} from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import {UserData }from '../../context/UserContext';

const Account = ({user}) => {
  const {setIsAuth, setUser} =UserData();
  const navigate = useNavigate();
  const logoutHandler = () => {
    localStorage.clear();
    setUser([]);
    setIsAuth(false);
    toast.success("Logged out successfully");
    navigate('/login');
  }
  return (
    <div>
      {user&&
      <div className="profile">
        <h2>My Profile</h2>
        <div className="profile-info">
          <p>
              <strong>Name - {user.name}</strong> 
          </p>
          <p>
             <strong>Email - {user.email}</strong>
          </p>
          <button className="common-btn" onClick={(()=>navigate(`${user._id}/dashboard`))}><MdDashboard/>DashBoard</button>
          <br/>
          {
            user.role==='admin'&&<button className="common-btn" onClick={(()=>navigate(`/admin/dashboard`))}><MdDashboard/>Admin DashBoard</button>
          }
          <br/>
          <button className="common-btn" style={{background:"red"}} onClick={logoutHandler}><IoMdLogOut/>Logout</button>
        </div>
      </div>}

    </div>
  )
}

export default Account;
