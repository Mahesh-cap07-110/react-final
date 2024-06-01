import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Box, Button, Flex, Spacer } from '@chakra-ui/react';

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();

  return (
    <Flex as="nav" padding="1.5rem" bg="teal.500" color="white">
      <Box>
        <Link to="/">Home</Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/about">About</Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/contact">Contact</Link>
      </Box>
      <Spacer />
      <Box>
        <Link to="/tickets">Tickets</Link>
      </Box>
      <Spacer />
      {isLoggedIn ? (
        <Button onClick={logout}>Logout</Button>
      ) : (
        <Link to="/login">Login</Link>
      )}
    </Flex>
  );
};

export default Navbar;
