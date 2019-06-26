import React, { useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';

import './App.css';
import Authentication from './components/Authentication';
import PostMachine from './components/PostMachine';
import AddFriend from './components/AddFriend';

function App() {
  const [view, setView] = useState('post');
  const [jwt, setJwt] = useState(null);

  const renderView = () => {
    if (jwt) {
      return view === 'post' ? (
        <PostMachine jwt={jwt} />
      ) : (
        <AddFriend jwt={jwt} />
      );
    } else {
      return <Authentication onLogin={token => setJwt(token)} />;
    }
  };

  return (
    <div className="App">
      <div className="Login-container">
        {jwt && (
          <h4>
            <PeopleIcon onClick={() => setView('profile')} />
          </h4>
        )}
      </div>
      <header className="App-header">{renderView()}</header>
    </div>
  );
}

export default App;
