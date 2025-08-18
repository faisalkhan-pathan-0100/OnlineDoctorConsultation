import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";

const teamMembers = [
  {
    name: "Faisalkhan Pathan",
    role: "Founder & Full-Stack Developer",
    description:
      "Driven to deliver seamless healthcare solutions through clean code and creative UI/UX.",
    image: "/CatagoryImgs/Faisalkhan.jpg",
  },
  {
    name: "Dr. Vaibhav Kapshe",
    role: "Medical Advisor",
    description:
      "Guides medical strategy, ensures the platform follows healthcare ethics and practices.",
    image: "/CatagoryImgs/vaibhav.jpg",
  },
  {
    name: "Ritesh Gaikwad",
    role: "Management Consultant",
    description:
      "Helps patients and doctors navigate the platform and handles user feedback.",
    image: "/CatagoryImgs/ritesh.jpg",
  },
];

const AboutUs = () => {
  return (
    <Container className="mt-5 mb-5">
      <style>{`
        .about-header h2 {
          font-size: 2.5rem;
          color: #198754;
        }

        .about-vision,
        .about-features {
          padding: 1.5rem;
          background-color: #f8f9fa;
          border-radius: 12px;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.05);
        }

        .team-card {
          transition: transform 0.3s, box-shadow 0.3s;
        }

        .team-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }

        .team-card .card-title {
          color: #198754;
          font-weight: bold;
        }

        .team-card .card-subtitle {
          font-size: 0.95rem;
        }

        .about-features ul {
          list-style: none;
          padding-left: 0;
        }

        .about-features li::before {
          content: "✅";
          color: #198754;
          margin-right: 8px;
        }

        .about-vision h4,
        .about-features h4,
        .fw-semibold {
          color: #198754;
        }
      `}</style>

      {/* Section Heading */}
      <Row className="mb-4 text-center about-header">
        <Col>
          <h2 className="fw-bold">About Us</h2>
          <p className="text-muted">
            Empowering healthcare through innovation, empathy, and technology.
          </p>
        </Col>
      </Row>

      {/* Vision & Offer */}
      <Row className="mb-5">
        <Col md={6}>
          <div className="about-vision">
            <h4 className="fw-semibold">Our Vision</h4>
            <p>
              We aim to revolutionize healthcare accessibility by connecting
              patients and doctors through a secure, user-friendly platform.
            </p>
          </div>
        </Col>
        <Col md={6}>
          <div className="about-features">
            <h4 className="fw-semibold">What We Offer</h4>
            <ul className="ps-0">
              <li>Verified doctors across specializations</li>
              <li>Easy appointment booking</li>
              <li>Mobile-friendly & intuitive design</li>
              <li>Data privacy and confidentiality</li>
            </ul>
          </div>
        </Col>
      </Row>

      {/* Team Section */}
      <Row className="mb-4 text-center">
        <Col>
          <h4 className="fw-semibold">Meet Our Team</h4>
        </Col>
      </Row>

      <Row>
        {teamMembers.map((member, index) => (
          <Col md={4} className="mb-4" key={index}>
            <Card className="h-100 shadow-sm team-card">
              <Card.Img
                variant="top"
                src={member.image}
                alt={member.name}
                style={{ height: "300px", objectFit: "contain",objectPosition: "center" }}
              />
              <Card.Body>
                <Card.Title>{member.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {member.role}
                </Card.Subtitle>
                <Card.Text>{member.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default AboutUs;
