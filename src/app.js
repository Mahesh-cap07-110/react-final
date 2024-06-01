import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Tickets from './pages/Tickets';
import TicketView from './pages/TicketView';
import TicketCreate from './pages/TicketCreate';
import TicketEdit from './pages/TicketEdit';
import Login from './pages/Login';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  return (
    <AuthProvider>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <ProtectedRoute path="/tickets" exact component={Tickets} />
        <ProtectedRoute path="/tickets/create" component={TicketCreate} />
        <ProtectedRoute path="/tickets/edit/:id" component={TicketEdit} />
        <ProtectedRoute path="/tickets/:id" component={TicketView} />
        <Route path="/login" component={Login} />
      </Switch>
    </AuthProvider>
  );
};

export default App;
