import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const NavbarGeneral = () => (
  <>
    <style>{`
      .navbar-custom {
        background: linear-gradient(135deg, #e6f4ea, #cde4d2);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
        border-bottom: 1px solid #d4e6d1;
      }
      .navbar-custom .navbar-brand {
        font-weight: 700;
        color: #198754 !important;
        font-size: 1.5rem;
      }
      .navbar-custom .nav-link {
        font-weight: 500;
        margin-right: 1rem;
        color: #333 !important;
        transition: color 0.3s;
      }
      .navbar-custom .nav-link:hover {
        color: #198754 !important;
      }
      .navbar-toggler {
        border-radius: 6px;
        border: 1px solid #198754;
      }
    `}</style>

    <Navbar expand="lg" className="navbar-custom" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to="/">🩺 Doctor Portal</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/doctors">Doctors</Nav.Link>
            <Nav.Link as={Link} to="/aboutus">About Us</Nav.Link>
            <Nav.Link as={Link} to="/login">Login</Nav.Link>
            <Nav.Link as={Link} to="/Signup">Signup</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  </>
);

export default NavbarGeneral;
