import React, { useState, useEffect, useRef } from 'react';
import CloseIcon from '@material-ui/icons/Close';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';

import { useTrail, animated } from 'react-spring';
import Textarea from 'react-textarea-autosize';
import CircularProgress from '@material-ui/core/CircularProgress';

import './PostMachine.css';

const AnimatedTextArea = animated(Textarea);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    width: 500,
  },
}));

const AddFriend = ({ jwt }) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const classes = useStyles();
  const [toggle, set] = useState(true);
  const [input, setInput] = useState('');
  const inputEl = useRef(null);

  useEffect(() => {
    async function fetchFollowing() {
      try {
        const resp = await fetch('/relationships', {
          headers: { Authorization: jwt },
        });
        const data = await resp.json();
        setFollowing(data['follows']);
      } catch (e) {
        console.log('error: ', e);
      }
    }
    fetchFollowing();
  }, [jwt]); // Or [] if effect doesn't need props or state

  const reset = () => {
    setInput('');
    set(true);
    inputEl.current.focus();
  };

  const handleChange = event => {
    if (event.target.value === '\n') {
      return null;
    }

    setInput(event.target.value);
  };

  const renderButtonContent = () => {
    return loading ? <CircularProgress /> : 'Search';
  };

  const config = { mass: 5, tension: 2000, friction: 200 };

  const trail = useTrail(1, {
    config,
    opacity: toggle ? 1 : 0,
    y: toggle ? 0 : -200,
    from: { opacity: 0, y: -200, height: 0 },
    onRest: () => {
      if (!toggle) reset();
    },
  });

  const search = () => {
    setLoading(true);
    fetch(`/users?query=${input}`, {
      headers: { Authorization: jwt },
    })
      .then(resp => resp.json())
      .then(data => {
        setResult(data);
        setLoading(false);
      })
      .catch(e => {
        console.log('error: ', e);
        setLoading(false);
      });
    setInput('');
  };

  const addFriend = id => {
    setLoading(true);
    setResult(null);
    fetch(`/relationships`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: jwt },
      body: JSON.stringify({
        relationship: {
          id,
        },
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        setFollowing(data['follows']);
        setLoading(false);
      })
      .catch(e => {
        console.log('error: ', e);
        setLoading(false);
      });
    setInput('');
  };

  const removeFriend = id => {
    setLoading(true);
    fetch(`/relationships/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: jwt },
      body: JSON.stringify({
        relationship: {
          id,
        },
      }),
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('data: ', data);
        setFollowing(data['follows']);
        setLoading(false);
      })
      .catch(e => {
        console.log('error: ', e);
        setLoading(false);
      });
    setInput('');
  };

  const renderAddFriendButtonContent = id => {
    if (_.find(following, ['id', id])) return 'Friend Already Added';
    return loading ? <CircularProgress /> : 'Add Friend';
  };

  const renderCurrentFriends = () =>
    following.map(friend => {
      return (
        <div className="Friend-container" key={friend.id}>
          <h4>{friend.name}</h4>
          <CloseIcon onClick={() => removeFriend(friend.id)} />
        </div>
      );
    });

  return (
    <div className="AddFriend-container">
      <div className="Input-container">
        {trail.map(({ y, height, ...rest }, index) => (
          <AnimatedTextArea
            autoFocus
            inputRef={inputEl}
            className="Main-input"
            style={{
              ...rest,
              transform: y.interpolate(y => `translate3d(0,${y}px,0)`),
            }}
            key={1}
            value={input}
            onChange={handleChange}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                search();
              }
            }}
          />
        ))}
        <Button
          variant="outlined"
          disabled={input.length < 1}
          className={classes.button}
          onClick={search}
        >
          {renderButtonContent()}
        </Button>
      </div>
      <div className="Result-container">
        {result && (
          <div className="Friend-container">
            <h4>{result.name}</h4>
            <Button
              variant="outlined"
              className={classes.button}
              onClick={() => addFriend(result.id)}
              disabled={!!_.find(following, ['id', result.id])}
            >
              {renderAddFriendButtonContent(result.id)}
            </Button>
          </div>
        )}
        {following.length > 0 && renderCurrentFriends()}
      </div>
    </div>
  );
};

export default AddFriend;
