import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useMediaQuery from '@mui/material/useMediaQuery';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Box from '@mui/system/Box';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Post from '../../components/Post';
import { toDateTime } from '../../helpers';
import {
  getMemes,
  loadMoreMemes,
} from '../../store/contentSlice/content.actions';

export default function Dashboard() {
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const {
    dashboardMemes,
    dashboardMemeLastKey,
    dashboardMemesLoading,
    dashboardMemesError,
  } = useSelector((state) => state.content);

  const loadMoreButtonHandler = () => {
    dispatch(loadMoreMemes(dashboardMemeLastKey));
  };

  useEffect(() => {
    dispatch(getMemes());
  }, []);

  return (
    <Box
      sx={{
        margin: '20px 0',
        width: matches ? '80%' : '100%',
      }}
    >
      {dashboardMemes.map((meme) => (
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
      {!dashboardMemesLoading && dashboardMemesError && (
        <Alert severity="error">
          Content can&apos;t be loaded please try later!!
        </Alert>
      )}
      {dashboardMemesLoading && (
        <Stack
          direction="row"
          justifyContent="center"
          alignItems="center"
          spacing={2}
        >
          <CircularProgress size={26} />
        </Stack>
      )}
      {!dashboardMemesLoading &&
        dashboardMemeLastKey !== null &&
        !!dashboardMemes.length && (
          <Button onClick={loadMoreButtonHandler}>Load more</Button>
        )}
      {!dashboardMemesLoading &&
        dashboardMemeLastKey === null &&
        !!dashboardMemes.length && (
          <Typography>Nothing more to load!</Typography>
        )}
    </Box>
  );
}
