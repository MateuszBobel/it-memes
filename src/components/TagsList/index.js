import { useState } from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import TextField from '@mui/material/TextField';
import PropTypes from 'prop-types';

export default function TagsList({ max, handleDelete, handleAdd, list }) {
  const [tagInputValue, setTagInputValue] = useState('');

  const inputValueHandler = (e) => {
    const { value } = e.target;
    setTagInputValue(value);
  };

  const enterButtonHandler = (e) => {
    if (
      e.key === 'Enter' &&
      tagInputValue.trim() !== '' &&
      list.length < max &&
      !list.some((el) => el.label === tagInputValue)
    ) {
      handleAdd(tagInputValue);
      setTagInputValue('');
    }
  };

  return (
    <Box>
      <TextField
        onChange={inputValueHandler}
        onKeyDown={enterButtonHandler}
        size="small"
        variant="outlined"
        margin="dense"
        required
        fullWidth
        placeholder="Tag"
        name="tag"
        type="text"
        id="tag"
        value={tagInputValue}
      />
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-start',
          flexWrap: 'wrap',
          listStyle: 'none',
          padding: 0,
          m: 0,
        }}
        component="ul"
      >
        {list.map((tag) => (
          <Box sx={{ m: 0.1 }} component="li" key={tag.label}>
            <Chip label={tag.label} onDelete={() => handleDelete(tag)} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}

TagsList.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
    })
  ).isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleAdd: PropTypes.func.isRequired,
  max: PropTypes.number,
};

TagsList.defaultProps = {
  max: 10,
};
