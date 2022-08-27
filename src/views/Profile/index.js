import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import Alert from '@mui/material/Alert';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/system/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import FmdGoodOutlinedIcon from '@mui/icons-material/FmdGoodOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import { useSelector, useDispatch } from 'react-redux';
import Post from '../../components/Post';
import { toDateTime } from '../../helpers';

import {
  getUserInfo,
  getUserMemes,
  loadMoreUserMemes,
} from '../../store/contentSlice/content.actions';

export default function Profile() {
  const { uid } = useParams();
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const {
    viewedUser,
    viewedUserLoading,
    viewedUserError,
    viewedUserMemes,
    viewedUserMemeLastKey,
    viewedUserMemesLoading,
    viewedUserMemesError,
  } = useSelector((state) => state.content);

  useEffect(() => {
    dispatch(getUserInfo(uid));
    dispatch(getUserMemes(uid));
  }, []);

  const loadMoreButtonHandler = () => {
    dispatch(loadMoreUserMemes(uid, viewedUserMemeLastKey));
  };

  if (
    viewedUserLoading ||
    (Object.values(viewedUser).every((el) => el === '') && !viewedUserError)
  ) {
    return (
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
      >
        <CircularProgress size={26} />
      </Stack>
    );
  }

  if (viewedUserError) {
    return <Alert severity="error">User not found!</Alert>;
  }

  return (
    <Box
      sx={{
        margin: '20px 0',
        width: matches ? '80%' : '100%',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginBottom: 2,
          border: '2px solid',
          borderColor: 'primary.main',
          borderRadius: 3,
          padding: 2,
        }}
      >
        <Avatar
          sx={{
            width: 100,
            height: 100,
            border: '3px solid',
            borderColor: 'primary.main',
          }}
          src={viewedUser.avatar}
          alt="Avatar image"
        />
        <Box sx={{ marginLeft: 2 }}>
          <Typography sx={{ fontWeight: 'bold' }} title="Name" variant="h5">
            {viewedUser.name}
          </Typography>
          {viewedUser.city && (
            <Box title="City" sx={{ display: 'flex', alignItems: 'center' }}>
              <FmdGoodOutlinedIcon />
              <Typography sx={{ marginLeft: 1 }}>{viewedUser.city}</Typography>
            </Box>
          )}
          {viewedUser.jobPosition && (
            <Box
              title="Job position"
              sx={{ display: 'flex', alignItems: 'center' }}
            >
              <WorkOutlineOutlinedIcon />
              <Typography sx={{ marginLeft: 1 }}>
                {viewedUser.jobPosition}
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      {viewedUserMemes.map((meme) => (
        <Post
          key={meme.id}
          id={meme.id}
          authorId={meme.authorId}
          authorAvatar={meme.authorAvatar}
          date={toDateTime(meme.createdAt.seconds)}
          title={meme.title}
          file={meme.file}
          tags={meme.tags}
        />
      ))}
      {!viewedUserMemesLoading && viewedUserMemesError && (
        <Alert severity="error">
          Content can&apos;t be loaded please try later!!
        </Alert>
      )}
      {viewedUserMemesLoading && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <CircularProgress size={26} />
        </Stack>
      )}
      {!viewedUserMemesLoading &&
        viewedUserMemeLastKey !== null &&
        !!viewedUserMemes.length && (
          <Button onClick={loadMoreButtonHandler}>Load more</Button>
        )}
      {!viewedUserMemesLoading &&
        viewedUserMemeLastKey === null &&
        !!viewedUserMemes.length && (
          <Typography>Nothing more to load!</Typography>
        )}
    </Box>
  );
}
