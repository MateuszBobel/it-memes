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

import { loginUser } from '../../store/authSlice/auth.actions';
import { emailValidation, passwordValidation } from '../../helpers';
import Logo from '../../assets/logo.jpg';

export default function Login() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:900px)');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { loginUserError, loginUserLoading } = useSelector(
    (state) => state.auth
  );

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setEmailInputValue(value);
    } else if (name === 'password') {
      setPasswordInputValue(value);
    }
  };

  const loginButtonHandler = (e) => {
    e.preventDefault();
    const emailErrorMessage = emailValidation(emailInputValue);
    const passwordErrorMessage = passwordValidation(passwordInputValue);
    setEmailError('');
    setPasswordError('');
    if (!!emailErrorMessage || !!passwordErrorMessage) {
      setEmailError(emailErrorMessage);
      setPasswordError(passwordErrorMessage);
    } else {
      dispatch(loginUser(emailInputValue, passwordInputValue));
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
          Sign in to IT Memes
        </Typography>
        {loginUserError && (
          <Alert sx={{ width: '100%', margin: '10px' }} severity="error">
            {loginUserError}
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
          <Typography variant="body2" align="right">
            <Link
              component={LinkComp}
              sx={{ textDecoration: 'none', color: '#555' }}
              to="/forgot-password"
            >
              Forgotten password?
            </Link>
          </Typography>
          <Button
            sx={{
              margin: '10px 0',
              padding: '10px 0',
            }}
            disabled={loginUserLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={loginButtonHandler}
          >
            {loginUserLoading ? <CircularProgress size={26} /> : 'Sign In'}
          </Button>
        </Box>
        <Typography>
          <Link
            component={LinkComp}
            sx={{ textDecoration: 'none', color: '#555' }}
            to="/register"
          >
            Sign up for IT Memes
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
