import React, { useState, useRef } from 'react';
import { useTrail, animated } from 'react-spring';
import Textarea from 'react-textarea-autosize';

const AnimatedTextArea = animated(Textarea);

const PostMachine = ({ jwt }) => {
  const MAX_LENGTH = 140;
  const [toggle, set] = useState(true);
  const [input, setInput] = useState('');

  const inputEl = useRef(null);

  const handleSubmit = () => {
    fetch('/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: jwt },
      body: JSON.stringify({
        post: {
          content: input,
        },
      }),
    });
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
      <button onClick={handleSubmit}>{toggle ? 'Send' : 'Sent'}</button>
    </div>
  );
};

export default PostMachine;
