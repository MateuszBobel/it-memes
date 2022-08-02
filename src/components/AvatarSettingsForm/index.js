import { useRef } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { useDispatch, useSelector } from 'react-redux';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import { updateProfileAvatar } from '../../store/profileSlice/profile.actions';

export default function AvaratSettingsForm() {
  const dispatch = useDispatch();
  const { profileInfo, profileAvatarLoading, profileAvatarError } = useSelector(
    (state) => state.profile
  );
  const fileInputRef = useRef(null);

  const avatarInputChangeHandler = () => {
    const file = fileInputRef.current.files[0];
    dispatch(updateProfileAvatar(file));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        margin: '20px 0',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ fontWeight: 'bold' }}>Profile avatar</Typography>
      <Button component="label">
        {profileAvatarLoading ? (
          <CircularProgress size={26} />
        ) : (
          <Avatar
            title="Change avatar"
            src={profileInfo.avatar}
            alt="profile avatar"
            sx={{
              width: '100px',
              height: '100px',
            }}
          />
        )}
        <input
          ref={fileInputRef}
          onChange={avatarInputChangeHandler}
          hidden
          accept="image/*"
          type="file"
        />
      </Button>
      {profileAvatarError && (
        <Alert severity="error">
          Avatar can&apos;t be updated please try later!
        </Alert>
      )}
    </Box>
  );
}
