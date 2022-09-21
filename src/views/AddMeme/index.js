import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import ImageFileInput from '../../components/ImageFileInput';
import TagsList from '../../components/TagsList';
import { basicInputValidation } from '../../helpers';
import { uploadMeme } from '../../store/contentSlice/content.actions';

export default function AddMeme() {
  const dispatch = useDispatch();
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  const [tags, setTags] = useState([]);
  const [fileInputValue, setFileInputValue] = useState(null);
  const [titleInputValue, setTitleInputValue] = useState('');
  const [titleError, setTitleError] = useState('');
  const [fileError, setFileError] = useState('');
  const { uploadMemeLoading, uploadMemeError } = useSelector(
    (state) => state.content
  );

  const addTagHandler = (label) => {
    setTags((prevTags) => [...prevTags, { label }]);
  };

  const deleteTagHandler = (tagToDelete) => {
    const filteredTags = tags.filter((tag) => tag.label !== tagToDelete.label);
    setTags(filteredTags);
  };

  const inputValueHandler = (e) => {
    const { value, name, files } = e.target;
    if (name === 'title') {
      setTitleInputValue(value);
    } else if (name === 'file') {
      setFileInputValue(files[0]);
    }
  };

  const addMemeHandler = () => {
    const titleErrorMessage = basicInputValidation(titleInputValue, 'Title');
    const fileErrorMessage = basicInputValidation(fileInputValue, 'Image');
    setTitleError('');
    setFileError('');
    if (titleErrorMessage || fileErrorMessage) {
      setTitleError(titleErrorMessage);
      setFileError(fileErrorMessage);
    } else {
      dispatch(
        uploadMeme({
          title: titleInputValue,
          file: fileInputValue,
          tags,
        })
      );
      setTitleInputValue('');
      setFileInputValue(null);
    }
  };

  return (
    <Box
      sx={{
        margin: '20px 0',
        width: matches ? '50%' : '100%',
      }}
      component="form"
      noValidate
      autoComplete="off"
    >
      <Typography sx={{ fontWeight: 'bold' }}>Add new meme</Typography>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <TextField
          onChange={inputValueHandler}
          size="small"
          variant="outlined"
          margin="dense"
          required
          fullWidth
          placeholder="Title"
          name="title"
          type="text"
          id="title"
          value={titleInputValue}
          helperText={titleError}
          error={!!titleError}
        />
        <ImageFileInput
          file={fileInputValue}
          onChange={inputValueHandler}
          name="file"
          helperText={fileError}
          error={!!fileError}
        />
        <TagsList
          max={10}
          list={tags}
          handleDelete={deleteTagHandler}
          handleAdd={addTagHandler}
        />
        {uploadMemeError && (
          <Alert severity="error">Upload faild please try later!</Alert>
        )}
        <Button
          sx={{ alignSelf: 'flex-start', marginTop: '10px' }}
          disabled={uploadMemeLoading}
          onClick={addMemeHandler}
          color="primary"
          variant="contained"
        >
          {uploadMemeLoading ? <CircularProgress size={26} /> : 'Upload'}
        </Button>
      </Box>
    </Box>
  );
}
