import { useState } from 'react';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import ConfirmationModal from '../ConfirmationModal';
import { passwordValidation } from '../../helpers';
import { removeUserProfile } from '../../store/authSlice/auth.actions';

export default function RemoveProfileForm() {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(false);
  const [passwordInputValue, setPasswordInputValue] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const { removeUserLoading, removeUserError } = useSelector(
    (state) => state.auth
  );

  const handleOpen = () => setIsOpen(true);

  const handleClose = () => {
    setPasswordInputValue('');
    setPasswordError('');
    setIsOpen(false);
  };

  const inputValueHandler = (e) => {
    const { value } = e.target;
    setPasswordInputValue(value);
  };

  const removeProfileHandler = () => {
    const passwordErrorMessage = passwordValidation(passwordInputValue);
    setPasswordError('');
    if (passwordErrorMessage) {
      setPasswordError(passwordErrorMessage);
    } else {
      dispatch(removeUserProfile(passwordInputValue));
    }
    handleClose();
  };

  return (
    <>
      <Box
        sx={{
          margin: '20px 0',
        }}
      >
        <Typography sx={{ fontWeight: 'bold' }}>Remove profile</Typography>
        <Typography variant="subtitle1">
          Do you really want to delete your account? Deleting an account will
          delete all your content and related data.
        </Typography>
        {removeUserError && (
          <Alert severity="error">
            Your profile can&apos;t be removed, please check if provided
            password was correct!
          </Alert>
        )}
        {removeUserLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Button
            sx={{
              margin: 0,
              padding: 0,
              textTransform: 'none',
            }}
            onClick={handleOpen}
            color="primary"
          >
            Yes, I want to remove my account
          </Button>
        )}
      </Box>
      <ConfirmationModal
        open={isOpen}
        closeModal={handleClose}
        confirmedAction={removeProfileHandler}
        content={
          <TextField
            onChange={inputValueHandler}
            size="small"
            variant="outlined"
            margin="dense"
            required
            fullWidth
            placeholder="Type password"
            name="current-password"
            type="password"
            id="current-password"
            value={passwordInputValue}
            helperText={passwordError}
            error={!!passwordError}
          />
        }
      />
    </>
  );
}
