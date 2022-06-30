import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Logo from '../../assets/logo.jpg';

const settings = ['My Profile', 'Settings', 'Logout'];

export default function NavBar() {
  const { isLogin } = useSelector((state) => state.auth);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar color="background" enableColorOnDark position="static">
      <Container maxWidth="md">
        <Toolbar
          sx={{ display: 'flex', justifyContent: 'space-between' }}
          disableGutters
        >
          <Box component={Link} to="/">
            <Box component="img" src={Logo} sx={{ height: '50px', mr: 1 }} />
          </Box>
          {isLogin ? (
            <Box>
              <Button
                component={Link}
                to="/add"
                color="primary"
                variant="contained"
                sx={{ mr: 1 }}
              >
                Add meme
              </Button>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="User avatar" src="" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting) => (
                  <MenuItem key={setting} onClick={handleCloseUserMenu}>
                    <Typography textAlign="center">{setting}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Box>
              <Button
                component={Link}
                to="/login"
                sx={{
                  mr: 1,
                }}
                variant="contained"
              >
                Log in
              </Button>
              <Button
                component={Link}
                to="/register"
                color="secondary"
                variant="contained"
              >
                Sign in
              </Button>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
