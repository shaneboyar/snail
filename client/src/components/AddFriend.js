import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
  },
  input: {
    width: 500,
  },
}));

const AddFriend = ({ jwt }) => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const classes = useStyles();

  const search = () => {
    setLoading(true);
    fetch(`/users?query=${query}`, {
      headers: { Authorization: jwt },
    })
      .then(resp => resp.json())
      .then(data => {
        console.log('data: ', data);
        setResult(data);
        setLoading(false);
      })
      .catch(e => {
        console.log('error: ', e);
        setLoading(false);
      });
  };

  return (
    <div>
      <Input
        className={classes.input}
        value={query}
        onChange={event => {
          setQuery(event.target.value);
        }}
      />
      <Button
        variant="outlined"
        disabled={query.length < 1}
        className={classes.button}
        onClick={() => search()}
      >
        Search
      </Button>
      {result && <div>{result.name}</div>}
    </div>
  );
};

export default AddFriend;
