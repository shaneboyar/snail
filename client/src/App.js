import React, { useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';
import CloseIcon from '@material-ui/icons/Close';

import './App.css';
import Authentication from './components/Authentication';
import PostMachine from './components/PostMachine';
import AddFriend from './components/AddFriend';

function App() {
  const [view, setView] = useState('post');
  const [jwt, setJwt] = useState(localStorage.getItem('jwt') || null);

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
          onLogin={(token, rememberMe = false) => {
            if (rememberMe) {
              localStorage.setItem('jwt', token);
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
