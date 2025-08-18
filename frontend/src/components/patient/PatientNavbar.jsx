import React from 'react';
import { Navbar, Nav, Container, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const PatientNavbar = ({ setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null); // Clear the role from state if managed
    navigate('/');
  };

  return (
    <Navbar bg="primary" variant="dark" expand="lg" className="navbar-dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/" className="fw-bold">
          Doctor Portal - Patient
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-navbar" />
        <Navbar.Collapse id="main-navbar">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/patient/book-appointment">Book Appointment</Nav.Link>
            <Nav.Link as={Link} to="/patient/my-appointments">My Appointments</Nav.Link>
            <Nav.Link as={Link} to="/patient/profile">Profile</Nav.Link>
          </Nav>
          <Button variant="outline-light" onClick={handleLogout}>Logout</Button>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default PatientNavbar;
