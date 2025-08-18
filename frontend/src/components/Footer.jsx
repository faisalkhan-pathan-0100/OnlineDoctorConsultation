import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5 footer-custom mt-5">
      <Container>
        <Row>
          <Col md={4} className="mb-4">
            <h5 className="text-success">Online Doctor Consultation</h5>
            <p>
              Book appointments with top specialists from the comfort of your home.
              Your health, our priority.
            </p>
          </Col>
          <Col md={4} className="mb-4">
            <h6 className="text-success">Quick Links</h6>
            <ul className="list-unstyled">
              {["/", "/doctors", "/aboutus", "/login", "/signup"].map((link, i) => (
                <li key={i} className="my-2">
                  <a
                    href={link}
                    className="text-light text-decoration-none footer-link"
                  >
                    {link === "/" ? "Home" : link.replace("/", "").replace("-", " ").replace("us", "Us")}
                  </a>
                </li>
              ))}
            </ul>
          </Col>
          <Col md={4} className="mb-4">
            <h6 className="text-success">Contact Us</h6>
            <p>Email: <a href="mailto:support@docportal.com" className="text-info">support@docportal.com</a></p>
            <p>Phone: <a href="tel:+919876543210" className="text-info">+91 98765 43210</a></p>
          </Col>
        </Row>
        <hr className="bg-light" />
        <Row>
          <Col className="text-center">
            <small>
              &copy; {new Date().getFullYear()} <span className="text-success">Online Doctor Consultation</span>. All rights reserved.
            </small>
          </Col>
        </Row>
      </Container>

      {/* Extra CSS inside JSX for simplicity */}
      <style>{`
        .footer-link:hover {
          color: #0dcaf0;
          text-decoration: underline;
        }
        .footer-custom {
          box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.4);
        }
      `}</style>
    </footer>
  );
};

export default Footer;
