import Box from '@mui/system/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';
import sadDogeImage from '../../assets/sad-doge.png';

export default function NotFound() {
  const matches = useMediaQuery((theme) => theme.breakpoints.up('sm'));
  return (
    <Box sx={{ display: matches ? 'flex' : 'block', alignItems: 'center' }}>
      <Box>
        <Typography variant="h3">Wow</Typography>
        <Typography variant="h4" gutterBottom>
          Such 404
        </Typography>
        <Typography sx={{ width: matches ? '100%' : '80%', margin: '20px 0' }}>
          We couldn&apos;t find the page ou were looking for. It seems you may
          have taken a wrong turn.
        </Typography>
        <Button component={Link} to="/" variant="contained">
          Go home
        </Button>
      </Box>
      <Box
        sx={{ width: '100%' }}
        component="img"
        src={sadDogeImage}
        alt="sad doge meme"
      />
    </Box>
  );
}
