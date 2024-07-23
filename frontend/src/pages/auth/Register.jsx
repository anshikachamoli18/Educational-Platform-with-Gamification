import React, { useState } from 'react';
import './auth.css';
import { Link,useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

const Register = () => {

  const navigate=useNavigate();
  const {btnLoading, registerUser}=UserData();
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submitHandler= async (e)=>{
       e.preventDefault();
       await registerUser(name,email,password,navigate);
  }

  return (
    <div className="authPage">
        <div className="authForm" onSubmit={submitHandler}>
            <h2>Register</h2>
            <form action="" className="">
            <label htmlFor="name">Name</label>
            <input type="name" name="name" id="name" value={name} onChange={(e)=>{setName(e.target.value)}} required/>

                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" value={email} onChange={(e)=>{setEmail(e.target.value)}} required/>

                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e)=>{setPassword(e.target.value)}} required/>

                <button type="submit" className='common-btn' disabled={btnLoading}>{btnLoading?"Please Wait...":"Register"}</button>
            </form>

            <p>Have an account? <Link to="/login">Login</Link></p>
        </div>
    </div>
  )
}

export default Register;
