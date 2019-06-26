import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import { useForm } from '../customHooks';
import Logo from './Logo';

const useStyles = makeStyles(theme => ({
  '@global': {
    body: {
      backgroundColor: theme.palette.common.white,
    },
  },
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignIn = ({ switchToSignUp, signInAction }) => {
  const { inputs, handleInputChange, handleSubmit } = useForm(signInAction);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo />
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            value={inputs.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" disabled />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={switchToSignUp} variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const SignUp = ({ switchToSignIn, signUpAction }) => {
  const { inputs, handleInputChange, handleSubmit } = useForm(signUpAction);
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Logo />
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className={classes.form}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={handleInputChange}
            value={inputs.name}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={handleInputChange}
            value={inputs.email}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            onChange={handleInputChange}
            value={inputs.password}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password_confirmaiton"
            label="Confirm Password"
            type="password"
            id="password_confirmation"
            onChange={handleInputChange}
            value={inputs.passwordConfirmation}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={switchToSignIn} variant="body2">
                {'Have an account? Sign In'}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

const Authentication = ({ onLogin }) => {
  const [state, setState] = useState('signIn');
  const [toast, setToast] = useState(null);

  const signUpAction = inputs => {
    fetch('/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    })
      .then(resp => resp.json())
      .then(data => {
        setToast('Account created. Please log in.');
        setState('signIn');
      })
      .catch(e => console.log('error: ', e));
  };

  const signInAction = inputs => {
    fetch('/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(inputs),
    })
      .then(resp => resp.json())
      .then(data => {
        onLogin(data.token);
      })
      .catch(e => console.log('error: ', e));
  };

  return (
    <div>
      <div>{toast}</div>
      {state === 'signIn' ? (
        <SignIn
          switchToSignUp={() => setState('signUp')}
          signInAction={inputs => signInAction(inputs)}
        />
      ) : (
        <SignUp
          switchToSignIn={() => setState('signIn')}
          signUpAction={inputs => signUpAction(inputs)}
        />
      )}
    </div>
  );
};

export default Authentication;
