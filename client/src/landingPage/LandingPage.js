import React from 'react';
import ReactPlayer from 'react-player';

import Logo from '../components/Logo';
import LogoType from '../components/LogoType';

import officeImage from '../images/office.jpeg';

import './styles.css';

const LandingPage = ({ onStart }) => (
  <div className="wrapper">
    <div className="triangle" />
    <div className="header">
      <div className="container">
        <div className="headerContent">
          <LogoType />
          {/* <div className="navItems">
            <div className="navItem">Register</div>
            <div className="navItem">Log In</div>
          </div> */}
        </div>
      </div>
    </div>
    <div className="container">
      <section className="hero">
        <img src={officeImage} className="heroImage" alt="Snail HQ" />
        <div className="heroImageCaption">
          <h1>The</h1>
          <h1>Future</h1>
          <h1>
            Is Now <Logo width="69px" color="#FFFFFF" />
          </h1>
        </div>
      </section>
      <section className="description">
        <h1>Welcome To</h1>
        <span>
          <LogoType width="750px" />
          <span style={{ marginLeft: '16px' }}>
            <Logo width="55px" />
          </span>
        </span>
        <p>
          A new approach to keeping up to date with your loved ones. Using our
          cutting-edge technology, you can always be in-the-loop. Whether it’s
          your niece’s birthday wishes, your co-worker’s engagement
          announcement, or even just a random musing from your father in law
          about current politics, no thought is too small or fleeting to be
          forever preserved in print.
        </p>
        <p>Plus, who doesn’t love getting a letter in the mail? :-)</p>
        <div className="button" onClick={onStart}>
          Get Started
        </div>
      </section>
      <section className="about">
        <div>
          <ReactPlayer
            className="aboutVideo"
            url="https://giant.gfycat.com/WideSeriousAtlanticsharpnosepuffer.webm"
            playing
            loop
          />
          <p>
            All you have to do is share your thoughts via the Patented Snail
            Internet Application. Don’t worry, we’re not judging!
          </p>
        </div>
        <div>
          <ReactPlayer
            className="aboutVideo"
            url="https://giant.gfycat.com/DistortedShamefulCanary.webm"
            playing
            loop
          />
          <p>
            Our skilled collection of typists collate your words into print with
            the utmost care.
          </p>
        </div>
        <div>
          <ReactPlayer
            className="aboutVideo"
            url="https://giant.gfycat.com/ShowyPopularEgret.webm"
            playing
            loop
          />
          <p>
            “Follow” your friends and receive a weekly piece of personal
            correspondence that keeps you IN THE LOOP.
          </p>
        </div>
      </section>
    </div>
    <div className="footer" />
  </div>
);

export default LandingPage;
