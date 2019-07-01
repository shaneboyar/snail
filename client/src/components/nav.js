import React from 'react';

const Nav = () => {
  return (
    <nav>
      <ul>
        <li className="logo">
          Design<span>Labs</span>
        </li>
      </ul>
      <ul>
        <li>
          <a href="#">About</a>
        </li>
        <li>
          <a href="#">Mission</a>
        </li>
        <li>
          <a href="#">Contact</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
