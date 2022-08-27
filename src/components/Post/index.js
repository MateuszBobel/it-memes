import { Link as LinkComp } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/system/Box';
import Chip from '@mui/material/Chip';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';

export default function Post({
  id,
  date,
  authorId,
  authorAvatar,
  title,
  file,
  tags,
}) {
  return (
    <Paper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        margin: '10px 0',
        padding: 2,
      }}
      elevation={3}
    >
      <Box sx={{ display: 'flex', marginBottom: 2 }}>
        <Avatar
          sx={{
            width: 50,
            height: 50,
            marginRight: 2,
            border: '2px solid',
            borderColor: 'primary.main',
          }}
          to={`/profile/${authorId}`}
          component={LinkComp}
          src={authorAvatar}
          alt="Avatar image"
        />
        <Box>
          <Typography variant="h5" align="left">
            <Link
              component={LinkComp}
              sx={{ textDecoration: 'none', fontWeight: 'bold' }}
              to={`/meme/${id}`}
              gutterBottom
            >
              {title}
            </Link>
          </Typography>
          <Typography variant="caption" align="left">
            {date}
          </Typography>
        </Box>
      </Box>
      <Box
        component="img"
        sx={{ marginBottom: 2, maxWidth: '100%' }}
        src={file}
        alt=""
      />
      <Box sx={{ display: 'flex', flexWrap: 'wrap' }}>
        {tags.map((tag) => (
          <Chip
            sx={{ margin: 0.5 }}
            key={tag.label}
            size="small"
            label={tag.label}
            variant="outlined"
          />
        ))}
      </Box>
    </Paper>
  );
}

Post.propTypes = {
  id: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  authorAvatar: PropTypes.string.isRequired,
  authorId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  file: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
    })
  ).isRequired,
};
