import React, { useState, useEffect } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

import './App.css';
import LandingPage from './landingPage/LandingPage';
import Authentication from './components/Authentication';
import PostMachine from './components/PostMachine';
import AddFriend from './components/AddFriend';

function App() {
  const [view, setView] = useState('about');
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

  useEffect(() => {
    const href = window.location.href;
    const split = href.split('/');
    const route = split[split.length - 1];
    const cleanedRoute = route.split('?')[0];
    if (cleanedRoute === 'about') {
      setView('about');
    }
  }, []);

  const renderView = () => {
    if (view === 'about')
      return <LandingPage onStart={() => setView('authenticate')} />;
    if (jwt) {
      return view === 'profile' ? (
        <AddFriend jwt={jwt} />
      ) : (
        <PostMachine jwt={jwt} />
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
