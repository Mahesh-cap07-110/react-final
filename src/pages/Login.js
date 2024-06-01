import React, { useState } from 'react';
import { Box, Input, Button, Alert } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const history = useHistory();

  const handleSubmit = async () => {
    try {
      const response = await axios.post('https://reqres.in/api/login', {
        email,
        password,
      });
      login(response.data.token);
      history.push('/');
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Box>
      <Input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        placeholder="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleSubmit}>Login</Button>
      {error && <Alert status="error">{error}</Alert>}
    </Box>
  );
};

export default Login;
