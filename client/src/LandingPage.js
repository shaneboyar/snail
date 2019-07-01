import React, { Component } from 'react';

import './LandingPage.css';

import Header from './components/header';
import Main from './components/main';
import Footer from './components/footer';

class LandingPage extends Component {
  render() {
    return (
      <div className="container">
        <Header />
        <Main />
        <Footer />
      </div>
    );
  }
}

export default LandingPage;
