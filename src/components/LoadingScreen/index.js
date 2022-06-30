import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Logo from '../../assets/logo.jpg';

export default function LoadingScreen() {
  return (
    <Box
      sx={{
        display: 'flex',
        width: '100vw',
        height: '70vh',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{ width: '80px' }}
        component="img"
        src={Logo}
        alt="loading screen logo"
      />
      <Typography sx={{ fontWeight: 'bold', marginTop: '4px' }} variant="h4">
        IT Memes
      </Typography>
    </Box>
  );
}
