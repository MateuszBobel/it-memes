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

import { resetPassword } from '../../store/authSlice/auth.actions';
import { emailValidation } from '../../helpers';
import Logo from '../../assets/logo.jpg';

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const matches = useMediaQuery('(min-width:900px)');
  const [emailInputValue, setEmailInputValue] = useState('');
  const [emailError, setEmailError] = useState('');
  const { resetPasswordError, resetPasswordLoading } = useSelector(
    (state) => state.auth
  );

  const inputValueHandler = (e) => {
    const { value } = e.target;
    setEmailInputValue(value);
  };

  const loginButtonHandler = (e) => {
    e.preventDefault();
    const emailErrorMessage = emailValidation(emailInputValue);
    setEmailError('');
    if (emailErrorMessage) {
      setEmailError(emailErrorMessage);
    } else {
      dispatch(resetPassword(emailInputValue));
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
          Reset IT Memes password
        </Typography>
        {resetPasswordError && (
          <Alert sx={{ width: '100%', margin: '10px' }} severity="error">
            {resetPasswordError}
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
          <Button
            sx={{
              margin: '10px 0',
              padding: '10px 0',
            }}
            disabled={resetPasswordLoading}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            onClick={loginButtonHandler}
          >
            {resetPasswordLoading ? (
              <CircularProgress size={26} />
            ) : (
              'Reset password'
            )}
          </Button>
        </Box>
        <Typography>
          <Link
            component={LinkComp}
            sx={{ textDecoration: 'none', color: '#555' }}
            to="/login"
          >
            Sign in for IT Memes
          </Link>
        </Typography>
      </Box>
    </Container>
  );
}
