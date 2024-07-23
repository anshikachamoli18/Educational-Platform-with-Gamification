import React, { useState } from 'react';
import './auth.css';
import { Link, useNavigate } from 'react-router-dom';
import { UserData } from '../../context/UserContext';

const Verify = () => {
  const [otp,setOtp]=useState();
  const {btnLoading,verifyOTP}=UserData();
  const navigate=useNavigate();
  const submitHandler=async(e)=>{
       e.preventDefault();
      await verifyOTP(Number(otp),navigate);
  }
  return (
    <div className="authPage">
      <div className="authForm">
        <h2>Verify Account</h2>
        <form action="" onSubmit={submitHandler}>
          <label htmlFor="otp">One Time Password(OTP)</label>
          <input type="number" value={otp} onChange={(e)=>setOtp(e.target.value)
          }required/>
          <button type="submit" className='common-btn' disabled={btnLoading}>{btnLoading?"Please Wait...":"Verify"}</button>
        </form>
        <p>
          Go to <Link to="/login">Login</Link> page
        </p>
      </div>
    </div>
  )
}

export default Verify;
