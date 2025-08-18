import { Container, Row, Col } from 'react-bootstrap';

const data = [
  { icon: '👨‍⚕️', title: '100,000+ verified doctors', text: 'Strict verification process.' },
  { icon: '🕒', title: '24*7 access to healthcare', text: 'Consult anytime, anywhere.' },
  { icon: '💰', title: 'Save time & money', text: 'Save up to 70% on consultations.' },
  { icon: '✔️', title: '100% care guaranteed', text: 'Continuous and comprehensive care.' }
];

const WhyUseSection = () => (
  <Container className="py-5 text-center">
    <h2 className="mb-4">Why use Our Platform</h2>
    <Row>
      {data.map((item, index) => (
        <Col key={index} md={3} className="mb-4">
          <div className="fs-1">{item.icon}</div>
          <h5 className="fw-bold">{item.title}</h5>
          <p>{item.text}</p>
        </Col>
      ))}
    </Row>
  </Container>
);

export default WhyUseSection;
