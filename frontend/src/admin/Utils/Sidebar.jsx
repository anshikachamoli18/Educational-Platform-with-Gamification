import React from 'react';
import './common.css';
import { Link } from 'react-router-dom';
import {AiFillHome, AiOutlineLogout} from 'react-icons/ai';
import {FaBook, FaUserAlt} from 'react-icons/fa';

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <li>
          <Link to={"/admin/dashboard"}>
          <div className="icon">
            <AiFillHome/>
          </div>
          <span>Home</span>
          </Link>
        </li>

        <li>
          <Link to={"/admin/users"}>
          <div className="icon">
            <FaUserAlt/>
          </div>
          <span>Users</span>
          </Link>
        </li>

        <li>
          <Link to={"/admin/users"}>
          <div className="icon">
            <AiOutlineLogout/>
          </div>
          <span>Users</span>
          </Link>
        </li>
      </ul>
    </div>
  )
}

export default Sidebar
