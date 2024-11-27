import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { useUser } from './context/UserContext';
import { useNavigate } from 'react-router-dom';
import SettingsIcon from '@mui/icons-material/Settings';

const pages = ['Explore', 'Nearby', 'AI Recommendations'];

function Navbar() {
  const { loggedIn, logOut } = useUser(); // Use the UserContext to get login state and logOut function
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [selectedTab, setSelectedTab] = React.useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSettingsClick = () => {
    if (!loggedIn) {
      navigate('/login');
    } else {
      logOut();
    }
  };

  const handlePageNavigation = (page) => {
    setSelectedTab(page); // Set the selected tab
    if (page === 'Explore') {
      navigate('/explore');
    } else if (page === 'Nearby') {
      navigate('/nearby');
    } else if (page === 'AI Recommendations') {
      navigate('/reccomendations');
    }
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: '#333', boxShadow: 'none' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo for larger screens */}
          <Typography
            variant="h4"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 5,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
              letterSpacing: '1px',
              fontSize: '1.5rem',
              '&:hover': {
                color: '#f50057', // Add hover effect for the logo
                cursor: 'pointer',
              },
            }}
          >
            SharePlate
          </Typography>

          {/* Mobile Menu Toggle */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
            >
              {pages.map((page) => (
                <MenuItem
                  key={page}
                  onClick={() => {
                    handlePageNavigation(page);
                    handleCloseNavMenu();
                  }}
                >
                  <Typography sx={{ textAlign: 'center', fontWeight: 700 }}>{page}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/* Logo for smaller screens */}
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              color: '#fff',
              textDecoration: 'none',
            }}
          >
            SharePlate
          </Typography>

          {/* Navigation Buttons */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={() => handlePageNavigation(page)}
                sx={{
                  my: 2,
                  display: 'block',
                  mx: 2,
                  textTransform: 'none',
                  color: selectedTab === page ? '#f50057' : '#fff', // Highlight active tab
                  fontWeight: selectedTab === page ? 700 : 600,
                  '&:hover': {
                    color: '#f50057', // Hover effect on tab
                  },
                }}
              >
                <Typography sx={{ textAlign: 'center' }}>{page}</Typography>
              </Button>
            ))}
          </Box>

          {/* User Avatar & Settings */}
          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <SettingsIcon/>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem key="login-action" onClick={handleSettingsClick}>
                <Typography sx={{ textAlign: 'center' }}>
                  {loggedIn ? 'Log out' : 'Log in'}
                </Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
