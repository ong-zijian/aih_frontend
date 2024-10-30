// src/displayComponents/Navbar.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import { Link, useNavigate } from 'react-router-dom';

const Navbar: React.FC<{ isAuthenticated: boolean, setAuth: (auth: boolean) => void }> = ({ isAuthenticated, setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth(false); // Log the user out
    navigate('/homepage'); // Redirect to home
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          AIH Chatbot Project
        </Typography>
        <Box>
          <Button color="inherit" component={Link} to="/">
            Home
          </Button>
          <Button color="inherit" component={Link} to="/chatbot">
            Chatbot
          </Button>
          <Button color="inherit" component={Link} to="/scam-checker">
            Scam Checker
          </Button>
          {isAuthenticated ? (
            <Button color="inherit" onClick={handleLogout}>
              Logout
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              Login
            </Button>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
