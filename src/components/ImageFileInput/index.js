import AddPhotoAlternateOutlinedIcon from '@mui/icons-material/AddPhotoAlternateOutlined';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function ImageFileInput({ file, onChange, name }) {
  return (
    <Button
      component="label"
      sx={{
        minHeight: '150px',
        width: '100%',
        margin: '8px 0 4px 0',
        border: !file && '1px dashed',
        borderColor: 'darkgray',
      }}
    >
      {file ? (
        <Box
          sx={{ width: '100%' }}
          component="img"
          src={URL.createObjectURL(file)}
        />
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <AddPhotoAlternateOutlinedIcon />
          <Typography>CLick here to add image</Typography>
        </Box>
      )}
      <input
        name={name}
        onChange={onChange}
        hidden
        accept="image/*"
        type="file"
      />
    </Button>
  );
}

ImageFileInput.propTypes = {
  file: PropTypes.oneOfType([
    PropTypes.oneOf([null]),
    PropTypes.shape({
      name: PropTypes.string,
      lastModified: PropTypes.number,
      lastModifiedDate: PropTypes.instanceOf(Date),
      size: PropTypes.number,
      type: PropTypes.string,
    }),
  ]),
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string,
};

ImageFileInput.defaultProps = {
  name: 'file',
  file: null,
};
