import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link as LinkComp } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import Link from '@mui/material/Link';

import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';

import { registerUser } from '../../store/authSlice/auth.actions';
import {
  emailValidation,
  passwordValidation,
  textInputBasicValidation,
} from '../../helpers';
import Logo from '../../assets/logo.jpg';

export default function Register() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:900px)');
  const [nameInputValue, setNameInputValue] = useState('');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { registerUserError, registerUserLoading } = useSelector(
    (state) => state.auth
  );

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmailInputValue(value);
    } else if (name === 'password') {
      setPasswordInputValue(value);
    } else if (name === 'name') {
      setNameInputValue(value);
    }
  };

  const registerButtonHandler = (e) => {
    e.preventDefault();
    const nameErrorMessage = textInputBasicValidation(nameInputValue, 'Name');
    const emailErrorMessage = emailValidation(emailInputValue);
    const passwordErrorMessage = passwordValidation(passwordInputValue);
    setNameError('');
    setEmailError('');
    setPasswordError('');
    if (!!nameError || !!emailErrorMessage || !!passwordErrorMessage) {
      setNameError(nameErrorMessage);
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
    } else {
      dispatch(
        registerUser(emailInputValue, passwordInputValue, nameInputValue)
      );
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Box component="img" sx={{ maxWidth: '60px' }} src={Logo} alt="logo" />
        <Typography sx={{ fontWeight: 'bold' }} variant="h4" align="center">
          Sign up to IT Memes
        </Typography>
        {registerUserError && (
          <Alert sx={{ width: '100%', margin: '10px' }} severity="error">
            {registerUserError}
          </Alert>
        )}
        <Box component="form" noValidate autoComplete="off">
          <TextField
            onChange={inputValueHandler}
            size={matches ? 'small' : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            placeholder="Name"
            name="name"
            autoComplete="name"
            value={nameInputValue}
            helperText={!!nameError && nameError}
            error={!!nameError}
          />
          <TextField
            onChange={inputValueHandler}
            size={matches ? 'small' : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="email"
            id="email"
            type="email"
            name="email"
            value={emailInputValue}
            helperText={!!emailError && emailError}
            error={!!emailError}
          />
          <TextField
            onChange={inputValueHandler}
            size={matches ? 'small' : null}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            placeholder="password"
            name="password"
            type="password"
            id="password"
            value={passwordInputValue}
            helperText={!!passwordError && passwordError}
            error={!!passwordError}
          />
          <Button
            sx={{
              margin: '10px 0',
              padding: '10px 0',
            }}
            disabled={registerUserLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={registerButtonHandler}
          >
            {registerUserLoading ? <CircularProgress size={26} /> : 'Sign Up'}
          </Button>
        </Box>
        <Typography>
          <Link
            component={LinkComp}
            sx={{ textDecoration: 'none', color: '#555' }}
            to="/login"
          >
            Do you have account? Sign in!
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
