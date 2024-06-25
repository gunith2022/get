// Navbar.js
import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Navbar.css';

const CustomNavbar = () => {
  const handleLogout = () => {
    axios.get('http://localhost:3307/logout')
      .then(res => {
        console.log('Logout successful');
        // Redirect to login page after successful logout
        window.location.href = '/'; // or use history.push('/login') if using useHistory hook
      })
      .catch(err => {
        console.error('Logout failed:', err);
        // Handle logout failure
      });
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">BrandName</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="w-100 d-flex justify-content-between">
            <Nav.Link as={Link} to="/profile">Profile</Nav.Link>
            <Nav.Link as={Link} to="/ieee">IEEE</Nav.Link>
            <Nav.Link as={Link} to="/aac">AAC</Nav.Link>
            <Nav.Link as={Link} to="/sdc">SDC</Nav.Link>
            <Nav.Link as={Link} to="/rhythms">Rhythms</Nav.Link>
            {/* Logout Button */}
            <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default CustomNavbar;

