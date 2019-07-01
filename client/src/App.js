import React, { useState, useEffect } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

import './App.css';
import LandingPage from './LandingPage';
import Authentication from './components/Authentication';
import PostMachine from './components/PostMachine';
import AddFriend from './components/AddFriend';

function App() {
  const [view, setView] = useState('post');
  const [jwt, setJwt] = useState(null);

  useEffect(() => {
    const localToken = localStorage.getItem('jwt') || null;
    if (!localToken) {
      return undefined;
    }
    const tokenObject = JSON.parse(localStorage.getItem('jwt') || null);
    const { token, exp } = tokenObject;
    if (new Date() < new Date(exp)) {
      setJwt(token);
    } else {
      localStorage.removeItem('jwt');
    }
  }, []);

  const renderView = () => {
    if (view === 'about') return <LandingPage />;
    if (jwt) {
      return view === 'post' ? (
        <PostMachine jwt={jwt} />
      ) : (
        <AddFriend jwt={jwt} />
      );
    } else {
      return (
        <Authentication
          onLogin={(data, rememberMe = false) => {
            const { token, exp } = data;
            if (rememberMe) {
              const savedToken = { token, exp };
              localStorage.setItem('jwt', JSON.stringify(savedToken));
            }
            setJwt(token);
          }}
          switchTo={view => setView(view)}
        />
      );
    }
  };

  const renderMenuIcon = () =>
    view === 'post' ? (
      <PeopleIcon
        onClick={() => setView('profile')}
        className="addFriendIcon"
      />
    ) : (
      <CloseIcon onClick={() => setView('post')} className="addFriendIcon" />
    );

  return (
    <div className="App">
      <div className="Login-container">{jwt && renderMenuIcon()}</div>
      <div>{renderView()}</div>
    </div>
  );
}

export default App;
