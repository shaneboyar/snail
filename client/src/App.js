import React, { useState, useEffect } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

import './App.css';
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
      <header className="App-header">{renderView()}</header>
    </div>
  );
}

export default App;
