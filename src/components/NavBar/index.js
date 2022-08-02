import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
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
import { logoutUser } from '../../store/authSlice/auth.actions';

const settings = [
  { name: 'My Profile', isLink: true, link: '/profile' },
  { name: 'Settings', isLink: true, link: '/settings' },
  { name: 'Logout', isLink: false, link: null },
];

export default function NavBar({ children }) {
  const dispatch = useDispatch();
  const { isLogin, isLoaded } = useSelector((state) => state.auth);
  const { profileInfo } = useSelector((state) => state.profile);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const logoutButtonHandler = () => {
    dispatch(logoutUser());
  };

  return (
    <>
      <AppBar color="background">
        <Container maxWidth="md">
          <Toolbar
            sx={{ display: 'flex', justifyContent: 'space-between' }}
            disableGutters
          >
            <Box component={Link} to="/">
              <Box component="img" src={Logo} sx={{ height: '50px', mr: 1 }} />
            </Box>
            {isLogin && isLoaded && (
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
                    <Avatar alt="User avatar" src={profileInfo.avatar} />
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
                  {settings.map((setting) =>
                    setting.isLink ? (
                      <MenuItem
                        component={Link}
                        to={setting.link}
                        key={setting.name}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    ) : (
                      <MenuItem
                        onClick={logoutButtonHandler}
                        key={setting.name}
                      >
                        <Typography textAlign="center">
                          {setting.name}
                        </Typography>
                      </MenuItem>
                    )
                  )}
                </Menu>
              </Box>
            )}
            {!isLogin && isLoaded && (
              <Box>
                <Button
                  component={Link}
                  to="/login"
                  sx={{
                    mr: 1,
                  }}
                  variant="contained"
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  to="/register"
                  color="secondary"
                  variant="contained"
                >
                  Sign up
                </Button>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Container sx={{ my: '80px' }} maxWidth="md">
        {children}
      </Container>
    </>
  );
}

NavBar.propTypes = {
  children: PropTypes.node.isRequired,
};
