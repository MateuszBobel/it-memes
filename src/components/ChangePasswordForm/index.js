import { useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { passwordValidation } from '../../helpers';
import { updateUserPassword } from '../../store/authSlice/auth.actions';

export default function ChangePasswordForm() {
  const dispatch = useDispatch();
  const { changePasswordLoading, changePasswordError } = useSelector(
    (state) => state.auth
  );
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [newPasswordInputValue, setNewPasswordInputValue] = useState('');
  const [newPasswordError, setNewPasswordError] = useState('');
  const [repeatPasswordInputValue, setRepeatPasswordInputValue] = useState('');
  const [repeatPasswordError, setRepeatPasswordError] = useState('');

  const changePasswordHandler = () => {
    const passwordErrorMessage = passwordValidation(passwordInputValue);
    const newPasswordErrorMessage = passwordValidation(newPasswordInputValue);
    const repeatPasswordErrorMessage =
      newPasswordInputValue !== repeatPasswordInputValue
        ? 'This field has to be the same as new password'
        : passwordValidation(repeatPasswordInputValue);

    setPasswordError('');
    setNewPasswordError('');
    if (
      !!passwordErrorMessage ||
      !!newPasswordErrorMessage ||
      !!repeatPasswordErrorMessage
    ) {
      setPasswordError(passwordErrorMessage);
      setNewPasswordError(newPasswordErrorMessage);
      setRepeatPasswordError(repeatPasswordErrorMessage);
    } else {
      dispatch(updateUserPassword(passwordInputValue, newPasswordInputValue));
      setPasswordInputValue('');
      setNewPasswordInputValue('');
      setRepeatPasswordInputValue('');
    }
  };

  const inputValueHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'current-password') {
      setPasswordInputValue(value);
    } else if (name === 'new-password') {
      setNewPasswordInputValue(value);
    } else if (name === 'repeat-password') {
      setRepeatPasswordInputValue(value);
      if (value !== newPasswordInputValue) {
        setRepeatPasswordError('This field has to be the same as new password');
      } else {
        setRepeatPasswordError('');
      }
    }
  };

  return (
    <Box
      sx={{
        margin: '20px 0',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ fontWeight: 'bold' }}>Change password</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <TextField
          onChange={inputValueHandler}
          size="small"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          placeholder="Current password"
          name="current-password"
          type="password"
          id="current-password"
          value={passwordInputValue}
          helperText={!!passwordError && passwordError}
          error={!!passwordError}
        />
        <TextField
          onChange={inputValueHandler}
          size="small"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          placeholder="New password"
          name="new-password"
          type="password"
          id="new-password"
          value={newPasswordInputValue}
          helperText={!!newPasswordError && newPasswordError}
          error={!!newPasswordError}
        />
        <TextField
          onChange={inputValueHandler}
          size="small"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          placeholder="Repeat new password"
          name="repeat-password"
          type="password"
          id="repeat-password"
          value={repeatPasswordInputValue}
          helperText={!!repeatPasswordError && repeatPasswordError}
          error={!!repeatPasswordError}
        />
      </Box>
      {changePasswordError && (
        <Alert severity="error">
          Password can&apos;t be changed please try later!
        </Alert>
      )}
      <Button
        sx={{
          marginTop: '10px',
        }}
        disabled={changePasswordLoading}
        onClick={changePasswordHandler}
        color="primary"
        variant="contained"
      >
        {changePasswordLoading ? <CircularProgress size={26} /> : 'Save'}
      </Button>
    </Box>
  );
}
