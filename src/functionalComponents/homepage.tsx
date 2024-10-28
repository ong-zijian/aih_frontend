// src/components/HomePage.tsx
import React from 'react';
import { Link } from 'react-router-dom';

import { Typography, Container, Box, Button } from '@mui/material';

const HomePage: React.FC = () => {

  return (
    <Container maxWidth="lg" sx={{ paddingTop: '50px' }}>
      {/* Welcome Section */}
      <Box textAlign="center" mb={5}>
        <Typography variant="h3" component="h1" gutterBottom>
          Welcome to AIH Group 6's Chatbot!
        </Typography>
        {/* <Typography variant="h6" color="textSecondary">
          Explore our services and learn more about what we do.
        </Typography> */}
        <Button variant="contained" color="primary" sx={{ marginTop: '20px' }} component={Link} to="/chatbot">
          Try the chatbot
        </Button>
      </Box>

      {/* Contact Section */}
      {/* <Box mb={5}>
        <Typography variant="h4" component="h2" gutterBottom>
          Contact Us
        </Typography>
        <Typography variant="body1" color="textSecondary">
          Get in touch with us for more information or any inquiries.
        </Typography>
        <Button variant="outlined" color="primary" sx={{ marginTop: '10px' }}>
          Contact Us
        </Button>
      </Box> */}
    </Container>
  );
};

export default HomePage;
