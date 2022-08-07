import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { basicInputValidation } from '../../helpers';
import { updateProfileInfo } from '../../store/profileSlice/profile.actions';

export default function ProfileInfoForm() {
  const dispatch = useDispatch();
  const { profileInfo, profileInfoLoading, profileInfoError } = useSelector(
    (state) => state.profile
  );
  const [nameInputValue, setNameInputValue] = useState(profileInfo.name);
  const [nameError, setNameError] = useState('');
  const [jobPositionInputValue, setJobPositionInputValue] = useState(
    profileInfo.jobPosition
  );
  const [cityInputValue, setCityInputValue] = useState(profileInfo.city);

  const saveProfileInfoHandler = () => {
    const nameErrorMessage = basicInputValidation(nameInputValue, 'Name');
    setNameError('');
    if (nameErrorMessage) {
      setNameError(nameErrorMessage);
    } else {
      dispatch(
        updateProfileInfo(nameInputValue, jobPositionInputValue, cityInputValue)
      );
    }
  };

  const inputValueHandler = (e) => {
    const { value, name } = e.target;
    if (name === 'name') {
      setNameInputValue(value);
    } else if (name === 'job-position') {
      setJobPositionInputValue(value);
    } else if (name === 'city') {
      setCityInputValue(value);
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
      <Typography sx={{ fontWeight: 'bold' }}>Proile info</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}
      >
        <TextField
          fullWidth
          margin="dense"
          size="small"
          name="name"
          placeholder="Name"
          value={nameInputValue}
          onChange={inputValueHandler}
          helperText={!!nameError && nameError}
          error={!!nameError}
        />
        <TextField
          fullWidth
          margin="dense"
          size="small"
          name="job-position"
          placeholder="Job position"
          value={jobPositionInputValue}
          onChange={inputValueHandler}
        />
        <TextField
          fullWidth
          margin="dense"
          size="small"
          name="city"
          placeholder="City"
          value={cityInputValue}
          onChange={inputValueHandler}
        />
      </Box>
      {profileInfoError && (
        <Alert severity="error">
          Profile info can&apos;t be updated please try later!
        </Alert>
      )}
      <Button
        sx={{
          marginTop: '10px',
        }}
        disabled={profileInfoLoading}
        onClick={saveProfileInfoHandler}
        color="primary"
        variant="contained"
      >
        {profileInfoLoading ? <CircularProgress size={26} /> : 'Save'}
      </Button>
    </Box>
  );
}
