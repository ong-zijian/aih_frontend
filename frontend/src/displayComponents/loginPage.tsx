import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, TextField, Typography, Container, IconButton, InputAdornment } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';

const xorHash = (input: string, key: number) => {
  return input
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ key))
    .join('');
};

const LoginPage: React.FC<{ setAuth: (auth: boolean) => void }> = ({ setAuth }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false); // For toggling password visibility
  const navigate = useNavigate();

  const correctHashedPassword = "誆誎誏誷誰諵諷諵諳諦"; // Store this securely
  const xorKey = 11111111;

  const handleLogin = () => {
    const hashedInput = xorHash(password, xorKey);
    if (hashedInput === correctHashedPassword) {
      setAuth(true); // Set authentication to true
      navigate('/homepage'); // Redirect to home page
    } else {
      alert('Incorrect password');
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box
          component="form"
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
          noValidate
          sx={{ mt: 1 }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type={showPassword ? 'text' : 'password'} // Toggle between text and password
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={handleClickShowPassword}
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginPage;
