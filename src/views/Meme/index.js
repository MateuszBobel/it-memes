import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import CircularProgress from '@mui/material/CircularProgress';
import Stack from '@mui/material/Stack';
import { getMemeInfo } from '../../store/contentSlice/content.actions';
import Post from '../../components/Post';
import { toDateTime } from '../../helpers';

export default function Meme() {
  const dispatch = useDispatch();
  const { id } = useParams();
  const { viewedMeme, viewedMemeLoading, viewedMemeError } = useSelector(
    (state) => state.content
  );

  useEffect(() => {
    dispatch(getMemeInfo(id));
  }, []);

  if (viewedMemeLoading || (viewedMeme === null && !viewedMemeError)) {
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

  if (viewedMemeError) {
    return <Alert severity="error">Meme not found!</Alert>;
  }

  return (
    <Post
      id={viewedMeme.id}
      authorId={viewedMeme.authorId}
      authorAvatar={viewedMeme.authorAvatar}
      date={toDateTime(viewedMeme.createdAt.seconds)}
      title={viewedMeme.title}
      file={viewedMeme.file}
      tags={viewedMeme.tags}
    />
  );
}
