import React from 'react';
import './Footer.css';
import instagram from '../../assets/instagram.png';
import linkedin from '../../assets/linkedin.png';
import twitter from '../../assets/twitter.png';
import contact from '../../assets/phone.png';
import gmail from '../../assets/gmail.png';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer>
      <div className="footer-content">
        <p>
          &copy; 2024 EduGenius E-Learning Platform. All rights reserved.<br/>
          Made by Anshika Chamoli
        </p>
        <div className="social-links">
          <Link to="/"><img src={gmail} className="icons" alt="Gmail"/> anshikachamoli2004@gmail.com </Link>
          <Link to="https://www.linkedin.com/in/anshika-chamoli-508331250/" target="_blank" rel="noreferrer" ><img src={linkedin} alt="LinkedIn" className="icons"/></Link>
          <Link to="https://www.instagram.com/anshika_chamoli_18" target="_blank" rel="noreferrer"><img src={instagram} alt="Instagram" className="icons" /></Link>
          <Link to="https://twitter.com/Anshika1804" target="_blank" rel="noreferrer" ><img src={twitter} alt="Twitter" className="icons"/></Link>
          <Link to="/"><img src={contact} alt="Contact" className="icons"/> 9548221070</Link>
        </div>
      </div>
    </footer>
  )
}

export default Footer;
