import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const categories = [
  { name: 'Dietitian', img: '/CatagoryImgs/dietitian.jpeg' },
  { name: 'Gynecologist', img: '/CatagoryImgs/gaynecologist.jpeg' },
  { name: 'Psychologist', img: '/CatagoryImgs/Psychologist.jpeg' },
  { name: 'Dermatologist', img: '/CatagoryImgs/Dermatologist.jpeg' },
  { name: 'Sexologist', img: '/CatagoryImgs/Sexologist.jpeg' },
  { name: 'Ayurvedic Specialist', img: '/CatagoryImgs/AyurvedicSpecialist.webp' },
  { name: 'Homeopathic Doctor', img: '/CatagoryImgs/Homeopathic.jpeg' },
  { name: 'Orthopedic Surgeon', img: '/CatagoryImgs/OrthopedicSurgeon.jpeg' },
  { name: 'Neurologist', img: '/CatagoryImgs/Neurologist.jpeg' },
];

const TopCategories = () => (
  <Container className="py-5 text-center">
    <h2 className="mb-4">Top Categories</h2>
    <Row>
      {categories.map((cat, index) => (
        <Col key={index} md={4} className="mb-4">
          <Card className="shadow">
            <Card.Img variant="top" src={cat.img} height="180px" style={{ objectFit: 'cover' }} />
            <Card.Body>
              <Card.Title>
                <Link to={`/doctors/specialization/${cat.name}`}>{cat.name}</Link>
              </Card.Title>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </Container>
);

export default TopCategories;
