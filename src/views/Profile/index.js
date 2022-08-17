import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useSelector, useDispatch } from 'react-redux';
import { getUserInfo } from '../../store/contentSlice/content.actions';

export default function Profile() {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const { userInfo, userInfoLoading, userInfoError } = useSelector(
    (state) => state.content
  );

  useEffect(() => {
    dispatch(getUserInfo(uid));
  }, []);

  if (
    userInfoLoading ||
    (Object.values(userInfo).every((el) => el === '') && !userInfoError)
  ) {
    return <CircularProgress size={26} />;
  }

  if (userInfoError) {
    return <Alert severity="error">User not found!</Alert>;
  }

  return (
    <Box
      sx={{
        margin: '20px 0',
        width: matches ? '50%' : '100%',
      }}
    >
      <Typography gutterBottom sx={{ fontWeight: 'bold' }}>
        User Profile
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        <Avatar
          sx={{
            width: 100,
            height: 100,
            border: '3px solid',
            borderColor: 'primary.main',
          }}
          src={userInfo.avatar}
          alt="Avatar image"
        />
        <Box sx={{ marginLeft: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }} title="Name" variant="h5">
            {userInfo.name}
          </Typography>
          <Box title="City" sx={{ display: 'flex', alignItems: 'center' }}>
            <FmdGoodOutlinedIcon />
            <Typography sx={{ marginLeft: 1 }}>{userInfo.city}</Typography>
          </Box>
          <Box
            title="Job position"
            sx={{ display: 'flex', alignItems: 'center' }}
          >
            <WorkOutlineOutlinedIcon />
            <Typography sx={{ marginLeft: 1 }}>
              {userInfo.jobPosition}
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
