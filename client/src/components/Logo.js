import React from 'react';
import snail from '../images/snail.png';
import './Logo.css';

const Logo = () => (
  <div className="logoWrapper">
    <img src={snail} alt="snail" className="snailImage" />
  </div>
);

export default Logo;
