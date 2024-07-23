import React from 'react';
import './auth.css';
import { Link ,useNavigate} from 'react-router-dom';
import { UserData } from '../../context/UserContext.jsx';
import {useState} from 'react';
import { CourseData } from '../../context/CourseContext.jsx';

const Login = () => {
  const navigate=useNavigate();
  const {btnLoading, loginUser}=UserData();
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const {fetchMyCourse}=CourseData();

  const submitHandler= async (e)=>{
       e.preventDefault();
       await loginUser(email,password,navigate,fetchMyCourse);
  }

  return (
    <div className="authPage">
        <div className="authForm">
            <h2>Login</h2>
            <form onSubmit={submitHandler}>
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e)=>setPassword(e.target.value)} required/>

                <button type="submit" className='common-btn' disabled={btnLoading}>{btnLoading?"Please Wait...":"Login"}</button>
            </form>

            <p>Don't have an account? <Link to="/register">Register</Link></p>
        </div>
    </div>
  )
}

export default Login;
