import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const doctorLogoSvg = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23007bff'%3E%3Cpath d='M0 0h24v24H0z' fill='none'/%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z'/%3E%3C/svg%3E`;

const DoctorNavbar = ({ setRole }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('role');
    setRole(null);
    navigate('/');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="navbar-dark">
      <Container fluid>
        <Navbar.Brand as={Link} to="/doctor/dashboard">
          <img
            src={doctorLogoSvg}
            width="40"
            height="40"
            className="d-inline-block align-top me-2"
            alt="Doctor Consult Logo"
          />
          Doctor Consult
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/doctor/dashboard" active={location.pathname === '/doctor/dashboard'}>Dashboard</Nav.Link>
            <Nav.Link as={Link} to="/doctor/appointments" active={location.pathname === '/doctor/appointments'}>Appointments</Nav.Link>
            <Nav.Link as={Link} to="/doctor/patients" active={location.pathname === '/doctor/patients'}>Patients</Nav.Link>
            <Nav.Link as={Link} to="/doctor/profile" active={location.pathname === '/doctor/profile'}>My Profile</Nav.Link>
            <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default DoctorNavbar;
