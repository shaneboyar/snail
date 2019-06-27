import React, { useState, useRef } from 'react';
import { useTrail, animated } from 'react-spring';
import Textarea from 'react-textarea-autosize';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';

import './PostMachine.css';

const AnimatedTextArea = animated(Textarea);

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    display: 'none',
  },
}));

const PostMachine = ({ jwt }) => {
  const classes = useStyles();
  const MAX_LENGTH = 140;
  const [toggle, set] = useState(true);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const inputEl = useRef(null);

  const handleSubmit = () => {
    setLoading(true);
    fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: jwt },
      body: JSON.stringify({
        post: {
          content: input,
        },
      }),
    });
    setLoading(false);
    set(false);
  };

  const reset = () => {
    setInput('');
    set(true);
    inputEl.current.focus();
  };

  const handleChange = event => {
    if (event.target.value.length > MAX_LENGTH) {
      return null;
    }
    setInput(event.target.value);
  };

  const renderButtonContent = () => {
    if (loading) {
      return <CircularProgress />;
    } else {
      if (toggle) {
        return 'Send';
      } else {
        return 'Sent';
      }
    }
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

  return (
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
              handleSubmit();
            }
          }}
        />
      ))}
      <Button
        variant="outlined"
        disabled={input.length < 1}
        className={classes.button}
        onClick={handleSubmit}
      >
        {renderButtonContent()}
      </Button>
    </div>
  );
};

export default PostMachine;
