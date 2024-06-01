import React, { useState, useEffect } from 'react';
import { Box, Grid, Button, Select } from '@chakra-ui/react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Tickets = () => {
  const [tickets, setTickets] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const history = useHistory();

  useEffect(() => {
    axios.get('http://localhost:5000/tickets').then((response) => {
      setTickets(response.data);
    });
  }, []);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilterStatus(e.target.value);
  };

  const sortedFilteredTickets = tickets
    .filter((ticket) =>
      filterStatus ? ticket.status === filterStatus : true
    )
    .sort((a, b) => {
      if (sortOrder === 'Low to High') {
        return a.priority - b.priority;
      } else if (sortOrder === 'High to Low') {
        return b.priority - a.priority;
      } else {
        return 0;
      }
    });

  return (
    <Box>
      <Button onClick={() => history.push('/tickets/create')}>
        Create Ticket
      </Button>
      <Select placeholder="Sort by Priority" onChange={handleSortChange}>
        <option value="Low to High">Low to High</option>
        <option value="High to Low">High to Low</option>
      </Select>
      <Select placeholder="Filter by Status" onChange={handleFilterChange}>
        <option value="Pending">Pending</option>
        <option value="Progress">Progress</option>
        <option value="Completed">Completed</option>
      </Select>
      <Grid templateColumns="repeat(auto-fit, minmax(250px, 1fr))" gap={6}>
        {sortedFilteredTickets.map((ticket) => (
          <Box key={ticket.id} borderWidth="1px" borderRadius="lg" overflow="hidden">
            <Box p="6">
              <Box d="flex" alignItems="baseline">
                <Box
                  color="gray.500"
                  fontWeight="semibold"
                  letterSpacing="wide"
                  fontSize="xs"
                  textTransform="uppercase"
                  ml="2"
                >
                  {ticket.status}
                </Box>
              </Box>
              <Box
                mt="1"
                fontWeight="semibold"
                as="h4"
                lineHeight="tight"
                isTruncated
              >
                {ticket.title}
              </Box>
              <Box>
                Priority: {ticket.priority}
              </Box>
              <Button onClick={() => history.push(`/tickets/${ticket.id}`)}>View</Button>
            </Box>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default Tickets;
