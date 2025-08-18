import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';

const AdminNavbar = ( { setRole }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
     localStorage.removeItem('role');
     setRole(null); // Clear role in state if using context or state management
    // Redirect to home page
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-dark">
  <Container>
    <Navbar.Brand as={Link} to="/admin/dashboard">🩺 Doctor Portal - Admin</Navbar.Brand>
    <Navbar.Toggle />
    <Navbar.Collapse>
      <Nav className="ms-auto">
        <Nav.Link as={Link} to="/admin/doctors">Doctors</Nav.Link>
        <Nav.Link as={Link} to="/admin/patients">Patients</Nav.Link>
        <Nav.Link as={Link} to="/admin/appointments">Appointments</Nav.Link>
        <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Container>
</Navbar>

  );
};

export default AdminNavbar;
