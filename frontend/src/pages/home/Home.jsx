import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import Testimonials from '../../Components/Testimonials/Testimonials';

const Home = () => {
  const navigate=useNavigate();

  return (
    <div>
      <div className="home">
        <div className="home-content">
          <h1>Welcome to our E-Learning Platform</h1>
          <p>Learn, Grow, Excel</p>
          <button className="common-btn" onClick={()=>{navigate("/courses")}}>Get Started</button>
        </div>
      </div>
      <Testimonials/>
    </div>
  )
}

export default Home;
