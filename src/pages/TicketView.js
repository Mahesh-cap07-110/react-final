import React, { useState, useEffect } from 'react';
import { Box, Button } from '@chakra-ui/react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const TicketView = () => {
  const { id } = useParams();
  const history = useHistory();
  const [ticket, setTicket] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/tickets/${id}`).then((response) => {
      setTicket(response.data);
    });
  }, [id]);

  const handleDelete = () => {
    axios.delete(`http://localhost:5000/tickets/${id}`).then(() => {
      history.push('/tickets');
    });
  };

  if (!ticket) return <div>Loading...</div>;

  return (
    <Box>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
      <p>Assignee: {ticket.assignee}</p>
      <p>Status: {ticket.status}</p>
      <p>Priority: {ticket.priority}</p>
      <Button onClick={() => history.push(`/tickets/edit/${ticket.id}`)}>Edit</Button>
      <Button onClick={handleDelete}>Delete</Button>
    </Box>
  );
};

export default TicketView;
