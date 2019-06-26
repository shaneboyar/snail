import React, { useState } from 'react';
import PeopleIcon from '@material-ui/icons/People';

import './App.css';
import Authentication from './Authentication';
import PostMachine from './PostMachine';

function App() {
  const [jwt, setJwt] = useState(null);

  return (
    <div className="App">
      <div className="Login-container">
        {jwt && (
          <h4>
            <PeopleIcon />
          </h4>
        )}
      </div>
      <header className="App-header">
        {jwt ? (
          <PostMachine jwt={jwt} />
        ) : (
          <Authentication onLogin={token => setJwt(token)} />
        )}
      </header>
    </div>
  );
}

export default App;
