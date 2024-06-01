import React, { useState } from 'react';
import { Box, Button, Input, Textarea, Select } from '@chakra-ui/react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const TicketCreate = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [assignee, setAssignee] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState(0);
  const history = useHistory();

  const handleSubmit = () => {
    axios
      .post('http://localhost:5000/tickets', {
        title,
        description,
        assignee,
        status,
        priority,
      })
      .then(() => {
        history.push('/tickets');
      });
  };

  return (
    <Box>
      <Input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <Textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Select
        placeholder="Assignee"
        value={assignee}
        onChange={(e) => setAssignee(e.target.value)}
      >
        <option value="Assignee 1">Assignee 1</option>
        <option value="Assignee 2">Assignee 2</option>
        <option value="Assignee 3">Assignee 3</option>
      </Select>
      <Select
        placeholder="Status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
      >
        <option value="Pending">Pending</option>
        <option value="Progress">Progress</option>
        <option value="Completed">Completed</option>
      </Select>
      <Select
        placeholder="Priority"
        value={priority}
        onChange={(e) => setPriority(e.target.value)}
      >
        {[...Array(10).keys()].map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </Select>
      <Button onClick={handleSubmit}>Create Ticket</Button>
    </Box>
  );
};

export default TicketCreate;
